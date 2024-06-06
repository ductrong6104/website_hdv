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

export const getBedTypesNotByHotel_roomClassId= async (hotelRoomClassId: any): Promise<any> => {
    try {
        const response = await api.get(`/roomClass_bedType/bedTypesNotByHotel_roomClassId?hotel_roomClassId=${hotelRoomClassId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getBedTypesByHotel_roomClassId= async (hotelRoomClassId: any): Promise<any> => {
    try {
        const response = await api.get(`/roomClass_bedType/bedTypesByHotel_roomClass?hotel_roomClassId=${hotelRoomClassId}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const addRoomClass_bedType = async (roomClass_bedType: any): Promise<any> => {
    try {
        const response = await api.post(`/roomClass_bedType/add`, roomClass_bedType);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};