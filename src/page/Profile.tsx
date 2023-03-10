import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiGetProfile } from '../api/users';
import { Button } from '../components';
import { ButtonGetApp, ButtonOptionProfile, ShareButton, TogleFollowButton } from '../components/button';
import EditPopup from '../components/dialog/EditPopup';
import { Loading } from '../components/loading';
import { Navbar } from '../components/main';
import { Contents } from '../components/profile';
import { ProfileInterface } from '../interface';
import { slOpenEdit, slSetImageUser, slSetProfileMode, slSetScrollIntoView } from '../store/action/slice/slice';
import { initUserType, RootState } from '../type';
import { title } from '../ultils/app';
import { linkNonImage } from '../ultils/links';

const Profile = () => {
    // redux
    const dispatch = useDispatch();
    const { initUser, token, isLoggedIn, scrollIntView } = useSelector((state: RootState) => state.app);
    const me: initUserType = initUser;

    const refDiv = useRef<HTMLDivElement>(null);
    // pargram
    const { nickname } = useParams();

    // state value
    const [user, setUser] = useState<ProfileInterface | null>(null);
    const [fallback, setFallback] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // handle funtion

    const fectApi = useCallback(async () => {
        try {
            setLoading(true);
            const responce: ProfileInterface = await apiGetProfile(nickname as string, token);
            setLoading(false);
            if (responce) {
                setUser(responce);
                setFallback(responce.avatar);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nickname, token, dispatch]);

    // useEffect

    useEffect(() => {
        if (scrollIntView) {
            refDiv.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            dispatch(slSetScrollIntoView(false));
        }
    }, [scrollIntView, dispatch]);

    useEffect(() => {
        fectApi();
    }, [fectApi]);

    useEffect(() => {
        if (!user) return;
        document.title = `${user.first_name} ${user.last_name} (${nickname})`;
    }, [user, nickname]);

    useEffect(() => {
        dispatch(slSetProfileMode(true));

        return () => {
            dispatch(slSetProfileMode());
            document.title = title.home;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (!user) return;
        setFallback(user?.avatar);
        if (!me) return;
        if (user.avatar === me.image || user.nickname !== me.to) return;
        dispatch(slSetImageUser({ ...me, image: user?.avatar }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="flex justify-between">
            <div className="w-nav-profile relative">
                <Navbar />
            </div>
            <div ref={refDiv} className="flex-1 w-full h-screen ">
                <div className="pt-24 px-6">
                    <div className="max-w-[624px] mb-[20px] pr-[92px] relative">
                        <div className="flex gap-5">
                            <img
                                className="h-[116px] w-[116px] object-cover border-white-opacity-12 rounded-full border-[0.5px]"
                                alt="avatar"
                                src={fallback}
                                onError={() => setFallback(linkNonImage)}
                            />

                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="font-bold text-[32px] mb-1 leading-[38px]">
                                        {user ? user.nickname : ''}
                                    </h1>
                                    {user?.tick && (
                                        <span
                                            className="text-[rgba(32,213,236,1)] w-[20px] h-[20px] text-[20px] flex 
                                            items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </span>
                                    )}
                                </div>
                                <h4 className="font-medium text-[18px] leading-[25px] max-w-[450px]">{`${
                                    user ? user.first_name + ' ' + user.last_name : ''
                                }`}</h4>
                                {me && me.to === user?.nickname && isLoggedIn ? (
                                    <Button
                                        onClick={() => dispatch(slOpenEdit(true))}
                                        className="flex items-center justify-between px-4 mt-4 rounded-[4px] gap-2 font-bold"
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </span>
                                        <span className="">Edit profile</span>
                                    </Button>
                                ) : (
                                    <TogleFollowButton user={user ? user : null} />
                                )}
                            </div>
                        </div>
                        <div className="mt-[22px] flex items-center gap-[20px]">
                            <span className="flex items-center gap-[6px]">
                                <strong>{user ? user.followings_count : 0}</strong>
                                <p className="font-[400] leading-[22px] text-[16px] text-white-opacity-75">Following</p>
                            </span>
                            <span className="flex items-center gap-[6px]">
                                <strong>{user ? user.followers_count : 0}</strong>
                                <p className="font-[400] leading-[22px] text-[16px] text-white-opacity-75">Followers</p>
                            </span>
                            <span className="flex items-center gap-[6px]">
                                <strong>{user ? user.likes_count : 0}</strong>
                                <p className="font-[400] leading-[22px] text-[16px] text-white-opacity-75">Likes</p>
                            </span>
                        </div>
                        <p className="mt-[10px] font-[400] text-16 leading-[22px] text-white-opacity">
                            {(user && user.bio !== '') || user?.bio ? user.bio : 'No bio yet.'}
                        </p>

                        <span className="absolute top-[11px] right-[52px] cursor-pointer flex items-center gap-4">
                            <ShareButton />
                            {me && user && user.nickname !== me.to && <ButtonOptionProfile />}
                        </span>
                    </div>

                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <Contents user={user} me={me} />
                    )}
                </div>
            </div>
            <ButtonGetApp />

            {me && me.to === user?.nickname && <EditPopup curUser={user} setCurUser={setUser} />}
        </div>
    );
};

export default Profile;
