import { useState, useMemo } from "react"

import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu } from "@/hooks"
import { PRODUCTION_COMMAND_TABLE_COLUMNS, PRODUCT_LIST_TABLE_COLUMNS } from "@/utils/tableColumns"
import { getProductionCommandMenuNav, getProductMenuNav } from "@/utils/menuNavigation"
import {
    PRODUCTION_COMMAND_MOCK_DATA,
    PRODUCT_LIST_MOCK_DATA,
    WORKER_TYPE_LIST,
    MATERIAL_LIST,
    EQUIPMENT_TYPE_LIST,
} from "@/utils/mockData"

function ProductionCommand() {
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const [menuNav, setMenuNav] = useState()

    const handler = useMemo(
        () => ({
            openPoperMenu: {
                productionCommand() {
                    setMenuNav(getProductionCommandMenuNav([]))
                },
                product() {
                    setMenuNav(getProductMenuNav(WORKER_TYPE_LIST, EQUIPMENT_TYPE_LIST, MATERIAL_LIST, []))
                },
            },
        }),
        [],
    )

    const handleOpenPoperMenu = (e, type) => {
        handler.openPoperMenu[type]()
        handleOpen(e)
    }

    const handleSubmit = (value) => {
        console.log(value)
    }

    return (
        <div data-component="ProductionCommand" className="container flex h-full">
            <Card className="mr-[30px] h-full grow">
                <div className="mb-5 flex items-center justify-between">
                    <h3>Danh sách lệnh sản xuất</h3>
                    <Button large>Lên kế hoạch sx</Button>
                </div>
                <div className="scroll-y h-[calc(100%-60px)]">
                    <Table headers={PRODUCTION_COMMAND_TABLE_COLUMNS} body={PRODUCTION_COMMAND_MOCK_DATA} sticky />
                    <Button large className="mt-2" onClick={(e) => handleOpenPoperMenu(e, "productionCommand")}>
                        Lệnh sản xuất mới
                    </Button>
                </div>
            </Card>

            <Card className="h-full w-[480px]">
                <h3 className="mb-5">Danh sách sản phẩm</h3>
                <div className="scroll-y h-[calc(100%-60px)]">
                    <Table headers={PRODUCT_LIST_TABLE_COLUMNS} body={PRODUCT_LIST_MOCK_DATA} sticky />
                    <Button className="mt-4" onClick={(e) => handleOpenPoperMenu(e, "product")}>
                        Sản phẩm mới
                    </Button>
                </div>
            </Card>

            {active && menuNav && (
                <PoperMenu menuNavigaton={menuNav} position={position} onClose={handleClose} onClick={handleSubmit} />
            )}
        </div>
    )
}

export default ProductionCommand
