import axios from 'axios';

const getAuthToken = () => {
    const stored = localStorage.getItem('authTokens');
    return stored ? JSON.parse(stored)?.access : null;
};

const adminAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/bloodinventor/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

adminAPI.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const getAllBloodRequests = async () => {
    try {
        const response = await adminAPI.get('/blood-requests/');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

export const updateBloodRequestStatus = async (id, data) => {
    try {
        const response = await adminAPI.patch(`/blood-requests/${id}/`, data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

export const getInventoryChanges = async () => {
    try {
        const response = await adminAPI.get('/change-requests/pending/');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

// For Inventory Officer
const officerAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/bloodinventor/officer',
    headers: {
        'Content-Type': 'application/json',
    },
});

officerAPI.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const createInventoryChange = async (data) => {
    try {
        const response = await officerAPI.post('/change-requests/', data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};
