import { Action } from '../../interface';
import { actionType } from './actionType';

export interface InitStateApp {
    noty: { isShow: boolean; content: string };
}
const initState = {
    noty: { isShow: false, content: '' },
};

const notyReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SET_SHOW_NOTY:
            return {
                ...state,
                noty: action.data,
            };

        default:
            return state;
    }
};

export default notyReducer;
