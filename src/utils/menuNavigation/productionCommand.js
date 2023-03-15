import { validateRequiredField, validateNumberField, validateDateInput } from "@/utils/functions"

export const getProductionCommandMenuNav = (productList) => [
    {
        id: "commandInfo",
        title: "Lệnh sản xuất mới",
        type: "form",
        items: [
            {
                id: "product",
                type: "select",
                label: "Sản phẩm",
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
                id: "manager",
                type: "text",
                label: "Phụ trách",
            },
            {
                id: "type",
                type: "text",
                label: "Dự kiến hoàn thành(dd/mm/yyyy)",
                isError: validateDateInput,
            },
        ],
    },
]
