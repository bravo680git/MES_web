import { useState, useEffect } from "react"
import cl from "classnames"
import { MdOutlineKeyboardArrowDown, MdOutlineClose } from "react-icons/md"

import { useDebounce } from "@/hooks"

function SelectInput({ label, value = [], setValue, list = [], mutilChoises, disabled, className }) {
    const [focus, setFocus] = useState(false)
    const [optionList, setOptionList] = useState(list)
    const [searchInput, setSearchInput] = useState("")
    const debounce = useDebounce(searchInput, 200)

    const handleSelect = (v) => {
        if (mutilChoises) {
            setValue([...value, v])
        } else {
            setValue([v])
        }
    }

    const handleRemoveItem = (v) => {
        const newValue = value.filter((item) => item !== v)
        setValue(newValue)
    }

    const handleFocus = () => {
        setFocus(true)
    }

    useEffect(() => {
        const newOpList = list.filter((item) => !value.includes(item.value))

        setOptionList(newOpList)
    }, [value, list])

    useEffect(() => {
        let newOpList
        if (debounce.length === 0) {
            newOpList = list.filter((item) => !value.includes(item.value))
        } else {
            newOpList = optionList.filter((item) => item.key.toLowerCase().includes(debounce.toLowerCase()))
        }
        setOptionList(newOpList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce])

    return (
        <div
            data-component="SelectInput"
            className={cl(
                "relative h-[64px] border-b-2  bg-neutron-4 pb-1",
                {
                    "border-primary-3": !focus,
                    "border-primary-2": focus,
                    "cursor-not-allowed border-neutron-2": disabled,
                },
                className,
            )}
        >
            <label
                className={cl("absolute transition-all", {
                    "text-16-b top-0 left-0 text-primary-2": focus,
                    "text-14 bottom-1 left-2 text-neutron-2": !focus & (value.length === 0),
                    "text-16-b text-neutron-1": !focus && value.length > 0,
                    "cursor-not-allowed": disabled,
                })}
            >
                {label}
            </label>
            <div className="flex h-full items-end">
                <div className="ml-2 flex min-w-[60px] flex-wrap">
                    {list
                        .filter((item) => value.includes(item.value))
                        .map((item) => (
                            <div
                                key={item.value}
                                className={cl(
                                    "text-16-m group relative mr-3 flex",
                                    "cursor-pointer rounded-lg shadow-sub transition-all hover:bg-accent-2",
                                )}
                                onClick={() => handleRemoveItem(item.value)}
                            >
                                <span className="px-3 py-1">{item.key}</span>
                                <span
                                    className={cl(
                                        "absolute hidden bg-accent-1 text-neutron-4",
                                        "top-[50%] right-[-10px] h-8 w-8 translate-y-[-50%] ",
                                        "items-center justify-center rounded-full group-hover:flex",
                                    )}
                                >
                                    <MdOutlineClose className="text-2xl" />
                                </span>
                            </div>
                        ))}
                </div>
                <input
                    type="text"
                    className="block h-5 grow pl-2 focus:outline-none"
                    placeholder="Nhập để tìm kiếm..."
                    onFocus={handleFocus}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            <i className="absolute right-3 top-8">
                <MdOutlineKeyboardArrowDown className="text-2xl" />
            </i>

            <div
                className={cl(
                    "absolute right-2 top-[110%] min-w-[100px] origin-top-left rounded-l",
                    "bg-neutron-4 py-4 shadow-sub",
                    {
                        block: focus,
                        hidden: !focus,
                    },
                )}
            >
                <ul>
                    {optionList.map((item) => (
                        <li
                            key={item.value}
                            className="text-16-b cursor-pointer px-4 py-1 hover:bg-hoverBg"
                            onMouseDown={() => handleSelect(item.value)}
                        >
                            {item.key}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SelectInput
