import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { BsBarChartSteps } from "react-icons/bs"

import Card from "@/components/Card"
import Table from "@/components/Table"
import Button from "@/components/Button"

import { commonStoreActions } from "@/store"
import {
    PROPERTIES_TABLE_COLUMNS,
    PRODUCT_SEGMENTS_TABLE_COLUMNS,
    SEGMENT_WORKER_TABLE_COLUMNS,
    SEGMENT_EQUIPMENT_TABLE_COLUMNS,
    SEGMENT_MATERIAL_TABLE_COLUMNS,
    SEGMENT_PARAMS_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    PROPERTIES_MOCK_DATA,
    PRODUCT_SEGMENTS_MOCK_DATA,
    SEGMENT_EQUIPMENT_MOCK_DATA,
    SEGMENT_WORKER_MOCK_DATA,
    SEGMENT_MATERIAL_MOCK_DATA,
    SEGMENT_PARAMS_MOCK_DATA,
} from "@/utils/mockData"

function Product() {
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle(`Chi tiết sản phẩm ${params.productId}`))
    }, [dispatch, params.productId])

    return (
        <div data-component="Product" className="container h-full">
            <h2 className="mb-4 ml-2">Sản phẩm 1</h2>

            <div className="h-[calc(100%-52px)]">
                <div className="flex h-1/2 w-full pb-5">
                    <Card className="mr-5 h-full grow ">
                        <div className="mb-2 flex items-center">
                            <h3>Quy trình</h3>
                            <div className="ml-10 flex items-center">
                                <Button transparent>
                                    <AiOutlineUnorderedList />
                                </Button>
                                <Button transparent>
                                    <BsBarChartSteps />
                                </Button>
                            </div>
                        </div>
                        <div className="scroll-y  h-[calc(100%-46px)]">
                            <Table
                                headers={PRODUCT_SEGMENTS_TABLE_COLUMNS}
                                body={PRODUCT_SEGMENTS_MOCK_DATA}
                                activable
                                primary
                                sticky
                            />
                        </div>
                    </Card>

                    <Card className="h-full w-[480px]">
                        <h3 className="mb-2">Thuộc tính sản phẩm</h3>
                        <Table
                            headers={PROPERTIES_TABLE_COLUMNS}
                            body={PROPERTIES_MOCK_DATA}
                            sticky
                            className="scroll-y h-[calc(100%-38px)]"
                        />
                    </Card>
                </div>

                <Card className="h-1/2">
                    <h3>Công đoạn 1</h3>
                    <div className="mt-4 flex h-full w-full justify-between">
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Nhân viên</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_WORKER_TABLE_COLUMNS}
                                body={SEGMENT_WORKER_MOCK_DATA}
                            />
                        </div>
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Thiết bị</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_EQUIPMENT_TABLE_COLUMNS}
                                body={SEGMENT_EQUIPMENT_MOCK_DATA}
                            />
                        </div>
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Vật tư</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_MATERIAL_TABLE_COLUMNS}
                                body={SEGMENT_MATERIAL_MOCK_DATA}
                            />
                        </div>
                        <div className="scroll-y h-[calc(100%-50px)] w-1/4 px-2">
                            <h4>Yêu cầu công đoạn</h4>
                            <Table
                                sticky
                                className="w-full"
                                headers={SEGMENT_PARAMS_TABLE_COLUMNS}
                                body={SEGMENT_PARAMS_MOCK_DATA}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Product
