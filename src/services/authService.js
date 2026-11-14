import { api } from '../api/api';

export const login = async (credentials) => {
    const res = await api.post('/public/auth/login', credentials);
    return res.data; // { accessToken }
};
