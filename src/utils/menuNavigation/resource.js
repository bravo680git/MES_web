import { validateRequiredField } from "@/utils/functions/validate"
import { PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"

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
                isError: validateRequiredField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên nhân viên",
                isError: validateRequiredField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
            },
            {
                id: "type",
                type: "selectMutils",
                label: "Bộ phận",
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
                items: [
                    {
                        id: "description",
                        type: "text",
                        label: "Mô tả",
                        isError: validateRequiredField,
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                        isError: validateRequiredField,
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
                        isError: validateRequiredField,
                    },
                ],
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
                isError: validateRequiredField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateRequiredField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
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
                items: [
                    {
                        id: "description",
                        type: "text",
                        label: "Mô tả",
                        isError: validateRequiredField,
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                        isError: validateRequiredField,
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
                        isError: validateRequiredField,
                    },
                ],
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
                isError: validateRequiredField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
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
                items: [
                    {
                        id: "description",
                        type: "text",
                        label: "Mô tả",
                        isError: validateRequiredField,
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                        isError: validateRequiredField,
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
                        isError: validateRequiredField,
                    },
                ],
            },
        ],
    },
]
