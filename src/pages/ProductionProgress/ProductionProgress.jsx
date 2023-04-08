import { useState } from "react"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import Progressbar from "@/components/Progressbar"
import Radialbar from "@/components/Radialbar"

function ProductionProgress() {
    const [followingType, setFollowingType] = useState([1])
    const [filterId, setfilterId] = useState()
    const typeList = [
        {
            key: "Máy",
            value: 1,
        },
        {
            key: "Sản phẩm",
            value: 2,
        },
    ]

    return (
        <div data-component="ProductionProgress" className="container h-full">
            <Card className="flex w-full gap-10">
                <SelectInput label="Hiển thị theo" value={followingType} setValue={setFollowingType} list={typeList} />
                <SelectInput label="Chọn " value={filterId} setValue={setfilterId} />
            </Card>

            <Card className="mt-5 h-[calc(100%-126px)]">
                <h2 className="mb-3">Product 1</h2>

                <div className="flex h-[calc(100%-48px)] gap-5">
                    <Card className="h-full w-[600px]">
                        <h3>Tiến độ chung</h3>
                        <div className="flex items-center">
                            <div className="grow">
                                <div className="mb-1">
                                    <span className="text-16-b inline-block w-40">Tổng số</span>
                                    <span>100</span>
                                </div>
                                <div className="mb-1">
                                    <span className="text-16-b inline-block w-40">Đã hoàn thành</span>
                                    <span>20</span>
                                </div>
                                <div className="mb-1">
                                    <span className="text-16-b inline-block w-40">Ngày lên lịch</span>
                                    <span>12/03/2022</span>
                                </div>
                                <div className="mb-1">
                                    <span className="text-16-b inline-block w-40">Dự kiến hoàn thành</span>
                                    <span>01/04/2022</span>
                                </div>
                            </div>
                            <Radialbar value={20} width={300} fontSize={24} />
                        </div>

                        <h3>Dự kiến tiến độ hoàn thành</h3>
                    </Card>
                    <Card className="h-full grow">
                        <h3 className="mb-5">Tiến độ chi tiết</h3>
                        <div className="w-full">
                            <div className="text-16-b flex">
                                <span className="w-32">ID máy</span>
                                <span className="grow">Tiến độ</span>
                                <span className="w-28">Yêu cầu</span>
                                <span className="w-28">Hoàn thành</span>
                                <span className="w-28">Dự kiến??</span>
                            </div>

                            <div className="text-16-m flex items-center py-2">
                                <span className="w-32">M-1</span>
                                <span className="grow">
                                    <Progressbar value={60} height={36} unit="%" />
                                </span>
                                <span className="w-28">20</span>
                                <span className="w-28">4</span>
                                <span className="w-28">???</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default ProductionProgress
