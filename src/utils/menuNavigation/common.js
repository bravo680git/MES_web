import { validateRequiredField, validateDescField, validateIdField } from "@/utils/functions"
import { VALUE_TYPE } from "@/utils/constants"

export const CREATE_PROPERTY_SUB_NAV = [
    {
        id: "property",
        title: "Thêm thuộc tính mới",
        type: "form",
        items: [
            {
                id: "propertyId",
                type: "text",
                label: "ID thuộc tính",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
            {
                id: "valueUnitOfMeasure",
                type: "text",
                label: "Đơn vị",
            },
            {
                id: "valueType",
                type: "select",
                label: "Kiểu dữ liệu",
                list: [
                    {
                        key: "Đúng/Sai",
                        value: VALUE_TYPE.boolean,
                    },
                    {
                        key: "Số nguyên",
                        value: VALUE_TYPE.interger,
                    },
                    {
                        key: "Số thập phân",
                        value: VALUE_TYPE.decimal,
                    },
                    {
                        key: "Chuỗi ký tự",
                        value: VALUE_TYPE.string,
                    },
                ],
                isError: validateRequiredField,
            },
            {
                id: "valueString",
                type: "text",
                label: "Giá trị mặc định",
            },
        ],
    },
]

export const EDIT_PROPERTY_SUB_NAV = [
    {
        id: "property",
        title: "Thêm thuộc tính mới",
        type: "form",
        items: [
            {
                id: "propertyId",
                type: "text",
                label: "ID thuộc tính",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
            {
                id: "valueUnitOfMeasure",
                type: "text",
                label: "Đơn vị",
            },
            {
                id: "valueString",
                type: "text",
                label: "Giá trị",
            },
        ],
    },
]
