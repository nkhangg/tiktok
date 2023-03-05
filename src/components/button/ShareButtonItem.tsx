import React from 'react';
import { IconsProps } from '../../interface';

interface ShareButtonItemProps {
    title: string;
    Icon: React.ForwardRefExoticComponent<IconsProps & React.RefAttributes<any>> | null;
}

const ShareButtonItem = ({ title, Icon }: ShareButtonItemProps) => {
    return (
        <span
            className="w-[267px] mx-1 flex items-center justify-start gap-3 px-[16px] 
            py-[11px] font-bold text-white-opacity hover:bg-white-opacity-06 rounded"
        >
            {Icon && <Icon />}
            <span>{title}</span>
        </span>
    );
};

export default ShareButtonItem;
