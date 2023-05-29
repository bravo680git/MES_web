import { paths } from "@/config"
import * as Pages from "@/pages"

const routes = [
    {
        path: paths.dashboard,
        title: "Dashboard",
        component: Pages.Dashboard,
        layout: "main",
        protected: true,
    },
    {
        path: paths.oee,
        title: "Chỉ số OEE",
        component: Pages.OeePage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.productivity,
        title: "Năng suất tiêu chuẩn thiết bị",
        component: Pages.Productivity,
        layout: "main",
        protected: true,
    },
    {
        path: paths.detailProductivity,
        title: null,
        component: Pages.DetailProductivity,
        layout: "main",
        protected: true,
    },
    {
        path: paths.oeeDetail,
        title: null,
        component: Pages.OeeDetailPage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.progress,
        title: "Tiến độ sản xuất",
        component: Pages.ProductionProgress,
        layout: "main",
        protected: true,
    },
    {
        path: paths.command,
        title: "Lệnh sản xuất",
        component: Pages.ProductionCommand,
        layout: "main",
        protected: true,
    },
    {
        path: paths.newProduct,
        title: "Sản phẩm mới",
        component: Pages.NewProduct,
        layout: "main",
        protected: true,
    },
    {
        path: paths.product,
        title: null,
        component: Pages.Product,
        layout: "main",
        protected: true,
    },
    {
        path: paths.schedule,
        title: "Kế hoạch sản xuất",
        component: Pages.ProductionSchedule,
        layout: "main",
        protected: true,
    },
    {
        path: paths.scheduling,
        title: "Điều độ sản xuất",
        component: Pages.ProductScheduling,
        layout: "main",
        protected: true,
    },
    {
        path: paths.resource,
        title: "Quản lý nguồn lực",
        component: Pages.ResourcePage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.resourceType,
        title: null,
        component: Pages.ResourceTypesPage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.class,
        title: null,
        component: Pages.ResourceClassPage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.setting,
        title: "Thiết lập",
        component: Pages.Setting,
        layout: "main",
        protected: true,
    },
    {
        path: paths.login,
        title: null,
        component: Pages.Login,
        layout: null,
    },
    {
        path: paths.signInOidc,
        title: null,
        component: Pages.SignInOidc,
        layout: null,
    },
    {
        path: "*",
        component: Pages.NotFoundPage,
        layout: null,
    },
]

export default routes
