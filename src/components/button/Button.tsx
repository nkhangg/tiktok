import React, { ReactNode, MouseEvent } from 'react';

interface ButtonPops {
    children: ReactNode;
    className?: string;
    primary?: boolean;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const Button = ({ children, className, primary, onClick }: ButtonPops) => {
    return (
        <button
            onClick={onClick}
            className={`${className ? className : ''} ${
                primary
                    ? 'bg-[rgb(254,44,85)] text-white rounded-[4px] font-bold'
                    : 'border border-[#e3e3e4] text-[#161823] font-[600]'
            }  min-w-[100px] max-w-[120px] h-[36px] text-[16px] cursor-pointer`}
        >
            {children}
        </button>
    );
};

export default Button;
