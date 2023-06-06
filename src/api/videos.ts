import axios from 'axios';
import { apiGetAVideo as typeApiGetAVideo, apiGetVideo, apiGetComments as typeApiGetComments, apiPostComments, apiPostVideo as typePostVideo } from '../type';
import { PostVideoProps } from '../interface';

export const api = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api',
    headers: {
        Authorization: 'Bearer ' + JSON.parse(JSON.parse(localStorage.getItem('persist:user') || '').token),
    },
});

export const apiGetVideos: apiGetVideo = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/videos?type=for-you&page=${pageParam}`, options);
    return response.data.data;
};

export const apiPostVideo: typePostVideo = async (data: PostVideoProps) => {
    const response = await api({
        method: 'POST',
        url: '/videos',
        data,
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
    return response.data.data;
};

export const apiGetAVideo: typeApiGetAVideo = async (id: number | string | undefined) => {
    if (id === undefined) {
        return;
    }

    const response = await api.get(`/videos/${id}`);
    return response.data.data;
};

export const apiGetComments: typeApiGetComments = async (id: number | string | undefined) => {
    if (id === undefined) {
        return;
    }

    const response = await api.get(`videos/${id}/comments`);

    return response.data.data;
};

export const apiAddComment: apiPostComments = async (id: number | string | undefined, data: string) => {
    if (id === undefined) {
        return;
    }

    const response = await api({
        method: 'POST',
        url: `videos/${id}/comments`,
        data: {
            comment: data,
        },
    });

    return response.data.data;
};
