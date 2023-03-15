export const handleValidateTextInput = (isError, setError, value, setValidateRows, rowId) => {
    if (isError) {
        setError(isError(value))
        if (isError(value)) {
            setValidateRows((prev) => ({ ...prev, valid: prev.valid.filter((v) => v !== rowId) }))
        } else {
            setValidateRows((prev) => ({
                ...prev,
                valid: prev.valid.includes(rowId) ? prev.valid : [...prev.valid, rowId],
            }))
        }
    }
}

export const handleValidateSelectInput = (length, isError, setError, setValidateRows, rowId) => {
    if (isError) {
        setError(isError(length))
        if (!isError(length)) {
            setValidateRows((prev) => ({
                ...prev,
                valid: prev.valid.includes(rowId) ? prev.valid : [...prev.valid, rowId],
            }))
        } else {
            setValidateRows((prev) => ({ ...prev, valid: prev.valid.filter((v) => v !== rowId) }))
        }
    }
}

export const validateRequiredField = (value) => {
    if (value && value.length > 0) {
        return false
    } else {
        return "Vui lòng không để trống trường này"
    }
}

export const validateNumberField = (value) => {
    if (value && typeof Number(value) === "number") {
        return false
    } else {
        return "Vui lòng nhập một số hợp lệ"
    }
}
