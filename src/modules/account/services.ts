import api from '@/utils/api_user'
export const addNewAccount= async (newAccount: any): Promise<any> => {
    try {
        const response = await api.post(`/accounts`, newAccount);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getAccountByEmail= async (email: any): Promise<any> => {
    try {
        const response = await api.get(`/accounts/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};

export const getUserByAccountId= async (accountId: any): Promise<any> => {
    try {
        const response = await api.get(`/accounts/${accountId}/users`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
};
