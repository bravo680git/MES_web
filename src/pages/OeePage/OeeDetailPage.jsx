import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import Card from "@/components/Card"
import Table from "@/components/Table"
import Radialbar from "@/components/Radialbar"
import Progressbar from "@/components/Progressbar"

import { oeeApi } from "@/services/api"
import { useCallApi } from "@/hooks"
import { formatData, formatTableData } from "@/utils/functions"
import { OEE_DETAIL_TABLE_COLUMNS } from "@/utils/tableColumns"
import { commonStoreActions } from "@/store"

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

function OeeDetailPage() {
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const { id } = useParams()

    const [oeeDetailPageData, settOeeDetailPageData] = useState(defaultData)

    useEffect(() => {
        callApi(
            () => oeeApi.getOeeDetail(id),
            (data) => {
                settOeeDetailPageData(data)
                dispatch(
                    commonStoreActions.setPageTitle(
                        `Chi tiết OEE máy ${data.deviceId} ngày ${new Date(data.date).toLocaleDateString("vi")}`,
                    ),
                )
            },
        )
    }, [id, callApi, dispatch])

    return (
        <div className="container flex h-full gap-5">
            <Card className="scroll-y h-full grow pt-0">
                <Table headers={OEE_DETAIL_TABLE_COLUMNS} body={formatTableData(oeeDetailPageData.shots)} sticky />
            </Card>
            <div className="flex w-[480px] flex-col justify-between">
                <Card className="flex flex-col">
                    <div className="flex flex-col items-center">
                        <Radialbar value={formatData(oeeDetailPageData.oee * 100, 2)} width={300} fontSize={24} />
                        <h4 className="mt-[-30px]">Chỉ số OEE</h4>
                    </div>
                    <div className="mx-auto mt-8 text-2xl font-semibold text-neutron-4">
                        <div className=" mb-3 flex gap-8">
                            <div className="border-1 flex h-[100px] w-[150px] items-center justify-center rounded-xl bg-primary-1">
                                <div className="">A {formatData(oeeDetailPageData.a * 100, 2)}%</div>
                            </div>
                            <div className="border-1 flex h-[100px] w-[150px] items-center justify-center rounded-xl bg-primary-2">
                                <div>P {formatData(oeeDetailPageData.p * 100, 2)}%</div>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="border-1 flex h-[100px] w-[150px] items-center justify-center rounded-xl bg-neutron-2">
                                <div>Q {formatData(oeeDetailPageData.q * 100, 2)}%</div>
                            </div>
                            <div className="border-1 flex h-[100px] w-[150px] items-center justify-center rounded-xl bg-accent-1">
                                <div>L {formatData(oeeDetailPageData.l, 2)}s</div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card className="mt-5">
                    <div className="mb-5">
                        <div className="text-16-b mb-2">Thời gian ép trung bình</div>
                        <Progressbar
                            value={oeeDetailPageData.averageInjectionTime?.toFixed(2)}
                            max={1200}
                            height={36}
                            unit="s"
                            textLimit={20}
                        />
                    </div>
                    <div className="mb-5">
                        <div className="text-16-b mb-2">Chu kì ép trung bình</div>
                        <Progressbar
                            value={oeeDetailPageData.averageInjectionCycle?.toFixed(2)}
                            max={1200}
                            height={36}
                            unit="s"
                            textLimit={20}
                        />
                    </div>
                    <div className="text-16-b mb-2">Sản lượng sản phẩm hiện tại</div>
                    <Progressbar
                        value={oeeDetailPageData.productCount}
                        height={36}
                        unit="sp"
                        max={1000}
                        textLimit={20}
                    />
                </Card>
            </div>
        </div>
    )
}

export default OeeDetailPage
