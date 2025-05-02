// src/services/api/config.js

export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    endpoints: {
        customers: {
            getAll: '/customer/get/all',
            create: '/customer/add',
            update: '/customer/update',
            delete: '/customer/delete',
            getById: '/customer/get'
        },
        companies: {
            getAll: '/allcompanies'
        },
        auth: {
            login: '/auth/login',
            logout: '/auth/logout',
            refresh: '/auth/refresh'
        }
        // Você pode adicionar mais endpoints conforme necessário
    }
};

export const axiosConfig = {
    baseURL: API_CONFIG.baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token': localStorage.getItem('token')
    },
    timeout: 30000 // 30 segundos
};