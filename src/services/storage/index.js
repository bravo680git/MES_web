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
