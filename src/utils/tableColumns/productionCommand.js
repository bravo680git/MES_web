export const PRODUCTION_COMMAND_TABLE_COLUMNS = [
    {
        Header: "ID lệnh sản xuất",
        accessor: "workOrderId",
        disableSortBy: false,
    },
    {
        Header: "Sản phẩm",
        accessor: "materialDefinitionId",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "quantity",
        disableSortBy: false,
    },
    {
        Header: "Ngày đến hạn",
        accessor: "dueDate",
        disableSortBy: false,
    },
    {
        Header: "Ngày tạo",
        accessor: "createdDate",
        disableSortBy: false,
    },
]

export const PRODUCT_LIST_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên sản phẩm",
        accessor: "product",
        disableSortBy: false,
    },
]
