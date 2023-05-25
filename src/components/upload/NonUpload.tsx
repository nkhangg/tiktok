import React, { useRef } from 'react';
import { range } from '../../ultils/app';
import { InfoBox } from '../box';

const NonUpload = () => {
    const move = useRef<HTMLDivElement>(null);
    const refBackground = useRef<HTMLDivElement>(null);

    return (
        <InfoBox classNameBox="w-full min-h-[166px]" title="Cover">
            <div className="border border-white-opacity-12 p-[6px] rounded h-[166px] relative">
                <div className="w-full h-full bg-white-opacity-03 rounded overflow-hidden flex border-2 border-white-opacity-12"></div>
                <div ref={refBackground} className="bg-[rgba(255,255,255,0.6)] absolute inset-0 w-full h-full ">
                    <div
                        id="mask"
                        style={{ left: 0 }}
                        ref={move}
                        className="absolute  w-[106px] left-4 h-full scale-110 bg-white p-2 
                    border-white rounded-lg shadow-lg"
                    ></div>
                </div>
            </div>
        </InfoBox>
    );
};

export default NonUpload;
