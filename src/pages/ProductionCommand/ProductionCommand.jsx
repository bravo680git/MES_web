import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import cl from "classnames"
import { useNavigate } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu, useCallApi } from "@/hooks"
import { schedulingActions } from "@/store"
import { workOrderApi, resourceApi } from "@/services/api"
import { PRODUCTION_COMMAND_TABLE_COLUMNS } from "@/utils/tableColumns"
import { getProductionCommandMenuNav } from "@/utils/menuNavigation"
import { paths } from "@/config"

function ProductionCommand() {
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const callApi = useCallApi()

    const [workOrders, setWorkOrders] = useState([])
    const [materialList, setMaterialList] = useState([])
    const [schedulingOrders, setSchedulingOrders] = useState([])

    const fetchWorkOrders = useCallback(() => {
        callApi([workOrderApi.getWorkOrders(), resourceApi.material.getMaterials()], ([workOrders, materials]) => {
            setWorkOrders(
                workOrders.items.filter((item) => {
                    item.dueDate = new Date(item.dueDate + ".00z").toLocaleDateString("vi")
                    return !item.isScheduled
                }),
            )
            setMaterialList(
                materials.items.map((item) => ({
                    value: item.materialDefinitionId,
                    key: item.description,
                })),
            )
        })
    }, [callApi])

    const handleSubmit = (value) => {
        const date = value.info.dueDate.split("/")
        const postData = {
            ...value.info,
            materialDefinition: value.info.materialDefinition[0],
            dueDate: new Date(date[2], date[1] - 1, date[0]).toISOString(),
        }
        callApi(() => workOrderApi.createWorkOrder(postData), fetchWorkOrders, "Tạo lệnh sản xuất thành công")
    }

    const handleSelectOrder = (row, index) => {
        setSchedulingOrders([...schedulingOrders, row])
        setWorkOrders((prevData) => prevData.filter((item, _index) => item.workOrderId !== row.workOrderId))
    }

    const handleRemoveItem = (id) => {
        const newValue = schedulingOrders.filter((item) => {
            if (item.workOrderId !== id) {
                return true
            } else {
                setWorkOrders([...workOrders, item])
                return false
            }
        })
        setSchedulingOrders(newValue)
    }

    const handleScheduling = () => {
        dispatch(schedulingActions.setSchedulingProducts(schedulingOrders))
        navigate(paths.scheduling)
    }

    useEffect(() => {
        fetchWorkOrders()
    }, [fetchWorkOrders])

    return (
        <div data-component="ProductionCommand" className="container flex h-full">
            <div className="mr-5 flex h-full grow flex-col gap-5">
                <Card className="h-3/4">
                    <div className="mb-5 flex items-center justify-between">
                        <h3>Danh sách lệnh sản xuất</h3>
                        <Button large className="mt-2" onClick={handleOpen}>
                            Lệnh sản xuất mới
                        </Button>
                    </div>
                    <div className="scroll-y h-[calc(100%-70px)]">
                        {workOrders.length > 0 ? (
                            <Table
                                headers={PRODUCTION_COMMAND_TABLE_COLUMNS}
                                body={workOrders}
                                sticky
                                onRowClick={handleSelectOrder}
                            />
                        ) : (
                            <div className="text-16-m">
                                Hiện tại không có lệnh sản xuất nào, vui lòng tạo mới hoặc xem các lệnh sản xuất đã được
                                điều độ tại trang kế hoạch sản xuất.
                            </div>
                        )}
                    </div>
                </Card>
                {schedulingOrders.length > 0 && (
                    <Card className="scroll-y grow">
                        <h3>Danh sách lệnh sản xuất được điều độ</h3>
                        <div className="mb-4 flex flex-wrap">
                            {schedulingOrders.map((item, index) => (
                                <div
                                    key={item.workOrderId}
                                    className={cl(
                                        "text-16-m group relative mr-3 mt-1 flex",
                                        "cursor-pointer whitespace-nowrap rounded-lg shadow-sub transition-all hover:bg-accent-2",
                                    )}
                                    onClick={() => handleRemoveItem(item.workOrderId)}
                                >
                                    <span className="px-3 py-1">{item.workOrderId}</span>
                                    <span
                                        className={cl(
                                            "absolute hidden bg-accent-1 text-neutron-4",
                                            "top-[50%] right-[-10px] h-8 w-8 translate-y-[-50%] ",
                                            "items-center justify-center rounded-full group-hover:flex",
                                        )}
                                    >
                                        <MdOutlineClose className="text-2xl" />
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button large onClick={handleScheduling}>
                            Lên kế hoạch sx
                        </Button>
                    </Card>
                )}
            </div>

            {active && (
                <PoperMenu
                    menuNavigaton={getProductionCommandMenuNav(materialList)}
                    position={position}
                    onClose={handleClose}
                    onClick={handleSubmit}
                />
            )}
        </div>
    )
}

export default ProductionCommand
