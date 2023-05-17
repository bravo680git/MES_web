export const PRODUCTION_COMMAND_TABLE_COLUMNS = [
    {
        Header: "ID lệnh sản xuất",
        accessor: "workOrderId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "ID sản phẩm",
        accessor: "materialDefinition",
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
