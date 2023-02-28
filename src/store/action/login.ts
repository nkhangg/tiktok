import { Action } from '../../interface';
import { actionType } from './actionType';
export interface InitStateApp {
    signUsername: boolean;
}
const initState = {
    signUsername: false,
};

const loginReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SIGN_WITH_USERNAME:
            return {
                ...state,
                signUsername: action.data,
            };

        default:
            return state;
    }
};

export default loginReducer;
