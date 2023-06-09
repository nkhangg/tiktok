import React, { useEffect, useState } from 'react';
import { apiGetUsers } from '../../api/users';
import { ResponceAccount } from '../../interface';
import SuggestedAcount from './SuggestedAcount';
import MinSuggestedAcount from './MinSuggestedAcount';

const SuggestedAcounts = () => {
    // use state
    const [listUsers, setListUsers] = useState<ResponceAccount[]>();
    const [limit, setLimit] = useState(5);
    const [stateSeemore, setStateSeemore] = useState(true);

    // api funtion
    const fectUsers = async () => {
        try {
            const responce = await apiGetUsers(1, limit);
            setListUsers(responce);
        } catch (error) {
            console.log(error);
        }
    };

    // handle funtion
    const handleSeemore = async () => {
        if (stateSeemore) {
            setLimit(20);
            setStateSeemore(false);
        } else {
            await setLimit(5);
            setStateSeemore(true);
        }
    };

    useEffect(() => {
        fectUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

    return (
        <div className="">
            <div className="lg:block md:hidden">
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
            <div className="md:block lg:hidden">
                {listUsers?.map((item) => {
                    return (
                        <MinSuggestedAcount
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

            <p onClick={handleSeemore} className="lg:block md:hidden text-primary flex items-center mt-2 px-2 cursor-pointer text-sm font-[600] select-none">
                {stateSeemore ? 'See more' : 'See less'}
            </p>
        </div>
    );
};

export default SuggestedAcounts;
