import React from 'react';
import MinNavbarItem from './MinNavbarItem';
import { navbar } from '../../../ultils/navbar';
import Scrollbars from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../type';
import { SuggestedAcounts } from '../../accounts';

const MinNavbar = () => {
    //redux
    const { isLoggedIn } = useSelector((state: RootState) => state.app);

    return (
        <div id="navbar" className={`md:fixed md:block min-w-[72px] h-screen lg:hidden pt-16 pb-2 border-r-[1px] pr-2`}>
            <Scrollbars
                style={{
                    width: '100%',
                    height: '100%',
                }}
                autoHide
            >
                <div className="w-full flex flex-col justify-center items-center pb-2 pt-5">
                    {navbar.map((item) => {
                        return <MinNavbarItem key={item.title} path={item.path} Icon={item.Icon} ActiveIcon={item.ActiveIcon} title={item.title} />;
                    })}
                </div>

                {!isLoggedIn ? (
                    <div className="w-full flex flex-col justify-center items-center pb-2 pt-5 border-t border-b border-gray-100">
                        <SuggestedAcounts />
                    </div>
                ) : (
                    ''
                )}

                {isLoggedIn && (
                    <div className="w-full flex flex-col justify-center items-center pb-2 pt-5 border-t border-b border-gray-100">
                        <SuggestedAcounts />
                    </div>
                )}
            </Scrollbars>
        </div>
    );
};

export default MinNavbar;
