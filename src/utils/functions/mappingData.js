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
