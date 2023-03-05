import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateProfile } from '../../api/users';
import useDebounce from '../../hook/useDebounce';
import { ProfileInterface } from '../../interface';
import { slOpenEdit, slSetUser } from '../../store/action/slice/slice';
import { RootState } from '../../type';
import { sleep } from '../../ultils/funtion';
import { PenIcon } from '../../ultils/Icon';
import { EditBox } from '../box';
import { Button } from '../button';
import { Img } from '../image';
import { Input, TextArea } from '../input';
import Popup from './Popup';

const EditPopup = () => {
    const { isOpenEdit, userProfile, token } = useSelector((state: RootState) => state.app);
    const curUser: ProfileInterface = userProfile;
    const dispatch = useDispatch();

    // state value
    const [username, setUsername] = useState(curUser.nickname);
    const [name, setName] = useState(`${curUser.first_name} ${curUser.last_name}`);
    const [bio, setBio] = useState(curUser.bio);

    // state
    const [stateUsername, setStateUsername] = useState({ loading: false, error: false, checked: false });
    const [stateBio, setStateBio] = useState({ error: false });

    const usernameDebounce = useDebounce(username, 200);

    const handleHiddePopup = (e: MouseEvent<HTMLElement>) => {
        dispatch(slOpenEdit());
        e.stopPropagation();
    };

    const handleUsername = useCallback(async () => {
        if (curUser.nickname === usernameDebounce) {
            setStateUsername({ loading: false, error: false, checked: false });
            return;
        }

        if (usernameDebounce.length <= 2) {
            setStateUsername({ ...stateUsername, error: true, checked: false });
        } else {
            setStateUsername({ loading: true, error: false, checked: false });
            await sleep(800);
            setStateUsername({ loading: false, error: false, checked: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usernameDebounce]);

    const handleChecking = () => {
        if (stateUsername.error || stateBio.error || name.length === 0) {
            return true;
        }

        if (name !== `${curUser.first_name} ${curUser.last_name}`) {
            return false;
        }

        if (bio !== curUser.bio) {
            return false;
        }

        if (curUser.nickname === usernameDebounce) {
            return true;
        }

        return false;
    };

    const handleUpdate = async () => {
        if (handleChecking()) return;
        let firstname = '';
        let lastname = '';

        const arrName = name.split(' ');

        if (arrName.length > 2) {
            lastname = arrName[arrName.length - 1];
            for (let i = 0; i <= arrName.length - 2; i++) {
                firstname += arrName[i] + ' ';
            }
        } else {
            firstname = name;
            lastname = name;
        }

        try {
            const res = await apiUpdateProfile({ bio, firstname, lastname }, token);
            if (res) {
                dispatch(slOpenEdit(false));
                dispatch(slSetUser({ ...userProfile, res }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (bio.length > 80) {
            setStateBio({ error: true });
        } else {
            setStateBio({ error: false });
        }
    }, [bio]);

    useEffect(() => {
        handleUsername();
    }, [handleUsername]);

    return (
        <Popup full slice={slOpenEdit} visible={isOpenEdit}>
            <div className="w-[700px] h-[700px] flex flex-col justify-between">
                <div
                    onClick={handleHiddePopup.bind(this)}
                    className="h-[73px] px-6 pt-6 pb-3 border-b-[0.5px] 
                    border-white-opacity-2 text-white-opacity leading-9
                    flex items-center justify-between"
                >
                    <span className="font-medium text-2xl">Edit profile</span>
                    <span
                        className="text-2xl rounded-full w-10 h-10 bg-white-opacity-03
                    cursor-pointer flex items-center justify-center text-gray-700"
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                <div className="flex-1 px-6 pt-2">
                    <EditBox title="Profile photo">
                        <div className="w-[224px] h-[96px] flex items-center justify-end relative">
                            <Img
                                className="h-full w-[96px] object-cover rounded-full "
                                src={curUser.avatar}
                                alt="avatar"
                            />
                            <span
                                className="absolute h-8 w-8 bg-white border border-[rgb(208,208,211)] 
                            cursor-pointer bottom-0 rounded-full flex items-center justify-center"
                            >
                                <PenIcon />
                            </span>
                        </div>
                    </EditBox>

                    <EditBox title="Username">
                        <div>
                            <Input
                                error={stateUsername.error}
                                loading={stateUsername.loading}
                                checked={stateUsername.checked}
                                small
                                placeholder="Username"
                                type="text"
                                value={username}
                                setValue={setUsername}
                            />
                            {stateUsername.error ? (
                                <span className="h-[18px] leading-[18px] text-xs mt-3 text-error">
                                    Include at least 2 characters in your username
                                </span>
                            ) : (
                                ''
                            )}
                            <p className="text-xs text-white-opacity-75 leading-[18px] mt-4 max-w-[460px] truncate">
                                {`www.tiktok.com/@${username}`}
                            </p>
                            <p className="text-xs w-[360px] mt-2 text-white-opacity-75 leading-[18px] max-w-[460px]">
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                username will also change your profile link.
                            </p>
                        </div>
                    </EditBox>

                    <EditBox title="Name">
                        <div>
                            <Input small placeholder="Username" type="text" value={name} setValue={setName} />
                            <p className="text-xs w-[360px] mt-2 text-white-opacity-75 leading-[18px] max-w-[460px]">
                                Your nickname can only be changed once every 7 days.
                            </p>
                        </div>
                    </EditBox>
                    <EditBox border={false} title="Bio">
                        <div>
                            <TextArea error={stateBio.error} placeholder="Bio" value={bio} setValue={setBio} />
                            <p className="text-xs w-[360px] mt-2 text-white-opacity-75 leading-[18px] max-w-[460px]">
                                <span className={`${stateBio.error ? 'text-error' : ''}`}>{bio.length}</span>/80
                            </p>
                        </div>
                    </EditBox>
                </div>
                <div
                    className="h-[86px] border-t-[0.5px] 
                    border-white-opacity-2 flex items-center px-6 gap-4 justify-end"
                >
                    <Button onClick={() => dispatch(slOpenEdit(false))} className="rounded">
                        <span>Cancel</span>
                    </Button>
                    <Button
                        onClick={handleUpdate.bind(this)}
                        primary={!handleChecking()}
                        disable={handleChecking()}
                        className="rounded"
                    >
                        <span>Save</span>
                    </Button>
                </div>
            </div>
        </Popup>
    );
};

export default EditPopup;
