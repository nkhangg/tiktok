import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../type';

interface HeaderMenuProps {
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const HeaderMenu = ({ onClick }: HeaderMenuProps) => {
    //redux
    const { darkMode } = useSelector((state: RootState) => state.app);
    return (
        <div
            className={`${darkMode ? 'text-white' : 'text-black'} flex items-center justify-center h-[50px] mt-[-8px]`}
        >
            <span onClick={onClick} className="w-[48px] flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <span className="font-[600] flex-1">Language</span>
        </div>
    );
};

export default HeaderMenu;
