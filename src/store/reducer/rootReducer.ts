import { combineReducers } from 'redux';
import appReducer from '../action/app';
import follwingReducer from '../action/follwing';
import loginReducer from '../action/login';

const rootReducer = combineReducers({
    app: appReducer,
    follwing: follwingReducer,
    login: loginReducer,
});
export default rootReducer;
