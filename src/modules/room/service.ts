import api from '@/utils/api'

export const getRoomByHotelId= async (hotelId: any): Promise<any> => {
    try {
        const response = await api.get(`/room/roomsByHotel?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

