import api from '@/utils/api_user'
export const getAccountToken= async (account: any): Promise<any> => {
    try {
        const response = await api.post(`/auth/gen-account-token`, account);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getUserToken= async (userId: any): Promise<any> => {
    try {
        const response = await api.post(`/auth/gen-user-token`, userId);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};
