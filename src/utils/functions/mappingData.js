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
                    properties: [],
                    persons: [],
                    description: "",
                })) ?? []
            const equipmentSpecifications =
                segment.equipmentSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    equipments: [],
                    description: "",
                })) ?? []
            const materialSpecifications =
                segment.materialSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    materialDefinitions: [],
                    description: "",
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
                durationUnitOfMeasure: segmentInfo.durationUnit[0],
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
                    aSegmentId: segmentRelationship.segmentA[0],
                    bSegmentId: segmentRelationship.segmentB[0],
                    timeWindowUnitOfMeasure: segmentRelationship.durationUnit[0],
                    dependencyType: segmentRelationship.relation[0],
                    timeWindow: segmentRelationship.duration,
                    description: "",
                }
            }) ?? []

        return {
            ...productInfo,
            version: 0,
            productSegments: segments,
            productSegmentDependencies: segmentRelationships,
        }
    },
}
