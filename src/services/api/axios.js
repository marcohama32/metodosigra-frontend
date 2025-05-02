import axios from 'axios';
import router from '@/router';
import AuthService from '@/services/auth.service';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://metodosigra-backend.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Função para obter o token atualizado
const getAuthToken = () => localStorage.getItem('token');

// Interceptor de request
api.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            config.headers['token'] = token;
        }
        // console.log('Request Config:', config);
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor de response
api.interceptors.response.use(
    response => {
        // console.log('Response Data:', response.data);
        return response.data;
    },
    async error => {
        console.error('Response Error:', error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/login');
                    AuthService.logout();
                    break;
                case 404:
                    console.error('Resource not found:', error.response.config.url);
                    break;
                // Add more cases as needed
                default:
                    console.error('An error occurred:', error.message);
            }
        }
        return Promise.reject(error);
    }
);

// Configurar token inicial se existir
const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['token'] = token;
}

// Interceptor de request para log
api.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            config.headers['token'] = token;
        }
        // console.log('Request Config:', {
        //     method: config.method,
        //     url: config.url,
        //     baseURL: config.baseURL,
        //     params: config.params
        // });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api; 