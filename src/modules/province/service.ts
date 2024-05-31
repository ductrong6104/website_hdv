import { AxiosRequestConfig } from "axios";
import api from '@/utils/api'
export const getAllProvince= async (): Promise<any> => {
    try {
        const response = await api.get('/province/all');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

