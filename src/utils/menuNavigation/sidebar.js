import { BsGear } from "react-icons/bs"
import { OeeIcon, CommandIcon, DowntimeIcon, QuantityIcon, ResourceIcon, ScheduleIcon } from "@/components/Icons"

const SIDEBAR_ITEMS = [
    {
        label: "Chỉ số OEE",
        icon: OeeIcon,
        route: "",
    },
    {
        label: "Thời gian chết",
        icon: DowntimeIcon,
        route: "",
    },
    {
        label: "Sản lượng",
        icon: QuantityIcon,
        route: "",
    },
    {
        label: "Lệnh sản xuất",
        icon: CommandIcon,
        route: "",
    },
    {
        label: "Kế hoạch sản xuất",
        icon: ScheduleIcon,
        route: "",
    },
    {
        label: "Nguồn lực",
        icon: ResourceIcon,
        route: "",
    },
    {
        label: "Thiết lập",
        icon: BsGear,
        route: "",
    },
]

export { SIDEBAR_ITEMS }
