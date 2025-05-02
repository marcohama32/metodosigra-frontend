// src/services/api/index.js
import axios from 'axios';
import { axiosConfig } from './config';
import router from '@/router';

// Criar instância do axios com as configurações
const api = axios.create(axiosConfig);

// Interceptor para requisições
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor para respostas
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default api;