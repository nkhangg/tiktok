import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { slSetFullScrennMode, slSetHiddenHeader } from '../store/action/slice/slice';
import { useParams } from 'react-router-dom';
import { apiGetAVideo } from '../api/videos';
import { Video } from '../interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonVideoDetail } from '../components/button';
import Tippy from '@tippyjs/react/headless';
import { setVolumeType } from '../type';
import { Loading } from '../components/loading';
import { secondsToMinute } from '../ultils/funtion';
import { VideoComments, VideoDetailHeader } from '../components/videos';

const VideoDetail = () => {
    //ref
    const refVideo = useRef<HTMLVideoElement>(null);
    const refInput = useRef<HTMLInputElement>(null);
    const refTimeLine = useRef<HTMLInputElement>(null);

    // redux
    const dispatch = useDispatch();
    const { id } = useParams();

    // state

    const [data, setData] = useState<Video>();
    const [progress, setProgress] = useState(20);
    const [volumn, setVolumn] = useState(20);
    const [isMute, setIsMute] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [persent, setPersent] = useState(0);
    const [isPlay, setIsPlay] = useState(true);
    const [isHideControl, setIsHideControl] = useState(false);

    // handle funtion

    const handleEnded = () => {
        if (!refVideo.current) return;
        refVideo.current.play();
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

    const handleChageVolumn = (e: ChangeEvent<HTMLInputElement>) => {
        setVolumn(parseFloat(e.target.value));

        if (!refVideo) return;

        const video = refVideo.current;

        if (video) {
            video.volume = volumn / 100;
        }

        if (volumn <= 6) {
            setIsMute(true);
        } else {
            setIsMute(false);
        }
    };

    const setMuteVideo = (callback: setVolumeType) => {
        if (!refVideo) return;
        if (callback()) {
            setIsMute(true);
            refVideo.current!.muted = true;
        } else {
            setIsMute(false);
            refVideo.current!.muted = false;
        }
    };

    const handleMute = () => {
        setIsMute((prev) => !prev);

        setMuteVideo(() => !isMute);
    };

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    const handleMoveTime = () => {
        if (!refTimeLine) return;
        const second = (parseInt(refTimeLine.current?.value as string) / 100) * (refVideo.current?.duration || 0);
        refVideo.current!.currentTime = second;
        setPersent(second);
    };

    const handlePlaying = () => {
        if (!refVideo.current) return;
        const { duration, currentTime } = refVideo.current;
        let timeUpdate = ((currentTime * 100) / duration).toFixed(0);
        setPersent(Number(timeUpdate));
    };

    const handlePause = () => {
        setIsPlay((prev) => !prev);

        if (isPlay) {
            refVideo.current?.pause();
        } else {
            refVideo.current?.play();
        }
    };

    const handleMouseIn = () => {
        setIsHideControl(true);
    };

    const handleMouseOut = () => {
        setIsHideControl(false);
    };

    useEffect(() => {
        if (!refVideo) return;

        const video = refVideo.current;

        if (video) {
            video.volume = volumn / 100;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(slSetHiddenHeader(true));
        dispatch(slSetFullScrennMode(true));

        return () => {
            dispatch(slSetHiddenHeader(false));
            dispatch(slSetFullScrennMode(false));
        };
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const res = await apiGetAVideo(id);

            if (res) {
                setData(res);
            }
        })();
    }, [id]);

    useEffect(() => {
        setMuteVideo(() => volumn <= 0);
    }, [volumn]);

    return (
        <div className="w-screen h-screen bg-white-opacity-12  flex items-center justify-center relative">
            <div className="flex-1 h-full bg-white-opacity-08 overflow-hidden bg-cover bg-no-repeat bg-center relative">
                <VideoDetailHeader />

                <ButtonVideoDetail location={['calc(50% + 8px)', 20, 'auto', 'auto']}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </ButtonVideoDetail>
                <ButtonVideoDetail location={['auto', 20, 20, 'auto']}>
                    <Tippy
                        interactive
                        offset={[0, 40]}
                        render={(attrs) => (
                            <div {...attrs}>
                                <div
                                    tabIndex={-1}
                                    className="bg-[rgba(84,84,84,0.5)] rotate-[-90deg] origin-top w-[96px] h-[28px] rounded-[32px] relative flex flex-col overflow-hidden px-2"
                                >
                                    <div className="w-full h-full flex items-center relative">
                                        <input
                                            onInput={setProgressAndVolumn.bind(this)}
                                            onClick={setProgressAndVolumn.bind(this)}
                                            ref={refInput}
                                            className="input-range large w-full h-[4px] rounded z-10 bg-[rgba(84,84,84,0.5)]"
                                            type="range"
                                            max={100}
                                            min={0}
                                            onChange={handleChageVolumn.bind(this)}
                                            value={volumn}
                                        />
                                        <div style={{ width: progress + '%' }} className="h-[4px] absolute bg-white rounded z-20"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div onClick={handleMute.bind(this)} className="flex items-center justify-center">
                            <FontAwesomeIcon icon={isMute ? faVolumeXmark : faVolumeHigh} />
                        </div>
                    </Tippy>
                </ButtonVideoDetail>

                <img className="w-full h-full object-cover" src={data?.thumb_url} loading="lazy" alt="img" />
                <div className="absolute w-full h-full bg-[rgb(18,18,18,.9)] top-0 flex items-center justify-center">
                    <div onMouseLeave={handleMouseOut.bind(this)} onMouseEnter={handleMouseIn.bind(this)} className="w-full max-w-[540px] h-full relative">
                        <video
                            onClick={handlePause.bind(this)}
                            onTimeUpdate={handlePlaying.bind(this)}
                            onLoadedData={handleLoadedData.bind(this)}
                            onEnded={handleEnded.bind(this)}
                            autoPlay
                            className="w-full h-full object-cover cursor-pointer"
                            ref={refVideo}
                            src={data?.file_url}
                        />
                        {isHideControl && (
                            <div className="absolute min-h-[80px] w-full bg-transparent bottom-0 px-4 flex items-center justify-between">
                                <div className="flex-1 h-full flex items-center relative">
                                    <div className="w-full h-full flex items-center relative">
                                        <input
                                            ref={refTimeLine}
                                            onInput={handleMoveTime.bind(this)}
                                            onClick={handleMoveTime.bind(this)}
                                            className="input-range input-video w-full h-[4px] bg-[rgba(255,255,255,0.34)] rounded z-10"
                                            type="range"
                                            max={100}
                                            min={0}
                                            onChange={(e) => {
                                                setPersent(parseInt(e.target.value));
                                            }}
                                            value={persent}
                                        />
                                        <div style={{ width: persent + '%' }} className="progress h-[4px] absolute bg-white rounded"></div>
                                    </div>
                                </div>
                                <span className="text-white flex items-center text-sm ml-2">
                                    {refVideo.current && secondsToMinute(refVideo.current?.currentTime)}/{refVideo.current && secondsToMinute(refVideo.current.duration)}
                                </span>
                            </div>
                        )}
                    </div>

                    {!isPlay && (
                        <div
                            onClick={handlePause.bind(this)}
                            className="absolute select-none flex items-center justify-center cursor-pointer top-0 w-full h-full z-50 text-white opacity-80"
                        >
                            <FontAwesomeIcon size="6x" icon={faPlay} />
                        </div>
                    )}

                    {isLoading && (
                        <div className="absolute flex items-center justify-center top-0 w-full h-full z-50">
                            <Loading />
                        </div>
                    )}
                </div>
            </div>
            <VideoComments data={data} />
        </div>
    );
};

export default VideoDetail;
