import { Action } from '../../interface';
import { actionType } from './actionType';

export interface InitStateApp {
    loading: boolean;
}
const initState = {
    loading: false,
};

const profileReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SET_LOADING_UPDATE_PROFILE:
            return {
                ...state,
                loading: action.data,
            };

        default:
            return state;
    }
};

export default profileReducer;
