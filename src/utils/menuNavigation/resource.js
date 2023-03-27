import { validateRequiredField, validateIdField, validateDescField } from "@/utils/functions/validate"
import { PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"
import { PROPERTY_INPUTS_FORM } from "./common"

export const getWorkerMenuNav = (workerTypeList) => [
    {
        id: "workerInfo",
        title: "Thông tin nhân viên",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID nhân viên",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
            {
                id: "type",
                type: "selectMutils",
                label: "Loại nhân viên",
                list: workerTypeList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "workerProperties",
        title: "Thuộc tính nhân viên",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: [
            {
                id: "property",
                title: "Thêm thuộc tính mới",
                type: "form",
                items: PROPERTY_INPUTS_FORM,
            },
        ],
    },
]

export const getEquipmentMenuNav = (equipmentTypeList) => [
    {
        id: "equipmentInfo",
        title: "Thông tin thiết bị",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
            {
                id: "type",
                type: "selectMutils",
                label: "Loại thiết bị",
                list: equipmentTypeList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "equipmentProperties",
        title: "Thuộc tính thiết bị",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: [
            {
                id: "property",
                title: "Thêm thuộc tính mới",
                type: "form",
                items: PROPERTY_INPUTS_FORM,
            },
        ],
    },
]

export const getMaterialMenuNav = (materialTypeList, materialSlotList) => [
    {
        id: "materialInfo",
        title: "Thông tin vật tư",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
            {
                id: "type",
                type: "selectMutils",
                label: "Loại vật tư",
                list: materialTypeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "slot",
                type: "select",
                label: "Lô vật tư",
                list: materialSlotList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "materialProperties",
        title: "Thuộc tính vật tư",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: [
            {
                id: "property",
                title: "Thêm thuộc tính mới",
                type: "form",
                items: PROPERTY_INPUTS_FORM,
            },
        ],
    },
]

export const getWorkerClassMenuNav = () => [
    {
        id: "id",
        title: "Thông tin loại nhân viên",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID loại nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính loại nhân viên",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: [
            {
                id: "property",
                title: "Thêm thuộc tính mới",
                type: "form",
                items: PROPERTY_INPUTS_FORM,
            },
        ],
    },
]

export const getEquipmentClassMenuNav = () => [
    {
        id: "id",
        title: "Thông tin loại thiết bị",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID loại thiết bị",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính loại thiết bị",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: [
            {
                id: "property",
                title: "Thêm thuộc tính mới",
                type: "form",
                items: PROPERTY_INPUTS_FORM,
            },
        ],
    },
]

export const getMaterialClassMenuNav = (slotList) => [
    {
        id: "id",
        title: "Thông tin loại vật tư",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID loại nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính loại vật tư",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: [
            {
                id: "property",
                title: "Thêm thuộc tính mới",
                type: "form",
                items: PROPERTY_INPUTS_FORM,
            },
        ],
    },
]
