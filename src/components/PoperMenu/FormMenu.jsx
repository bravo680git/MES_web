import TextInput from "@/components/TextInput"
import SelectInput from "@/components/SelectInput"

import { getMenuItemValue as getValue } from "@/utils/functions"

function FormMenu({ items, value, setValue, path, setValidateRows }) {
    return (
        <div data-component="FormMenu" className="mt-2">
            {items.map((item) => {
                const props = {
                    id: item.id,
                    value: getValue(value, path, item.id),
                    setValue,
                    label: item.label,
                    disabled: item.disabled,
                    isError: item.isError,
                    list: item.list,
                    required: item.required,
                    setValidateRows,
                }

                return (
                    <div className="mb-5" key={item.id}>
                        {item.type === "text" ? (
                            <TextInput {...props} />
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
