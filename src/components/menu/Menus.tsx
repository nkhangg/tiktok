import React, { MouseEvent, useState, useEffect } from 'react';
import Menu from './Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { Settings } from '../../interface';
import { path } from '../../ultils/path';
import HeaderMenu from './HeaderMenu';
import { slLogout } from '../../store/action/slice/slice';

interface MenusProps {
    isHide: boolean;
    data: Settings[];
}

const Menus = ({ isHide, data }: MenusProps) => {
    // location
    const location = useLocation();

    // navigate

    const navigate = useNavigate();

    //redux
    const { darkMode } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    // state
    const [listMenu, setListMenu] = useState([data]);
    let currentMenu = listMenu[listMenu.length - 1];

    //handle funtion
    const handleClick = (e: MouseEvent<HTMLElement>, item: Settings) => {
        const { children, type } = item;

        if (children) {
            setListMenu((prev) => [...prev, children]);
        } else {
            // handleClick diferent

            switch (type) {
                case 'logout':
                    dispatch(slLogout());
                    navigate('/');
                    break;
                case 'profile':
                    break;

                default:
                    break;
            }
        }
    };

    //effect

    useEffect(() => {
        if (!isHide && listMenu.length > 1) {
            setListMenu(listMenu.slice(0, listMenu.length - 1));
        }
    }, [isHide, listMenu]);

    const handleBack = () => {
        setListMenu(listMenu.slice(0, listMenu.length - 1));
    };

    useEffect(() => {
        if (location.pathname === path.FEEDBACK) {
            setListMenu([listMenu[0].filter((item) => item.title !== 'Dark mode')]);
        } else {
            setListMenu([data]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div
            className={`${darkMode ? 'bg-black' : 'bg-white'} w-[223px] py-2 shadow-lg rounded-md flex flex-col`}
            tabIndex={-1}
        >
            {listMenu.length > 1 && <HeaderMenu onClick={handleBack} />}
            {currentMenu.map((item) => {
                return (
                    <Menu separate={item.separate} key={item.title} onClick={(e) => handleClick(e, item)} data={item} />
                );
            })}
        </div>
    );
};

export default Menus;
