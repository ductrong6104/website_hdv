import api from '@/utils/api'
export const getRoomClassByHotelId= async (hotelId: any): Promise<any> => {
    try {
        const response = await api.get(`/hotel_roomClass/roomClassByHotel?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getHotel_roomClassRoomByHotelId= async (hotelId: any): Promise<any> => {
    try {
        const response = await api.get(`/hotel_roomClass/hotel_roomClassRoomByHotel?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getRoomClassNotByHotelId= async (hotelId: any): Promise<any> => {
    try {
        const response = await api.get(`/hotel_roomClass/roomClassNotByHotel?hotelId=${hotelId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const addRoomClassForHotel= async (roomClass: any): Promise<any> => {
    try {
        const response = await api.post(`/hotel_roomClass/add`, roomClass);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

