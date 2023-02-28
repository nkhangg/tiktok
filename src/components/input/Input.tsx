import React, { ChangeEvent, FocusEvent, FormEvent, MouseEvent, useState } from 'react';
import { Error, EysOff, EysOn } from '../../ultils/Icon';

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    error?: boolean;
    setValue: (active: string) => void;
    onInput?: (e: FormEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const Input = ({ type, placeholder, value, error, onInput, setValue, onFocus, onClick }: InputProps) => {
    const [eys, setEys] = useState(true);
    const [isType, setIsType] = useState(type);

    const handleClickEys = () => {
        if (type !== 'password') return;

        setEys((prev) => !prev);

        if (eys) {
            setIsType('text');
        } else {
            setIsType('password');
        }
    };

    const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div
            className={`w-full h-11 px-3 bg-[rgba(22,24,35,.06)] rounded-sm 
            flex items-center justify-between cursor-pointer text-white-opacity-34 border 
            ${error ? 'border-error' : ' border-white-opacity-12'}`}
        >
            <input
                onClick={onClick}
                onFocus={onFocus}
                onInput={onInput}
                value={value}
                onChange={handleSetValue.bind(this)}
                spellCheck={false}
                placeholder={placeholder}
                className="w-full h-full outline-none bg-transparent caret-[rgb(254,44,85)] text-sm"
                type={type === 'password' ? isType : type}
            />

            {error ? (
                <span onClick={handleClickEys} className="text-sm mr-2">
                    <Error />
                </span>
            ) : (
                ''
            )}

            {type === 'password' && (
                <span onClick={handleClickEys} className="text-[20px]">
                    {eys ? <EysOff /> : <EysOn />}
                </span>
            )}
        </div>
    );
};

export default Input;
