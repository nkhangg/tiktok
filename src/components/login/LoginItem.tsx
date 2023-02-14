import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface LoginItemProps {
    title: string;
    icon: IconProp;
}

const LoginItem = ({ title, icon }: LoginItemProps) => {
    return (
        <div
            className="w-[375px] h-11 px-3 border text-[rgb(22,24,35)] 
        border-[rgba(22,24,35,0.12)] flex items-center justify-center 
        text-[15px] font-bold cursor-pointer relative mb-4"
        >
            <span className="flex absolute left-[12px] top-1/2 translate-y-[-50%] text-[18px]">
                <FontAwesomeIcon icon={icon} />
            </span>
            <span>{title}</span>
        </div>
    );
};

export default LoginItem;
