import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ButtonGetApp } from '../components/button';
import { Navbar } from '../components/main';
import { slSetScrollIntoView } from '../store/action/slice/slice';
import { RootState } from '../type';

const Home = () => {
    const { scrollIntView } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const refDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollIntView) {
            refDiv.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            dispatch(slSetScrollIntoView(false));
        }
    }, [scrollIntView, dispatch]);
    return (
        <div className="flex justify-between">
            <div className="w-[356px] h-screen ml-2 relative">
                <Navbar />
            </div>
            <div ref={refDiv} className="w-[659px] pt-16">
                <Outlet />
                <ButtonGetApp />
            </div>
        </div>
    );
};

export default Home;
