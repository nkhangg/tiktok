import React from 'react';
import { Input } from '../input';
import ButtonGray from './ButtonGray';

interface ButtonSendCodePtops {
    value: string;
    setValue: (value: string) => void;
    ready?: boolean;
}

const ButtonSendCode = ({ value, ready, setValue }: ButtonSendCodePtops) => {
    return (
        <div className="flex items-center">
            <div className="flex-1">
                <Input value={value} setValue={setValue} type="text" placeholder="Enter 6-digit code" />
            </div>
            <ButtonGray ready={ready} border={true} cusor="cursor-not-allowed" title="Send code" />
        </div>
    );
};

export default ButtonSendCode;
