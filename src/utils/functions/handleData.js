import { toast } from "react-toastify"
import { VALUE_TYPE, SEGMENT_RELATION } from "@/utils/constants"
import { validateValueType } from "./validate"

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

export const getSegmentOptionList = (segments) => {
    const segmenList = segments.productSegments?.map((item) => ({
        key: item.info.description,
        value: item.info.productSegmentId,
    }))
    if (Array.isArray(segmenList)) {
        segmenList.unshift({ key: "Start", value: "start-segment" })
    }
    return segmenList
}

export const getResourceOptionsList = (items, key) => {
    return items.map((item) => ({ value: item[key], key: item.description }))
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

export function cloneDeep(obj) {
    let newObj = {}

    if (Array.isArray(obj)) {
        newObj = []
    }

    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            newObj[key] = cloneDeep(obj[key])
        } else {
            newObj[key] = obj[key]
        }
    }

    return newObj
}

export const updateValidateRuleForSubnav = (valueType, subNav = []) => {
    if (valueType !== undefined) {
        const newNav = cloneDeep(subNav)
        newNav.forEach((nav) => {
            if (nav.type === "form") {
                nav.items.forEach((item) => {
                    if (item.id === "valueString") {
                        if (valueType === VALUE_TYPE.boolean) {
                            item.type = "checkbox"
                        } else {
                            item.isError = (value) => validateValueType(value, valueType)
                        }
                    }
                })
            }
        })

        return newNav
    }
    return subNav
}

export const updateValidateRuleForFormMenuItems = (valueType, items = []) => {
    if (valueType !== undefined) {
        const newItems = cloneDeep(items)
        newItems.forEach((item) => {
            if (item.id === "valueString") {
                if (valueType === VALUE_TYPE.boolean) {
                    item.type = "checkbox"
                } else {
                    item.type = "text"
                    item.isError = (value) => validateValueType(value, valueType)
                }
            }
        })
        return newItems
    }
    return items
}

export const handleGanttChartData = (segments, segmentRelationships) => {
    const result = segments.map((item) => {
        return {
            id: item.segmentId,
            description: item.description,
            begin: 0,
            end: 0,
            duration: item.duration,
        }
    })

    segmentRelationships.forEach((item) => {
        let time, begin, end, prevEnd
        const segA = result.find((s) => s.id === item.segmentA)
        const segB = result.find((s) => s.id === item.segmentB)

        switch (item.relation) {
            case SEGMENT_RELATION.afterJustDone:
            case SEGMENT_RELATION.after:
                prevEnd = item.segmentA === "start-segment" ? 0 : segA.end
                begin = segB.begin > prevEnd ? segB.begin : prevEnd
                time = segB.duration
                end = begin + time
                break

            case SEGMENT_RELATION.afterWithDuration:
                prevEnd = item.segmentA === "start-segment" ? 0 : segA.end
                begin = segB.begin > prevEnd ? segB.begin : prevEnd
                begin += item.duration
                time = segB.duration
                end = begin + time
                break
            default:
        }

        result.forEach((r) => {
            if (r.id === segB.id) {
                r.begin = begin
                r.end = end
            }
        })
    })
    return result.map((item) => ({
        x: item.id,
        y: [item.begin, item.end],
        name: item.description,
    }))
}

export const handleScheduleDataByMachine = (data) => {
    const result = []
    data.forEach((item) => {
        const index = result.findIndex((_item) => _item.name === item.materialDefinition)
        if (index >= 0) {
            result[index].name = item.materialDefinition
            result[index].data.push({
                x: item.equipment,
                y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
            })
        } else {
            result.push({
                name: item.materialDefinition,
                data: [
                    {
                        x: item.equipment,
                        y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
                    },
                ],
            })
        }
    })

    return result
}

export const handleScheduleDataByProduct = (data) => {
    const result = []
    data.forEach((item) => {
        const index = result.findIndex((_item) => _item.name === item.equipment)
        if (index >= 0) {
            result[index].name = item.equipment
            result[index].data.push({
                x: item.materialDefinition,
                y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
            })
        } else {
            result.push({
                name: item.equipment,
                data: [
                    {
                        x: item.materialDefinition,
                        y: [new Date(item.scheduledStartDate).getTime(), new Date(item.scheduledEndDate).getTime()],
                    },
                ],
            })
        }
    })

    return result
}

export const handleScheduledData = (schedulingProducts, shifts) => {
    const data = []
    const dataByEquipment = {}
    let valid = true

    schedulingProducts.forEach((item) => {
        const productId = item.materialDefinition
        const equipmentId = item.equipmentId

        if (!item.equipmentId.length) {
            toast.error(`Thiết bị của sản phẩm ${productId} không được bỏ trống`)
            valid = false
            return
        }

        const dueDate = new Date(item.dueDate)

        if (!item.startDate) {
            toast.error(`Ngày bắt đầu của sản phẩm ${productId} không được bỏ trống`)
            valid = false
            return
        }
        if (!item.endDate) {
            toast.error(`Ngày kết thúc của sản phẩm ${productId} không được bỏ trống`)
            valid = false
            return
        }

        const startDate = new Date(item.startDate)
        const endDate = new Date(item.endDate)

        if (!item.startShift?.length) {
            toast.error(`Ca bắt đầu của sản phẩm ${productId} không được bỏ trống`)
            valid = false
            return
        }
        if (!item.endShift?.length) {
            toast.error(`Ca kết thúc của sản phẩm ${productId} không được bỏ trống`)
            valid = false
            return
        }

        const startTime = shifts[item.startShift[0]].startTime
        const endTime = shifts[item.endShift[0]].endTime
        startDate.setHours(...startTime.split(":"))
        endDate.setHours(...endTime.split(":"))

        if (dueDate < endDate) {
            toast.error(`Ngày hoàn thành của sản phẩm ${productId} không được nhỏ hơn ngày đến hạn`)
            valid = false
            return
        }

        if (startDate > endDate) {
            toast.error(`Ngày bắt đầu của sản phẩm ${productId} không được lớn hơn ngày hoàn thành`)
            valid = false
            return
        }

        if (dataByEquipment[equipmentId]?.length) {
            dataByEquipment[equipmentId].push({ startDate, endDate })
        } else {
            dataByEquipment[equipmentId] = [{ startDate, endDate }]
        }

        data.push({
            scheduledStartDate: startDate.toISOString(),
            scheduledEndDate: endDate.toISOString(),
            equipment: item.equipmentId[0],
            workOrderId: item.workOrderId,
        })
    })

    for (let key in dataByEquipment) {
        const item = dataByEquipment[key]
        item.sort((a, b) => a.startDate - b.startDate)
        for (let i = 0; i < item.length - 1; i++) {
            const prevEndDate = new Date(item[i].endDate)
            const nextStartDate = new Date(item[i + 1].startDate)
            if (prevEndDate > nextStartDate) {
                toast.error(`Các ngày hoạt động của máy ${key} không được chồng lấn lên nhau`)
                valid = false
                return
            }
        }
    }

    return valid ? data : null
}

export const convertISOToLocaleDate = (date) => {
    return new Date(date)
        .toLocaleString("vi")
        .replace(/^([\d]?[\d])/, (val) => (Number(val) <= 16 ? Number(val) + 7 : Number(val) + 7 - 24))
}
