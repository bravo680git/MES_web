import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu } from "@/hooks"
import { EQUIPMENT_INFO_TABLE_COLUMNS, PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"
import { PROPERTIES_MOCK_DATA, EQUIPMENT_INFO_MOCK_DATA } from "@/utils/mockData"
import { getEquipmentMenuNav } from "@/utils/menuNavigation"

function Equipment() {
    const { active, position, handleClose, handleOpen } = usePoperMenu()

    const handleRowClick = (id) => {
        console.log(id)
    }

    const handleEdit = (id) => {
        console.log(id)
    }

    const handleSubmit = (value) => {
        console.log(value)
    }

    return (
        <div data-component="Equipment" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <div className="scroll-y h-[calc(100%-60px)]">
                    <Table
                        activable
                        primary
                        headers={EQUIPMENT_INFO_TABLE_COLUMNS}
                        body={EQUIPMENT_INFO_MOCK_DATA}
                        onRowClick={handleRowClick}
                        onEdit={handleEdit}
                        sticky
                    />
                </div>
                <Button onClick={handleOpen} className="mt-5">
                    Thêm thiết bị
                </Button>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={getEquipmentMenuNav([])}
                        onClick={handleSubmit}
                    />
                )}
            </div>

            <div className="scroll-y h-full  w-[640px] pb-4 pl-[30px] xl:mt-4 xl:pl-0">
                <div className="">
                    <h3 className="ml-1 mb-1">Thuộc tính thiết bị</h3>
                    <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={PROPERTIES_MOCK_DATA} />
                </div>
                <div className="mt-4">
                    <h3 className="ml-1 mb-1">Thuộc tính loại thiết bị 1</h3>
                    <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={PROPERTIES_MOCK_DATA} />
                </div>
                <div className="mt-4">
                    <h3 className="ml-1 mb-1">Thuộc tính loại thiết bị 2</h3>
                    <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={PROPERTIES_MOCK_DATA} />
                </div>
            </div>
        </div>
    )
}

export default Equipment
