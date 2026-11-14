import axios from 'axios';

// Instancia única de axios; la URL base viene del .env (VITE_API_URL)
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Lee el token en cada petición para que login/logout apliquen sin recargar
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
