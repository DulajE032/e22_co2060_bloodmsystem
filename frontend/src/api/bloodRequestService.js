import axios from 'axios';

const getAuthToken = () => {
    const stored = localStorage.getItem('authTokens');
    return stored ? JSON.parse(stored)?.access : null;
};

const bloodRequestAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/bloodinventor/doctor',
    headers: {
        'Content-Type': 'application/json',
    },
});

bloodRequestAPI.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const getDoctorRequests = async () => {
    try {
        const response = await bloodRequestAPI.get('/requests/');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

export const createBloodRequest = async (requestData) => {
    try {
        const response = await bloodRequestAPI.post('/requests/', requestData);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};
