import axios from 'axios';
import { apiGetAVideo as typeApiGetAVideo, apiGetVideo, apiGetComments as typeApiGetComments } from '../type';

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
