import axios from 'axios'
import { storageKeys } from '../utils';

const BASE_API_URL = 'http://localhost:8080/'

export const api = axios.create({
    baseURL: `${BASE_API_URL}/`,
    transformRequest: [(data, headers) => {
        headers['Authorization'] = localStorage.getItem(storageKeys.token) || sessionStorage.getItem(storageKeys.token)
        return JSON.stringify(data)
    }],
    headers: {
        'Content-Type': 'application/json'
    }
})

export const publicApi = axios.create({
    baseURL: `${BASE_API_URL}/public`,
    headers: {
        'Content-Type': 'application/json'
    }
})
