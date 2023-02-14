import { faHashtag, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface DiscoverProps {
    hastag: boolean;
    music: boolean;
    title: string;
}

const Discover = ({ hastag, music, title }: DiscoverProps) => {
    return (
        <p
            className="w-fit max-w-[100%] h-6 px-[10px] py-[3px] ml-2 mb-3
            rounded-xl hover:bg-[rgba(22,24,35,0.03)] ease-in transition 
            duration-200 flex items-center gap-2 border border-gray-300 cursor-pointer last:mb-0"
        >
            <span className="text-[16px]">
                {music && <FontAwesomeIcon icon={faMusic} />}
                {hastag && <FontAwesomeIcon icon={faHashtag} />}
            </span>
            <span className="whitespace-nowrap text-sm font-[400] overflow-hidden text-ellipsis">{title}</span>
        </p>
    );
};

export default Discover;
