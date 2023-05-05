import Card from "@/components/Card"
import Table from "@/components/Table"
import Radialbar from "@/components/Radialbar"
import Progressbar from "@/components/Progressbar"

import { useParams } from "react-router-dom"
import OeeApi from "@/services/api/oee/oee"
import { oeeMockData } from "@/utils/mockData"
import { useEffect, useState } from "react"

const header = [
    {
        Header: "Thời gian",
        accessor: "timeStamp",
        disableSortBy: false,
    },
    {
        Header: "Thời gian ép",
        accessor: "injectionTime",
        disableSortBy: false,
    },
    {
        Header: "Chu kì ép",
        accessor: "injectionCycle",
        disableSortBy: false,
    },
]
const defaultData = {
    id: 0,
    shots: [
        {
            injectionTime: 0,
            injectionCycle: 0,
            timeStamp: "2020-01-01T00:00:00",
        },
    ],
    mouldSlot: 1,
    oee: 0,
    p: 0,
    a: 0,
    q: 0,
    l: 0,
    shiftNumber: 2,
    date: "2020-01-01T00:00:00",
    deviceId: "P001-left",
    productCount: 0,
    productPercentage: 0,
    averageInjectionCycle: 0,
    averageInjectionTime: 0,
    standardProductCount: 0,
}
function formatData(data, fixNumber) {
    const fomartedData = data.toFixed(fixNumber)
    return fomartedData
}
function fomartDate(inputDate) {
    const dateParts = inputDate.split("T")
    const date = dateParts[0].split("-").reverse().join("-")
    const time = dateParts[1]

    const outputDate = `${date} ${time}`
    return outputDate
}
const formatTableData = (data) => {
    let formatedData
    formatedData = data.map((item) => {
        let formatedItem
        formatedItem = {
            injectionCycle: formatData(item.injectionCycle, 2),
            injectionTime: formatData(item.injectionTime, 2),
            timeStamp: fomartDate(item.timeStamp.split(".")[0]),
        }
        return formatedItem
    })
    return formatedData
}
function OeeDetailPage() {
    const { id } = useParams()
    console.log(id)

    const [oeeDetailPageData, settOeeDetailPageData] = useState(defaultData)
    useEffect(() => {
        OeeApi.getOeeDetail(id).then((data) => settOeeDetailPageData(data))
    }, [])
    console.log(formatTableData(oeeDetailPageData.shots))
    return (
        <div class="container flex h-full">
            <Card className=" scroll-y mr-3 h-full flex-1 grow">
                <Table headers={header} body={formatTableData(oeeDetailPageData.shots)} />
            </Card>
            <div className="w-[550px]">
                <Card className="mb-3 flex">
                    <div className="flex flex-col items-center">
                        <h3>OEE</h3>
                        <Radialbar value={formatData(oeeDetailPageData.oee * 100, 2)} width={250} fontSize={24} />
                    </div>
                    <div className="text-2xl font-semibold text-neutron-4">
                        <div className=" mb-3 flex justify-around ">
                            <div className="border-1 border-black mr-3 flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-primary-1">
                                <label className="">A {formatData(oeeDetailPageData.a * 100, 2)}%</label>
                            </div>
                            <div className="border-1 border-black flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-primary-1">
                                <label>P {formatData(oeeDetailPageData.p * 100, 2)}%</label>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="border-1 border-black mr-3 flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-primary-1">
                                <label>Q {formatData(oeeDetailPageData.q * 100, 2)}%</label>
                            </div>
                            <div className="border-1 border-black flex h-[100px] w-[130px] items-center justify-center rounded-xl bg-primary-1">
                                <label>L {formatData(oeeDetailPageData.l, 2)}s</label>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="mb-3">
                        <label>Thời gian ép trung bình</label>
                        <Progressbar value={oeeDetailPageData.averageInjectionTime} height={36} unit="s" />
                    </div>
                    <label>Sản lượng sản phẩm hiện tại</label>
                    <Progressbar value={oeeDetailPageData.productCount} height={36} unit="" />
                </Card>
            </div>
        </div>
    )
}

export default OeeDetailPage
