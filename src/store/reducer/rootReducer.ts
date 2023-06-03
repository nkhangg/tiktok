import { combineReducers } from 'redux';
import appReducer from '../action/app';
import follwingReducer from '../action/follwing';
import loginReducer from '../action/login';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import profileReducer from '../action/profile';
import notyReducer from '../action/notyfication';

const appConfig = {
    storage,
    autoMergeLevel2,
    key: 'user',
    whitelist: ['isLoggedIn', 'darkMode', 'initUser', 'token'],
};

const persistedReducer = persistReducer<any, any>(appConfig, appReducer);

const rootReducer = combineReducers({
    app: persistedReducer,
    follwing: follwingReducer,
    login: loginReducer,
    profile: profileReducer,
    notyfication: notyReducer,
});

export default rootReducer;
