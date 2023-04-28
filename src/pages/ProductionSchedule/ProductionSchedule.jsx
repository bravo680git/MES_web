import { useState } from "react"
import ApexChart from "react-apexcharts"
import { mutilSeriesRangeBarChartConfig } from "@/config"
import { handleScheduleDataByMachine, handleScheduleDataByProduct } from "@/utils/functions"
import { PRODUCTION_SCHEDULE_MOCK_DATA } from "@/utils/mockData"

function ProductionSchedule() {
    const [heightZoom, setHeightZoom] = useState(100)

    return (
        <div data-component="ProductionSchedule" className="" style={{ height: heightZoom + "%" }}>
            <div className="fixed right-36 top-12 z-[9999999]">
                <button
                    className="rounded-full p-5 text-6xl hover:cursor-pointer"
                    onClick={() => setHeightZoom(heightZoom + 50)}
                >
                    +
                </button>
                <button
                    className="rounded-full p-5 text-6xl hover:cursor-pointer"
                    onClick={() => setHeightZoom(heightZoom - 50)}
                >
                    -
                </button>
            </div>
            {true && (
                <ApexChart
                    series={handleScheduleDataByMachine(PRODUCTION_SCHEDULE_MOCK_DATA)}
                    options={mutilSeriesRangeBarChartConfig}
                    type="rangeBar"
                    height="100%"
                />
            )}
        </div>
    )
}

export default ProductionSchedule
