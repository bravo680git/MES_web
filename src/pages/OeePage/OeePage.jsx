import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import DateInput from "@/components/DateInput"
import Button from "@/components/Button"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import Chart from "react-apexcharts"

import { useEffect, useState } from "react"
import { oeeMockData } from "@/utils/mockData"
import { useNavigate } from "react-router-dom"
import OeeApi from "@/services/api/oee/oee"

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
// viết lại dùng object
const modeToText = (mode) => {
    switch (mode) {
        case 0:
            return "ALL"
        case 1:
            return "OEE"
        case 2:
            return "A"
        case 3:
            return "P"
        case 4:
            return "Q"
        case 5:
            return "L"
    }
}
const machineList = [
    { value: "P001-left-U", key: "Máy ép P001-left-U" },
    { value: "P001-left-D", key: "Máy ép P001-left-D" },
    { value: "P001-right-U", key: "Máy ép P001-right-U" },
    { value: "P001-right-D", key: "Máy ép P001-right-D" },
    { value: "P002-left-U", key: "Máy ép P002-left-U" },
    { value: "P002-left-D", key: "Máy ép P002-left-D" },
    { value: "P002-right-U", key: "Máy ép P002-right-U" },
    { value: "P002-right-D", key: "Máy ép P002-right-D" },
    { value: "P003-left-U", key: "Máy ép P003-left-U" },
    { value: "P003-left-D", key: "Máy ép P003-left-D" },
    { value: "P003-right-U", key: "Máy ép P003-right-U" },
    { value: "P003-right-D", key: "Máy ép P003-right-D" },
    { value: "P004-left-U", key: "Máy ép P004-left-U" },
    { value: "P004-left-D", key: "Máy ép P004-left-D" },
    { value: "P004-right-U", key: "Máy ép P004-right-U" },
    { value: "P004-right-D", key: "Máy ép P004-right-D" },
    { value: "P005-left-U", key: "Máy ép P005-left-U" },
    { value: "P005-left-D", key: "Máy ép P005-left-D" },
    { value: "P005-right-U", key: "Máy ép P005-right-U" },
    { value: "P005-right-D", key: "Máy ép P005-right-D" },
    { value: "P007-left-U", key: "Máy ép P007-left-U" },
    { value: "P007-left-D", key: "Máy ép P007-left-D" },
    { value: "P007-right-U", key: "Máy ép P007-right-U" },
    { value: "P007-right-D", key: "Máy ép P007-right-D" },
    { value: "P009-left-U", key: "Máy ép P009-left-U" },
    { value: "P009-left-D", key: "Máy ép P009-left-D" },
    { value: "P009-right-U", key: "Máy ép P009-right-U" },
    { value: "P009-right-D", key: "Máy ép P009-right-D" },
    { value: "P010-left-U", key: "Máy ép P010-left-U" },
    { value: "P010-left-D", key: "Máy ép P010-left-D" },
    { value: "P010-right-U", key: "Máy ép P010-right-U" },
    { value: "P010-right-D", key: "Máy ép P010-right-D" },
    { value: "P011-left-U", key: "Máy ép P011-left-U" },
    { value: "P011-left-D", key: "Máy ép P011-left-D" },
    { value: "P011-right-U", key: "Máy ép P011-right-U" },
    { value: "P011-right-D", key: "Máy ép P011-right-D" },
    { value: "P101-left-U", key: "Máy ép P101-left-U" },
    { value: "P101-left-D", key: "Máy ép P101-left-D" },
    { value: "P101-right-U", key: "Máy ép P101-right-U" },
    { value: "P101-right-D", key: "Máy ép P101-right-D" },
    { value: "P102-left-U", key: "Máy ép P102-left-U" },
    { value: "P102-left-D", key: "Máy ép P102-left-D" },
    { value: "P102-right-U", key: "Máy ép P102-right-U" },
    { value: "P102-right-D", key: "Máy ép P102-right-D" },
    { value: "P103-left-U", key: "Máy ép P103-left-U" },
    { value: "P103-left-D", key: "Máy ép P103-left-D" },
    { value: "P103-right-U", key: "Máy ép P103-right-U" },
    { value: "P103-right-D", key: "Máy ép P103-right-D" },
    { value: "I1-1", key: "Máy ép nhựa I101" },
    { value: "I2-1", key: "Máy ép nhựa I102" },
    { value: "L1-1", key: "Máy ép lagging L1-1" },
    { value: "L1-2", key: "Máy ép lagging L1-2" },
    { value: "L1-3", key: "Máy ép lagging L1-3" },
    { value: "L1-4", key: "Máy ép lagging L1-4" },
]

const returnHeader = (mode) => {
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
    switch (mode) {
        case 0:
            return header
        case 1:
            return header.filter((item) => item.accessor === "date" || item.accessor === "oee")
        case 2:
            return header.filter((item) => item.accessor === "date" || item.accessor === "a")
        case 3:
            return header.filter((item) => item.accessor === "date" || item.accessor === "p")
        case 4:
            return header.filter((item) => item.accessor === "date" || item.accessor === "q")
        case 5:
            return header.filter((item) => item.accessor === "date" || item.accessor === "l")
        default:
            return []
    }
}
function fetchDataSuccess(data) {
    //xử lý data trước khi hiển thị
    const roundedData = data.map((item) => {
        return {
            ...item,
            date: item.date.slice(0, 10),
            a: Number(item.a.toFixed(3)),
            p: Number(item.p.toFixed(3)),
            q: Number(item.q.toFixed(3)),
            l: Number(item.l.toFixed(3)),
            oee: Number(item.oee.toFixed(3)),
        }
    })
    return roundedData
}
function OeePage() {
    const navigate = useNavigate()

    const [oeeModeIndex, setOeeModeIndex] = useState(0) // oee search bar states
    const [dayStart, setDayStart] = useState(calDayStartEnd().dayStart)
    const [dayEnd, setDayEnd] = useState(calDayStartEnd().dayEnd)
    const [selectedMachine, setSelectedMachine] = useState(["P001-left-U"])

    const [oeeData, setOeeData] = useState([])
    console.log(oeeData)
    const getOeeData = () => {
        OeeApi.getOee(selectedMachine[0], dayStart, dayEnd).then((data) => setOeeData(fetchDataSuccess(data)))
    }
    useEffect(() => {
        getOeeData()
    }, [])
    const handleSubmitForm = () => {
        getOeeData()
    }
    const handleClickRow = (row) => {
        navigate(`/oee-detail/${row.id}`)
    }
    const xaxis = oeeData.map((e) => e.date)
    const yaxis = oeeData.map((e) => e[modeToText(oeeModeIndex).toLowerCase()])
    const state = {
        options: {
            xaxis: {
                categories: xaxis,
            },
            yaxis:
                oeeModeIndex !== 5
                    ? {
                          min: 0,
                          max: 1,
                          tickAmount: 5,
                          decimalsInFloat: 1,
                      }
                    : { decimalsInFloat: 1 },
            noData: {
                text: "Loading...",
            },
        },
        series: [
            {
                name: `${modeToText(oeeModeIndex)}`,
                data: yaxis,
            },
        ],
    }
    return (
        <>
            <div className="flex h-screen flex-col">
                <Card className="container mb-5 ">
                    <div className=" mb-3 flex w-full justify-between">
                        <div className="  p-1">
                            <DateInput
                                className=""
                                key="Chọn ngày bắt đầu:"
                                value={dayStart}
                                setValue={setDayStart}
                                type="dayStart"
                                dayCompare={dayEnd}
                            />
                        </div>
                        <div className="  p-1 ">
                            <DateInput
                                className=""
                                key="Chọn ngày kết thúc:"
                                value={dayEnd}
                                setValue={setDayEnd}
                                type="dayEnd"
                                dayCompare={dayStart}
                            />
                        </div>
                        <div className="  p-1">
                            <SelectInput
                                value={selectedMachine}
                                setValue={setSelectedMachine}
                                list={machineList}
                                key="Chọn máy:"
                            />
                        </div>
                        <Button large onClick={() => handleSubmitForm()}>
                            Submit
                        </Button>
                    </div>
                    <ToggleButtons active={oeeModeIndex} onClick={setOeeModeIndex} titles={oeeModeList} />
                </Card>
                <Card className="flex-1">
                    {oeeModeIndex != 0 && <h2>Giá trị {modeToText(oeeModeIndex)}</h2>}

                    {oeeModeIndex !== 0 && (
                        <Chart options={state.options} series={state.series} type="line" width="100%" height={440} />
                    )}
                    <Table headers={returnHeader(oeeModeIndex)} body={oeeData} onRowClick={handleClickRow} />
                </Card>
            </div>
        </>
    )
}

export default OeePage
