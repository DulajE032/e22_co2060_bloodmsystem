import axios from 'axios';

const donorAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/donor/public',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const scanDonorQR = async (qrId) => {
    try {
        const response = await donorAPI.get(`/${qrId}/`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};
