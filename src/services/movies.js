import * as httpRequest from '@/utils/httpRequest';

export const getRandom = async (type = 'movies') => {
    try {
        const res = await httpRequest.get(`/movies/random`, {
            params: {
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        const res = await httpRequest.get(`/movies/find/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSuggest = async (type = 'movies', genre, id) => {
    try {
        const res = await httpRequest.get(`/movies/suggesteds`, {
            params: {
                type,
                genre,
                id,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getByTitle = async (title) => {
    try {
        const res = await httpRequest.get(`/movies/search`, {
            params: {
                q: title,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
