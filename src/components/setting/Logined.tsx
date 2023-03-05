import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TippyHeadLess from '@tippyjs/react/headless';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import { RootState } from '../../type';
import Button from '../button/Button';
import Menus from '../menu/Menus';
import { userMenu } from '../../ultils/setting';
import Tippy from '@tippyjs/react';
import { LettersIcon, MessageIcon } from '../../ultils/Icon';
import { Img } from '../image';

const Logined = () => {
    //state
    const [isHide, setIsHide] = useState(false);

    //redux
    const { darkMode, initUser } = useSelector((state: RootState) => state.app);

    //handle funtion

    const setLinkPorfileForList = () => {
        return userMenu.map((item) => {
            if (item.type === 'profile') {
                item.to = '/@' + initUser.to;
            }

            return item;
        });
    };

    return (
        <div className="flex gap-6 items-center">
            <Button className={`${darkMode ? 'bg-[rgba(255,255,255,0.08)]' : ''} flex gap-2 items-center p-4`}>
                <span className={`${darkMode ? 'text-white' : 'text-black'}`}>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                <span className={`${darkMode ? 'text-white' : 'text-black'}`}>Upload</span>
            </Button>

            <Tippy content="Message">
                <MessageIcon className="cursor-pointer" />
            </Tippy>
            <Tippy content="Inbox">
                <LettersIcon className="cursor-pointer" />
            </Tippy>

            <TippyHeadLess
                interactive
                delay={[0, 800]}
                onHidden={() => setIsHide(false)}
                onShow={() => setIsHide(true)}
                placement="bottom-end"
                offset={[8, 20]}
                render={(attrs) => (
                    <div {...attrs}>
                        <Menus data={setLinkPorfileForList()} isHide={isHide} />
                    </div>
                )}
            >
                <div className="h-8 w-8 rounded-full overflow-hidden cursor-pointer">
                    <Img className="h-full w-full object-cover" src={initUser.image} alt="avartar" />
                </div>
            </TippyHeadLess>
        </div>
    );
};

export default Logined;
