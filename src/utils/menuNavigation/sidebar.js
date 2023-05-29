import { VscSettings } from "react-icons/vsc"
import { OeeIcon, CommandIcon, QuantityIcon, ResourceIcon, ScheduleIcon, ProductivityIcon } from "@/components/Icons"
import { paths } from "@/config"

const SIDEBAR_ITEMS = [
    {
        label: "Báo cáo OEE",
        icon: OeeIcon,
        route: paths.oee,
    },
    {
        label: "Năng suất máy",
        icon: ProductivityIcon,
        route: paths.productivity,
    },
    {
        label: "Tiến độ sản xuất",
        icon: QuantityIcon,
        route: paths.progress,
    },
    {
        label: "Lệnh sản xuất",
        icon: CommandIcon,
        route: paths.command,
    },
    {
        label: "Kế hoạch sản xuất",
        icon: ScheduleIcon,
        route: paths.schedule,
    },
    {
        label: "Nguồn lực",
        icon: ResourceIcon,
        route: paths.resource,
    },
    {
        label: "Thiết lập",
        icon: VscSettings,
        route: paths.setting,
    },
]

export { SIDEBAR_ITEMS }
