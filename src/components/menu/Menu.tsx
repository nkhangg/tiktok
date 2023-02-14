import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { CustomButton } from '../../type';
import { Settings } from '../../interface';
import { slOpenLogin, slSetDarkMode } from '../../store/action/slice/slice';
interface MenuProps {
    data: Settings;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    separate?: boolean;
}

const Menu = ({ data, onClick, separate }: MenuProps) => {
    // redux
    const dispatch = useDispatch();
    const { darkMode } = useSelector((state: RootState) => state.app);

    // config
    let Conponent: CustomButton = 'button';
    const { to, icon, title, btnDark, btnWhite } = data;
    if (to) {
        Conponent = Link;
    }

    // state
    const [darkModeState, setDarkModeState] = useState(false);

    // handle funtion
    const handleDarkMode = () => {
        setDarkModeState((prev) => !prev);
        dispatch(slOpenLogin());
        dispatch(slSetDarkMode(!darkModeState));
    };

    return (
        <Conponent
            to={to ? to : ''}
            onClick={onClick}
            className={`flex justify-between items-center ${icon ? 'px-4' : 'px-6'} ${
                darkMode ? 'text-white hover:bg-[rgba(255,255,255,0.1)]' : 'text-black hover:bg-gray-100'
            } ${separate ? 'border-t border-gray-200' : ''}`}
        >
            <div
                className={`h-[42px]  cursor-pointer flex items-center font-[600]
                py-[10px] pr-2 gap-2 w-full`}
            >
                {icon ? (
                    <span className="text-[16px] w-5 h-5">
                        <FontAwesomeIcon icon={icon} />
                    </span>
                ) : (
                    ''
                )}
                <span>{title}</span>
            </div>

            {btnDark && btnWhite ? (
                <span onClick={handleDarkMode} className="text-4xl pr-3 text-gray-400 flex items-center">
                    {darkModeState ? (
                        <span className="text-[#0be09b]">
                            <FontAwesomeIcon icon={btnWhite} />
                        </span>
                    ) : (
                        <span>
                            <FontAwesomeIcon icon={btnDark} />
                        </span>
                    )}
                </span>
            ) : (
                ''
            )}
        </Conponent>
    );
};

export default Menu;
