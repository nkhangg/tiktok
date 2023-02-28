import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { Logins } from '../../interface';
import LoginItem from '../login/LoginItem';

interface SelectionLoginProps {
    isLogin: boolean;
    listItem: Logins[];
    onClickMore?: () => void;
}

const SelectionLogin = ({ isLogin, listItem, onClickMore = () => {} }: SelectionLoginProps) => {
    //redux

    // state

    return (
        <div className="flex flex-col px-[54px]">
            <h1 className="text-[32px] font-bold text-center my-4">
                {isLogin ? 'Sign up for TikTok' : 'Login to Tiktok'}
            </h1>
            {listItem.map((item) => {
                return (
                    <LoginItem
                        key={item.type}
                        type={item.type}
                        IconSocial={item.IconSocial}
                        title={item.title}
                        icon={item.icon}
                    />
                );
            })}

            {isLogin && listItem.length <= 3 ? (
                <span onClick={onClickMore.bind(this)} className="text-center text-xl cursor-pointer text-gray-600">
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            ) : (
                ''
            )}
        </div>
    );
};

export default memo(SelectionLogin);
