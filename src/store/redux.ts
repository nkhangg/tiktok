import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

const reduxStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persisttor = persistStore(store);

    return { store, persisttor };
};

export default reduxStore;
