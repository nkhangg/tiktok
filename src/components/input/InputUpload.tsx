import React, { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';

interface InputNormalProps {
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
const InputUpload = ({
    type,
    placeholder,
    value,
    error,
    small,
    checked,
    loading,
    onInput,
    setValue,
    onFocus,
    onClick,
}: InputNormalProps) => {
    const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <div
            className="w-full text-sm pl-4 min-h-[46px] border border-white-opacity-12
        rounded flex items-center"
        >
            <input
                className="outline-none w-full h-full flex-1"
                value={value}
                onChange={handleSetValue.bind(this)}
                type={type}
            />
            <span className="text-xl font-bold h-5 w-5 flex items-center justify-center ml-3">@</span>
            <span className="text-xl font-bold h-5 w-5 flex items-center justify-center mx-3">#</span>
        </div>
    );
};

export default InputUpload;
