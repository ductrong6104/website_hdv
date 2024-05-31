import { AxiosRequestConfig } from "axios";
import api from '@/utils/api'
export const getAllCommune= async (): Promise<any> => {
    try {
        const response = await api.get('/commune/all');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getCommuneByDistrictId= async (params: any): Promise<any> => {
    try {
        const response = await api.get(`/commune/communeOfDistrict?districtId=${params}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};