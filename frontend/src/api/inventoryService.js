import axios from 'axios';

const inventoryAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/bloodinventor/public',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBloodStock = async () => {
    try {
        const response = await inventoryAPI.get('/live-stock/');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};
