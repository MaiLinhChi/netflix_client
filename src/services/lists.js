import * as httpRequest from '@/utils/httpRequest';

export const getLists = async (type, genre) => {
    try {
        const res = await httpRequest.get(`/lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
