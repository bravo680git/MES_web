import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import Table from "@/components/Table"
import Button from "@/components/Button"
import PoperMenu from "@/components/PoperMenu"

import { resourceApi } from "@/services/api"
import { usePoperMenu } from "@/hooks"
import { commonStoreActions } from "@/store"
import { resourceMapper } from "@/utils/functions"
import { getEquipmentClassMenuNav, getMaterialClassMenuNav, getWorkerClassMenuNav } from "@/utils/menuNavigation"
import {
    WORKER_CLASS_TABLE_COLUMNS,
    EQUIPMENT_CLASS_TABLE_COLUMNS,
    MATERIAL_CLASS_TABLE_COLUMNS,
    PROPERTIES_TABLE_COLUMNS,
} from "@/utils/tableColumns"

const handler = {
    displayText: {
        worker: "nhân viên",
        equipment: "thiết bị",
        material: "vật tư",
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
    fetchData: {
        worker: resourceApi.worker.getWorkerClasses,
        equipment: resourceApi.equipment.getEquipmentClasses,
        material: null,
    },
    addClass: {
        worker: (data) => resourceApi.worker.createWorkerClass(data),
        equipment: (data) => resourceApi.equipment.createEquipmentClass(data),
        material: null,
    },
    editClass: {
        worker: (data, currentItem) => resourceApi.worker.updateWorkerClass(data, currentItem.personnelClassId),
        equipment: (data, currentItem) =>
            resourceApi.equipment.updateEquipmentClass(data, currentItem.equipmentClassId),
        material: null,
    },
}

function ResourceClass() {
    const params = useParams()
    const resourceType = params.type
    const dispatch = useDispatch()
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const [resData, setResData] = useState()
    const [activedItem, setActivedItem] = useState(null)
    const [initValue, setInitValue] = useState()

    const fetchData = useCallback(() => {
        return handler.fetchData[resourceType]
            ?.call()
            .then((res) => setResData(res.items))
            .catch((err) => console.log(err))
    }, [resourceType])

    const handleTableRowClick = (row, index) => {
        const activedRow = resData?.[index]
        setActivedItem(activedRow)
    }

    const handleAddClass = (e) => {
        setInitValue(null)
        handleOpen(e)
    }

    const handleEditClass = (e) => {
        setInitValue(resourceMapper.resourceClass.apiToClient(activedItem))
        handleOpen(e)
    }

    const handleSubmit = (value) => {
        if (!initValue) {
            const data = resourceMapper.resourceClass.clientToApi(value)
            handler.addClass[resourceType]
                ?.call(this, data)
                .then((res) => {
                    console.log(res)
                    fetchData()
                })
                .catch((err) => console.log(err))
        } else {
            const data = resourceMapper.resourceClass.clientToApi(value)
            handler.editClass[resourceType]
                ?.call(this, data, activedItem)
                .then((res) => {
                    console.log(res)
                    fetchData()
                })
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        dispatch(commonStoreActions.setPageTitle("Quản lý loại " + handler.displayText[resourceType]))
    }, [dispatch, resourceType])

    return (
        <div data-component="ResourceClass" className="container flex h-full flex-wrap">
            <div className="relative h-full grow xl:w-full">
                <h3 className="ml-1 mb-1">Danh sách loại {handler.displayText[resourceType]}</h3>
                {resData && (
                    <div className="scroll-y h-[calc(100%-90px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            headers={handler.header[resourceType]}
                            body={resData}
                            sticky
                            onRowClick={handleTableRowClick}
                            onEdit={handleEditClass}
                        />
                    </div>
                )}
                <Button onClick={handleAddClass} className="mt-5">
                    {`Thêm loại ${handler.displayText[resourceType]}`}
                </Button>

                {active && (
                    <PoperMenu
                        position={position}
                        onClose={handleClose}
                        menuNavigaton={handler.menuNav[resourceType]}
                        onClick={handleSubmit}
                        initValue={initValue ? initValue : undefined}
                    />
                )}
            </div>

            {activedItem && (
                <div className="h-full  w-[640px] pb-4 pl-5 xl:mt-4 xl:pl-0">
                    <h3 className="ml-1 mb-1">Thuộc tính loại {handler.displayText[resourceType]}</h3>
                    <div className="scroll-y h-[calc(100%-30px)] p-1 pt-0">
                        <Table activable headers={PROPERTIES_TABLE_COLUMNS} body={activedItem.properties} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResourceClass

/**
 * resData: lưu res từ api
 * activedItem: data của hàng đang được chọn
 * initValue: data truyền cho poper menu khi chỉnh sửa 1 hàng
 *
 * nhấn nút thêm class: set initValue thành null --> nhập dữ liệu --> submit
 * nhấn nút sửa: set initValue thành dữ liệu của hàng đang được chọn sau khi đã map qua client interface  --> sửa --> submit
 * initValue == null ? add : edit
 */
