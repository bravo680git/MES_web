import { validateRequiredField, validateDescField, validateIdField } from "@/utils/functions"

const valueType = {
    boolean: 0,
    interger: 1,
    decimal: 2,
    string: 3,
}

export const CLASS_PROPERTY_INPUTS_FORM = [
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
                value: valueType.boolean,
            },
            {
                key: "Số nguyên",
                value: valueType.interger,
            },
            {
                key: "Số thập phân",
                value: valueType.decimal,
            },
            {
                key: "Chuỗi ký tự",
                value: valueType.string,
            },
        ],
        isError: validateRequiredField,
    },
    {
        id: "valueString",
        type: "text",
        label: "Giá trị mặc định",
    },
]

export const EDIT_PROPERTY_FORM = [
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
]
