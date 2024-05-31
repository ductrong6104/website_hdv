import api from '@/utils/api'

export const addRoomClass= async (newRoomClass: any): Promise<any> => {
    try {
        const response = await api.post(`/roomClass/add`, newRoomClass);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

