const axiosClientConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status < 400,
}

export { axiosClientConfig }
