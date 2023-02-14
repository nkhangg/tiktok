import React, { useState, useEffect } from 'react';
import { apiGetUsers } from '../../api/users';
import { ResponceAccount } from '../../interface';
import SuggestedAcount from './SuggestedAcount';

const FollowingAccounts = () => {
    // use state
    const [listUsers, setListUsers] = useState<ResponceAccount[]>();
    const [limit, setLimit] = useState(10);
    const [stateSeemore, setStateSeemore] = useState(true);

    // api funtion
    const fectUsers = async () => {
        try {
            const responce = await apiGetUsers(2, limit);
            setListUsers(responce);
        } catch (error) {
            setStateSeemore(false);
        }
    };

    // handle funtion
    const handleSeemore = async () => {
        if (stateSeemore) {
            if (limit === 20) {
                setStateSeemore(false);
                return;
            }

            setLimit(limit + 5);
        } else {
            setLimit(10);
            setStateSeemore(true);
        }
    };

    useEffect(() => {
        fectUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);
    return (
        <div className="">
            <div>
                {listUsers?.map((item) => {
                    return (
                        <SuggestedAcount
                            key={item.id}
                            image={item.avatar}
                            tick={item.is_followed}
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

            <p
                onClick={handleSeemore}
                className="text-primary flex items-center mt-2 px-2 cursor-pointer text-sm font-[600] select-none"
            >
                {stateSeemore ? 'See more' : 'See less'}
            </p>
        </div>
    );
};

export default FollowingAccounts;
