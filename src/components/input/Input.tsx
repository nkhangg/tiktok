import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FocusEvent, FormEvent, MouseEvent, useState, useRef } from 'react';
import { Error, EysOff, EysOn } from '../../ultils/Icon';
import MiniLoanding from '../loading/MiniLoanding';

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    error?: boolean;
    small?: boolean;
    checked?: boolean;
    loading?: boolean;
    setValue: (active: string) => void;
    onInput?: (e: FormEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const Input = ({ type, placeholder, value, error, small, checked, loading, onInput, setValue, onFocus, onClick }: InputProps) => {
    const [eys, setEys] = useState(true);
    const [isType, setIsType] = useState(type);

    const normal = useRef(`w-full h-11 px-3 bg-[rgba(22,24,35,.06)] rounded-sm 
                     cursor-pointer text-white-opacity-34 border 
                    `);

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
            className={`${
                small
                    ? `w-[360px] h-[38px] ${!error ? 'focus-within:border-white-opacity-2' : ''}  bg-white-opacity-06 text-16 text-white-opacity leading-6 px-3 py=[7px] rounded`
                    : normal.current
            } ${error ? 'border-error' : small ? '' : 'border-white-opacity-12'} flex items-center justify-between border`}
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

            {error && !small ? (
                <span onClick={handleClickEys} className="text-sm mr-2">
                    <Error />
                </span>
            ) : (
                ''
            )}

            {checked ? (
                <span className="text-sm mr-2 text-sucess">
                    <FontAwesomeIcon icon={faCheck} />
                </span>
            ) : (
                ''
            )}

            {loading ? (
                <span className="text-sm mr-2 text-white-opacity-50">
                    <MiniLoanding />
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
