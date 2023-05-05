import axiosClient from "./axiosClient"
// import { handleDeviceID } from '@/ultils'
const handleDeviceID = (deviceId) => {
    let deviceDetails = {
        deviceId: deviceId.split("-")[0],
        mouldSlot: null,
    }
    if (deviceDetails.deviceId === "I1" || deviceDetails.deviceId === "I2") {
        deviceDetails.mouldSlot = "1"
    } else if (deviceDetails.deviceId === "L1") {
        deviceDetails.mouldSlot = deviceId.split("-")[1]
    } else {
        let splitDeviceId = deviceId.split("-")
        deviceDetails.deviceId = splitDeviceId[0] + "-" + splitDeviceId[1]
        deviceDetails.mouldSlot = splitDeviceId[2].slice(-1) === "D" ? "1" : "2"
    }
    return deviceDetails
}
const OeeApi = {
    getOeeDetail: (id) => axiosClient.get(`ShiftReports/shiftId?shiftId=${id}`),
    getOee: (machine, dayStart, dayEnd) => {
        const { deviceId, mouldSlot } = handleDeviceID(machine)
        const url = `ShiftReports?DeviceId=${deviceId}&MouldSlot=${mouldSlot}&StartTime=${dayStart}&EndTime=${dayEnd}`
        return axiosClient.get(url)
    },
}
export default OeeApi
