import Card from "@/components/Card"
import Table from "@/components/Table"
import Radialbar from "@/components/Radialbar"
import Progressbar from "@/components/Progressbar"

import { oeeMockData } from "@/utils/mockData"
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
]
function OeeDetailPage() {
    return (
        <div class="container flex">
            <Card className="mr-3 flex-1">
                <Table headers={header} body={oeeMockData} sticky />
            </Card>
            <div className="w-[550px]">
                <Card className="mb-3 flex">
                    <div className="flex flex-col items-center">
                        <h3>OEE</h3>
                        <Radialbar value={20} width={250} fontSize={24} />
                    </div>
                    <div className="text-2xl font-semibold text-neutron-4">
                        <div className=" mb-3 flex justify-around ">
                            <div className="border-1 border-black mr-3 flex h-[90px] w-[120px] items-center justify-center rounded-xl bg-primary-1">
                                <label className="">A 0.0%</label>
                            </div>
                            <div className="border-1 border-black flex h-[90px] w-[120px] items-center justify-center rounded-xl bg-primary-1">
                                <label>P 0.0%</label>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="border-1 border-black mr-3 flex h-[90px] w-[120px] items-center justify-center rounded-xl bg-primary-1">
                                <label>Q 0.0%</label>
                            </div>
                            <div className="border-1 border-black flex h-[90px] w-[120px] items-center justify-center rounded-xl bg-primary-1">
                                <label>L 0.0%</label>
                            </div>
                        </div>
                    </div>
                    {/* <OeeDetail A={1} P={2} Q={3} L={4} /> */}
                </Card>
                <Card>
                    <div className="mb-3">
                        <label>Thời gian ép trung bình</label>
                        <Progressbar value={60} height={36} unit="%" />
                    </div>
                    <label>Sản lượng sản phẩm hiện tại/mục tiêu</label>
                    <Progressbar value={60} height={36} unit="%" />
                </Card>
            </div>
        </div>
    )
}

export default OeeDetailPage
