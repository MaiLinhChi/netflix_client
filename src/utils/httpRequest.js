import axios from 'axios';

const httpRequest = axios.create({
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    credentials: 'include',
    baseURL: import.meta.env.VITE_API_URL,
});

export const get = async (url, options = {}) => {
    const res = await httpRequest.get(url, options);
    return res;
};

export const post = async (url, options = {}) => {
    const res = await httpRequest.post(url, options);
    return res;
};
