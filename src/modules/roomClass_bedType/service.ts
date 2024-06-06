import api from '@/utils/api'
export const getBedTypeByHotelId= async (hotelId: any): Promise<any> => {
    try {
        const response = await api.get(`/roomClass_bedType/bedTypesByHotel?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};