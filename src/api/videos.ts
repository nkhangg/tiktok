import axios from 'axios';
import { apiGetVideo } from '../type';

export const apiGetVideos: apiGetVideo = async (page = 1, option = {}) => {
    const responce = await axios.get(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${page}`, option);

    return responce.data.data;
};
