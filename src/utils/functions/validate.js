export const handleValidateTextInput = (isError, setError, value, setValidateRows, rowId) => {
    if (isError) {
        setError(isError(value))

        if (!setValidateRows) return
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

        if (!setValidateRows) return
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
    if (value && !isNaN(value)) {
        return false
    } else {
        return "Vui lòng nhập một số hợp lệ"
    }
}

export const validateDateInput = (value) => {
    const regex =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

    if (regex.test(value)) {
        return false
    } else {
        return "Vui lòng nhập đúng định dạng ngày/tháng/năm"
    }
}
