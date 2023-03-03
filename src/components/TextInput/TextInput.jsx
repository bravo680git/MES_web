import { useState } from "react"
import cl from "classnames"

function TextInput({ label, value = "", setValue, disabled, className, isError, type = "text" }) {
    const [focus, setFocus] = useState(false)
    const [error, setError] = useState(false)

    const handleBlur = () => {
        setFocus(false)
        if (!isError) return
        setError(isError(value))
    }

    return (
        <>
            <div
                data-component="TextInput"
                className={cl(
                    "relative h-[50px] border-b-2  bg-neutron-4",
                    {
                        "border-primary-3": !focus,
                        "border-primary-2": focus,
                        "cursor-not-allowed border-neutron-2": disabled,
                        "border-warning-1": error,
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
                <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={disabled}
                    className={cl(
                        "text-16-m absolute left-0 bottom-[2px] h-6 w-full bg-transparent pl-2 focus:outline-none",
                        {
                            "cursor-not-allowed": disabled,
                        },
                    )}
                    onFocus={() => setFocus(true)}
                    onBlur={handleBlur}
                />
            </div>
            {error && <span className="text-14 text-warning-1">{error}</span>}
        </>
    )
}

export default TextInput
