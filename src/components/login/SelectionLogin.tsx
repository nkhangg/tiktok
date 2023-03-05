import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Logins } from '../../interface';
import LoginItem from '../login/LoginItem';
import { logins, signups, moreSignups } from '../../ultils/login';
import { useSelector } from 'react-redux';
import { RootState } from '../../type';

const SelectionLogin = () => {
    //redux
    const { isLogin } = useSelector((state: RootState) => state.login);
    // state
    const [listLogins, setListLogins] = useState<Logins[]>(logins);

    // handle funtion
    const handleMoreListSign = useCallback(() => {
        setListLogins([...listLogins, ...moreSignups]);
    }, [listLogins]);

    useEffect(() => {
        if (isLogin) {
            setListLogins(signups);
        } else {
            setListLogins(logins);
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col px-[54px]">
            <h1 className="text-[32px] font-bold text-center my-4">
                {isLogin ? 'Sign up for TikTok' : 'Login to Tiktok'}
            </h1>
            {listLogins.map((item) => {
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

            {isLogin && listLogins.length <= 3 ? (
                <span
                    onClick={handleMoreListSign.bind(this)}
                    className="text-center text-xl cursor-pointer text-gray-600"
                >
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            ) : (
                ''
            )}
        </div>
    );
};

export default memo(SelectionLogin);
