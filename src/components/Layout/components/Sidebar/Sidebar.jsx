import { useState } from "react"
import cl from "classnames"
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"

import { SIDEBAR_ITEMS } from "@/utils/menuNavigation"
import SidebarItem from "./SidebarItem"

function Sidebar() {
    const [isExpand, setIsExpand] = useState(true)

    return (
        <div
            data-component="Sidebar"
            className={cl("relative h-full bg-primary-1 py-5 text-neutron-4 transition-all", {
                "visible w-[340px] px-5 sm:w-screen": isExpand,
                "w-[80px] px-2 sm:invisible sm:w-0": !isExpand,
            })}
        >
            <div className="mx-auto aspect-square w-full rounded-xl bg-neutron-4 sm:w-1/2"></div>
            <div className="sticky top-1/3 sm:top-0">
                {SIDEBAR_ITEMS.map((item, index) => (
                    <SidebarItem
                        key={index}
                        Icon={item.icon}
                        label={item.label}
                        actived={index === 2}
                        isExpand={isExpand}
                    />
                ))}
            </div>
            <i
                className={cl(
                    "absolute bottom-5 right-5 flex h-11 w-11 cursor-pointer",
                    "items-center justify-center rounded-full text-4xl hover:bg-hoverBg",
                    {
                        "sm:visible sm:fixed sm:left-0 sm:text-accent-1": !isExpand,
                    },
                )}
            >
                {isExpand ? (
                    <BsArrowBarLeft onClick={() => setIsExpand(false)} />
                ) : (
                    <BsArrowBarRight onClick={() => setIsExpand(true)} />
                )}
            </i>
        </div>
    )
}

export default Sidebar
