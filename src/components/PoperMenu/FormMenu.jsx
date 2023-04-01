import { useState, useEffect } from "react"

import TextInput from "@/components/TextInput"
import SelectInput from "@/components/SelectInput"
import Checkbox from "@/components/Checkbox"

import { getMenuItemValue as getValue, updateValidateRuleForFormMenuItems, validateValueType } from "@/utils/functions"

function FormMenu({ items, value, setValue, path, setValidateRows }) {
    const [menuItems, setMenuItems] = useState(items)
    const valueType = getValue(value, path, "valueType")?.[0]

    useEffect(() => {
        const newItems = updateValidateRuleForFormMenuItems(valueType, items, setValue)
        if (validateValueType(getValue(value, path, "valueString"), valueType)) {
            setValidateRows((prev) => ({
                ...prev,
                valid: prev.valid.filter((item) => item !== "valueString"),
            }))
        }
        setMenuItems(newItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueType, items])

    return (
        <div data-component="FormMenu" className="mt-2">
            {menuItems.map((item) => {
                const props = {
                    id: item.id,
                    value: getValue(value, path, item.id),
                    setValue,
                    label: item.label,
                    disabled: item.disabled,
                    isError: item.isError,
                    list: item.list,
                    setValidateRows,
                }

                return (
                    <div className="mb-5" key={item.id}>
                        {item.type === "text" ? (
                            <TextInput {...props} />
                        ) : item.type === "checkbox" ? (
                            <Checkbox {...props} />
                        ) : item.type === "selectMutils" ? (
                            <SelectInput {...props} mutilChoises />
                        ) : (
                            <SelectInput {...props} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default FormMenu
