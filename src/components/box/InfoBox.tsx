import React, { ReactNode } from 'react';

interface InfoBoxProps {
    children: ReactNode;
    title: string;
    subTitle?: ReactNode;
    classNameBox?: string;
    placement?: boolean;
}

const InfoBox = ({ children, title, subTitle, classNameBox, placement = true }: InfoBoxProps) => {
    return (
        <div className={`${classNameBox} ${placement ? 'mt-6' : ''}`}>
            <div className="mb-2 flex items-center justify-between">
                <h4 className="leading-6 font-semibold text-white-opacity ">{title}</h4>
                {subTitle}
            </div>

            {children}
        </div>
    );
};

export default InfoBox;
