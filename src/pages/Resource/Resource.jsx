import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ResourceItem from "@/components/ResourceItem"
import PoperMenu from "@/components/PoperMenu"
import { usePoperMenu } from "@/hooks"
import { getWorkerMenuNav, getEquipmentMenuNav, getMaterialMenuNav } from "@/utils/menuNavigation"
import { EQUIPMENT_TABLE_COLUMNS, MATERIAL_TABLE_COLUMNS, WORKER_TABLE_COLUMNS } from "@/utils/tableColumns"
import { RESOURCE_MOCK_DATA } from "@/utils/mockData"
import { paths } from "@/config"

function Resource() {
    const navigate = useNavigate()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const [menuNav, setMenuNav] = useState()

    const handleCreateBtnCLick = (e, type) => {
        switch (type) {
            case "worker":
                setMenuNav(getWorkerMenuNav([]))
                break
            case "equipment":
                setMenuNav(getEquipmentMenuNav([]))
                break
            case "material":
                setMenuNav(getMaterialMenuNav([], []))
                break

            default:
                break
        }
        handleOpen(e)
    }

    return (
        <div data-component="Resource" className="container flex h-full flex-wrap">
            <div className="h-full w-1/3 pr-5 xl:mb-4 xl:h-full xl:w-full xl:pr-0">
                <ResourceItem
                    label="Nhân viên"
                    headers={WORKER_TABLE_COLUMNS}
                    body={RESOURCE_MOCK_DATA}
                    onLabelClick={() => navigate(paths.worker)}
                    onBtnClick={(e) => handleCreateBtnCLick(e, "worker")}
                />
            </div>
            <div className="h-full w-1/3 pr-5 xl:mb-2 xl:h-full xl:w-full xl:pr-0">
                <ResourceItem
                    label="Thiết bị"
                    headers={EQUIPMENT_TABLE_COLUMNS}
                    body={RESOURCE_MOCK_DATA}
                    onLabelClick={() => navigate(paths.equipment)}
                    onBtnClick={(e) => handleCreateBtnCLick(e, "equipment")}
                />
            </div>
            <div className="h-full w-1/3 xl:h-full xl:w-full">
                <ResourceItem
                    label="Vật tư"
                    headers={MATERIAL_TABLE_COLUMNS}
                    body={RESOURCE_MOCK_DATA}
                    onLabelClick={() => navigate(paths.material)}
                    onBtnClick={(e) => handleCreateBtnCLick(e, "material")}
                />
            </div>
            {active && menuNav && <PoperMenu position={position} onClose={handleClose} menuNavigaton={menuNav} />}
        </div>
    )
}

export default Resource
