import * as httpRequest from '@/utils/httpRequest';

export const getCommentOfMovie = async (params) => {
    try {
        const res = await httpRequest.Get(`/comments/comment-of-movie`, {
            params,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const storeComment = async (comment) => {
    try {
        const res = await httpRequest.Post(`/comments/create`, comment);
        return res;
    } catch (error) {
        console.log(error);
    }
};
