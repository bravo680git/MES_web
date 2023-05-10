import axios from "axios"
// import { authStorageService } from '@/services/browserStorage'
// axios.defaults.adapter = require('axios/lib/adapters/http')
// import https from 'https'

const axiosClient = axios.create({
    // baseURL: process.env.REACT_APP_API_SERVER + '/api',
    // baseURL: 'http://52.231.106.117/api',
    baseURL: "https://thaiduongwebapicloud.azurewebsites.net/api",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status < 400,
})

// axiosClient.interceptors.request.use(
//     async (config) => {
//         const token = authStorageService.accessToken.get()
//         if (token) {
//             config.headers = {
//                 Authorization: `Bearer ${token}`,
//             }
//         }
//         return config
//     },
//     async (error) => Promise.reject(new Error(error)),
// )

axiosClient.interceptors.response.use(
    async (response) => {
        if (response && response.data) {
            return response.data
        }
    },
    async (error) => {
        const errorData = error.response?.data || ""

        return Promise.reject(new Error(errorData))
    },
)

export default axiosClient
