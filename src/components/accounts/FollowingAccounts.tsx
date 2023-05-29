import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { apiGetFollowers } from '../../api/users';
import { ResponceAccount, ResponceAccountFull } from '../../interface';
import { RootState } from '../../type';
import SuggestedAcount from './SuggestedAcount';

const FollowingAccounts = () => {
    const { token } = useSelector((state: RootState) => state.app);
    // use state
    const [listUsers, setListUsers] = useState<ResponceAccount[]>([]);
    const [limit, setLimit] = useState(1);
    const [stateSeemore, setStateSeemore] = useState(true);

    // api funtion
    const fectUsers = useCallback(async () => {
        try {
            const responce: ResponceAccountFull = await apiGetFollowers(limit, 5, token);
            setListUsers([...listUsers, ...responce.data]);
            if (listUsers.length >= responce.meta.pagination.total) {
                setStateSeemore(false);
                return;
            }
            if (responce) setLimit((prev) => prev + 1);
        } catch (error) {
            setStateSeemore(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

    const fectSeeLess = async () => {
        try {
            const responce: ResponceAccountFull = await apiGetFollowers(1, 5, token);
            setListUsers(responce.data);
        } catch (error) {
            setStateSeemore(false);
        }
    };

    // handle funtion
    const handleSeemore = async () => {
        if (stateSeemore) {
            fectUsers();
        } else {
            fectSeeLess();
            setStateSeemore(true);
        }
    };

    useEffect(() => {
        fectUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="">
            <div>
                {listUsers?.map((item) => {
                    return (
                        <SuggestedAcount
                            key={item.id}
                            image={item.avatar}
                            tick={item.tick}
                            nickname={item.nickname}
                            likeCount={item.likes_count}
                            follwers={item.followers_count}
                            firstname={item.first_name}
                            lastname={item.last_name}
                            isFollow={item.is_followed}
                        />
                    );
                })}
            </div>

            <p onClick={handleSeemore} className="text-primary flex items-center mt-2 px-2 cursor-pointer text-sm font-[600] select-none">
                {stateSeemore ? 'See more' : 'See less'}
            </p>
        </div>
    );
};

export default FollowingAccounts;
