import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { path } from '../ultils/path';
import { Following, Home } from '.';
import Live from './Live';
import { LoginPopup } from '../components/dialog';
import { Videos } from '../components/videos';

const Main = () => {
    return (
        <div className={`w-[1150px]  h-screen m-auto `}>
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path={path.HOME} element={<Videos />} />
                    <Route path={path.FOLLOWING} element={<Following />} />
                </Route>
                <Route path={path.LIVE} element={<Live />} />
            </Routes>
            <LoginPopup />
        </div>
    );
};

export default Main;
