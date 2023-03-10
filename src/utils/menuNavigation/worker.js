export const getWorkerMenuNav = (workerTypeList) => [
    {
        id: "workeInfo",
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
