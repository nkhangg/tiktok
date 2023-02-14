import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonIconProps {
    icon: IconProp;
    title: string;
    border?: boolean;
}

const ButtonIcon = ({ icon, title, border }: ButtonIconProps) => {
    return (
        <button
            className={`flex items-center gap-2 font-bold p-2 h-[38px] my-[6px] text-[16px] hover:bg-[rgba(22,24,35,.03)] 
            rounded-lg w-full ${border ? 'border-b border-[rgba(22,24,35,0.12)]' : ''}`}
        >
            <span className="h-[21px] w-[21px]">
                <FontAwesomeIcon icon={icon} />
            </span>
            <span>{title}</span>
        </button>
    );
};

export default ButtonIcon;
