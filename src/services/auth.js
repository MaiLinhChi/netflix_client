import * as httpRequest from '@/utils/httpRequest';

export const register = async (user) => {
    try {
        const res = await httpRequest.Post(`/auth/register`, user);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (user) => {
    try {
        const res = await httpRequest.Post(`/auth/login`, user);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (refreshToken) => {
    try {
        const res = await httpRequest.Delete(`/auth/logout`, { data: refreshToken });
        return res;
    } catch (error) {
        console.log(error);
    }
};
