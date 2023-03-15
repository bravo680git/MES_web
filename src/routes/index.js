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
        component: Pages.ProductionCommand,
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
        component: Pages.ResourcePage,
        layout: "main",
    },
    {
        path: paths.worker,
        title: "Quản lý nhân viên",
        component: Pages.WorkerPage,
        layout: "main",
    },
    {
        path: paths.equipment,
        title: "Quản lý thiết bị",
        component: Pages.EquipmentPage,
        layout: "main",
    },
    {
        path: paths.material,
        title: "Quản lý vật tư",
        component: Pages.MaterialPage,
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
