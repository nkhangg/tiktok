import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faPause, faPlay, faVolumeLow, faVolumeMute, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useRef, useState, forwardRef, ForwardedRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useElementOnScreen from '../../hook/useElementOnScreen';
import { Video as VideoInterface } from '../../interface';
import { secondsToMinute } from '../../ultils/funtion';
import { Img } from '../image';
import Interaction from './Interaction';

interface VideoProps {
    data: VideoInterface;
}

const Video = forwardRef(({ data }: VideoProps, refs: ForwardedRef<any>) => {
    //ref
    const ref = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    // variable
    const { file_url, description, likes_count, comments_count, shares_count, user } = data;

    // use state
    const [isFollow, setIsFollow] = useState(user.is_followed);
    const [hover, setHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(true);
    const [persent, setPersent] = useState(0);

    // handle funtion
    const handleFollow = () => {
        setIsFollow((prev) => !prev);
    };

    const handleLeave = () => {
        setHover(false);
    };

    const handleOver = () => {
        setHover(true);
    };

    const handlePlay = () => {
        if (!ref.current) return;
        setIsPlaying((prev) => !prev);
        if (isPlaying) {
            ref.current.pause();
        } else {
            ref.current.play();
        }
    };

    const handleEnded = () => {
        if (!ref.current) return;
        ref.current.play();
    };

    const handleMute = () => {
        setIsMute((prev) => !prev);
        if (!ref.current) return;

        ref.current.muted = isMute;
    };

    const handlePlaying = () => {
        if (!ref.current) return;
        const { duration, currentTime } = ref.current;
        let timeUpdate = ((currentTime * 100) / duration).toFixed(0);
        setPersent(Number(timeUpdate));
    };

    // hook custom

    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 1,
    };

    const isVisibile = useElementOnScreen(options, ref);

    //use effect
    useEffect(() => {
        if (!ref.current) return;

        if (isVisibile) {
            ref.current.play();
            setIsPlaying(true);
        } else {
            ref.current.pause();
            setIsPlaying(false);
        }
    }, [isVisibile]);

    return (
        <div ref={refs} className="py-5 max-w-[692px] border-b border-gray-200 snap-center">
            <div className="flex items-center justify-between gap-7 mb-3">
                <div className="flex items-center">
                    <Img src={user.avatar} alt="avartar" className="h-14 w-14 rounded-full object-cover cursor-pointer" />

                    <div className="ml-3">
                        <span className="flex items-center gap-2 cursor-pointer">
                            <span className="font-bold hover:underline flex gap-1 items-center">
                                <span onClick={() => navigate(`/@${user.nickname}`)}>{user.nickname}</span>
                                {user.tick && (
                                    <span className="text-[rgb(32,213,236)] text-sm">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                )}
                            </span>
                            <span className="font-[400] text-[15px]">{`${user.first_name} ${user.last_name}`}</span>
                        </span>
                        <p className="max-w-[510px]">{description}</p>
                    </div>
                </div>

                {!isFollow ? (
                    <button
                        onClick={handleFollow.bind(this)}
                        className="text-primary border border-primary rounded text-[16px] font-[600] 
                select-none cursor-pointer px-[10px] min-w-[88px] hover:bg-[rgba(22,24,35,.06)] py-[2px]"
                    >
                        Follow
                    </button>
                ) : (
                    <button
                        onClick={handleFollow.bind(this)}
                        className="block border border-gray-300 text-black rounded text-[16px] font-[600] 
                select-none cursor-pointer px-[10px] min-w-[88px] hover:bg-[rgba(22,24,35,.06)] py-[2px]"
                    >
                        Following
                    </button>
                )}
            </div>

            <div className="flex justify-start gap-6 w-full h-full items-end relative cursor-pointer select-none">
                <div onMouseEnter={handleOver.bind(this)} onMouseLeave={handleLeave.bind(this)} className="relative">
                    <video onTimeUpdate={handlePlaying} onEnded={handleEnded} ref={ref} className="rounded-md max-h-[600px] w-full h-full" src={file_url} />

                    <span
                        onClick={handlePlay.bind(this)}
                        className={`${hover ? 'opacity-100' : 'opacity-0'} text-xl h-10 w-10 flex items-center 
                        justify-center left-3 absolute text-white bottom-[26px] transition duration-100 ease-in`}
                    >
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </span>
                    <Tippy
                        interactive
                        render={(attrs) => (
                            <div {...attrs} className="text-white">
                                <div className="bg-[rgba(22,24,35,0.34)] w-6 h-16 rounded-[32px] relative">
                                    <div className="absolute w-[2px] h-12 bg-[rgba(255,255,255,0.34)] left-[11px] top-2 bottom-2 rounded"></div>
                                    <div className="w-3 h-3 bg-white rounded-xl z-[1] left-[6px] bottom-2 absolute"></div>
                                    <div className="w-[2px] h-12 bg-white absolute left-[11px] bottom-2 rounded origin-cb"></div>
                                </div>
                            </div>
                        )}
                    >
                        <span
                            onClick={handleMute.bind(this)}
                            className={`${hover ? 'opacity-100' : !isMute ? 'opacity-100' : 'opacity-0'} text-xl h-10 w-10 flex items-center 
                            justify-center right-3 absolute text-white bottom-[26px] transition duration-100 ease-in`}
                        >
                            <FontAwesomeIcon icon={!isMute ? faVolumeMute : faVolumeLow} />
                        </span>
                    </Tippy>

                    <div
                        className={`${hover ? 'opacity-100' : 'opacity-0'} h-[16px] w-full absolute mx-3 bottom-2 transition duration-100 ease-in flex items-center 
                        overflow-hidden`}
                    >
                        <div className="w-[75%] h-full flex items-center relative">
                            <div className={`w-full left-[0%] h-[2px] bg-[rgba(255,255,255,0.34)] absolute rounded-sm transition-all ease duration-150`}>
                                <div
                                    style={{
                                        width: persent + '%',
                                    }}
                                    className="w-0 h-full bg-white rounded-sm transition-all ease-linear duration-150"
                                ></div>
                            </div>
                        </div>
                        <span className="text-white text-sm ml-2 w-16 h-[16px] text-[10px] absolute right-3 bottom-[3.2px]">
                            {ref.current && secondsToMinute(ref.current?.currentTime)}/{ref.current && secondsToMinute(ref.current.duration)}
                        </span>
                    </div>

                    <p
                        className={`${hover ? 'opacity-100' : 'opacity-0'} absolute text-white text-[16px] right-[16px] top-6 flex items-center gap-2 font-bold
                    transition duration-100 ease-in`}
                    >
                        <span className="text-sm">
                            <FontAwesomeIcon icon={faFlag} />
                        </span>
                        <span>Report</span>
                    </p>
                </div>
                <Interaction like={likes_count} coments={comments_count} shares={shares_count} />
            </div>
        </div>
    );
});

export default memo(Video);
