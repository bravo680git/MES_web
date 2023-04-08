import { Link } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu } from "@/hooks"
import { paths } from "@/config"
import { WORKER_INFO_TABLE_COLUMNS, PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"
import { PROPERTIES_MOCK_DATA, WORKER_INFO_MOCK_DATA } from "@/utils/mockData"
import { getWorkerMenuNav } from "@/utils/menuNavigation"

function Worker() {
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
        <div data-component="Worker" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <div className="scroll-y h-[calc(100%-60px)] pb-2">
                    <Table
                        activable
                        primary
                        headers={WORKER_INFO_TABLE_COLUMNS}
                        body={WORKER_INFO_MOCK_DATA}
                        onRowClick={handleRowClick}
                        onEdit={handleEdit}
                        sticky
                    />
                </div>
                <Button onClick={handleOpen} className="mt-5">
                    Thêm nhân viên
                </Button>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={getWorkerMenuNav([])}
                        onClick={handleSubmit}
                    />
                )}
            </div>

            <div className="scroll-y h-full w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                <div className="">
                    <h3 className="ml-1 mb-1">Thuộc tính nhân viên</h3>
                    <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={PROPERTIES_MOCK_DATA} />
                </div>

                <Link to={paths.worker + "/class"}>
                    <h4 className="mt-2 underline hover:text-primary-1">Quản lý loại nhân viên</h4>
                </Link>
            </div>
        </div>
    )
}

export default Worker
