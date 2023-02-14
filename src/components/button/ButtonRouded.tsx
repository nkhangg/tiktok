import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../type';

interface ButtonRoudedProps {
    title: string;
    icon: IconDefinition;
    to?: string;
    iconActive?: IconDefinition;
}

const ButtonRouded = ({ title, icon, to, iconActive }: ButtonRoudedProps) => {
    const [chageState, setChageState] = useState(false);

    // config
    let Conponent: CustomButton = 'button';
    if (to) {
        Conponent = Link;
    }

    // handle funtion
    const handleChageState = () => {
        setChageState((prev) => !prev);
    };
    return (
        <Conponent to={to ? to : ''} className={`flex flex-col items-center justify-center gap-2`}>
            <span
                onClick={iconActive && handleChageState.bind(this)}
                className="bg-[rgba(22,24,35,.06)] text-2xl h-12 w-12 flex items-center justify-center 
                    rounded-full"
            >
                {!chageState && <FontAwesomeIcon icon={icon} />}
                {chageState && <FontAwesomeIcon color="red" icon={iconActive ? iconActive : icon} />}
            </span>
            <strong className="text-[rgba(22,24,35,.75)] text-[12px] text-center font-bold">{title}</strong>
        </Conponent>
    );
};

export default ButtonRouded;
