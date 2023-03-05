import React, { MouseEvent } from 'react';

interface ButtonGrayProps {
    width?: string;
    title: string;
    cusor?: 'cursor-pointer' | 'cursor-default' | 'cursor-not-allowed';
    border?: boolean;
    ready?: boolean;
    className?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const ButtonGray = ({
    width = '50%',
    title,
    cusor = 'cursor-pointer',
    border = false,
    ready,
    className,
    onClick,
}: ButtonGrayProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-[${width}] h-11 px-3  rounded-sm 
            flex items-center bg-[rgba(22,24,35,.06)]
            ${className ? className : ''}
            ${border ? 'border border-white-opacity-12' : ''} justify-center
            ${ready ? 'text-white-opacity cursor-pointer' : ' text-white-opacity-34'}
            ${ready ? 'cursor-pointer' : cusor}
            `}
        >
            <span className={`font-bold `}>{title}</span>
        </button>
    );
};

export default ButtonGray;
