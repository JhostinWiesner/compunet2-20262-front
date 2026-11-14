import { api } from '../api/api';

export const getRoutines = async () => {
    const res = await api.get('/routines');
    return res.data;
};
