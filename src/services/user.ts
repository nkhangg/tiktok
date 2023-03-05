import { AnyAction, Dispatch } from 'redux';
import { apiGetCurUser } from '../api/users';
import { slSetUser } from '../store/action/slice/slice';

export const setCurUser = (token: string) => async (dispatch: Dispatch<AnyAction>) => {
    const responce = await apiGetCurUser(token);
    try {
        if (responce) {
            dispatch(slSetUser(responce));
        } else {
            dispatch(slSetUser(null));
        }
    } catch (error) {
        dispatch(slSetUser(null));
    }
};
