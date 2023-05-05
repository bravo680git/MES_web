export const productSchedulingStorageService = {
    get() {
        const workOrders = localStorage.getItem("scheduling-orders")
        return workOrders ? JSON.parse(workOrders) : []
    },
    set(data) {
        localStorage.setItem("scheduling-orders", JSON.stringify(data))
    },
    remove() {
        localStorage.removeItem("scheduling-orders")
    },
}

export const settingStorageService = {
    get(key) {
        const settingJson = localStorage.getItem("setting") ?? "{}"
        const setting = JSON.parse(settingJson)
        return key ? setting[key] : setting
    },
    set(key, value) {
        const setting = this.get()
        setting[key] = value
        localStorage.setItem("setting", JSON.stringify(setting))
    },
    remove() {
        localStorage.removeItem("setting")
    },
}
