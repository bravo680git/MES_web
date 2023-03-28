import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import ResourceItem from "@/components/ResourceItem"
import PoperMenu from "@/components/PoperMenu"
import { usePoperMenu } from "@/hooks"
import { getCreateWorkerMenuNav, getCreateEquipmentMenuNav, getCreateMaterialMenuNav } from "@/utils/menuNavigation"
import { EQUIPMENT_TABLE_COLUMNS, MATERIAL_TABLE_COLUMNS, WORKER_TABLE_COLUMNS } from "@/utils/tableColumns"
import { RESOURCE_MOCK_DATA } from "@/utils/mockData"
import { paths } from "@/config"

function Resource() {
    const navigate = useNavigate()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const [menuNav, setMenuNav] = useState()
    const RESOURCE_TYPES = ["worker", "equipment", "material"]
    const handler = useMemo(
        () => ({
            label: {
                worker: "Nhân viên",
                equipment: "Thiết bị",
                material: "Vật tư",
            },
            headers: {
                worker: WORKER_TABLE_COLUMNS,
                equipment: EQUIPMENT_TABLE_COLUMNS,
                material: MATERIAL_TABLE_COLUMNS,
            },
            body: {
                worker: RESOURCE_MOCK_DATA,
                equipment: RESOURCE_MOCK_DATA,
                material: RESOURCE_MOCK_DATA,
            },
            btnClick: {
                worker(e) {
                    setMenuNav(getCreateWorkerMenuNav([]))
                    handleOpen(e)
                },
                equipment(e) {
                    setMenuNav(getCreateEquipmentMenuNav([]))
                    handleOpen(e)
                },
                material(e) {
                    setMenuNav(getCreateMaterialMenuNav([]))
                    handleOpen(e)
                },
            },
            navigate: {
                worker: () => navigate(paths.resource + "/worker"),
                equipment: () => navigate(paths.resource + "/equipment"),
                material: () => navigate(paths.resource + "/material"),
            },
        }),
        [navigate, handleOpen],
    )

    return (
        <div data-component="Resource" className="container flex h-full flex-wrap">
            {RESOURCE_TYPES.map((type) => (
                <div className="h-full w-1/3 pr-5 last:pr-0 xl:mb-4 xl:h-full xl:w-full xl:pr-0" key={type}>
                    <ResourceItem
                        label={handler.label[type]}
                        headers={handler.headers[type]}
                        body={handler.body[type]}
                        onLabelClick={handler.navigate[type]}
                        onBtnClick={handler.btnClick[type]}
                    />
                </div>
            ))}

            {active && menuNav && <PoperMenu position={position} onClose={handleClose} menuNavigaton={menuNav} />}
        </div>
    )
}

export default Resource
