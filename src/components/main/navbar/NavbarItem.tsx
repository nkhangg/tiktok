import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../../../interface';

const NavbarItem = ({ Icon, ActiveIcon, title, path }: Navbar) => {
    // location
    const location = useLocation();

    return (
        <Link
            className={`transition ease-in duration-200 p-2 h-[48px] rounded-[4px] flex items-center gap-2 text-[16px] hover:bg-[rgba(22,24,35,.03)] ${
                location.pathname === path ? 'text-primary' : ''
            }`}
            to={path}
        >
            {location.pathname === path ? <ActiveIcon /> : <Icon />}
            <span className="font-bold">{title}</span>
        </Link>
    );
};

export default NavbarItem;
