import axios from 'axios';
import Cookies from 'js-cookie';

console.log(Cookies.get('refresh_token'));

const httpRequest = axios.create({
    baseURL: 'https://netflix-api-adp1.onrender.com',
});

export const get = async (url, options = {}) => {
    const res = await httpRequest.get(url, options);
    return res;
};

export const post = async (url, options = {}) => {
    const res = await httpRequest.post(url, options);
    return res;
};
