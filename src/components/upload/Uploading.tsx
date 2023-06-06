import React, { useRef, useEffect, SetStateAction } from 'react';
import { InfoBox } from '../box';

interface UploadingProps {
    listThumnail: string[];
    video: string;
    curentTime: number;
    setCurentTime: (value: SetStateAction<number>) => void;
}

const Uploading = ({ listThumnail, video, curentTime, setCurentTime }: UploadingProps) => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const refBackground = useRef<HTMLDivElement>(null);
    const move = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!move.current) return;
            if (!refBackground.current) return;
            if (!refVideo.current) return;
            const res = move.current?.style;
            const location = 700 + 117;
            if (e.clientX - location < 0 || e.clientX - location > refBackground.current.offsetWidth - move.current.offsetWidth) return;
            const rect = refBackground.current.getBoundingClientRect();
            res.left = e.clientX - location + 'px';
            const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
            const second = Math.max(1, Math.floor(percent * refVideo.current.duration));
            setCurentTime(second);
        };

        const handleMouseUp = () => {
            move.current?.removeEventListener('mousemove', handleMouseMove);
        };

        move.current?.addEventListener('mousemove', handleMouseMove);
        move.current?.addEventListener('mouseup', handleMouseUp);
        // move.current?.addEventListener('mouseleave', handleMouseUp);
    };

    useEffect(() => {
        if (!refVideo.current) return;
        refVideo.current.currentTime = curentTime;
    }, [curentTime]);

    return (
        <InfoBox classNameBox="w-full min-h-[166px]" title="Cover">
            <div className="border border-white-opacity-12 p-[6px] rounded h-[166px] relative">
                <div className="w-full h-full bg-white-opacity-03 rounded overflow-hidden flex border-2 border-white-opacity-12">
                    {listThumnail.map((item, index) => {
                        return <img key={index} className="w-[11.11111%] h-full object-cover " src={item} alt="thumnail" />;
                    })}
                </div>
                <div ref={refBackground} className="bg-[rgba(255,255,255,0.6)] absolute inset-0 w-full h-full ">
                    {listThumnail.length > 0 && (
                        <div
                            style={{ left: 0 }}
                            onMouseDown={handleMouseDown}
                            ref={move}
                            className="absolute  w-[106px] left-4 h-full scale-110 bg-white p-2 
                    border-white rounded-lg shadow-lg"
                        >
                            <video preload="auto" ref={refVideo} className="w-full h-full object-cover" src={video} />
                        </div>
                    )}
                </div>
            </div>
        </InfoBox>
    );
};

export default Uploading;
