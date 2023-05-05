import {
    validateRequiredField,
    validateNumberField,
    validateDateInput,
    validateIdField,
    validateDescField,
} from "@/utils/functions"

export const getProductionCommandMenuNav = (productList) => [
    {
        id: "info",
        title: "Lệnh sản xuất mới",
        type: "form",
        items: [
            {
                id: "workOrderId",
                type: "text",
                label: "ID lệnh sản xuất",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
            {
                id: "materialDefinition",
                type: "select",
                label: "Chọn sản phẩm",
                list: productList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "dueDate",
                type: "text",
                label: "Ngày đến hạn(dd/mm/yyyy)",
                isError: validateDateInput,
            },
        ],
    },
]
