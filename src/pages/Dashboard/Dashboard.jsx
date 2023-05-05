import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useCallApi } from "@/hooks"
import Card from "@/components/Card"
import Radialbar from "@/components/Radialbar"
import Progressbar from "@/components/Progressbar"
import ValueItem from "@/components/ValueItem"
import { paths } from "@/config"
import { workOrderApi, resourceApi } from "@/services/api"

function Dashboard() {
    const navigate = useNavigate()
    const callApi = useCallApi()
    const [data, setData] = useState({})

    useEffect(() => {
        callApi(
            [
                workOrderApi.getWorkOrders(),
                resourceApi.equipment.getEquipments(),
                resourceApi.material.getMaterials(),
                resourceApi.equipment.getEquipmentClasses(),
                resourceApi.material.getMaterialClasses(),
            ],
            (res) => {
                const workOrders = res[0].items
                const quantity = {
                    isScheduled: 0,
                    notScheduled: 0,
                    notProduced: 0,
                    isProducing: 0,
                    isClosed: 0,
                }
                const isProducingWorkOrders = []

                const equipment = {}
                const material = {}

                workOrders.forEach((item) => {
                    if (item.isClosed) {
                        quantity.isClosed++
                    } else {
                        if (item.actualStartDate) {
                            quantity.isProducing++
                            isProducingWorkOrders.push(item)
                        } else {
                            quantity.notProduced++
                        }
                    }
                    if (item.isScheduled) {
                        quantity.isScheduled++
                        equipment[item.equipment] = true
                        material[item.materialDefinition] = true
                    } else {
                        quantity.notScheduled++
                    }
                })

                setData({
                    ...quantity,
                    isProducingWorkOrders,
                    equipmentCount: res[1].totalItems,
                    materialCount: res[2].totalItems,
                    equipmentClassesCount: res[3].totalItems,
                    materialClassesCount: res[4].totalItems,
                    usedEquipment: Object.keys(equipment).length,
                    usedMaterial: Object.keys(material).length,
                })
            },
        )
    }, [callApi])

    return (
        <div data-component="Dashboard" className="container h-full">
            <div className="flex h-1/2 w-full gap-5">
                <Card className="grow cursor-pointer hover:bg-hoverBg" onCLick={() => navigate(paths.oee)}>
                    <h3>Chỉ số OEE trung bình 7 ngày qua</h3>
                    <div className="mt-5 flex w-full items-center">
                        <div className="flex flex-col items-center">
                            <Radialbar value={60.02} width={360} color="#00cc00" />
                            <span className="text-16-b">OEE</span>
                        </div>
                        <div className="flex grow flex-col gap-5">
                            <div className="flex w-full items-center gap-5">
                                <span className="text-16-b">A</span>
                                <Progressbar
                                    height={36}
                                    textLimit={20}
                                    value={30}
                                    className="grow"
                                    unit="%"
                                    color="#3366ff"
                                />
                            </div>
                            <div className="flex w-full items-center gap-5">
                                <span className="text-16-b">P</span>
                                <Progressbar
                                    height={36}
                                    textLimit={20}
                                    value={26}
                                    className="grow"
                                    unit="%"
                                    color="#3333cc"
                                />
                            </div>
                            <div className="flex w-full items-center gap-5">
                                <span className="text-16-b">Q</span>
                                <Progressbar
                                    height={36}
                                    textLimit={20}
                                    value={68}
                                    className="grow"
                                    unit="%"
                                    color="#8600b3"
                                />
                            </div>
                            <div className="flex w-full items-center gap-5">
                                <span className="text-16-b">L</span>
                                <Progressbar
                                    height={36}
                                    textLimit={20}
                                    min={0}
                                    max={1200}
                                    value={245}
                                    className="grow"
                                    unit="s"
                                    color="#ff884d"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="w-[540px] cursor-pointer hover:bg-hoverBg" onCLick={() => navigate(paths.schedule)}>
                    <h3>Đơn hàng</h3>
                    <div className="mt-5 flex flex-wrap gap-5">
                        <ValueItem value={data.isScheduled} label="Đã lên lịch" />
                        <ValueItem className="mr-16" value={data.notScheduled} label="Chưa lên lịch" />
                        <ValueItem value={data.notProduced} label="Chưa sản xuất" />
                        <ValueItem value={data.isProducing} label="Đang sản xuất" />
                        <ValueItem value={data.isClosed} label="Đã hoàn thành" />
                    </div>
                </Card>
            </div>

            <div className="flex h-1/2 w-full gap-5 pt-5">
                <Card className="w-1/2 cursor-pointer hover:bg-hoverBg" onCLick={() => navigate(paths.resource)}>
                    <h3>Nguồn lực</h3>
                    <div className="flex h-[calc(100%-30px)]">
                        <div className="w-1/2">
                            <h4 className="mb-3 text-center">Thiết bị</h4>
                            <div className="mb-2">
                                <span className="text-16-b mr-5">Số loại thiết bị</span>
                                <span>{data.equipmentClassesCount}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-16-b mr-5">Số thiết bị</span>
                                <span>{data.equipmentCount}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-16-b mr-5">Số thiết bị đang được sử dụng</span>
                                <span>{data.usedEquipment}</span>
                            </div>
                        </div>
                        <div className="w-1/2 border-l-2 border-neutron-2 pl-5">
                            <h4 className="mb-3 text-center">Vật tư</h4>
                            <div className="mb-2">
                                <span className="text-16-b mr-5">Số loại vật tư</span>
                                <span>{data.materialClassesCount}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-16-b mr-5">Số vật tư</span>
                                <span>{data.materialCount}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-16-b mr-5">Số vật tư đang được sản xuất</span>
                                <span>{data.usedMaterial}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card
                    className="scroll-y h-full w-1/2 cursor-pointer hover:bg-hoverBg"
                    onCLick={() => navigate(paths.progress)}
                >
                    <h3>Tiến độ sản xuất</h3>
                    <div className="mt-5">
                        {data.isProducingWorkOrders?.map((item) => (
                            <div className="mb-3 flex items-center" key={item.workOrderId}>
                                <span className="text-16-b w-20">{item.workOrderId}</span>
                                <Progressbar value={30} textLimit={20} unit="%" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
