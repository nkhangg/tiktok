import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../../../interface';
import Tippy from '@tippyjs/react';

const MinNavbarItem = ({ Icon, ActiveIcon, title, path }: Navbar) => {
    // location
    const location = useLocation();

    return (
        <div>
            <Tippy content={title} placement="right">
                <Link
                    className={`transition ease-in duration-200 flex items-center justify-center rounded-md w-[55px] h-[48px] p-2 hover:bg-white-opacity-06  ${
                        location.pathname === path ? 'text-primary' : ''
                    }`}
                    to={path}
                >
                    {location.pathname === path ? <ActiveIcon /> : <Icon />}
                </Link>
            </Tippy>
        </div>
    );
};

export default MinNavbarItem;
