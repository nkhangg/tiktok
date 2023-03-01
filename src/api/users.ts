import axios from '../api/axios/httpBase';
import { apiGetUsersType, apiRegisterType } from '../type';

export const apiGetUsers: apiGetUsersType = (page = 1, limit = 5) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'get',
                url: '/users/suggested',
                params: {
                    page: page,
                    per_page: limit,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });
export const apiRegister: apiRegisterType = (email, password) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'post',
                url: '/auth/register',
                data: {
                    type: 'email',
                    email,
                    password,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });
