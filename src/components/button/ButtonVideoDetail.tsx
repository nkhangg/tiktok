import React, { ReactNode, MouseEvent } from 'react';

interface ButtonVideoDetailProps {
    location: [number | string, number | string, number | string, number | string];
    children: ReactNode;
    style?: {};
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const ButtonVideoDetail = ({ location, children, style, onClick }: ButtonVideoDetailProps) => {
    return (
        <button
            onClick={onClick}
            style={{
                top: location[0],
                right: location[1],
                bottom: location[2],
                left: location[3],
                ...style,
            }}
            className="absolute bg-white h-10 w-10 rounded-full z-50 text-white bg-[rgba(84,84,84,0.5)] text-xl flex items-center justify-center hover:bg-[rgba(37,37,37,0.6)] hover:opacity-70 transition"
        >
            {children}
        </button>
    );
};

export default ButtonVideoDetail;
