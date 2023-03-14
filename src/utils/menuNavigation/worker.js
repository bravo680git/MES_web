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
            },
            {
                id: "name",
                type: "text",
                label: "Tên nhân viên",
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
            },
        ],
    },
    {
        id: "workerProperties",
        title: "Thuộc tính nhân viên",
        type: "table",
        headers: [
            { Header: "Thuộc tính", accessor: "description" },
            {
                Header: "Đơn vị",
                accessor: "unit",
            },
            {
                Header: "Giá trị",
                accessor: "value",
            },
        ],
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
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
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
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
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
            },
        ],
    },
    {
        id: "equipmentProperties",
        title: "Thuộc tính thiết bị",
        type: "table",
        headers: [
            { Header: "Thuộc tính", accessor: "description" },
            {
                Header: "Đơn vị",
                accessor: "unit",
            },
            {
                Header: "Giá trị",
                accessor: "value",
            },
        ],
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
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
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
            },
            {
                id: "slot",
                type: "select",
                label: "Lô vật tư",
                list: materialSlotList ?? [],
            },
        ],
    },
    {
        id: "materialProperties",
        title: "Thuộc tính vật tư",
        type: "table",
        headers: [
            { Header: "Thuộc tính", accessor: "description" },
            {
                Header: "Đơn vị",
                accessor: "unit",
            },
            {
                Header: "Giá trị",
                accessor: "value",
            },
        ],
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
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
                    },
                ],
            },
        ],
    },
]
