import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"

import { usePoperMenu, useCallApi } from "@/hooks"
import { resourceApi } from "@/services/api"
import { commonStoreActions } from "@/store"
import { paths } from "@/config"
import { resourceMapper, getResourceOptionsList } from "@/utils/functions"
import {
    WORKER_INFO_TABLE_COLUMNS,
    PROPERTIES_TABLE_COLUMNS,
    EQUIPMENT_INFO_TABLE_COLUMNS,
    MATERIAL_INFO_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    getCreateWorkerMenuNav,
    getCreateEquipmentMenuNav,
    getCreateMaterialMenuNav,
    getEditWorkerMenuNav,
    getEditEquipmentMenuNav,
    getEditMaterialMenuNav,
} from "@/utils/menuNavigation"

const handler = {
    label: {
        worker: "nhân viên",
        equipment: "thiết bị",
        material: "vật tư",
    },
    createMenuNav: {
        worker: (list) => getCreateWorkerMenuNav(list),
        equipment: (list) => getCreateEquipmentMenuNav(list),
        material: (list) => getCreateMaterialMenuNav(list),
    },
    editMenuNav: {
        worker: (list) => getEditWorkerMenuNav(list),
        equipment: (list) => getEditEquipmentMenuNav(list),
        material: (list) => getEditMaterialMenuNav(list),
    },
    headers: {
        worker: WORKER_INFO_TABLE_COLUMNS,
        equipment: EQUIPMENT_INFO_TABLE_COLUMNS,
        material: MATERIAL_INFO_TABLE_COLUMNS,
    },
    fetchData: {
        worker: resourceApi.worker.getWorkers,
        equipment: resourceApi.equipment.getEquipments,
        material: resourceApi.material.getMaterials,
    },
    fetchClasses: {
        worker: resourceApi.worker.getWorkerClasses,
        equipment: resourceApi.equipment.getEquipmentClasses,
        material: resourceApi.material.getMaterialClasses,
    },
    classesList: {
        worker: (items) => getResourceOptionsList(items, "personnelClassId"),
        equipment: (items) => getResourceOptionsList(items, "equipmentClassId"),
        material: (items) => getResourceOptionsList(items, "materialClassId"),
    },
    create: {
        worker: (data) => resourceApi.worker.createWorker(data),
        equipment: (data) => resourceApi.equipment.createEquipment(data),
        material: (data) => resourceApi.material.createMaterial(data),
    },
    edit: {
        worker: (data, item) => resourceApi.worker.updateWorker(data, item.personId),
        equipment: (data, item) => resourceApi.equipment.updateEquipment(data, item.equipmentId),
        material: (data, item) => resourceApi.material.updateMaterial(data, item.materialDefinitionId),
    },
    delete: {
        worker: (item) => resourceApi.worker.deleteWorker(item.personId),
        equipment: (item) => resourceApi.equipment.deleteEquipment(item.equipmentId),
        material: (item) => resourceApi.material.deleteMaterial(item.materialDefinitionId),
    },
}

function ResourceType() {
    const dispatch = useDispatch()
    const params = useParams()
    const resourceType = params.type
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callApi = useCallApi()

    const [resData, setResData] = useState()
    const [activedItem, setActivedItem] = useState()
    const [classes, setClasses] = useState([])
    const [initValue, setInitValue] = useState()
    const [deleteConfirm, setDeleteConfirm] = useState({})

    const fetchData = useCallback(() => {
        callApi(handler.fetchData[resourceType], (res) => {
            setResData(res.items)
            setActivedItem(null)
        })
    }, [resourceType, callApi])

    const handleRowClick = (row, index) => {
        const activedRow = resData[index]
        setActivedItem(activedRow)
    }

    const handleAddWorker = (e) => {
        setInitValue(null)
        handleOpen(e)
    }

    const handleEditWorker = (e, row, index) => {
        setInitValue(resourceMapper.resource.apiToClient(activedItem))
        handleOpen(e)
    }

    const handleDelete = (item) => {
        setDeleteConfirm({
            show: true,
            title: `Xác nhận xóa ${handler.label[resourceType]} ${item.description}`,
            content: "",
            onConfirm() {
                callApi(() => handler.delete[resourceType](item), fetchData, `Xóa ${item.description} thành công`)
            },
        })
    }

    const handleSubmit = (value) => {
        if (!initValue) {
            const data = value.info
            callApi(
                () => handler.create[resourceType](data),
                fetchData,
                `Tạo ${handler.label[resourceType]} mới thành công`,
            )
        } else {
            const data = resourceMapper.resource.clientToApi(value)
            callApi(
                () => handler.edit[resourceType](data, activedItem),
                fetchData,
                `Cập nhật ${handler.label[resourceType]} thành công`,
            )
        }
    }

    useEffect(() => {
        callApi(handler.fetchClasses[resourceType], (res) => setClasses(handler.classesList[resourceType](res.items)))
    }, [resourceType, callApi])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle("Quản lý " + handler.label[resourceType]))
    }, [dispatch, resourceType])

    return (
        <div data-component="ResourceType" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <h3 className="ml-1 mb-1">Danh sách {handler.label[resourceType]}</h3>
                {resData && (
                    <div className="scroll-y h-[calc(100%-90px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            headers={handler.headers[resourceType]}
                            body={resData}
                            onRowClick={handleRowClick}
                            onEdit={handleEditWorker}
                            onDeleteRow={handleDelete}
                            sticky
                            unActive={!activedItem}
                        />
                    </div>
                )}
                <div className="flex items-end">
                    <Button onClick={handleAddWorker} className="mt-5 mr-5">
                        {`Thêm ${handler.label[resourceType]}`}
                    </Button>
                    <Link to={`${paths.resource}/${resourceType}/class`}>
                        <h4 className="underline hover:text-primary-1">Quản lý loại {handler.label[resourceType]}</h4>
                    </Link>
                </div>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={
                            initValue
                                ? handler.editMenuNav[resourceType](classes)
                                : handler.createMenuNav[resourceType](classes)
                        }
                        onClick={handleSubmit}
                        initValue={initValue ? initValue : undefined}
                    />
                )}

                {deleteConfirm.show && (
                    <Confirm
                        title={deleteConfirm.title}
                        content={deleteConfirm.content}
                        onConfirm={deleteConfirm.onConfirm}
                        onClose={() => setDeleteConfirm({ show: false })}
                    />
                )}
            </div>

            {activedItem && (
                <div className="h-full w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                    <div className="">
                        <h3 className="ml-1 mb-1">
                            Thuộc tính {handler.label[resourceType]} {activedItem.description}
                        </h3>
                        <div className="h-[calc(100%-30px] scroll-y p-1 pt-0">
                            <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={activedItem.properties} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResourceType
