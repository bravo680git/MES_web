import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import DateInput from "@/components/DateInput"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import Chart from "react-apexcharts"

import { useCallApi } from "@/hooks"
import { paths } from "@/config"
import { MACHINE_LIST, OEE_MODE_LIST } from "@/utils/constants"
import { handleOeeData, handleOeeMode, handleOeePageHeader } from "@/utils/functions"
import OeeApi from "@/services/api/oee/oee"

function OeePage() {
    const navigate = useNavigate()
    const callApi = useCallApi()

    const { oeeDuration } = useSelector((state) => state.setting)
    const [oeeModeIndex, setOeeModeIndex] = useState(0)
    const [dayStart, setDayStart] = useState(() => {
        const prevDate = new Date()
        prevDate.setDate(new Date().getDate() - oeeDuration)
        return prevDate.toISOString().slice(0, 10)
    })
    const [dayEnd, setDayEnd] = useState(() => {
        const today = new Date()
        return today.toISOString().slice(0, 10)
    })

    const [selectedMachine, setSelectedMachine] = useState(["P001-left-U"])

    const [oeeData, setOeeData] = useState([])

    const getOeeData = useCallback(() => {
        callApi(
            () => OeeApi.getOee(selectedMachine[0], dayStart, dayEnd),
            (data) => setOeeData(handleOeeData(data.reverse())),
        )
    }, [callApi, dayEnd, dayStart, selectedMachine])

    const handleClickRow = (row) => {
        navigate(`${paths.oee}/${row.id}`)
    }

    useEffect(() => {
        getOeeData()
    }, [getOeeData])

    const xaxis = oeeData.map((e) => e.date)
    const yaxis = oeeData.map((e) => e[handleOeeMode(oeeModeIndex).toLowerCase()])

    const state = {
        options: {
            xaxis: {
                categories: xaxis,
            },
            yaxis:
                oeeModeIndex !== 5
                    ? {
                          min: 0,
                          max: 100,
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
                name: `${handleOeeMode(oeeModeIndex)}`,
                data: yaxis,
            },
        ],
    }

    return (
        <>
            <div className="flex h-screen flex-col">
                <Card className="container mb-5 ">
                    <div className=" mb-3 flex w-full justify-between">
                        <div className="p-1">
                            <DateInput
                                className=""
                                label="Chọn ngày bắt đầu"
                                value={dayStart}
                                setValue={setDayStart}
                                type="dayStart"
                                dayCompare={dayEnd}
                            />
                        </div>
                        <div className="p-1 ">
                            <DateInput
                                className=""
                                label="Chọn ngày kết thúc"
                                value={dayEnd}
                                setValue={setDayEnd}
                                type="dayEnd"
                                dayCompare={dayStart}
                            />
                        </div>
                        <div className="p-1">
                            <SelectInput
                                value={selectedMachine}
                                setValue={setSelectedMachine}
                                list={MACHINE_LIST}
                                label="Chọn máy"
                            />
                        </div>
                    </div>
                    <ToggleButtons active={oeeModeIndex} onClick={setOeeModeIndex} titles={OEE_MODE_LIST} />
                </Card>
                <Card className="flex-1">
                    {oeeModeIndex !== 0 && <h2>Giá trị {handleOeeMode(oeeModeIndex)}</h2>}

                    {oeeModeIndex !== 0 && (
                        <Chart options={state.options} series={state.series} type="line" width="100%" height={440} />
                    )}
                    <Table headers={handleOeePageHeader(oeeModeIndex)} body={oeeData} onRowClick={handleClickRow} />
                </Card>
            </div>
        </>
    )
}

export default OeePage
