import { Action } from '../../interface';
import { actionType } from './actionType';

export interface InitStateApp {
    signUsername: boolean;
    month: string | null;
    day: string | null;
    year: string | null;
}
const initState = {
    signUsername: false,
    month: null,
    day: null,
    year: null,
};

const loginReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SIGN_WITH_USERNAME:
            return {
                ...state,
                signUsername: action.data,
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

        default:
            return state;
    }
};

export default loginReducer;
