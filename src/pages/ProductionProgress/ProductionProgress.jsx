import { useState, useEffect, useCallback } from "react"
import cl from "classnames"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Radialbar from "@/components/Radialbar"
import TextInput from "@/components/TextInput"

import { useCallApi } from "@/hooks"
import { workOrderApi } from "@/services/api"
import { PRODUCT_SCHEDULE_STATUS_LIST } from "@/utils/constants"
import { convertISOToLocaleDate } from "@/utils/functions"

function ProductionProgress() {
    const callApi = useCallApi()
    const [status, setStatus] = useState([2])
    const [searchInput, setSearchInput] = useState("")
    const [resData, setResData] = useState([])
    const [filterData, setFilterData] = useState([])

    const fetchData = useCallback(() => {
        callApi(workOrderApi.getWorkOrders, (res) => {
            setResData(res.items.filter((item) => item.isScheduled).reverse())
        })
    }, [callApi])

    const handleStart = (id) => {
        const cf = window.confirm("Xác nhận bắt đầu lệnh sản xuất")
        if (cf) {
            callApi(() => workOrderApi.startWorkOrder(id), fetchData, "Bắt đầu lệnh sản xuất thành công")
        }
    }

    const handleClose = (id) => {
        const cf = window.confirm("Xác nhận hoàn thành lệnh sản xuất")
        if (cf) {
            callApi(() => workOrderApi.closeWorkOrder(id), fetchData, "Hoàn thành lệnh sản xuất")
        }
    }

    useEffect(() => {
        let result
        switch (status[0]) {
            case 0:
                result = resData
                break
            case 1:
                result = resData.filter((item) => !item.actualStartDate)
                break
            case 2:
                result = resData.filter((item) => item.actualStartDate && !item.isClosed)
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
    }, [fetchData])

    return (
        <div data-component="ProductionProgress" className="container h-full">
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

            {filterData.map((item) => (
                <div className="mt-5 flex gap-5" key={item.workOrderId}>
                    <Card className="w-full">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3>{item.workOrderId}</h3>
                                <h4>{item.description}</h4>
                            </div>
                            <div
                                className={cl("text-16-b  rounded-3xl px-5 py-2 text-neutron-4", {
                                    "bg-primary-2": item.actualStartDate && !item.isClosed,
                                    "bg-primary-1": item.isClosed,
                                    "bg-accent-1": !item.actualStartDate,
                                })}
                            >
                                {item.isClosed
                                    ? "Đã hoàn thành"
                                    : item.actualStartDate
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
                                    <span className="text-16-b inline-block w-72">Ngày hoàn thành theo kế hoạch</span>
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
                                    <span>100</span>
                                </div>
                                <div className="mb-1">
                                    <span className="text-16-b inline-block w-40">Đã hoàn thành</span>
                                    <span>20</span>
                                </div>
                            </div>
                            <Radialbar value={20} width={280} fontSize={24} />
                        </div>

                        <div className="flex gap-5">
                            {!item.actualStartDate && (
                                <Button onClick={() => handleStart(item.workOrderId)} small>
                                    Bắt đầu sản xuất
                                </Button>
                            )}
                            {!item.isClosed && (
                                <Button onClick={() => handleClose(item.workOrderId)} small>
                                    Hoàn thành đơn hàng
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            ))}

            {filterData.length === 0 && <div className="mt-5">Không có kết quả nào, vui lòng thử lại</div>}
        </div>
    )
}

export default ProductionProgress
