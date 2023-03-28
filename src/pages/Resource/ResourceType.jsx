import { useMemo, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu } from "@/hooks"
import { commonStoreActions } from "@/store"
import { paths } from "@/config"
import {
    WORKER_INFO_TABLE_COLUMNS,
    PROPERTIES_TABLE_COLUMNS,
    EQUIPMENT_INFO_TABLE_COLUMNS,
    MATERIAL_INFO_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    EQUIPMENT_INFO_MOCK_DATA,
    MATERIAL_INFO_MOCK_DATA,
    PROPERTIES_MOCK_DATA,
    WORKER_INFO_MOCK_DATA,
} from "@/utils/mockData"
import { getWorkerMenuNav, getEquipmentMenuNav, getMaterialMenuNav } from "@/utils/menuNavigation"

function ResourceType() {
    const dispatch = useDispatch()
    const params = useParams()
    const resourceType = params.type
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const handler = useMemo(
        () => ({
            title: {
                worker: "Quản lý nhân viên",
                equipment: "Quản lý thiết bị",
                material: "Quản lý vật tư",
            },
            label: {
                worker: "nhân viên",
                equipment: "thiết bị",
                material: "vật tư",
            },
            menuNav: {
                worker: getWorkerMenuNav([]),
                equipment: getEquipmentMenuNav([]),
                material: getMaterialMenuNav([]),
            },
            headers: {
                worker: WORKER_INFO_TABLE_COLUMNS,
                equipment: EQUIPMENT_INFO_TABLE_COLUMNS,
                material: MATERIAL_INFO_TABLE_COLUMNS,
            },
            mockData: {
                worker: WORKER_INFO_MOCK_DATA,
                equipment: EQUIPMENT_INFO_MOCK_DATA,
                material: MATERIAL_INFO_MOCK_DATA,
            },
        }),
        [],
    )

    const handleRowClick = (id) => {
        console.log(id)
    }

    const handleEdit = (id) => {
        console.log(id)
    }

    const handleSubmit = (value) => {
        console.log(value)
    }

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle(handler.title[resourceType]))
    }, [dispatch, handler, resourceType])

    return (
        <div data-component="ResourceType" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <div className="scroll-y h-[calc(100%-60px)] pb-2">
                    <Table
                        activable
                        primary
                        headers={handler.headers[resourceType]}
                        body={handler.mockData[resourceType]}
                        onRowClick={handleRowClick}
                        onEdit={handleEdit}
                        sticky
                    />
                </div>
                <Button onClick={handleOpen} className="mt-5">
                    {`Thêm ${handler.label[resourceType]}`}
                </Button>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={handler.menuNav[resourceType]}
                        onClick={handleSubmit}
                    />
                )}
            </div>

            <div className="scroll-y h-full w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                <div className="">
                    <h3 className="ml-1 mb-1">Thuộc tính {handler.label[resourceType]}</h3>
                    <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={PROPERTIES_MOCK_DATA} />
                </div>

                <Link to={`${paths.resource}/${resourceType}/class`}>
                    <h4 className="mt-4 underline hover:text-primary-1">Quản lý loại {handler.label[resourceType]}</h4>
                </Link>
            </div>
        </div>
    )
}

export default ResourceType
