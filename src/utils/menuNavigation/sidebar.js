import { BsGear } from "react-icons/bs"
import { OeeIcon, CommandIcon, DowntimeIcon, QuantityIcon, ResourceIcon, ScheduleIcon } from "@/components/Icons"
import { paths } from "@/config"

const SIDEBAR_ITEMS = [
    {
        label: "Chỉ số OEE",
        icon: OeeIcon,
        route: paths.oee,
    },
    {
        label: "Thời gian chết",
        icon: DowntimeIcon,
        route: paths.downtime,
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
        icon: BsGear,
        route: paths.setting,
    },
]

export { SIDEBAR_ITEMS }
