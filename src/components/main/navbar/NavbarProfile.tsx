import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { navbar } from '../../../ultils/navbar';
import NavbarItem from './NavbarItem';

const NavbarProfile = () => {
    return (
        <div className="w-[232px] h-screen border border-gray-600 pl-2 pt-16 pb-5">
            <Scrollbars>
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
            </Scrollbars>
        </div>
    );
};

export default NavbarProfile;
