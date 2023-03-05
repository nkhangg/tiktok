import React, { useRef } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Active } from '../../interface';

interface TabProps {
    title: string;
    selected: boolean;
    icon?: IconProp;
    active: Active;
    setActive: ({ value, initBorder, left }: Active) => void;
}

const Tab = ({ title, selected, icon, active, setActive }: TabProps) => {
    const ref = useRef<HTMLParagraphElement>(null);
    return (
        <p
            onMouseEnter={() => setActive({ ...active, left: ref.current ? ref.current?.offsetLeft : 0 })}
            onMouseLeave={() => setActive({ ...active, left: active.initBorder })}
            ref={ref}
            onClick={() =>
                setActive({
                    value: title,
                    initBorder: ref.current ? ref.current?.offsetLeft : 0,
                    left: ref.current ? ref.current?.offsetLeft : 0,
                })
            }
            className={`w-1/2 h-full flex items-center justify-center
             font-bold text-[18px] leading-[25px]
           cursor-pointer ${selected ? 'text-white-opacity' : 'text-white-opacity-50'}`}
        >
            {icon && (
                <span>
                    <FontAwesomeIcon icon={icon} />
                </span>
            )}
            <span className={`${icon ? 'ml-2' : ''}`}>{title}</span>
        </p>
    );
};

export default Tab;
