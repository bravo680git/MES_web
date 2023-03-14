//overview

export const WORKER_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Bộ phận",
        accessor: "type",
        disableSortBy: true,
    },
]

export const EQUIPMENT_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại thiết bị",
        accessor: "type",
        disableSortBy: true,
    },
]

export const MATERIAL_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên vật tư",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại vật tư",
        accessor: "type",
        disableSortBy: true,
    },
]

//worker
export const WORKER_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Bộ phận",
        accessor: "type",
        disableSortBy: true,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: true,
    },
]

//equipment
export const EQUIPMENT_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại thiết bị",
        accessor: "type",
        disableSortBy: true,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: true,
    },
]

//material
export const MATERIAL_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Loại vật tư",
        accessor: "type",
        disableSortBy: true,
    },
    {
        Header: "Lô vật tư",
        accessor: "slot",
        disableSortBy: true,
    },
    {
        Header: "Trạng thái lô vật tư",
        accessor: "slotStatus",
        disableSortBy: true,
    },
]

export const SUB_SLOT_TABLE_COLUMNS = [
    {
        Header: "Phân lô",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Vị trí",
        accessor: "location",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "value",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: true,
    },
]
