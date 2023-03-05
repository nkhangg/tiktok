import React, { ReactNode, MouseEvent } from 'react';

interface ButtonPops {
    children: ReactNode;
    className?: string;
    primary?: boolean;
    disable?: boolean;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const Button = ({ children, className, primary, disable, onClick }: ButtonPops) => {
    return (
        <button
            onClick={!disable ? onClick : () => {}}
            className={`${className ? className : ''} ${
                primary
                    ? 'bg-[rgb(254,44,85)] text-white rounded-[4px] font-bold'
                    : disable
                    ? 'bg-white-opacity-06 text-white-opacity-34 border-none pointer-events-none font-[600]'
                    : 'border border-[#e3e3e4] text-[#161823] font-[600] hover:bg-white-opacity-03 cursor-pointer'
            }  
            
            min-w-[100px] max-w-[164px] h-[37px] text-[16px]`}
        >
            {children}
        </button>
    );
};

export default Button;
