import React, { ReactNode } from 'react';

interface NavbarBoxProps {
    children: ReactNode;
    title: string;
    classNameTitle?: string;
}

const NavbarBox = ({ children, title, classNameTitle }: NavbarBoxProps) => {
    return (
        <div className="w-full flex flex-col py-4  border-b border-gray-100">
            <h4 className={`${classNameTitle ? classNameTitle : ' text-gray-400 text-sm '} px-2 h-5 mb-2`}>{title}</h4>
            {children}
        </div>
    );
};

export default NavbarBox;
