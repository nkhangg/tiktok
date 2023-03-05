import axios from '../api/axios/httpBase';
import { UpdateProps } from '../interface';
import { apiCurUserType, apiGetUsersType, apiProfile, apiToken, apiUpdateUser, apiUserType } from '../type';

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
export const apiRegister: apiUserType = (email, password) =>
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
export const apiLogin: apiToken = (email, password) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'post',
                url: '/auth/login',
                data: {
                    email,
                    password,
                },
            });

            resolve(responce.data);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetCurUser: apiCurUserType = (token: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'get',
                url: '/auth/me',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetProfile: apiProfile = (nickname: string, token?: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'get',
                url: `/users/${nickname}`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });

export const apiUnfolow: apiUserType = (id: string, token?: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'post',
                url: `/users/${id}/unfollow`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });

export const apiFolow: apiUserType = (id: string, token?: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'post',
                url: `/users/${id}/follow`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateProfile: apiUpdateUser = (data: UpdateProps, token?: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                method: 'post',
                url: `/auth/me?_method=PATCH`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    first_name: data.firstname,
                    last_name: data.lastname,
                    avatar: data.avatar,
                    bio: data.bio,
                },
            });

            resolve(responce.data.data);
        } catch (error) {
            reject(error);
        }
    });
