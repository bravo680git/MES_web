export const PRODUCTION_COMMAND_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Sản phẩm",
        accessor: "product",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "quantity",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: true,
    },
    {
        Header: "Phụ trách",
        accessor: "manager",
        disableSortBy: true,
    },
    {
        Header: "Dự kiến hoàn thành",
        accessor: "expectedDate",
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
