import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import DateInput from "@/components/DateInput"
import Button from "@/components/Button"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import Chart from "react-apexcharts"

import { useState } from "react"
import { oeeMockData } from "@/utils/mockData"
const oeeModeList = ["All", "OEE", "A", "P", "Q", "L"]
const calDayStartEnd = () => {
    const currentDate = new Date()
    const dayEnd = currentDate.toISOString().substr(0, 10)
    const tenDaysAgo = new Date(currentDate)
    tenDaysAgo.setDate(currentDate.getDate() - 10)
    const dayStart = tenDaysAgo.toISOString().substr(0, 10)
    // mặc định hiển thị từ 10 ngày trước đến hôm nay
    return { dayStart, dayEnd }
}
const machineList = [
    {
        key: "Máy P001",
        value: "P001",
    },
    {
        key: "Máy P002",
        value: "P002",
    },
]
const header = [
    {
        Header: "Ngày",
        accessor: "date",
        disableSortBy: false,
    },
    {
        Header: "OEE",
        accessor: "oee",
        disableSortBy: false,
    },
    {
        Header: "A",
        accessor: "a",
        disableSortBy: false,
    },
    {
        Header: "P",
        accessor: "p",
        disableSortBy: false,
    },
    {
        Header: "Q",
        accessor: "q",
        disableSortBy: false,
    },
    {
        Header: "L",
        accessor: "l",
        disableSortBy: false,
    },
]
function OeePage() {
    const [oeeModeIndex, setOeeModeIndex] = useState(0) // oee search bar states
    const [dayStart, setDayStart] = useState(calDayStartEnd().dayStart)
    const [dayEnd, setDayEnd] = useState(calDayStartEnd().dayEnd)
    const [selectedMachine, setSelectedMachine] = useState("P001")

    const handleSubmitForm = () => {
        const data = {
            dayStart: dayStart,
            dayEnd: dayEnd,
            selectedMachine: selectedMachine[0],
        }
        console.log(data)
        console.log("Calling the API...")
    }
    const xaxis = oeeMockData.map((e) => e.date)
    const yaxis = oeeMockData.map((e) => e.a)
    const state = {
        options: {
            xaxis: {
                categories: xaxis,
            },
            yaxis: { decimalsInFloat: 1 },
            // yaxis:
            //     mode !== 5
            //         ? {
            //               min: 0,
            //               max: 1,
            //               tickAmount: 5,
            //               decimalsInFloat: 1,
            //           }
            //         : { decimalsInFloat: 1 },
            noData: {
                text: "Loading...",
            },
        },
        series: [
            {
                name: `a`,
                data: yaxis,
            },
        ],
    }
    return (
        <>
            <div className="container mb-5 ">
                <Card>
                    <div className=" mb-3 flex w-full justify-between">
                        <div className="height:  1rem p-1 p-1 ">
                            <DateInput
                                className=""
                                label="Chọn ngày bắt đầu:"
                                value={dayStart}
                                setValue={setDayStart}
                            />
                        </div>
                        <div className="height:  1rem p-1 p-1 ">
                            <DateInput className="" label="Chọn ngày kết thúc:" value={dayEnd} setValue={setDayEnd} />
                        </div>
                        <div className="height:  1rem p-1 p-1">
                            <SelectInput
                                value={selectedMachine}
                                setValue={setSelectedMachine}
                                list={machineList}
                                label="Chọn máy:"
                            />
                        </div>
                        <Button large onClick={() => handleSubmitForm()}>
                            Submit
                        </Button>
                    </div>
                    <ToggleButtons active={oeeModeIndex} onClick={setOeeModeIndex} titles={oeeModeList} />
                </Card>
            </div>
            <Card>
                <h1>Giá trị OEE</h1>
                {oeeModeIndex !== 0 && (
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="line"
                        width={(window.innerWidth / 1920) * 1450}
                        height={(window.innerWidth / 1920) * 500}
                    />
                )}
                <Table headers={header} body={oeeMockData} sticky />
            </Card>
        </>
    )
}

export default OeePage
