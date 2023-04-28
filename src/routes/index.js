import { paths } from "@/config"
import * as Pages from "@/pages"

const routes = [
    {
        path: paths.dashboard,
        title: "Trang chủ",
        component: "div",
        layout: "main",
    },
    {
        path: paths.oee,
        title: "Chỉ số OEE",
        component: Pages.OeePage,
        layout: "main",
    },
    {
        path: paths.oeeDetail,
        title: "Chi tiết oee",
        component: Pages.OeeDetailPage,
        layout: "main",
    },
    {
        path: paths.progress,
        title: "Tiến độ sản xuất",
        component: Pages.ProductionProgress,
        layout: "main",
    },
    {
        path: paths.command,
        title: "Lệnh sản xuất",
        component: Pages.ProductionCommand,
        layout: "main",
    },
    {
        path: paths.newProduct,
        title: "Sản phẩm mới",
        component: Pages.NewProduct,
        layout: "main",
    },
    {
        path: paths.product,
        title: null,
        component: Pages.Product,
        layout: "main",
    },
    {
        path: paths.schedule,
        title: "Kế hoạch sản xuất",
        component: Pages.ProductionSchedule,
        layout: "main",
    },
    {
        path: paths.resource,
        title: "Quản lý nguồn lực",
        component: Pages.ResourcePage,
        layout: "main",
    },
    {
        path: paths.resourceType,
        title: null,
        component: Pages.ResourceTypesPage,
        layout: "main",
    },
    {
        path: paths.class,
        title: null,
        component: Pages.ResourceClassPage,
        layout: "main",
    },
    {
        path: paths.setting,
        title: "Thiết lập",
        component: "div",
        layout: "main",
    },
    {
        path: "*",
        component: Pages.NotFoundPage,
        layout: null,
    },
]

export default routes
