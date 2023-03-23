import { PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"
import { validateRequiredField, validateNumberField } from "@/utils/functions/validate"

export const productMenuNav = {
    getInfo: () => ({
        id: "productInfo",
        title: "Thông tin sản phẩm",
        type: "form",
        items: [
            {
                id: "id",
                type: "text",
                label: "ID sản phẩm",
                isError: validateRequiredField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên sản phẩm",
                isError: validateRequiredField,
            },
        ],
    }),

    getProperties: () => ({
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
                        isError: validateRequiredField,
                    },
                    {
                        id: "unit",
                        type: "text",
                        label: "Đơn vị",
                        isError: validateRequiredField,
                    },
                    {
                        id: "value",
                        type: "text",
                        label: "Giá trị",
                        isError: validateRequiredField,
                    },
                ],
            },
        ],
    }),
    getSegments: (workerTypeList = [], equipmentTypeList = [], materialList = []) => ({
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
                        isError: validateRequiredField,
                    },
                    {
                        id: "name",
                        type: "text",
                        label: "Tên công đoạn",
                        isError: validateRequiredField,
                    },
                    {
                        id: "duration",
                        type: "text",
                        label: "Thời gian dự kiến(giờ)",
                        isError: validateNumberField,
                    },
                ],
            },
            {
                id: "workerTypes",
                title: "Danh sách bộ phận liên quan",
                type: "table",
                headers: [
                    {
                        Header: "Bộ phận",
                        accessor: "materialId",
                        disableSortBy: false,
                    },
                    {
                        Header: "Số lượng công nhân",
                        accessor: "quantity",
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
                        id: "workerType ",
                        title: "Thêm bộ phận",
                        type: "form",
                        items: [
                            {
                                id: "workerId",
                                type: "select",
                                label: "ID bộ phận",
                                list: workerTypeList,
                                isError: validateRequiredField,
                            },
                            {
                                id: "unit",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "quantity",
                                type: "text",
                                label: "Số lượng",
                            },
                        ],
                    },
                ],
            },
            {
                id: "equipments",
                title: "Danh sách loại thiết bị",
                type: "table",
                headers: [
                    {
                        Header: "Loại thiết bị",
                        accessor: "equipmentType",
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
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "equipment",
                        title: "Thêm loại thiết bị",
                        type: "form",
                        items: [
                            {
                                id: "equipmentType",
                                type: "select",
                                label: "Loại thiết bị",
                                list: equipmentTypeList,
                                isError: validateRequiredField,
                            },
                            {
                                id: "unit",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "quantity",
                                type: "text",
                                label: "Số lượng",
                            },
                        ],
                    },
                ],
            },
            {
                id: "materials",
                title: "Danh sách vật tư",
                type: "table",
                headers: [
                    {
                        Header: "Vật tư",
                        accessor: "materialId",
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
                        disableSortBy: false,
                    },
                ],
                subNav: [
                    {
                        id: "material ",
                        title: "Thêm vật tư",
                        type: "form",
                        items: [
                            {
                                id: "materialId",
                                type: "select",
                                label: "ID vật tư",
                                list: materialList,
                                isError: validateRequiredField,
                            },
                            {
                                id: "unit",
                                type: "text",
                                label: "Đơn vị",
                            },
                            {
                                id: "quantity",
                                type: "text",
                                label: "Số lượng",
                            },
                        ],
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
                                isError: validateRequiredField,
                            },
                            {
                                id: "unit",
                                type: "text",
                                label: "Đơn vị",
                                isError: validateRequiredField,
                            },
                            {
                                id: "value",
                                type: "text",
                                label: "Giá trị",
                                isError: validateRequiredField,
                            },
                        ],
                    },
                ],
            },
        ],
    }),
    getSegMentRelationship: (segments = [], relationList = []) => ({
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
                        type: "select",
                        label: "ID công đoạn A",
                        list: segments,
                        isError: validateRequiredField,
                    },
                    {
                        id: "relation",
                        type: "select",
                        label: "Ràng buộc",
                        list: relationList,
                        isError: validateRequiredField,
                    },
                    {
                        id: "segmentB",
                        type: "select",
                        label: "ID công đoạn B",
                        list: segments,
                        isError: validateRequiredField,
                    },
                    {
                        id: "duration",
                        type: "text",
                        label: "Thời gian(giờ)",
                    },
                ],
            },
        ],
    }),
}
