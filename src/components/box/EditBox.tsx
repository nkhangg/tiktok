import React, { ReactNode } from 'react';

interface EditBoxProps {
    title: string;
    border?: boolean;
    children: ReactNode;
}

const EditBox = ({ title, border = true, children }: EditBoxProps) => {
    return (
        <div
            className={`py-4 flex
        ${border && 'border-b border-r-white-opacity-06'}`}
        >
            <div className="w-[120px] font-medium leading-6 text-16 mr-6">{title}</div>
            {children}
        </div>
    );
};

export default EditBox;
