import { AxiosRequestConfig } from "axios";
import api from '@/utils/api'
export const getAllDistrict= async (): Promise<any> => {
    try {
        const response = await api.get('/district/all');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getDistrictByProvinceId= async (params: any): Promise<any> => {
    try {
        const response = await api.get(`/district/districtOfProvince?provinceId=${params}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};