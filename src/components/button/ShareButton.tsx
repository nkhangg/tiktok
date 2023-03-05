import React, { useState } from 'react';
import { ShareIcon } from '../../ultils/Icon';
import Tippy from '@tippyjs/react/headless';
import { shareMore, shares } from '../../ultils/login';
import ShareButtonItem from './ShareButtonItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Logins } from '../../interface';

const ShaseButton = () => {
    const [list, setList] = useState<Logins[]>(shares);

    const handleClickMore = () => {
        setList([...list, ...shareMore]);
    };

    return (
        <div>
            <Tippy
                onHidden={() => setList(shares)}
                placement="bottom"
                interactive
                render={(attrs) => (
                    <div
                        className="w-[280px] bg-white shadow-2xl py-2 text-16 
                        leading-[22px] rounded-lg flex flex-col items-center justify-center px-1 overflow-hidden"
                        tabIndex={1}
                        {...attrs}
                    >
                        {list.map((item) => {
                            return (
                                <ShareButtonItem
                                    key={item.type}
                                    title={item.title}
                                    Icon={item.IconSocial ? item.IconSocial : null}
                                />
                            );
                        })}

                        {list.length <= 5 && (
                            <span
                                onClick={handleClickMore.bind(this)}
                                className="font-bold flex items-center justify-center w-full
                                        h-6 hover:bg-white-opacity-06 rounded"
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        )}
                    </div>
                )}
            >
                <span>
                    <ShareIcon />
                </span>
            </Tippy>
        </div>
    );
};

export default ShaseButton;
