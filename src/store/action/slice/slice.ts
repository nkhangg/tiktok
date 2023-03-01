import { RefObject } from 'react';
import { actionType } from '../actionType';

export const slOpenLogin = (flag: boolean = false) => {
    return { type: actionType.SET_STATE_LOGIN, data: flag };
};

export const slSetDarkMode = (flag: boolean) => {
    return { type: actionType.SET_DARK_MODE, data: flag };
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

export const slSetSignWithUsername = (flag: boolean) => {
    return { type: actionType.SIGN_WITH_USERNAME, data: flag };
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
