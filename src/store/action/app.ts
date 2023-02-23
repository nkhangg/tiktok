import { Action } from '../../interface';
import { actionType } from './actionType';
export interface InitStateApp {
    isLoggedIn: boolean;
    darkMode: boolean;
    isOpenLogin: boolean;
    scrollIntView: boolean;
}
const initState = {
    isLoggedIn: false,
    darkMode: false,
    isOpenLogin: false,
    scrollIntView: false,
};

const appReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.data,
            };

        case actionType.SET_STATE_LOGIN:
            return {
                ...state,
                isOpenLogin: action.data,
            };
        case actionType.SET_LOGOUT:
            return {
                ...state,
                isLoggedIn: action.data,
            };
        case actionType.SCROLLINTOVIEW:
            return {
                ...state,
                scrollIntView: action.data,
            };
        default:
            return state;
    }
};

export default appReducer;
