import { useState, useEffect, useCallback } from "react"
import cl from "classnames"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Radialbar from "@/components/Radialbar"
import TextInput from "@/components/TextInput"
import Confirm from "@/components/Confirm"

import { useCallApi } from "@/hooks"
import { workOrderApi } from "@/services/api"
import { handleGetWorkOrderProgress } from "@/services/signalr"
import { PRODUCT_SCHEDULE_STATUS_LIST } from "@/utils/constants"
import { convertISOToLocaleDate } from "@/utils/functions"

function ProductionProgress() {
    const callApi = useCallApi()
    const [status, setStatus] = useState([2])
    const [searchInput, setSearchInput] = useState("")
    const [resData, setResData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [progressData, setProgressData] = useState({})
    const [confirmData, setConfirmData] = useState({})

    const fetchData = useCallback(() => {
        callApi(workOrderApi.getWorkOrders, (res) => {
            setResData(res.items.filter((item) => item.isScheduled).reverse())
            const _progressData = {}
            res.items.forEach((item) => {
                _progressData[item.workOrderId] = {
                    actualQuantity: item.actualQuantity,
                    progressPercentage: item.progressPercentage,
                }
            })
            setProgressData(_progressData)
        })
    }, [callApi])

    const handleStart = (id) => {
        setConfirmData({
            title: "Xác nhận bắt đầu lệnh sản xuất",
            content: "Bắt đầu lệnh sản xuất để theo dõi tiến độ sản xuất",
            actived: true,
            onConfirm() {
                callApi(() => workOrderApi.startWorkOrder(id), fetchData, "Bắt đầu lệnh sản xuất thành công")
            },
        })
    }

    const handleClose = (id) => {
        setConfirmData({
            title: "Xác nhận hoàn thành lệnh sản xuất",
            content: "Hoàn thành lệnh sản xuất sẽ dừng theo dõi tiến độ sản xuất",
            actived: true,
            onConfirm() {
                callApi(() => workOrderApi.closeWorkOrder(id), fetchData, "Hoàn thành lệnh sản xuất")
            },
        })
    }

    useEffect(() => {
        let result
        switch (status[0]) {
            case 0:
                result = resData
                break
            case 1:
                result = resData.filter((item) => !item.isStarted)
                break
            case 2:
                result = resData.filter((item) => item.isStarted && !item.isClosed)
                break
            case 3:
                result = resData.filter((item) => item.isClosed)
                break
            default:
                result = resData
                break
        }
        setFilterData(
            result.filter(
                (item) =>
                    item.workOrderId.includes(searchInput) ||
                    item.materialDefinition.includes(searchInput) ||
                    item.equipment.includes(searchInput),
            ),
        )
    }, [status, resData, searchInput])

    useEffect(() => {
        fetchData()
        const connection = handleGetWorkOrderProgress(
            (workOrderId, actualQuantity, progressPercentage) => {
                setProgressData((prevData) => ({
                    ...prevData,
                    [workOrderId]: { actualQuantity, progressPercentage },
                }))
            },
            (err) => console.log(err),
        )

        return connection.stop
    }, [fetchData])

    return (
        <div data-component="ProductionProgress" className="container pb-2">
            <Card className="flex w-full items-center gap-10">
                <SelectInput
                    label="Trạng thái"
                    value={status}
                    setValue={setStatus}
                    list={PRODUCT_SCHEDULE_STATUS_LIST}
                />
                <TextInput
                    className="h-[66px] w-80"
                    label="Tìm kiếm..."
                    value={searchInput}
                    setValue={setSearchInput}
                />
            </Card>

            {filterData.map((item) => {
                return (
                    <div className="mt-5 flex gap-5" key={item.workOrderId}>
                        <Card className="w-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3>{item.workOrderId}</h3>
                                    <h4>{item.description}</h4>
                                </div>
                                <div
                                    className={cl("text-16-b  rounded-3xl px-5 py-2 text-neutron-4", {
                                        "bg-primary-2": item.isStarted && !item.isClosed,
                                        "bg-primary-1": item.isClosed,
                                        "bg-accent-1": !item.isStarted,
                                    })}
                                >
                                    {item.isClosed
                                        ? "Đã hoàn thành"
                                        : item.isStarted
                                        ? "Đang sản xuất"
                                        : "Chưa sản xuất"}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <div className="mb-1">
                                        <span className="text-16-b inline-block w-72">ID sản phẩm</span>
                                        <span>{item.materialDefinition}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span className="text-16-b inline-block w-72">Ngày bắt đầu theo kế hoạch</span>
                                        <span>{convertISOToLocaleDate(item.scheduledStartDate)}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span className="text-16-b inline-block w-72">
                                            Ngày hoàn thành theo kế hoạch
                                        </span>
                                        <span>{convertISOToLocaleDate(item.scheduledEndDate)}</span>
                                    </div>
                                    {item.actualStartDate && (
                                        <div className="mb-1">
                                            <span className="text-16-b inline-block w-72">Ngày bắt đầu thực tế</span>
                                            <span>{convertISOToLocaleDate(item.actualStartDate)}</span>
                                        </div>
                                    )}
                                    {item.actualEndDate && (
                                        <div className="mb-1">
                                            <span className="text-16-b inline-block w-72">Ngày hoàn thành thực tế</span>
                                            <span>{convertISOToLocaleDate(item.actualEndDate)}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="mb-1">
                                        <span className="text-16-b inline-block w-40">ID thiết bị</span>
                                        <span>{item.equipment}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span className="text-16-b inline-block w-40">Tổng số</span>
                                        <span>{item.quantity}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span className="text-16-b inline-block w-40">Đã hoàn thành</span>
                                        <span>{progressData[item.workOrderId].actualQuantity}</span>
                                    </div>
                                </div>
                                <Radialbar
                                    value={progressData[item.workOrderId].progressPercentage * 100}
                                    width={280}
                                    fontSize={24}
                                />
                            </div>

                            <div className="flex gap-5">
                                {!item.isStarted && (
                                    <Button onClick={() => handleStart(item.workOrderId)} small>
                                        Bắt đầu sản xuất
                                    </Button>
                                )}
                                {!item.isClosed && item.isStarted && (
                                    <Button onClick={() => handleClose(item.workOrderId)}>Hoàn thành đơn hàng</Button>
                                )}
                            </div>
                        </Card>
                    </div>
                )
            })}

            {filterData.length === 0 && <div className="mt-5">Không có kết quả nào, vui lòng thử lại</div>}

            {confirmData.actived && (
                <Confirm
                    title={confirmData.title}
                    content={confirmData.content}
                    onConfirm={confirmData.onConfirm}
                    onClose={() => setConfirmData({ actived: false })}
                />
            )}
        </div>
    )
}

export default ProductionProgress
