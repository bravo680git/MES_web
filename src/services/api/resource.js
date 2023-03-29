import axiosClient from "./axiosClient"

const resourceApi = {
    worker: {
        getWorkerClasses: async () => await axiosClient.get("/PersonnelClasses"),
        createWorkerClass: async (data) => await axiosClient.post("/PersonnelClasses", data),
        updateWorkerClass: async (data, classId) => await axiosClient.put(`/PersonnelClasses/${classId}`, data),

        getWorkers: async () => await axiosClient.get("/persons"),
        createWorker: async (data) => await axiosClient.post("/persons", data),
        updateWorker: async (data, workerId) => await axiosClient.put(`/persons/${workerId}`, data),
    },
    equipment: {
        getEquipmentClasses: async () => await axiosClient.get("/EquipmentClasses"),
        createEquipmentClass: async (data) => await axiosClient.post("/EquipmentClasses", data),
        updateEquipmentClass: async (data, classId) => await axiosClient.put(`/EquipmentClasses/${classId}`, data),
    },
}

export default resourceApi
