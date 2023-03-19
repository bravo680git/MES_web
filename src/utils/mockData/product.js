export const PRODUCT_SEGMENTS_MOCK_DATA = [
    {
        segmentId: "công đoạn 3",
        workerType: ["giao hàng", "kho"],
        equipmentType: ["Máy ép nhựa"],
        material: ["Nhựa PVC"],
        duration: 15,
    },
    {
        segmentId: "công đoạn 5",
        workerType: ["đứng máy"],
        equipmentType: ["Máy ép cao su", "Máy ép lagging"],
        material: ["Cao su lưu hóa"],
        duration: 8,
    },
    {
        segmentId: "công đoạn 7",
        workerType: ["giao hàng"],
        equipmentType: ["Máy ép lagging"],
        material: ["Cao su non"],
        duration: 10,
    },
    {
        segmentId: "công đoạn 2",
        workerType: ["đứng máy", "kho"],
        equipmentType: ["Máy ép nhựa", "Máy ép cao su"],
        material: ["Nhựa PVC", "Cao su lưu hóa"],
        duration: 7,
    },
    {
        segmentId: "công đoạn 8",
        workerType: ["đứng máy"],
        equipmentType: ["Máy ép cao su"],
        material: ["Cao su lưu hóa", "Nhựa PVC"],
        duration: 3,
    },
    {
        segmentId: "công đoạn 10",
        workerType: ["giao hàng", "kho"],
        equipmentType: ["Máy ép nhựa", "Máy ép lagging"],
        material: ["Nhựa PVC", "Cao su lưu hóa", "Cao su non"],
        duration: 12,
    },
    {
        segmentId: "công đoạn 4",
        workerType: ["giao hàng"],
        equipmentType: ["Máy ép lagging"],
        material: ["Cao su lưu hóa", "Cao su non"],
        duration: 5,
    },
    {
        segmentId: "công đoạn 9",
        workerType: ["đứng máy", "kho"],
        equipmentType: ["Máy ép cao su"],
        material: ["Cao su non"],
        duration: 17,
    },
    {
        segmentId: "công đoạn 1",
        workerType: ["đứng máy"],
        equipmentType: ["Máy ép nhựa", "Máy ép cao su", "Máy ép lagging"],
        material: ["Cao su non", "Nhựa PVC"],
        duration: 20,
    },
    {
        segmentId: "công đoạn 6",
        workerType: ["kho"],
        equipmentType: ["Máy ép nhựa", "Máy ép cao su", "Máy ép lagging"],
        material: ["Cao su lưu hóa", "Nhựa PVC", "Cao su non"],
        duration: 2,
    },
]

export const SEGMENT_WORKER_MOCK_DATA = [
    {
        type: "Đứng máy",
        quantity: "1",
        unit: "người",
    },
    {
        type: "Lấy khuôn",
        quantity: "1",
        unit: "người",
    },
]

export const SEGMENT_EQUIPMENT_MOCK_DATA = [
    {
        type: "Máy ép nhựa",
        quantity: "3",
        unit: "máy",
    },
    {
        type: "Máy ép cao su",
        quantity: "4",
        unit: "máy",
    },
]

export const SEGMENT_MATERIAL_MOCK_DATA = [
    {
        id: "mate-1",
        description: "Vật tư 1",
        quantity: "12",
        unit: "Tấm",
    },
]

export const SEGMENT_PARAMS_MOCK_DATA = [
    {
        description: "Khối lượng tiêu chuẩn",
        value: "0.4",
        unit: "kg",
    },
    {
        description: "Khối lượng tối đa",
        value: "0.6",
        unit: "kg",
    },
    {
        description: "Khối lượng tối thiểu",
        value: "0.2",
        unit: "kg",
    },
]
