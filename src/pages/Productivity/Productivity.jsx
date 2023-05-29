import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsPlus } from "react-icons/bs"

import Card from "@/components/Card"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu, useCallApi } from "@/hooks"
import { paths } from "@/config"
import { resourceApi } from "@/services/api"
import { getCreateProductivityMenuNav, getEditProductivityMenuNav } from "@/utils/menuNavigation"

function Productivity() {
    const navigate = useNavigate()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()
    const [items, setItems] = useState([])
    const [materialList, setMaterialList] = useState([])
    const [menuData, setmenuData] = useState()

    const fetchData = () => {
        setItems([
            {
                devideId: "I1-1",
                materialDefinitionId: "fetch-ball-large",
                output: 12,
            },
        ])
    }

    const handleCreateStandardOutput = (e, devideId) => {
        setmenuData({
            nav: getCreateProductivityMenuNav(materialList),
            handleClick(value) {
                const {
                    materialDifinitionId: [materialId],
                    output,
                } = value.info
                const data = { materialDefinitionId: materialId, output, outputUnitOfMeasurement: "sp", timeUnit: 3 }
                callApi(
                    () => resourceApi.equipment.createEquipmentOuput(devideId, data),
                    fetchData,
                    "Định nghĩa năng suất tiêu chuẩn thành công",
                )
            },
            initValue: undefined,
        })
        handleOpen(e)
    }

    const handleEditStandardOutput = (e, item) => {
        setmenuData({
            nav: getEditProductivityMenuNav(),
            handleClick(value) {
                const data = { ...value.info, outputUnitOfMeasurement: "sp", timeUnit: 3 }
                callApi(
                    () => resourceApi.equipment.updateEquipmentOutput(item.devideId, item.materialDefinitionId, data),
                    fetchData,
                    "Cập nhật năng suất tiêu chuẩn thành công",
                )
            },
            initValue: {
                info: {
                    output: item.output,
                },
            },
        })
        handleOpen(e)
    }

    useEffect(() => {
        callApi(
            () => resourceApi.material.getMaterials(),
            (res) => {
                setMaterialList(res.items.map((item) => ({ key: item.description, value: item.materialDefinitionId })))
            },
        )
        fetchData()
    }, [callApi])

    return (
        <div data-component="Productivity" className="container">
            <Card className="w-full">
                <div className="flex w-full items-center">
                    <div className="w-48 pl-2">ID thiết bị</div>
                    <div className="grow">Năng suất tiêu chuẩn(sp/giờ)</div>
                </div>
                {items.map((item) => (
                    <div className="flex w-full items-center border-b-2 border-primary-3 py-3" key={item.devideId}>
                        <div
                            className="text-16-b w-48 cursor-pointer pl-2 text-primary-2 hover:text-primary-1 hover:underline"
                            onClick={() => navigate(`${paths.productivity}/${item.devideId}`)}
                        >
                            {item.devideId}
                        </div>
                        <div className="flex grow flex-wrap items-center gap-2">
                            <div
                                className="flex h-9 cursor-pointer items-center rounded-lg shadow-sub"
                                onClick={(e) => handleEditStandardOutput(e, item)}
                            >
                                <div className="flex h-full grow items-center rounded-l-lg bg-primary-2 px-4 text-neutron-4">
                                    {item.materialDefinitionId}
                                </div>
                                <div className="ml-4 w-10 grow rounded-r-lg">{item.output}</div>
                            </div>

                            <Button
                                className="ml-auto"
                                small
                                onClick={(e) => handleCreateStandardOutput(e, item.devideId)}
                            >
                                <BsPlus className="text-3xl" />
                            </Button>
                        </div>
                    </div>
                ))}
            </Card>

            {active && menuData && (
                <PoperMenu
                    position={position}
                    menuNavigaton={menuData.nav}
                    onClick={menuData.handleClick}
                    onClose={handleClose}
                    initValue={menuData.initValue}
                />
            )}
        </div>
    )
}

export default Productivity
