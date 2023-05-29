import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { RiDeleteBin4Line } from "react-icons/ri"
import cl from "classnames"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Radialbar from "@/components/Radialbar"
import TextInput from "@/components/TextInput"
import Confirm from "@/components/Confirm"

import { useCallApi } from "@/hooks"
import { workOrderApi } from "@/services/api"
import { handleGetWorkOrderProgress, handleWorkOrderCompleted } from "@/services/signalr"
import { paths } from "@/config"
import { PRODUCT_SCHEDULE_STATUS_LIST } from "@/utils/constants"
import { commonStoreActions } from "@/store"
import { convertISOToLocaleDate } from "@/utils/functions"

function ProductionProgress() {
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const notifications = useSelector((state) => state.common.notifications)
    const [status, setStatus] = useState([2])
    const [searchInput, setSearchInput] = useState("")
    const [resData, setResData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [progressData, setProgressData] = useState({})
    const [confirmData, setConfirmData] = useState({})

    const fetchData = useCallback(() => {
        return callApi(workOrderApi.getWorkOrders, (res) => {
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
        const workOrder = filterData.find((item) => item.workOrderId === id)
        const toDay = new Date()
        const startDate = new Date(workOrder.scheduledStartDate)
        const duration = Math.round((startDate - toDay) / (24 * 3600 * 1000))
        setConfirmData({
            title: "Xác nhận bắt đầu lệnh sản xuất",
            content:
                duration > 0
                    ? `Lệnh sản xuất được bắt đầu sớm hơn kế hoạch ${duration} ngày`
                    : "Bắt đầu lệnh sản xuất theo kế hoạch",
            actived: true,
            onConfirm() {
                callApi(
                    () => workOrderApi.startWorkOrder(id),
                    () => {
                        fetchData()
                        dispatch(
                            commonStoreActions.pushNotification({
                                content: `Lệnh sản xuất ${id} bắt đầu sản xuất`,
                                to: paths.progress,
                            }),
                        )
                    },
                    "Bắt đầu lệnh sản xuất thành công",
                )
            },
        })
    }

    const handleClose = (id) => {
        const workOrder = filterData.find((item) => item.workOrderId === id)
        setConfirmData({
            title: "Xác nhận hoàn thành lệnh sản xuất",
            content:
                workOrder.quantity > progressData[id].actualQuantity
                    ? "Lệnh sản xuất chưa hoàn thành sản lượng theo kế hoạch, xác nhận muốn hoàn thành lệnh sản xuất"
                    : "Hoàn thành lệnh sản xuất",
            actived: true,
            onConfirm() {
                callApi(
                    () => workOrderApi.closeWorkOrder(id),
                    () => {
                        fetchData()
                        dispatch(
                            commonStoreActions.pushNotification({
                                content: `Lệnh sản xuất ${id} đã hoàn thành`,
                                to: paths.progress,
                            }),
                        )
                    },
                    "Hoàn thành lệnh sản xuất",
                )
            },
        })
    }

    const handleDeleteWorkOrder = (id) => {
        setConfirmData({
            title: "Xác nhận xóa lệnh sản xuất " + id,
            content: "Lệnh sản xuất sẽ bị xóa vĩnh viễn và không được hiển thị trên trang này nữa",
            actived: true,
            onConfirm() {
                callApi(
                    () => workOrderApi.deleteWorkOrder(id),
                    () => {
                        fetchData()
                        dispatch(
                            commonStoreActions.pushNotification({
                                content: `Lệnh sản xuất ${id} đã bị xóa`,
                                to: paths.progress,
                            }),
                        )
                    },
                    "Xóa lệnh sản xuất thành công",
                )
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
                result.sort((a, b) => (a.scheduledStartDate > b.scheduledStartDate ? 1 : -1))
                break
            case 2:
                result = resData.filter((item) => item.isStarted && !item.isClosed)
                result.sort((a, b) => b.progressPercentage - a.progressPercentage)
                break
            case 3:
                result = resData.filter((item) => item.isClosed)
                result.sort((a, b) => (a.actualEndDate > b.actualEndDate ? -1 : 1))
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
        fetchData().then(({ items }) => {
            const notOnTimeWorkOrders = []
            const today = new Date()
            items.forEach((item) => {
                const startDate = new Date(item.scheduledStartDate)
                if (item.isScheduled && !item.isStarted && startDate < today) {
                    notOnTimeWorkOrders.push(item.workOrderId)
                }
            })
            notOnTimeWorkOrders.length &&
                toast.warning(`Lệnh sản xuất ${notOnTimeWorkOrders.join(", ")} trễ kế hoạch sản xuất`)

            notOnTimeWorkOrders.forEach((woId) => {
                const pushedNoti = [...notifications].reverse().find((noti) => noti.dataId === woId)
                if (
                    !pushedNoti ||
                    today.toLocaleDateString("vi") !== new Date(pushedNoti.dateTime).toLocaleDateString("vi")
                ) {
                    dispatch(
                        commonStoreActions.pushNotification({
                            content: `Lệnh sản xuất ${woId} trễ kế hoạch sản xuất`,
                            dataId: woId,
                            to: paths.progress,
                        }),
                    )
                }
            })
        })
        handleGetWorkOrderProgress(
            (workOrderId, actualQuantity, progressPercentage) => {
                setProgressData((prevData) => ({
                    ...prevData,
                    [workOrderId]: { actualQuantity, progressPercentage },
                }))
            },
            (err) => console.log(err),
        )

        handleWorkOrderCompleted(
            (workOrderId) => {
                fetchData()
                const content = `Lệnh sản xuất ${workOrderId} đã được hoàn thành`
                toast.info(content)
                dispatch(commonStoreActions.pushNotification({ content, to: paths.progress }))
            },
            (err) => console.log(err),
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, dispatch])

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
                        <Card className="group/container relative w-full">
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
                                        <span>{progressData[item.workOrderId]?.actualQuantity}</span>
                                    </div>
                                </div>
                                <Radialbar
                                    value={(progressData[item.workOrderId]?.progressPercentage ?? 0) * 100}
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
                                    <Button onClick={() => handleClose(item.workOrderId)}>
                                        Hoàn thành lệnh sản xuất
                                    </Button>
                                )}
                            </div>
                            {!item.isStarted ||
                                (item.isClosed && (
                                    <RiDeleteBin4Line
                                        className={cl(
                                            "absolute bottom-5 right-5 h-10 w-10 rounded-full bg-warning-2",
                                            "invisible cursor-pointer p-2 text-xl text-warning-1 transition-all",
                                            "group-hover/container:visible",
                                        )}
                                        onClick={() => handleDeleteWorkOrder(item.workOrderId)}
                                    />
                                ))}
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
