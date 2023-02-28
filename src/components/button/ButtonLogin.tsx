import React from 'react';
interface ButtonLoginProps {
    width?: number;
    content: string;
}

const ButtonLogin = ({ width = 120, content }: ButtonLoginProps) => {
    return (
        <div
            style={{
                width,
            }}
            className={` h-11 px-3 bg-[rgba(22,24,35,.06)] rounded-sm 
            cursor-pointer text-white-opacity-34 
           border border-white-opacity-12 flex items-center justify-center`}
        >
            <span className="text-sm font-medium">{content}</span>
        </div>
    );
};

export default ButtonLogin;
