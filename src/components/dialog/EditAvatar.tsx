import React, { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar-edit';
import { useDispatch, useSelector } from 'react-redux';
import { EditAvatar as EditInterface } from '../../interface';
import { slSetAvatarEdited } from '../../store/action/slice/slice';
import { RootState } from '../../type';
import { linkNonImage } from '../../ultils/links';

const EditAvatar = () => {
    // redux
    const { editAvatar } = useSelector((state: RootState) => state.app);
    const stateAvatar: EditInterface = editAvatar;

    // dispatch

    const dispatch = useDispatch();

    // use Ref
    const ref = useRef<HTMLDivElement>(null);

    // state
    const [avatar, setAvatar] = useState<string>('');
    const [preview, setPreview] = useState('');

    const handleClose = () => {
        setPreview('');
    };

    const handleCrop = (e: string) => {
        setPreview(e);
    };

    useEffect(() => {
        if (stateAvatar.image) {
            const linkImage = URL.createObjectURL(stateAvatar.image);
            setAvatar(linkImage);
        }
    }, [stateAvatar]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    useEffect(() => {
        dispatch(slSetAvatarEdited({ preview, state: false, image: null }));
    }, [preview, dispatch]);

    return (
        <div ref={ref} className=" flex-1 flex items-center justify-center bg-black">
            <Avatar
                closeIconColor={'#000'}
                backgroundColor="#000"
                cropRadius={116}
                minCropRadius={116}
                imageHeight={600}
                imageWidth={400}
                onCrop={handleCrop.bind(this)}
                onClose={handleClose.bind(this)}
                width={700}
                height={400}
                src={avatar === '' ? linkNonImage : avatar}
            />
        </div>
    );
};

export default EditAvatar;
