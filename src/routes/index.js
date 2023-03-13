import { paths } from "@/config"
import NotFoundPage from "@/pages/NotFound"

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
        component: "div",
        layout: "main",
    },
    {
        path: paths.downtime,
        title: "Thơi gian chết",
        component: "div",
        layout: "main",
    },
    {
        path: paths.quantity,
        title: "Sản lượng",
        component: "div",
        layout: "main",
    },
    {
        path: paths.command,
        title: "Lệnh sản xuất",
        component: "div",
        layout: "main",
    },
    {
        path: paths.schedule,
        title: "Kế hoạch sản xuất",
        component: "div",
        layout: "main",
    },
    {
        path: paths.resource,
        title: "Quản lý nguồn lực",
        component: "div",
        layout: "main",
    },
    {
        path: paths.worker,
        title: "Quản lý nhân viên",
        component: "div",
        layout: "main",
    },
    {
        path: paths.equipment,
        title: "Quản lý thiết bị",
        component: "div",
        layout: "main",
    },
    {
        path: paths.material,
        title: "Quản lý vật tư",
        component: "div",
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
        component: NotFoundPage,
        layout: null,
    },
]

export default routes
