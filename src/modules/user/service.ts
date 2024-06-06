import api from '@/utils/api_user'
export const addNewUser= async (newUser: any): Promise<any> => {
    try {
        const response = await api.post(`/users`, newUser);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};
