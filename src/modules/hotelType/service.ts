import { AxiosRequestConfig } from "axios";
import api from '@/utils/api'
export const getAllHotelType= async (): Promise<any> => {
    try {
        const response = await api.get('/hotelType/all');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};