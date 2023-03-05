import { Action, User } from '../../interface';
import { initUserType } from '../../type';
import { actionType } from './actionType';
export interface InitStateApp {
    isLoggedIn: boolean;
    darkMode: boolean;
    isOpenLogin: boolean;
    isOpenEdit: boolean;
    scrollIntView: boolean;
    profileMode: boolean;
    userProfile: User | null;
    initUser: initUserType | null;
    token: string | null;
}
const initState: InitStateApp = {
    isLoggedIn: false,
    darkMode: false,
    isOpenLogin: false,
    isOpenEdit: false,
    scrollIntView: false,
    profileMode: false,
    userProfile: null,
    initUser: null,
    token: null,
};

const appReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.data,
            };
        case actionType.SET_PROFILE_MODE:
            return {
                ...state,
                profileMode: action.data,
            };

        case actionType.SET_STATE_LOGIN:
            return {
                ...state,
                isOpenLogin: action.data,
            };
        case actionType.SET_LOGIN:
            return {
                ...state,
                isLoggedIn: action.data,
            };
        case actionType.SET_LOGOUT:
            return {
                ...state,
                isLoggedIn: action.data,
                user: null,
                token: null,
                initUser: null,
            };
        case actionType.SCROLLINTOVIEW:
            return {
                ...state,
                scrollIntView: action.data,
            };
        case actionType.SET_USER: {
            return {
                ...state,
                userProfile: action.data,
            };
        }
        case actionType.SET_TOKEN: {
            return {
                ...state,
                token: action.data,
            };
        }
        case actionType.SET_INIT_USER: {
            return {
                ...state,
                initUser: action.data,
            };
        }
        case actionType.SET_OPEN_EDIT: {
            return {
                ...state,
                isOpenEdit: action.data,
            };
        }

        default:
            return state;
    }
};

export default appReducer;
