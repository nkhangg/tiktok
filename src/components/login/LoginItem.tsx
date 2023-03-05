import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IconsProps } from '../../interface';
import { slSetTypeMode } from '../../store/action/slice/slice';

interface LoginItemProps {
    type: string;
    title: string;
    icon?: IconProp;
    IconSocial?: React.ForwardRefExoticComponent<IconsProps & React.RefAttributes<any>>;
}

const LoginItem = ({ type, title, icon, IconSocial }: LoginItemProps) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(slSetTypeMode(type));
    };

    return (
        <div
            onClick={handleClick.bind(this)}
            className="w-[375px] h-11 px-3 border text-[rgb(22,24,35)] 
        border-[rgba(22,24,35,0.12)] flex items-center justify-center 
        text-[15px] font-bold cursor-pointer relative mb-4"
        >
            {icon && (
                <span className="flex absolute left-[12px] top-1/2 translate-y-[-50%] text-[18px]">
                    <FontAwesomeIcon icon={icon} />
                </span>
            )}

            {IconSocial && (
                <span className="flex absolute left-[12px] top-1/2 translate-y-[-50%] text-[18px]">
                    {<IconSocial />}
                </span>
            )}
            <span>{title}</span>
        </div>
    );
};

export default LoginItem;
