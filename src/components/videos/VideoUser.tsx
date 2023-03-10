import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Img } from '../image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface VideoUserProps {
    title: string;
    image: string;
    video: string;
    like: number | string;
}

const VideoUser = ({ title, image, video, like }: VideoUserProps) => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (play) {
            refVideo.current?.play();
        } else {
            refVideo.current?.pause();
        }
    }, [play]);

    return (
        <div className="w-full h-[282px] overflow-hidden  relative flex flex-col justify-between">
            <div
                onMouseEnter={() => setPlay(true)}
                onMouseLeave={() => setPlay(false)}
                className="flex-1 w-full h-[90%] cursor-pointer relative"
            >
                <AnimatePresence>
                    {play ? (
                        <motion.video
                            initial={{
                                opacity: 0,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            ref={refVideo}
                            muted
                            className="object-cover h-full w-full rounded-md"
                            src={video}
                        />
                    ) : (
                        <Img className="object-cover h-full w-full rounded-md " src={image} alt="videoimage" />
                    )}
                </AnimatePresence>

                <div
                    className="absolute text-white flex items-center w-full h-[100px] bottom-0 pt-[67px]
                px-[13px] pb-[17px] gap-4"
                >
                    <span className="text-xl">
                        <FontAwesomeIcon icon={faPlay} />
                    </span>
                    <span className="text-16 font-bold">{like}</span>
                </div>
            </div>
            <span className="text-lg font-[400]  h-[10%] text-white-opacity-75 flex items-center justify-start">
                {title.length >= 18 ? title.slice(0, 18) + '...' : title}
            </span>
        </div>
    );
};

export default VideoUser;
