import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useRef, useState, useEffect, RefObject } from 'react';
import { User } from '../../interface';
import { Button } from '../button';
import { Img } from '../image';

interface VideoNonFollowingProps {
    image: string;
    souces: string;
    user: User;
}

const VideoNonFollowing = ({ image, souces, user }: VideoNonFollowingProps) => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        if (!refVideo.current) return;

        if (isPlay) {
            refVideo.current.play();
        } else {
            refVideo.current.pause();
        }
    }, [isPlay]);

    useEffect(() => {
        if (!refVideo.current) {
            return;
        }
        let observerRefValue: RefObject<HTMLVideoElement> | null = refVideo; // <-- variable to hold ref value

        return () => {
            observerRefValue?.current?.pause();
        };
    }, []);

    const handleInVideo = () => {
        setIsPlay(true);
    };

    const handleOutVideo = () => {
        setIsPlay(false);
    };

    return (
        <div className="w-[226px] h-[302px] overflow-hidden rounded-md relative">
            {isPlay ? (
                <video
                    loop
                    muted
                    onMouseOutCapture={handleOutVideo}
                    ref={refVideo}
                    className="w-full h-full object-cover cursor-pointer"
                    src={souces}
                />
            ) : (
                <img
                    onMouseEnter={handleInVideo}
                    className="w-full h-full object-cover cursor-pointer"
                    src={image}
                    alt="bg"
                />
            )}

            <div
                className="absolute w-full h-[200px] z-30 flex flex-col items-center justify-center bottom-0
            text-white gap-2"
            >
                <Img className="h-12 w-12 rounded-full" src={user.avatar} alt="avatar" />
                <h6 className="font-bold">{user.nickname}</h6>
                <div className="flex items-center gap-1">
                    <p className="text-sm">{`${user.first_name} ${user.last_name}`}</p>
                    <span className="text-[rgb(32,213,236)] text-sm">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                </div>
                <Button className="w-[162px] h-[37px]" primary>
                    <span>Folow</span>
                </Button>
            </div>
        </div>
    );
};

export default memo(VideoNonFollowing);
