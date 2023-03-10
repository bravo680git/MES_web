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
