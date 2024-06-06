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

export const getRoomById= async (id: any): Promise<any> => {
    try {
        const response = await api.get(`/room/roomById?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const addNewRoomForHotel= async (roomNew: any): Promise<any> => {
    try {
        const response = await api.post(`/room/add`, roomNew);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const editRoom= async (roomEdit: any): Promise<any> => {
    try {
        const response = await api.put(`/room/edit`, roomEdit);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};
