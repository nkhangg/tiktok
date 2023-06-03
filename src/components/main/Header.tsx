import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../Logo';
import Setting from '../setting/Setting';
import { RootState } from '../../type';
import Search from '../search/Search';

const Header = () => {
    const { darkMode, fullScreenMode } = useSelector((state: RootState) => state.app);

    return (
        <header
            className={`${darkMode ? 'bg-black border-[rgba(255,255,255,0.12)]' : 'bg-white border-gray-300'} fixed inset-0 w-full h-[60px] flex items-center border-b z-50 px-4`}
        >
            <section className={`${fullScreenMode ? 'w-full' : 'w-[1150px] m-auto'}  px-1 flex justify-between items-center`}>
                <Logo />
                <Search />
                <Setting />
            </section>
        </header>
    );
};

export default Header;
