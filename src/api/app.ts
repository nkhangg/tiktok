import axios from '../api/axios/httpBase';
import { apiSearchType } from '../type';

export const apiSearch: apiSearchType = (value, type = 'less') =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'get',
                url: '/users/search',
                params: {
                    q: value,
                    type,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });
