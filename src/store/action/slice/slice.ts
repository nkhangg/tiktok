import { RefObject } from 'react';
import { AvatarEdited, EditAvatar, User } from '../../../interface';
import { actionType } from '../actionType';

export const slOpenLogin = (flag: boolean = false) => {
    return { type: actionType.SET_STATE_LOGIN, data: flag };
};

export const slOpenEdit = (flag: boolean = false) => {
    return { type: actionType.SET_OPEN_EDIT, data: flag };
};

export const slSetDarkMode = (flag: boolean) => {
    return { type: actionType.SET_DARK_MODE, data: flag };
};

export const slSetFullScrennMode = (flag: boolean = false) => {
    return { type: actionType.SET_PROFILE_MODE, data: flag };
};

export const slLogout = () => {
    return { type: actionType.SET_LOGOUT, data: false };
};

export const slSetScrollIntoView = (flag: boolean) => {
    return { type: actionType.SCROLLINTOVIEW, data: flag };
};

export const slSetPlayAVideo = (data: RefObject<HTMLVideoElement>) => {
    return { type: actionType.SET_PLAY_A_VIDEO, data };
};

export const slSetTypeMode = (data: string | null) => {
    return { type: actionType.SIGN_WITH_USERNAME, data };
};

export const slSetIsLogin = (flag: boolean) => {
    return { type: actionType.SET_ISLOGIN, data: flag };
};
export const slSetToken = (data: String) => {
    return { type: actionType.SET_TOKEN, data };
};
export const slSetImageUser = (data: { image: string; to: string }) => {
    return { type: actionType.SET_INIT_USER, data };
};

export const slSetBirth = (value: string | number, type: 'month' | 'day' | 'year') => {
    switch (type) {
        case 'month': {
            return { type: actionType.SET_MONTH, data: value };
        }

        case 'day': {
            return { type: actionType.SET_DAY, data: value };
        }

        case 'year': {
            return { type: actionType.SET_YEAR, data: value };
        }
    }
};

export const slSetUser = (data: User | null) => {
    return {
        type: actionType.SET_USER,
        data,
    };
};

export const slSetLogin = (data: boolean) => {
    return {
        type: actionType.SET_LOGIN,
        data,
    };
};

export const slSetEditAvatarProfile = (data: EditAvatar) => {
    return {
        type: actionType.SET_EDIT_AVATAR_PROFILE,
        data,
    };
};

export const slSetAvatarEdited = (data: AvatarEdited) => {
    return {
        type: actionType.SET_AVATAR_EDITED,
        data,
    };
};

export const slSetLoginLoading = (data: boolean) => {
    return {
        type: actionType.SET_LOGIN_LOAIDNG,
        data,
    };
};

export const slSetUpdateProfileLoading = (data: boolean) => {
    return {
        type: actionType.SET_LOADING_UPDATE_PROFILE,
        data,
    };
};

export const slSetHiddenHeader = (data: boolean) => {
    return {
        type: actionType.SET_HIDDEN_HEADER,
        data,
    };
};

export const slSetShowNoty = (data: { isShow: boolean; content: string }) => {
    return {
        type: actionType.SET_SHOW_NOTY,
        data,
    };
};
