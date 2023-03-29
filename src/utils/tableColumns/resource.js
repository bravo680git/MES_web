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

export const WORKER_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại nhân viên",
        accessor: "personnelClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
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

export const EQUIPMENT_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại thiết bị",
        accessor: "equipmentClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
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
]

export const MATERIAL_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại vật tư",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
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
