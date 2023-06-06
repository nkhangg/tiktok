import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { path } from '../ultils/path';
import { Following, Home, Profile, UploadVideo, VideoDetail } from '.';
import { Notifycation } from '../components/notyfication';
import Live from './Live';
import { LoginPopup } from '../components/dialog';
import { Videos } from '../components/videos';
import { useSelector } from 'react-redux';
import { RootState } from '../type';

// className={`${fullScreenMode ? 'w-full' : 'w-[1150px]'}   m-auto `}

const Main = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.app);

    return (
        <div className="w-full">
            <Notifycation />

            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path={path.HOME} element={<Videos />} />
                    <Route path={path.FOLLOWING} element={isLoggedIn ? <Videos /> : <Following />} />
                </Route>
                <Route path={path.LIVE} element={<Live />} />
                <Route path={path.PROFILE} element={<Profile />} />
                <Route path={path.UPLOAD} element={<UploadVideo />} />
                <Route path={path.DETAIL} element={<VideoDetail />} />
            </Routes>
            <LoginPopup />
        </div>
    );
};

export default Main;
