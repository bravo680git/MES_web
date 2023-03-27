import { useMemo, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu } from "@/hooks"
import { commonStoreActions } from "@/store"
import { getEquipmentClassMenuNav, getMaterialClassMenuNav, getWorkerClassMenuNav } from "@/utils/menuNavigation"
import {
    WORKER_CLASS_TABLE_COLUMNS,
    EQUIPMENT_CLASS_TABLE_COLUMNS,
    MATERIAL_CLASS_TABLE_COLUMNS,
    PROPERTIES_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import { CLASS_MOCK_DATA, PROPERTIES_MOCK_DATA } from "@/utils/mockData"

function ResourceClass() {
    const params = useParams()
    const dispatch = useDispatch()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const handler = useMemo(
        () => ({
            title: {
                worker: "Quản lý loại nhân viên",
                equipment: "Quản lý loại thiết bị",
                material: "Quản lý loại vật tư",
            },
            header: {
                worker: WORKER_CLASS_TABLE_COLUMNS,
                equipment: EQUIPMENT_CLASS_TABLE_COLUMNS,
                material: MATERIAL_CLASS_TABLE_COLUMNS,
            },
            menuNav: {
                worker: getWorkerClassMenuNav(),
                equipment: getEquipmentClassMenuNav(),
                material: getMaterialClassMenuNav(),
            },
            btnText: {
                worker: "Thêm loại nhân viên",
                equipment: "Thêm loại thiết bị",
                material: "Thêm loại vật tư",
            },
        }),
        [],
    )

    const handleCLick = (value) => {
        console.log(value)
    }

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle(handler.title[params.type]))
    }, [dispatch, params.type, handler])

    return (
        <div data-component="ResourceClass" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <div className="scroll-y h-[calc(100%-60px)] pb-2">
                    <Table activable primary headers={handler.header[params.type]} body={CLASS_MOCK_DATA} sticky />
                </div>
                <Button onClick={handleOpen} className="mt-5">
                    {handler.btnText[params.type]}
                </Button>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={handler.menuNav[params.type]}
                        onClick={handleCLick}
                    />
                )}
            </div>

            <div className="scroll-y h-full  w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                <div className="">
                    <h3 className="ml-1 mb-1">Thuộc tính nhân viên</h3>
                    <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={PROPERTIES_MOCK_DATA} />
                </div>
            </div>
        </div>
    )
}

export default ResourceClass
