import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://netflix-api-gv40.onrender.com',
});

export const get = async (url, options = {}) => {
    const res = await httpRequest.get(url, options);
    return res;
};

export const post = async (url, options = {}) => {
    const res = await httpRequest.post(url, options);
    return res;
};
