import axios from "axios"

export const apiConfig = {
    baseUrl: 'http://localhost:5050/',
    timeout: 10000,
}

const api = axios.create(apiConfig)
console.log('Creating axios instance with config: ', apiConfig)

export default api