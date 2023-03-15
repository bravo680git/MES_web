import { PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"

export const getProductMenuNav = (workerTypeList, equipmentTypeList, materialList, relationList) => [
    {
        id: "productInfo",
        title: "Thông tin sản phẩm",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID sản phẩm",
            },
            {
                id: "name",
                type: "text",
                label: "Tên sản phẩm",
            },
        ],
    },
    {
        id: "productProperties",
        title: "Thuộc tính sản phẩm",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
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
    {
        id: "productSegments",
        title: "Công đoạn sản phẩm",
        type: "table",
        headers: [
            {
                Header: "ID",
                accessor: "id",
                disableSortBy: false,
            },
            {
                Header: "Tên công đoạn",
                accessor: "name",
                disableSortBy: false,
            },
            {
                Header: "Thời gian(giờ)",
                accessor: "duration",
                disableSortBy: false,
            },
        ],
        subNav: [
            {
                id: "segment",
                title: "Thêm công đoạn mới",
                type: "form",
                items: [
                    {
                        id: "id",
                        type: "text",
                        label: "ID",
                    },
                    {
                        id: "name",
                        type: "text",
                        label: "Tên công đoạn",
                    },
                    {
                        id: "duration",
                        type: "text",
                        label: "Thời gian dự kiến(giờ)",
                    },
                    {
                        id: "workerType",
                        type: "selectMutils",
                        label: "Loại công việc",
                        list: workerTypeList,
                    },
                    {
                        id: "eqipmentType",
                        type: "selectMutils",
                        label: "Loại thiết bị",
                        list: equipmentTypeList,
                    },
                    {
                        id: "material",
                        type: "selectMutils",
                        label: "Vật tư",
                        list: materialList,
                    },
                ],
            },
            {
                id: "productParams",
                title: "Yêu cầu công đoạn",
                type: "table",
                headers: [
                    {
                        Header: "Yêu cầu",
                        accessor: "description",
                        disableSortBy: false,
                    },
                    {
                        Header: "Giá trị",
                        accessor: "value",
                        disableSortBy: false,
                    },
                    {
                        Header: "Đơn vị",
                        accessor: "unit",
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "param ",
                        title: "Thêm yêu cầu mới",
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
        ],
    },
    {
        id: "segmentRelationships",
        title: "Ràng buộc giữa các công đoạn",
        type: "table",
        headers: [
            {
                Header: "ID công đoạn A",
                accessor: "segmentA",
                disableSortBy: false,
            },
            {
                Header: "Ràng buộc",
                accessor: "relation",
                disableSortBy: false,
            },
            {
                Header: "ID công đoạn B",
                accessor: "segmentB",
                disableSortBy: false,
            },
            {
                Header: "Thời gian(giờ)",
                accessor: "duration",
                disableSortBy: false,
            },
        ],
        subNav: [
            {
                id: "relationship",
                title: "Thêm ràng buộc",
                type: "form",
                items: [
                    {
                        id: "segmentA",
                        type: "text",
                        label: "ID công đoạn A",
                    },
                    {
                        id: "relation",
                        type: "select",
                        label: "Ràng buộc",
                        list: relationList,
                    },
                    {
                        id: "segmentB",
                        type: "text",
                        label: "ID công đoạn B",
                    },
                    {
                        id: "duration",
                        type: "text",
                        label: "Thời gian(giờ)",
                    },
                ],
            },
        ],
    },
]
