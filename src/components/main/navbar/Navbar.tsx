import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { slOpenLogin } from '../../../store/action/slice/slice';
import { RootState } from '../../../type';
import { navbar } from '../../../ultils/navbar';
import { FollowingAccounts, SuggestedAcounts } from '../../accounts';
import { NavbarBox } from '../../box';
import Discovers from '../../discover/Discovers';
import { FooterNav } from '../../footer';
import NavbarItem from './NavbarItem';

const Navbar = () => {
    const { isLoggedIn, profileMode } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    // handle funtion

    const handleOpenLogin = () => {
        dispatch(slOpenLogin(true));
    };

    return (
        <div id="navbar" className={`${profileMode ? 'w-nav-profile pl-2' : 'w-nav'} fixed h-screen pt-16 pb-2`}>
            <Scrollbars
                style={{
                    width: '100%',
                    height: '100%',
                }}
                autoHide
            >
                <div className="w-full flex flex-col pb-2 border-b border-gray-100 pt-5">
                    {navbar.map((item) => {
                        return (
                            <NavbarItem
                                key={item.title}
                                path={item.path}
                                Icon={item.Icon}
                                ActiveIcon={item.ActiveIcon}
                                title={item.title}
                            />
                        );
                    })}
                </div>

                {!isLoggedIn && (
                    <NavbarBox
                        classNameTitle="text-[rgba(22,24,35,.5)] text-[16px]"
                        title="Log in to follow creators, like videos, and view comments."
                    >
                        <button
                            onClick={handleOpenLogin}
                            className={`border border-primary mt-10 ${
                                profileMode ? 'w-[208px]' : 'w-[324px]'
                            } h-12 ml-2 text-[18px] 
                            font-bold text-primary rounded-md hover:bg-[rgba(254,44,85,0.06)]`}
                        >
                            Login
                        </button>
                    </NavbarBox>
                )}

                {!profileMode || !isLoggedIn ? (
                    <NavbarBox title="Suggested accounts">
                        <SuggestedAcounts />
                    </NavbarBox>
                ) : (
                    ''
                )}

                {isLoggedIn && (
                    <NavbarBox title="Following accounts">
                        <FollowingAccounts />
                    </NavbarBox>
                )}

                <NavbarBox title="Discover">
                    <Discovers />
                </NavbarBox>

                <FooterNav />
            </Scrollbars>
        </div>
    );
};

export default Navbar;
