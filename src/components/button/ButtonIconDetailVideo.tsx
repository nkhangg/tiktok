import React, { ReactNode } from 'react';

interface ButtonIconDetailVideoProps {
    children: ReactNode;
    title: string | number | undefined;
}

const ButtonIconDetailVideo = ({ children, title }: ButtonIconDetailVideoProps) => {
    return (
        <div className="flex items-center gap-[6px] cursor-pointer">
            <span className="flex items-center justify-center w-8 h-8 bg-white-opacity-06 p-[6px] transition-all rounded-full">{children}</span>
            <strong className="text-white-opacity-75 text-xs leading-3 text-center">{title}</strong>
        </div>
    );
};

export default ButtonIconDetailVideo;
