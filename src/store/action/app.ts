import { Action, AvatarEdited, EditAvatar, User } from '../../interface';
import { initUserType } from '../../type';
import { actionType } from './actionType';
export interface InitStateApp {
    isLoggedIn: boolean;
    darkMode: boolean;
    isOpenLogin: boolean;
    isOpenEdit: boolean;
    scrollIntView: boolean;
    fullScreenMode: boolean;
    userProfile: User | null;
    initUser: initUserType | null;
    token: string | null;
    editAvatar: EditAvatar;
    avatarEdited: AvatarEdited;
    hiddenHeader: boolean;
    reloadComments: boolean;
}
const initState: InitStateApp = {
    isLoggedIn: false,
    darkMode: false,
    isOpenLogin: false,
    isOpenEdit: false,
    scrollIntView: false,
    fullScreenMode: false,
    userProfile: null,
    initUser: null,
    token: null,
    hiddenHeader: false,
    reloadComments: false,
    editAvatar: { state: false, image: null },
    avatarEdited: { preview: '', image: null, state: false },
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
                fullScreenMode: action.data,
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
                avatarEdited: { preview: '', image: null, state: false },
            };
        }
        case actionType.SET_EDIT_AVATAR_PROFILE: {
            return {
                ...state,
                editAvatar: action.data,
            };
        }
        case actionType.SET_AVATAR_EDITED: {
            return {
                ...state,
                avatarEdited: action.data,
            };
        }
        case actionType.SET_HIDDEN_HEADER: {
            return {
                ...state,
                hiddenHeader: action.data,
            };
        }
        case actionType.SET_RELOAD_COMMETNS: {
            return {
                ...state,
                reloadComments: action.data,
            };
        }

        default:
            return state;
    }
};

export default appReducer;
