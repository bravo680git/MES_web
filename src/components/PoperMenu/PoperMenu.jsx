import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineCheck } from "react-icons/md"

import Button from "@/components/Button"
import Card from "@/components/Card"
import FormMenu from "./FormMenu"
import TableMenu from "./TableMenu"
import { getUpdatedMenuValue as getNewValue } from "@/utils/functions"

function PoperMenu({ menuNavigaton, onClick, width, onClose, position, basePath = [] }) {
    const [navItems, setNavItems] = useState([menuNavigaton[0]])
    const currentNavItem = navItems[navItems.length - 1]

    const [menuIndex, setMenuIndex] = useState(0)
    const [value, setValue] = useState({})
    const [invalid, setInvalid] = useState(true)
    const [validateRows, setValidateRows] = useState(() => {
        let total = 0
        currentNavItem.items.forEach((item) => {
            if (item.isError) {
                total++
            }
        })

        return {
            total,
            valid: [],
        }
    })

    const handleSetValue = (itemValue, id) => {
        setValue((prevValue) => getNewValue(prevValue, itemValue, [currentNavItem.id], id))
    }

    const handleClick = () => {
        if (navItems.length === menuNavigaton.length) {
            onClick(value)
            onClose()
        } else {
            setNavItems([...navItems, menuNavigaton[menuIndex + 1]])
            setMenuIndex(menuIndex + 1)
        }
    }

    const handleBack = () => {
        if (menuIndex > 0) {
            const newNavItems = [...navItems]
            newNavItems.pop()
            setNavItems(newNavItems)
            setMenuIndex(menuIndex - 1)
        } else {
            onClose()
        }
    }

    useEffect(() => {
        if (validateRows.total === validateRows.valid.length) {
            setInvalid(false)
        } else {
            setInvalid(true)
        }
    }, [validateRows.valid.length, validateRows.total])

    return createPortal(
        <div data-component="PoperMenu" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-hoverBg">
            <Card className="fixed" style={{ ...position, width, minWidth: "400px" }}>
                <div className="flex items-center">
                    <Button small transparent onClick={handleBack}>
                        <MdOutlineKeyboardArrowLeft className="text-3xl" />
                    </Button>

                    <h2 className="ml-3">{currentNavItem.title}</h2>
                </div>
                {currentNavItem.type === "form" ? (
                    <FormMenu
                        items={currentNavItem.items}
                        path={[...basePath, currentNavItem.id]}
                        value={value}
                        setValue={handleSetValue}
                        setValidateRows={setValidateRows}
                    />
                ) : (
                    <TableMenu
                        headers={currentNavItem.headers}
                        path={[...basePath, currentNavItem.id]}
                        subNav={currentNavItem.subNav}
                        value={value}
                        setValue={handleSetValue}
                    />
                )}
                <Button onClick={handleClick} className="mx-auto mt-4 text-center text-3xl" disabled={invalid}>
                    {navItems.length === menuNavigaton.length ? <MdOutlineCheck /> : <MdOutlineKeyboardArrowRight />}
                </Button>
            </Card>
        </div>,
        document.getElementById("root"),
    )
}

export default PoperMenu
