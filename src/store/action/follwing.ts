import { Action } from '../../interface';
import { actionType } from './actionType';
import { RefObject } from 'react';

export interface InitStateApp {
    videoPlaying: RefObject<HTMLVideoElement> | null;
}
const initState = {
    videoPlaying: null,
};

const follwingReducer = (state: InitStateApp = initState, action: Action<string, string>) => {
    switch (action.type) {
        case actionType.SET_PLAY_A_VIDEO:
            return {
                ...state,
                videoPlaying: action.data,
            };

        default:
            return state;
    }
};

export default follwingReducer;
