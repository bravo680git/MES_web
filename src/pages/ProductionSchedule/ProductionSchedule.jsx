import { useState, useEffect } from "react"
import ApexChart from "react-apexcharts"

import ToggleButtons from "@/components/ToggleButtons"
import { mutilSeriesRangeBarChartConfig } from "@/config"
import { useCallApi } from "@/hooks"
import { workOrderApi } from "@/services/api"
import { handleScheduleDataByMachine, handleScheduleDataByProduct, convertISOToLocaleDate } from "@/utils/functions"
import { PRODUCTION_SCHEDULE_TABLE_COLUMNS } from "@/utils/tableColumns"
import Table from "@/components/Table/Table"

function ProductionSchedule() {
    const callApi = useCallApi()
    const [productionSchedule, setProductionSchedule] = useState([])
    const [chartData, setChartData] = useState([])
    const [tableData, setTableData] = useState([])
    const [actived, setActived] = useState(0)

    const handleClick = (index) => {
        setActived(index)
    }

    useEffect(() => {
        switch (actived) {
            case 0:
                setChartData(handleScheduleDataByMachine(productionSchedule))
                return
            case 1:
                setChartData(handleScheduleDataByProduct(productionSchedule))
                return
            case 2:
                const data = productionSchedule.map((item) => ({
                    ...item,
                    scheduledStartDate: convertISOToLocaleDate(item.scheduledStartDate),
                    scheduledEndDate: convertISOToLocaleDate(item.scheduledEndDate),
                }))
                setTableData(data)
                return
            default:
        }
    }, [actived, productionSchedule])

    useEffect(() => {
        callApi(workOrderApi.getWorkOrders, (res) => {
            setProductionSchedule(res.items.filter((item) => item.isScheduled && !item.isClosed))
        })
    }, [callApi])

    return (
        <div data-component="ProductionSchedule" className="h-full w-full">
            <div>
                <ToggleButtons
                    titles={["Theo máy", "Theo sản phẩm", "Dạng bảng"]}
                    active={actived}
                    onClick={handleClick}
                />
            </div>
            <div className="h-[calc(100%-40px)] w-full">
                {actived === 2 ? (
                    <Table headers={PRODUCTION_SCHEDULE_TABLE_COLUMNS} body={tableData} />
                ) : (
                    <ApexChart
                        series={chartData}
                        options={mutilSeriesRangeBarChartConfig}
                        type="rangeBar"
                        height={chartData.length * 150}
                        width="100%"
                    />
                )}
            </div>
        </div>
    )
}

export default ProductionSchedule
