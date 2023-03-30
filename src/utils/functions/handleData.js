export const getMenuItemValue = (value, path = [], id) => {
    let crrValue = value
    for (let i = 0; i < path.length; i++) {
        crrValue = value?.[path[i]]
    }
    return id ? crrValue?.[id] : crrValue
}

export const getUpdatedMenuValue = (value, itemValue, path = [], id) => {
    let updateValue = value
    if (id) {
        for (let i = 0; i < path.length; i++) {
            if (!updateValue[path[i]]) {
                updateValue[path[i]] = {}
            }
            updateValue = updateValue[path[i]]
        }
        updateValue[id] = itemValue
    } else {
        for (let i = 0; i < path.length - 1; i++) {
            if (!updateValue[path[i]]) {
                updateValue[path[i]] = {}
            }
            updateValue = updateValue[path[i]]
        }
        updateValue[path[path.length - 1]] = itemValue
    }

    return { ...value }
}

export const getMenuTableData = (value, id) => {
    return value?.map((v) => v[id])
}

export const getSegmentOptionList = (segmentList) => {
    const segments = segmentList.productSegments

    return segments?.map((item) => ({
        key: item.segment.name,
        value: item.segment.id,
    }))
}

export const formatNumberValue = (value, format) => {
    if (isNaN(value)) {
        return value
    } else {
        value = Number(value)
    }

    switch (typeof format) {
        case "boolean":
            return Math.round(value)
        case "number":
            return value.toFixed(format)
        case "function":
            return format(value)
        default:
            return value
    }
}

export const updateValidateRuleForSubnav = (valueType, subNav, validateValueType) => {
    if (valueType !== undefined) {
        subNav.forEach((nav) => {
            if (nav.type === "form") {
                nav.items.forEach((item) => {
                    if (item.id === "valueString") {
                        if (valueType === 0) {
                            item.type = "checkbox"
                            item.isError = undefined
                        } else {
                            item.type = "text"
                            item.isError = (value) => validateValueType(value, valueType)
                        }
                    }
                })
            }
        })
    }
}
