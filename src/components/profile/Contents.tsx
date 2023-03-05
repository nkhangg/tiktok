import React, { useEffect, useMemo, useState } from 'react';
import { apiGetVideos } from '../../api/videos';
import { Active, ProfileInterface } from '../../interface';
import { initUserType } from '../../type';
import { Tabs } from '../tabs';
import { VideoUsers } from '../videos';
import EmptyYourVideo from './EmptyYourVideo';

interface ContentsProps {
    user: ProfileInterface | null;
    me: initUserType;
}

const Contents = ({ user, me }: ContentsProps) => {
    const [active, setActive] = useState<Active>({ value: 'Videos', initBorder: 0, left: 0 });
    const [list, setList] = useState(user ? user?.videos : null);

    const fectApi = async () => {
        try {
            if (active.value === 'Liked') {
                if (user && me && user.nickname !== me.to) {
                    setList([]);
                    return;
                }

                const res = await apiGetVideos();
                if (res) {
                    setList(res);
                } else {
                    setList([]);
                }
            } else {
                setList(user ? user?.videos : null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const memoList = useMemo(() => {
        return list;
    }, [list]);

    useEffect(() => {
        fectApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <div className="w-full min-w-[520px] min-h-[490px]">
            <Tabs active={active} setActive={setActive} />
            {user && list && list?.length > 0 ? (
                <VideoUsers listVideo={memoList} />
            ) : (
                <EmptyYourVideo state={active.value} your={user && me && user.nickname === me.to} />
            )}
        </div>
    );
};

export default Contents;
