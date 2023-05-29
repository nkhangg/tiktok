import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateProfile } from '../../api/users';
import useDebounce from '../../hook/useDebounce';
import { AvatarEdited, EditAvatar as Editinterface, ProfileInterface } from '../../interface';
import { slOpenEdit, slSetAvatarEdited, slSetEditAvatarProfile, slSetUpdateProfileLoading } from '../../store/action/slice/slice';
import { RootState } from '../../type';
import { sleep } from '../../ultils/funtion';
import { Button } from '../button';
import EditAvatar from './EditAvatar';
import EditProfile from './EditProfile';
import Popup from './Popup';
import { dataURLtoFile } from '../../ultils/app';

interface EditPopupProps {
    curUser: ProfileInterface;
    setCurUser: (data: ProfileInterface) => void;
}

const EditPopup = ({ curUser, setCurUser }: EditPopupProps) => {
    const { isOpenEdit, token, editAvatar, avatarEdited } = useSelector((state: RootState) => state.app);

    const avatarEditedType: AvatarEdited = avatarEdited;

    const curEditAvatar: Editinterface = editAvatar;
    const dispatch = useDispatch();

    // state value
    const [username, setUsername] = useState(curUser.nickname);
    const [name, setName] = useState(`${curUser.first_name} ${curUser.last_name}`);
    const [bio, setBio] = useState(curUser.bio.trim());
    const [avatar, setAvatar] = useState(curUser.avatar);

    // state
    const [stateUsername, setStateUsername] = useState({ loading: false, error: false, checked: false });
    const [stateBio, setStateBio] = useState({ error: false });
    const [editStateProfile, setEditStateProfile] = useState<Editinterface>(curEditAvatar);
    const [errorFullname, setErrorFullname] = useState(false);

    // list state

    const usernameDebounce = useDebounce(username, 200);

    const handleHiddePopup = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(slOpenEdit());
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
        if (avatar !== curUser.avatar) return false;

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
            dispatch(slSetUpdateProfileLoading(true));
            setErrorFullname(false);

            const res = await apiUpdateProfile({ bio, firstname, lastname, avatar: avatarEditedType.image ? avatarEditedType.image : undefined }, token);
            if (res) {
                dispatch(slOpenEdit(false));
                dispatch(slSetUpdateProfileLoading(false));

                setErrorFullname(false);

                setCurUser({
                    ...curUser,
                    ...res,
                    followers_count: curUser.followers_count,
                    followings_count: curUser.followings_count,
                });
                setAvatar(res.avatar);
            }
        } catch (error) {
            setErrorFullname(true);
            dispatch(slSetUpdateProfileLoading(false));
        }
    };

    const handleChageEditProfile = () => {
        dispatch(slSetEditAvatarProfile({ state: false, image: null }));
    };

    const handleApplyAvatar = () => {
        dispatch(
            slSetAvatarEdited({
                ...avatarEditedType,
                state: true,
                image: dataURLtoFile(avatarEditedType.preview as string) ? dataURLtoFile(avatarEditedType.preview as string) : null,
            }),
        );
        dispatch(slSetEditAvatarProfile({ state: false, image: null }));
    };

    useEffect(() => {
        setEditStateProfile(curEditAvatar);
    }, [curEditAvatar]);

    useEffect(() => {
        if (bio.trim().length > 81) {
            setStateBio({ error: true });
        } else {
            setStateBio({ error: false });
        }
    }, [bio]);

    useEffect(() => {
        handleUsername();
    }, [handleUsername]);

    useEffect(() => {
        return () => {
            dispatch(slSetAvatarEdited({ state: false, preview: '', image: null }));
        };
    }, [dispatch, curUser]);

    return (
        <Popup full slice={slOpenEdit} visible={isOpenEdit}>
            <div className="w-[700px] h-[700px] max-h-[700px] flex flex-col justify-between">
                <div
                    className="h-[73px] px-6 pt-6 pb-3 border-b-[0.5px] 
                    border-white-opacity-2 text-white-opacity leading-9
                    flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        {editStateProfile.state && (
                            <span onClick={handleChageEditProfile.bind(this)} className="h-6 w-6 flex items-center justify-center text-2xl cursor-pointer">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </span>
                        )}
                        <span className="font-medium text-2xl">{editStateProfile.state ? 'Edit photo' : 'Edit profile'}</span>
                    </div>
                    <span
                        onClick={handleHiddePopup.bind(this)}
                        className="text-2xl rounded-full w-10 h-10 bg-white-opacity-03
                    cursor-pointer flex items-center justify-center text-gray-700"
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                {!editStateProfile.state && !editStateProfile.image ? (
                    <EditProfile
                        errorFullname={errorFullname}
                        setErrorFullname={setErrorFullname}
                        cuUser={curUser}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        name={name}
                        setName={setName}
                        username={username}
                        setUsername={setUsername}
                        bio={bio.trim()}
                        setBio={setBio}
                        stateBio={stateBio}
                        stateUsername={stateUsername}
                    />
                ) : (
                    <EditAvatar />
                )}

                <div
                    className="h-[86px] border-t-[0.5px] 
                    border-white-opacity-2 flex items-center px-6 gap-4 justify-end"
                >
                    <Button onClick={() => dispatch(slOpenEdit(false))} className="rounded">
                        <span>Cancel</span>
                    </Button>
                    {!editStateProfile.state && (
                        <Button onClick={handleUpdate.bind(this)} primary={!handleChecking()} disable={handleChecking()} className="rounded">
                            <span>Save</span>
                        </Button>
                    )}

                    {editStateProfile.state && (
                        <Button onClick={handleApplyAvatar.bind(this)} primary>
                            <span>Apply</span>
                        </Button>
                    )}
                </div>
            </div>
        </Popup>
    );
};

export default memo(EditPopup);
