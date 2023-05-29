import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarEdited, ProfileInterface } from '../../interface';
import { slSetEditAvatarProfile } from '../../store/action/slice/slice';
import { RootState } from '../../type';
import { PenIcon } from '../../ultils/Icon';
import { EditBox } from '../box';
import { Input, TextArea } from '../input';
import { Loading } from '../loading';

interface EditProfileProps {
    cuUser: ProfileInterface;
    stateUsername: { loading: boolean; error: boolean; checked: boolean };
    stateBio: { error: boolean };
    name: string;
    bio: string;
    avatar: string;
    username: string;
    errorFullname: boolean;
    setErrorFullname: (value: boolean) => void;
    setAvatar: (value: string) => void;
    setName: (value: string) => void;
    setUsername: (value: string) => void;
    setBio: (value: string) => void;
}

const EditProfile = ({ cuUser, stateUsername, stateBio, name, username, bio, avatar, errorFullname, setAvatar, setName, setUsername, setBio }: EditProfileProps) => {
    // redux
    const { avatarEdited } = useSelector((state: RootState) => state.app);
    const { loading } = useSelector((state: RootState) => state.profile);

    const avatarEditedType: AvatarEdited = avatarEdited;

    const dispatch = useDispatch();

    const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(slSetEditAvatarProfile({ state: true, image: e.target.files ? e.target.files[0] : null }));
    };

    useEffect(() => {
        if (avatarEditedType.state && avatarEditedType.preview !== '') {
            setAvatar(avatarEditedType.preview);
        } else {
            setAvatar(cuUser.avatar);
        }
    }, [avatarEditedType, setAvatar, cuUser]);

    return (
        <div className="flex-1 px-6 pt-2">
            <EditBox title="Profile photo">
                <div className="w-[224px] h-[96px] flex items-center justify-end relative">
                    <img className="h-full w-[96px] object-cover rounded-full " src={avatar} alt="avatar" />
                    <label
                        htmlFor="avatar-profile"
                        className="absolute h-8 w-8 bg-white border border-[rgb(208,208,211)] 
                        cursor-pointer bottom-0 rounded-full flex items-center justify-center"
                    >
                        <input onChange={handleSetImage.bind(this)} id="avatar-profile" hidden type="file" />
                        <PenIcon />
                    </label>
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
                    {stateUsername.error ? <span className="h-[18px] leading-[18px] text-xs mt-3 text-error">Include at least 2 characters in your username</span> : ''}
                    <p className="text-xs text-white-opacity-75 leading-[18px] mt-4 max-w-[460px] truncate">{`${window.location.origin}/@${username}`}</p>
                    <p className="text-xs w-[360px] mt-2 text-white-opacity-75 leading-[18px] max-w-[460px]">
                        Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also change your profile link.
                    </p>
                </div>
            </EditBox>

            <EditBox title="Name">
                <div>
                    <Input error={errorFullname} small placeholder="Username" type="text" value={name} setValue={setName} />
                    <p className="text-xs w-[360px] mt-2 text-white-opacity-75 leading-[18px] max-w-[460px]">Your nickname can only be changed once every 7 days.</p>
                    {errorFullname && <span className="text-xs text-error">Fullname incorect !</span>}
                </div>
            </EditBox>
            <EditBox border={false} title="Bio">
                <div>
                    <TextArea error={stateBio.error} placeholder="Bio" value={bio} setValue={setBio} />
                    <p className="text-xs w-[360px] mt-2 text-white-opacity-75 leading-[18px] max-w-[460px]">
                        <span className={`${stateBio.error ? 'text-error' : ''}`}>{bio.trim().length}</span>/80
                    </p>
                </div>
            </EditBox>

            {loading ? (
                <div className="absolute w-full h-full bg-white-opacity-12 inset-0 flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default EditProfile;
