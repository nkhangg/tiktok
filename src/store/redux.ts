import { createStore } from 'redux';
import rootReducer from './reducer/rootReducer';
const reduxStore = () => {
    const store = createStore(rootReducer);

    return store;
};

export default reduxStore;
