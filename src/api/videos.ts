import axios from 'axios';
import { apiGetVideo } from '../type';

export const api = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api',
});

export const apiGetVideos: apiGetVideo = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/videos?type=for-you&page=${pageParam}`, options);
    return response.data.data;
};
