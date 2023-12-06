import axios from 'axios';

import { clearAuthData, getLocalStorage, setLocalStorage, redirectToLogin } from './function';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

httpRequest.interceptors.request.use(
    (config) => {
        const access_token = getLocalStorage('access_token');
        config.headers['Authorization'] = `Bearer ${access_token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

httpRequest.interceptors.response.use(
    (response) => {
        if (response.data.accessToken) {
            setLocalStorage('access_token', response.data.accessToken);
        }
        if (response.data.refreshToken) {
            setLocalStorage('refresh_token', response.data.refreshToken);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const refresh_token = getLocalStorage('refresh_token');
        if (!refresh_token) {
            clearAuthData();
            redirectToLogin();
        }

        if (error?.response?.status === 401 || (error?.response?.status === 403 && !originalRequest._retry)) {
            originalRequest._retry = true;
            try {
                // call api refresh token
                const { data } = await Post('/auth/refresh_token', {
                    refreshToken: refresh_token,
                });
                const { newAccessToken, newRefreshToken } = data;
                // set new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // save local
                setLocalStorage('access_token', newAccessToken);
                setLocalStorage('refresh_token', newRefreshToken);
                // handle again
                return httpRequest(originalRequest);
            } catch (error) {
                clearAuthData();
                redirectToLogin();
            }
        }
        return Promise.reject(error);
    },
);

export const Get = async (url, options = {}) => {
    const res = await httpRequest.get(url, options);
    return res;
};

export const Post = async (url, options = {}) => {
    const res = await httpRequest.post(url, options);
    return res;
};

export const Delete = async (url, options = {}) => {
    const res = await httpRequest.delete(url, options);
    return res;
};
