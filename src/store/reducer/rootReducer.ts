import { combineReducers } from 'redux';
import appReducer from '../action/app';

const rootReducer = combineReducers({
    app: appReducer,
});
export default rootReducer;
