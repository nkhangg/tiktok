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
