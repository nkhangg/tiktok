import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import reduxStore from './store/redux';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const { store, persisttor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <PersistGate loading={null} persistor={persisttor}>
                    {/* <React.StrictMode> */}
                    <App />
                    {/* </React.StrictMode> */}
                </PersistGate>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>,
);
