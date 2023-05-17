import axiosClient from "./axiosClient"

const resourceApi = {
    worker: {
        getWorkerClasses: async () => await axiosClient.get("/personnelClasses"),
        createWorkerClass: async (data) => await axiosClient.post("/personnelClasses", data),
        updateWorkerClass: async (data, classId) => await axiosClient.put(`/personnelClasses/${classId}`, data),

        getWorkers: async () => await axiosClient.get("/persons"),
        createWorker: async (data) => await axiosClient.post("/persons", data),
        updateWorker: async (data, workerId) => await axiosClient.put(`/persons/${workerId}`, data),
    },
    equipment: {
        getEquipmentClasses: async () => await axiosClient.get("/equipmentClasses"),
        createEquipmentClass: async (data) => await axiosClient.post("/equipmentClasses", data),
        updateEquipmentClass: async (data, classId) => await axiosClient.put(`/equipmentClasses/${classId}`, data),

        getEquipments: async () => await axiosClient.get("/equipments?PageIndex=1&PageSize=1000"),
        createEquipment: async (data) => await axiosClient.post("/equipments", data),
        updateEquipment: async (data, workerId) => await axiosClient.put(`/equipments/${workerId}`, data),
    },
    material: {
        getMaterialClasses: async () => await axiosClient.get("/materialClasses"),
        createMaterialClass: async (data) => await axiosClient.post("/materialClasses", data),
        updateMaterialClass: async (data, classId) => await axiosClient.put(`/materialClasses/${classId}`, data),

        getMaterials: async () => await axiosClient.get("/materialDefinitions?PageIndex=1&PageSize=1000"),
        createMaterial: async (data) => await axiosClient.post("/materialDefinitions", data),
        updateMaterial: async (data, workerId) => await axiosClient.put(`/materialDefinitions/${workerId}`, data),
    },
}

export default resourceApi
