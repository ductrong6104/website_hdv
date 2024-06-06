import api from '@/utils/api'
export const addBedType= async (newBedType: any): Promise<any> => {
    try {
        const response = await api.post(`/bedType/add`, newBedType);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};
