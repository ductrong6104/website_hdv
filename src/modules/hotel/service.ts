import api from '@/utils/api'
import { AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';


export const getHotelUnsucessRegistration = async (): Promise<any> => {
    try {
        const response = await api.get('/hotel/unsucessRegistrationHotels');
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};

export const addHotel = async (params: any): Promise<any> => {
    try {
        const response = await api.post(`/hotel/add`, params);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getAllHotel = async (): Promise<any> => {
    try {
        const response = await api.get('/hotel/all');
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};


export const getHotelsByHotelierId = async (hotelierId: any): Promise<any> => {
    try {
        const response = await api.get(`/hotel/hotelsByHotelier?hotelierId=${hotelierId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};
export const getHotelNameById = async (id: any): Promise<any> => {
    try {
        const response = await api.get(`/hotel/hotelNameById?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};