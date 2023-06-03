import axiosClient from "./axiosClient"

const resourceApi = {
    worker: {
        getWorkerClasses: async () => await axiosClient.get("/personnelClasses"),
        createWorkerClass: async (data) => await axiosClient.post("/personnelClasses", data),
        updateWorkerClass: async (data, classId) => await axiosClient.put(`/personnelClasses/${classId}`, data),
        deleteWorkerClass: async (id) => await axiosClient.delete(`/personnelClasses/${id}`),

        getWorkers: async () => await axiosClient.get("/persons"),
        createWorker: async (data) => await axiosClient.post("/persons", data),
        updateWorker: async (data, workerId) => await axiosClient.put(`/persons/${workerId}`, data),
        deleteWorker: async (workerId) => await axiosClient.delete(`/persons/${workerId}`),
    },
    equipment: {
        getEquipmentClasses: async () => await axiosClient.get("/equipmentClasses"),
        createEquipmentClass: async (data) => await axiosClient.post("/equipmentClasses", data),
        updateEquipmentClass: async (data, classId) => await axiosClient.put(`/equipmentClasses/${classId}`, data),
        deleteEquipmentClass: async (classId) => await axiosClient.delete(`/equipmentClasses/${classId}`),

        getEquipments: async () => await axiosClient.get("/equipments?PageIndex=1&PageSize=1000"),
        createEquipment: async (data) => await axiosClient.post("/equipments", data),
        updateEquipment: async (data, workerId) => await axiosClient.put(`/equipments/${workerId}`, data),
        deleteEquipment: async (workerId) => await axiosClient.delete(`/equipments/${workerId}`),

        getAllEquipmentOutputs: async () => await axiosClient.get("/equipments/outputs"),
        createEquipmentOuput: async (id, data) => axiosClient.post(`/equipments/${id}/outputs`, data),
        getEquipmentOutputs: async (id) => axiosClient.get(`/equipments/${id}/outputs`),
        updateEquipmentOutput: async (equipmentId, materialId, data) =>
            axiosClient.put(`/equipments/${equipmentId}/outputs/${materialId}`, data),
        deleteEquipmentOutput: async (equipmentId, materialId) =>
            axiosClient.delete(`/equipments/${equipmentId}/outputs/${materialId}`),
    },
    material: {
        getMaterialClasses: async () => await axiosClient.get("/materialClasses"),
        createMaterialClass: async (data) => await axiosClient.post("/materialClasses", data),
        updateMaterialClass: async (data, classId) => await axiosClient.put(`/materialClasses/${classId}`, data),
        deleteMaterialClass: async (classId) => await axiosClient.delete(`/materialClasses/${classId}`),

        getMaterials: async () => await axiosClient.get("/materialDefinitions?PageIndex=1&PageSize=1000"),
        createMaterial: async (data) => await axiosClient.post("/materialDefinitions", data),
        updateMaterial: async (data, workerId) => await axiosClient.put(`/materialDefinitions/${workerId}`, data),
        deleteMaterial: async (workerId) => await axiosClient.delete(`/materialDefinitions/${workerId}`),
    },
}

export default resourceApi
