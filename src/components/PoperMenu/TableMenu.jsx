import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

import PoperMenu from "@/components/PoperMenu"
import Table from "@/components/Table"
import Button from "@/components/Button"
import { usePoperMenu } from "@/hooks"
import {
    getMenuItemValue as getValue,
    getMenuTableData,
    updateValidateRuleForSubnav,
    validateValueType,
} from "@/utils/functions"

function TableMenu({ headers, subNav, value, setValue, path }) {
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const [poperMenuHandler, setPoperMenuHandler] = useState()
    const tableBody = getMenuTableData(getValue(value, path), subNav[0].id)

    const handleAdding = (e) => {
        setPoperMenuHandler({
            handleClick(v) {
                if (getValue(value, path)) {
                    setValue([...getValue(value, path), v])
                } else {
                    setValue([v])
                }
            },
        })
        handleOpen(e)
    }

    const handleEditing = (e, row, index) => {
        const rowValue = getValue(value, path)[index]

        updateValidateRuleForSubnav(row.valueType?.[0], subNav, validateValueType)

        setPoperMenuHandler({
            //clone new value object to avoid change value via reference

            initValue: JSON.parse(JSON.stringify(rowValue)),
            handleClick(v) {
                setValue(getValue(value, path).map((item, _index) => (_index === index ? v : item)))
            },
        })
        handleOpen(e)
    }

    return (
        <div data-component="TableMenu">
            <Table headers={headers} body={tableBody} onEdit={handleEditing} />
            <Button small className="mt-4 text-2xl" onClick={handleAdding}>
                <AiOutlinePlus />
            </Button>

            {active && poperMenuHandler && (
                <PoperMenu
                    menuNavigaton={subNav}
                    position={position}
                    onClose={handleClose}
                    onClick={poperMenuHandler.handleClick}
                    basePath={path}
                    initValue={poperMenuHandler.initValue}
                />
            )}
        </div>
    )
}

export default TableMenu
