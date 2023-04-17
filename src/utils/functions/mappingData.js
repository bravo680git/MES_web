export const resourceMapper = {
    resourceClass: {
        clientToApi: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            return {
                ...value.info,
                properties,
            }
        },
        apiToClient: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    property: {
                        ...item,
                        valueType: [item.valueType],
                    },
                })) ?? []

            return {
                info: {
                    ...value,
                    properties: undefined,
                },
                properties,
            }
        },
    },
    resource: {
        clientToApi: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            return {
                ...value.info,
                properties,
            }
        },
        apiToClient: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    property: {
                        ...item,
                        valueType: [item.valueType],
                    },
                })) ?? []

            return {
                info: {
                    ...value,
                    properties: undefined,
                },
                properties,
            }
        },
    },
}

export const productMapper = {
    clientToAPi(data) {
        const productInfo = data.info
        const segments = data.segments.map((segment) => {
            const personnelSpecifications =
                segment.personnelSpecifications?.map((item) => ({
                    ...item.info,
                    personnelClassId: item.info.personnelClassId[0],
                    properties: [],
                })) ?? []
            const equipmentSpecifications =
                segment.equipmentSpecifications?.map((item) => ({
                    ...item.info,
                    equipmentClassId: item.info.equipmentClassId[0],
                    properties: [],
                })) ?? []
            const materialSpecifications =
                segment.materialSpecifications?.map((item) => ({
                    ...item.info,
                    materialDefinitionId: item.info.materialDefinitionId[0],
                    properties: [],
                })) ?? []
            const properties =
                segment.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            const segmentInfo = segment.info
            return {
                productSegmentId: segmentInfo.productSegmentId,
                description: segmentInfo.description,
                duration: segmentInfo.duration,
                durationUnit: segmentInfo.durationUnit[0],
                personnelSpecifications,
                equipmentSpecifications,
                materialSpecifications,
                properties,
            }
        })

        const segmentRelationships =
            data.segmentRelationships?.map((item) => {
                const segmentRelationship = item.info
                return {
                    segmentA: segmentRelationship.segmentA[0],
                    segmentB: segmentRelationship.segmentB[0],
                    durationUnit: segmentRelationship.durationUnit[0],
                    relation: segmentRelationship.relation[0],
                    duration: segmentRelationship.duration,
                }
            }) ?? []

        return {
            ...productInfo,
            segments,
            segmentRelationships,
        }
    },
}