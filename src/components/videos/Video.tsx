import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faPause, faPlay, faVolumeLow, faVolumeMute, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useRef, useState, forwardRef, ForwardedRef, memo, RefObject, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useElementOnScreen from '../../hook/useElementOnScreen';
import { Video as VideoInterface } from '../../interface';
import { secondsToMinute } from '../../ultils/funtion';
import { Img } from '../image';
import Interaction from './Interaction';
import { Loading } from '../loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { slOpenLogin } from '../../store/action/slice/slice';

interface VideoProps {
    data: VideoInterface;
}

const Video = forwardRef(({ data }: VideoProps, refs: ForwardedRef<any>) => {
    //ref
    const ref = useRef<HTMLVideoElement>(null);
    const refInput = useRef<HTMLInputElement>(null);
    const refTimeLine = useRef<HTMLInputElement>(null);
    const refProgress: RefObject<HTMLDivElement> = useRef(null);
    const navigate = useNavigate();

    // redux

    const { isLoggedIn } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    // variable
    const { id, file_url, description, user } = data;

    // use state
    const [isFollow, setIsFollow] = useState(user.is_followed);
    const [hover, setHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(true);
    const [persent, setPersent] = useState(0);

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

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

    const handlePlay = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
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

    const setVolumn = (percent: number) => {
        const video = ref.current;

        if (video) video.volume = percent / 100;
    };

    const setProgressAndVolumn = () => {
        if (!refInput) return;

        const max = parseInt(refInput.current?.getAttribute('max') || '100');
        const min = parseInt(refInput.current?.getAttribute('min') || '0');
        const value = parseInt(refInput.current?.value || '0');

        let percent = ((value - min) / (max - min)) * 100;

        setProgress(percent);
        setVolumn(progress);
    };

    const handleMoveTime = () => {
        if (!refTimeLine) return;
        const second = (parseInt(refTimeLine.current?.value as string) / 100) * (ref.current?.duration || 0);
        ref.current!.currentTime = second;
        setPersent(second);
    };

    const handleNavigate = (e: MouseEvent<HTMLElement>) => {
        if (!isLoggedIn) {
            dispatch(slOpenLogin(true));
        }
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

    useEffect(() => {
        setProgress(50);
        setVolumn(50);
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        if (progress <= 1) {
            setIsMute(false);
            ref.current.muted = true;
        } else {
            setIsMute(true);
            ref.current.muted = false;
        }
    }, [progress]);

    return (
        <div ref={refs} className="py-5 lg:max-w-[692px] md:max-w-[592px] border-b border-gray-200 snap-center">
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
                <div onMouseEnter={handleOver.bind(this)} onMouseLeave={handleLeave.bind(this)} className="relative min-h-[300px]">
                    {isLoading && (
                        <div className="absolute flex items-center justify-center top-0 w-full h-full z-50">
                            <Loading />
                        </div>
                    )}

                    <Link onClick={handleNavigate.bind(this)} to={isLoggedIn ? `/@${user.nickname}/video/${id}` : ''}>
                        <video
                            onLoadedData={() => {
                                setIsLoading(false);
                            }}
                            onTimeUpdate={handlePlaying}
                            onEnded={handleEnded}
                            ref={ref}
                            className="rounded-md lg:max-h-[600px] md:max-h-[518px] w-full h-full"
                            src={file_url}
                        />
                    </Link>
                    <span
                        onClick={handlePlay.bind(this)}
                        className={`${hover ? 'opacity-100' : 'opacity-0'} text-xl h-10 w-10 flex items-center 
                        justify-center left-3 absolute text-white bottom-[26px] transition duration-100 ease-in`}
                    >
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </span>
                    <Tippy
                        interactive
                        offset={[0, 14]}
                        render={(attrs) => (
                            <div {...attrs} className="text-white">
                                <div className="bg-[rgba(22,24,35,.34)] rotate-[-90deg] w-16 h-6 rounded-[32px] relative flex flex-col overflow-hidden px-2">
                                    <div className="w-full h-full flex items-center relative">
                                        <input
                                            onInput={setProgressAndVolumn.bind(this)}
                                            onClick={setProgressAndVolumn.bind(this)}
                                            ref={refInput}
                                            className="input-range w-full h-[2px] bg-[rgba(255,255,255,0.34)] rounded z-10"
                                            type="range"
                                            max={100}
                                            min={0}
                                        />
                                        <div ref={refProgress} style={{ width: progress + '%' }} className="w-[50%] h-[2px] absolute bg-white rounded"></div>
                                    </div>
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
                            <div className="w-full h-full flex items-center relative">
                                <input
                                    ref={refTimeLine}
                                    onInput={handleMoveTime.bind(this)}
                                    onClick={handleMoveTime.bind(this)}
                                    className="input-range input-video w-full h-[2px] bg-[rgba(255,255,255,0.34)] rounded z-10"
                                    type="range"
                                    max={100}
                                    min={0}
                                    onChange={(e) => {
                                        setPersent(parseInt(e.target.value));
                                    }}
                                    value={persent}
                                />
                                <div style={{ width: persent + '%' }} className="progress h-[2px] absolute bg-white rounded"></div>
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
                <Interaction like={data.likes_count} coments={data.comments_count} shares={data.shares_count} />
            </div>
        </div>
    );
});

export default memo(Video);
