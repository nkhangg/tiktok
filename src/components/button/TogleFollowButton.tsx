import Tippy from '@tippyjs/react';
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { apiFolow, apiUnfolow } from '../../api/users';
import { ProfileInterface } from '../../interface';
import { RootState } from '../../type';
import { UnfolowIcon } from '../../ultils/Icon';

interface TogleFollowButtonProps {
    user: ProfileInterface | null;
}

const TogleFollowButton = ({ user }: TogleFollowButtonProps) => {
    const { token, isLoggedIn } = useSelector((state: RootState) => state.app);
    const [isFollow, setIsFollow] = useState(user?.is_followed);

    const handleUnfollow = async () => {
        setIsFollow((prev) => !prev);
    };

    const handleFollow = async () => {
        if (!isLoggedIn) return;
        if (!user) return;
        if (isFollow) {
            await apiFolow(user?.id + '', token);
        } else {
            await apiUnfolow(user?.id + '', token);
        }
    };

    useEffect(() => {
        setIsFollow(user?.is_followed);
    }, [user]);

    useEffect(() => {
        handleFollow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFollow]);

    return (
        <>
            {isFollow ? (
                <div className="flex items-center  mt-4 gap-2">
                    <button
                        className="border border-primary w-[164px] h-9 text-[18px]
            font-bold text-primary rounded-md hover:bg-[rgba(254,44,85,0.06)]"
                    >
                        Message
                    </button>

                    <Tippy placement="bottom" content={<span className="font-bold">Unfollow</span>}>
                        <span
                            onClick={handleUnfollow.bind(this)}
                            className="cursor-pointer w-9 h-9 border border-white-opacity-12 flex
                    items-center justify-center rounded"
                        >
                            <UnfolowIcon />
                        </span>
                    </Tippy>
                </div>
            ) : (
                <button
                    onClick={handleUnfollow.bind(this)}
                    className="text-white rounded-[4px] font-bold w-[208px] h-9 bg-primary mt-4"
                >
                    Follow
                </button>
            )}
        </>
    );
};

export default memo(TogleFollowButton);
