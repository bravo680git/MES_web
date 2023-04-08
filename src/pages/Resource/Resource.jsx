import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import ResourceItem from "@/components/ResourceItem"
import PoperMenu from "@/components/PoperMenu"
import { usePoperMenu, useCallApi } from "@/hooks"
import { resourceApi } from "@/services/api"
import { getCreateWorkerMenuNav, getCreateEquipmentMenuNav, getCreateMaterialMenuNav } from "@/utils/menuNavigation"
import { EQUIPMENT_TABLE_COLUMNS, MATERIAL_TABLE_COLUMNS, WORKER_TABLE_COLUMNS } from "@/utils/tableColumns"
import { paths } from "@/config"

const handler = {
    labels: ["Nhân viên", "Thiết bị", "Vật tư"],
    headers: [WORKER_TABLE_COLUMNS, EQUIPMENT_TABLE_COLUMNS, MATERIAL_TABLE_COLUMNS],
    getMenuNavs: [
        (list) => getCreateWorkerMenuNav(list),
        (list) => getCreateEquipmentMenuNav(list),
        (list) => getCreateMaterialMenuNav(list),
    ],
    navigateLinks: [paths.resource + "/worker", paths.resource + "/equipment", paths.resource + "/material"],
}

function Resource() {
    const navigate = useNavigate()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()

    const [menuNav, setMenuNav] = useState()
    const [resData, setResData] = useState([])

    const handleBtnClick = (e, index) => {
        setMenuNav(handler.getMenuNavs[index]([]))
        handleOpen(e)
    }

    const handleLabelClick = (index) => navigate(handler.navigateLinks[index])

    useEffect(() => {
        callApi([resourceApi.worker.getWorkers()], (res) => setResData(res))
    }, [callApi])

    return (
        <div data-component="Resource" className="container flex h-full flex-wrap">
            {resData.map((data, index) => (
                <div className="h-full w-1/3 pr-5 last:pr-0 xl:mb-4 xl:h-full xl:w-full xl:pr-0" key={index}>
                    <ResourceItem
                        label={handler.labels[index]}
                        headers={handler.headers[index]}
                        body={data.items}
                        onLabelClick={(e) => handleLabelClick(index)}
                        onBtnClick={(e) => handleBtnClick(e, index)}
                        quantiy={{ all: data.totalItems }}
                    />
                </div>
            ))}

            {active && menuNav && <PoperMenu position={position} onClose={handleClose} menuNavigaton={menuNav} />}
        </div>
    )
}

export default Resource
