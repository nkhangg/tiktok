import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { slOpenLogin } from '../../store/action/slice/slice';
import { RootState } from '../../type';
import { settings } from '../../ultils/setting';
import { Button } from '../button';
import Menus from '../menu/Menus';

const NonLogin = () => {
    //state
    const [isHide, setIsHide] = useState(false);

    //redux
    const { darkMode, isLoggedIn } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    //handle funtion
    const handleOpenLogin = () => {
        if (isLoggedIn) return;
        dispatch(slOpenLogin(true));
    };
    return (
        <div className="flex gap-6 items-center">
            <Button
                onClick={handleOpenLogin.bind(this)}
                className={`${darkMode ? 'bg-[rgba(255,255,255,0.08)]' : ''} flex gap-2 items-center p-4`}
            >
                <span className={`${darkMode ? 'text-white' : 'text-black'}`}>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                <span className={`${darkMode ? 'text-white' : 'text-black'}`}>Upload</span>
            </Button>
            <Button onClick={handleOpenLogin.bind(this)} primary>
                Login
            </Button>

            <Tippy
                interactive
                delay={[0, 800]}
                onHidden={() => setIsHide(false)}
                onShow={() => setIsHide(true)}
                placement="bottom-end"
                offset={[8, 20]}
                render={(attrs) => (
                    <div {...attrs}>
                        <Menus data={settings} isHide={isHide} />
                    </div>
                )}
            >
                <span className="text-[22px] h-[22px] w-[22px] flex items-center justify-center cursor-pointer text-gray-400">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
            </Tippy>
        </div>
    );
};

export default NonLogin;
