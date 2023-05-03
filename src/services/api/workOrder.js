import axiosClient from "./axiosClient"

const workOrderApi = {
    getWorkOrders: async () => axiosClient.get("/workOrders"),
    createWorkOrder: async (data) => axiosClient.post("/workOrders", data),
    schedulingWorkOrder: async (data, id) => axiosClient.patch(`/workOrders/${id}/schedule`, data),
    startWorkOrder: async (data, id) => axiosClient.patch(`/workOrders/${id}/start`, data),
    closeWorkOrder: async (data, id) => axiosClient.patch(`/workOrders/${id}/close`, data),
}

export default workOrderApi
