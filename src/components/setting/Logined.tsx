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

const Logined = () => {
    //state
    const [isHide, setIsHide] = useState(false);

    //redux
    const { darkMode } = useSelector((state: RootState) => state.app);

    //handle funtion

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
                        <Menus data={userMenu} isHide={isHide} />
                    </div>
                )}
            >
                <div className="h-8 w-8 rounded-full overflow-hidden cursor-pointer">
                    <img
                        className="h-full w-full object-cover"
                        src={'https://i.pinimg.com/736x/1a/d2/52/1ad252bf85cf4122440a8cedcfaac306.jpg'}
                        alt="avartar"
                    />
                </div>
            </TippyHeadLess>
        </div>
    );
};

export default Logined;
