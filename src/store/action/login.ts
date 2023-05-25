import { Action } from '../../interface';
import { actionType } from './actionType';

export interface InitStateApp {
    typeMode: string | null;
    loginUsername: boolean;
    isLogin: boolean;
    month: string | null;
    day: string | null;
    year: string | null;
    loginLoading: boolean;
}
const initState = {
    typeMode: null,
    loginUsername: false,
    isLogin: false,
    month: null,
    day: null,
    year: null,
    loginLoading: false,
};

const loginReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SIGN_WITH_USERNAME:
            return {
                ...state,
                typeMode: action.data,
            };
        case actionType.LOGIN_WITH_USERNAME:
            return {
                ...state,
                loginUsername: action.data,
            };
        case actionType.SET_ISLOGIN:
            return {
                ...state,
                isLogin: action.data,
            };

        case actionType.SET_MONTH: {
            return {
                ...state,
                month: action.data,
            };
        }
        case actionType.SET_DAY: {
            return {
                ...state,
                day: action.data,
            };
        }
        case actionType.SET_YEAR: {
            return {
                ...state,
                year: action.data,
            };
        }
        case actionType.SET_LOGIN_LOAIDNG: {
            return {
                ...state,
                loginLoading: action.data,
            };
        }

        default:
            return state;
    }
};

export default loginReducer;
