import { combineReducers } from 'redux';
import appReducer from '../action/app';
import follwingReducer from '../action/follwing';

const rootReducer = combineReducers({
    app: appReducer,
    follwing: follwingReducer,
});
export default rootReducer;
