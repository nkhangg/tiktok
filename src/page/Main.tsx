import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { path } from '../ultils/path';
import { Following, Home, Profile } from '.';
import Live from './Live';
import { LoginPopup } from '../components/dialog';
import { Videos } from '../components/videos';
import { useSelector } from 'react-redux';
import { RootState } from '../type';

const Main = () => {
    const { profileMode } = useSelector((state: RootState) => state.app);
    return (
        <div className={`${profileMode ? 'w-full' : 'w-[1150px]'}  h-screen m-auto `}>
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path={path.HOME} element={<Videos />} />
                    <Route path={path.FOLLOWING} element={<Following />} />
                </Route>
                <Route path={path.LIVE} element={<Live />} />
                <Route path={path.PROFILE} element={<Profile />} />
            </Routes>
            <LoginPopup />
        </div>
    );
};

export default Main;
