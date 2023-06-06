import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Img } from '../image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { slOpenLogin } from '../../store/action/slice/slice';

interface VideoUserProps {
    id: number;
    nickname: string;
    title: string;
    image: string;
    video: string;
    like: number | string;
}

const VideoUser = ({ title, image, video, like, id, nickname }: VideoUserProps) => {
    const navigate = useNavigate();

    const refVideo = useRef<HTMLVideoElement>(null);
    const [play, setPlay] = useState(false);

    // redux
    const { isLoggedIn } = useSelector((state: RootState) => state.app);

    const dispatch = useDispatch();

    useEffect(() => {
        if (play) {
            refVideo.current?.play();
        } else {
            refVideo.current?.pause();
        }
    }, [play]);

    const handleMoveToDetail = () => {
        if (!isLoggedIn) {
            dispatch(slOpenLogin(true));
            return;
        }
        navigate(`/@${nickname}/video/${id}`);
    };

    return (
        <div className="w-full h-[282px] overflow-hidden  relative flex flex-col justify-between">
            <div onMouseEnter={() => setPlay(true)} onMouseLeave={() => setPlay(false)} className="flex-1 w-full h-[90%] cursor-pointer relative">
                <AnimatePresence>
                    {play ? (
                        <motion.video
                            onClick={handleMoveToDetail.bind(this)}
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
            <span className="lg:text-lg font-[400] h-[10%] text-white-opacity-75 md:text-sm flex items-center justify-start">
                {title.length >= 18 ? title.slice(0, 18) + '...' : title}
            </span>
        </div>
    );
};

export default VideoUser;
