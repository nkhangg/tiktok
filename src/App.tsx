import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/main/Header';
import { Main } from './page';
import { RootState } from './type';

const App = () => {
    //redux
    const { darkMode } = useSelector((state: RootState) => state.app);

    useEffect(() => {
        const body = document.querySelector('#root');
        if (!body) return;

        if (darkMode) {
            body.className = 'bg-black text-white';
        } else {
            body.className = 'bg-white text-black';
        }
    }, [darkMode]);
    return (
        <>
            <Header />
            <Main />
        </>
    );
};

export default App;
