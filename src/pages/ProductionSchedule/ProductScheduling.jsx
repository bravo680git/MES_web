import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ApexChart from "react-apexcharts"
import { BsBarChartSteps } from "react-icons/bs"

import { schedulingActions } from "@/store"
import { paths, mutilSeriesRangeBarChartConfig } from "@/config"
import { resourceApi, workOrderApi } from "@/services/api"
import { useCallApi } from "@/hooks"
import {
    getWorkHoursPerDay,
    handleScheduledData,
    handleSchedulingDataByMachine,
    getEquipmentListOfMaterial,
} from "@/utils/functions"

import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Card from "@/components/Card"

function ProductSScheduling() {
    const callApi = useCallApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shifts } = useSelector((state) => state.setting)
    const shiftOptions = shifts.map((item, index) => ({ key: item.description, value: index }))
    const schedulingProducts = useSelector((state) => state.scheduling.schedulingProducts)
    const [equipments, setEquipments] = useState([])
    const [showChart, setShowChart] = useState(false)
    const [chartSeries, setChartSeries] = useState([])
    const [rowOutputs, setRowOutputs] = useState([])
    const outputs = useRef([])

    const handleSetValue = (value, index, key) => {
        const newValue = schedulingProducts.map((item, _index) => (index !== _index ? item : { ...item, [key]: value }))
        dispatch(schedulingActions.setSchedulingProducts(newValue))
    }

    const handleSubmit = () => {
        const { data, valid } = handleScheduledData(schedulingProducts, shifts, true)

        if (valid) {
            const apis = data.map((item) => workOrderApi.schedulingWorkOrder(item, item.workOrderId))
            callApi(
                apis,
                (res) => {
                    navigate(paths.schedule)
                    dispatch(schedulingActions.removeSchedulingProducts())
                },
                "Tạo kế hoạch sản xuất thành công",
            )
        }
    }

    useEffect(() => {
        const { data } = handleScheduledData(schedulingProducts, shifts, false)
        setChartSeries(handleSchedulingDataByMachine(data))
        const hoursPerDay = getWorkHoursPerDay(shifts)
        const _rowOutputs = []
        schedulingProducts.forEach((item, index) => {
            if (item.equipmentId?.length) {
                const itemOutput = outputs.current.find(
                    (o) => o.equipmentId === item.equipmentId[0] && o.materialDefinitionId === item.materialDefinition,
                )

                if (itemOutput) {
                    const quantity = item.quantity
                    _rowOutputs[index] = {
                        output: itemOutput.output,
                        duration: ((itemOutput.output * hoursPerDay) / quantity).toFixed(1),
                    }
                } else {
                    _rowOutputs[index] = {
                        output: "-",
                        duration: "-",
                    }
                }
            }
        })
        setRowOutputs(_rowOutputs)
    }, [schedulingProducts, shifts])

    useEffect(() => {
        callApi(resourceApi.equipment.getEquipments, (res) => setEquipments(res.items))
        callApi(resourceApi.equipment.getAllEquipmentOutputs, (res) => {
            outputs.current = res
        })
    }, [callApi])

    return (
        <div data-component="ProductSScheduling" className="container h-full">
            {showChart && (
                <div className="scroll-y max-h-[50%] w-full">
                    <ApexChart
                        series={chartSeries}
                        options={mutilSeriesRangeBarChartConfig}
                        type="rangeBar"
                        height={chartSeries.length * 100}
                        width="100%"
                    />
                </div>
            )}
            <div className="flex gap-8 pt-2">
                <div className="text-16-b w-32 pl-5">ID đơn hàng</div>
                <div className="text-16-b w-28">ID sản phẩm</div>
                <div className="text-16-b w-18">Số lượng</div>
                <div className="text-16-b grow">Chọn thiết bị</div>
                <div className="text-16-b w-[50px]">(sp/ngày)</div>
                <div className="text-16-b w-[50px]">(ngày)</div>
                <div className="text-16-b w-[280px]">Ca bắt đầu</div>
                <div className="text-16-b w-[280px]">Ca kết thúc</div>
                <div className="text-16-b w-[140px] pr-5">Ngày đến hạn</div>
            </div>

            <div>
                {schedulingProducts.map((item, index) => (
                    <Card className="my-4" key={index}>
                        <div className="flex items-end gap-8">
                            <h4 className="w-28">{item.workOrderId}</h4>
                            <h4 className="w-28">{item.materialDefinition}</h4>
                            <div className="w-18">{item.quantity}</div>
                            <div className="grow">
                                <SelectInput
                                    label=""
                                    list={getEquipmentListOfMaterial(
                                        equipments,
                                        outputs.current,
                                        item.materialDefinition,
                                    )}
                                    value={schedulingProducts[index]?.equipmentId}
                                    setValue={(value) => handleSetValue(value, index, "equipmentId")}
                                />
                            </div>
                            <div className="flex w-[50px] items-end">{rowOutputs[index]?.output}</div>
                            <div className="flex w-[50px] items-end">{rowOutputs[index]?.duration}</div>
                            <div className="flex w-[280px] items-end">
                                <SelectInput
                                    className="grow"
                                    label=""
                                    list={shiftOptions}
                                    canSearch={false}
                                    value={schedulingProducts[index].startShift}
                                    setValue={(value) => handleSetValue(value, index, "startShift")}
                                />
                                <input
                                    type="date"
                                    className="text-16-m w-32"
                                    value={schedulingProducts[index].startDate ?? ""}
                                    onChange={(e) => handleSetValue(e.target.value, index, "startDate")}
                                />
                            </div>
                            <div className="flex w-[280px] items-end">
                                <SelectInput
                                    className="grow"
                                    label=""
                                    list={shiftOptions}
                                    canSearch={false}
                                    value={schedulingProducts[index].endShift}
                                    setValue={(value) => handleSetValue(value, index, "endShift")}
                                />
                                <input
                                    type="date"
                                    className="text-16-m w-32"
                                    value={schedulingProducts[index].endDate ?? ""}
                                    onChange={(e) => handleSetValue(e.target.value, index, "endDate")}
                                />
                            </div>
                            <div className="w-[120px]">{item.dueDate}</div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-5 flex items-center gap-5 pb-5">
                <Button onClick={handleSubmit}>Xác nhận</Button>
                <Button onClick={() => setShowChart(!showChart)} transparent={!showChart}>
                    <BsBarChartSteps />
                </Button>
            </div>
        </div>
    )
}

export default ProductSScheduling
