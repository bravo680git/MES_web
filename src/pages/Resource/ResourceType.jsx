import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { usePoperMenu, useCallApi } from "@/hooks"
import { resourceApi } from "@/services/api"
import { commonStoreActions } from "@/store"
import { paths } from "@/config"
import { resourceMapper } from "@/utils/functions"
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
        equipment: null,
        material: null,
    },
    headers: {
        worker: WORKER_INFO_TABLE_COLUMNS,
        equipment: EQUIPMENT_INFO_TABLE_COLUMNS,
        material: MATERIAL_INFO_TABLE_COLUMNS,
    },
    fetchData: {
        worker: resourceApi.worker.getWorkers,
        equipment: null,
        material: null,
    },
    fetchClasses: {
        worker: resourceApi.worker.getWorkerClasses,
        equipment: null,
        material: null,
    },
    classesList: {
        worker: (items) => items.map((item) => ({ value: item.personnelClassId, key: item.description })),
        equipment: (items) => items.map((item) => ({ value: item.equipmentClassId, key: item.description })),
        material: null,
    },
    create: {
        worker: (data) => resourceApi.worker.createWorker(data),
        equipment: null,
        material: null,
    },
    edit: {
        worker: (data, item) => resourceApi.worker.updateWorker(data, item.personId),
        equipment: null,
        material: null,
    },
}

function ResourceType() {
    const dispatch = useDispatch()
    const params = useParams()
    const resourceType = params.type
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const callAPi = useCallApi()

    const [resData, setResData] = useState()
    const [activedItem, setActivedItem] = useState()
    const [classes, setClasses] = useState([])
    const [initValue, setInitValue] = useState()

    const fetchData = useCallback(() => {
        callAPi(handler.fetchData[resourceType], (res) => {
            setResData(res.items)
            setActivedItem(null)
        })
    }, [resourceType, callAPi])

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

    const handleSubmit = (value) => {
        if (!initValue) {
            //create new worker
            const data = value.info
            callAPi(
                () => handler.create[resourceType](data),
                fetchData,
                `Tạo ${handler.label[resourceType]} mới thành công`,
            )
        } else {
            //edit worker
            const data = resourceMapper.resource.clientToApi(value)
            callAPi(
                () => handler.create[resourceType](data, activedItem),
                fetchData,
                `Cập nhật ${handler.label[resourceType]} thành công`,
            )
        }
    }

    useEffect(() => {
        callAPi(handler.fetchClasses[resourceType], (res) => setClasses(handler.classesList[resourceType](res.items)))
    }, [resourceType, callAPi])

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
