import React, { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';

interface TextAreaProps {
    placeholder?: string;
    value: string;
    error?: boolean;
    setValue: (active: string) => void;
    onInput?: (e: FormEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const TextArea = ({ placeholder, value, error, onInput, setValue, onFocus, onClick }: TextAreaProps) => {
    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    return (
        <div
            className={`w-[360px] h-[100px] px-3 bg-[rgba(22,24,35,.06)] rounded ${
                !error && 'focus-within:border-white-opacity-2'
            }
           cursor-pointer text-white-opacity border overflow-hidden p-3
          ${error ? 'border-error' : ''}`}
        >
            <textarea
                id="textarea"
                onChange={handleSetValue.bind(this)}
                onClick={onClick}
                value={value}
                spellCheck={false}
                placeholder={placeholder}
                className="w-full h-full outline-none bg-transparent caret-[rgb(254,44,85)] text-sm resize-none"
            />
        </div>
    );
};

export default TextArea;
