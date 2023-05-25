import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import Tippy from '@tippyjs/react/headless';
import Scrollbars from 'react-custom-scrollbars-2';

interface ButtonOptionProps {
    initContent: string;
    listContent: string[] | number[];
    width?: string | number;
    backgroundInput?: string;
    border?: string;
    height?: string | number;
    heightOptions?: string | number;
    heightitem?: string | number;
    value: string | number;
    color?: string;
    setValue: (value: string | number) => void;
}

const ButtonOptions = ({
    initContent,
    listContent,
    width,
    height,
    backgroundInput,
    border,
    heightOptions,
    heightitem,
    value,
    color = 'text-black',
    setValue,
}: ButtonOptionProps) => {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        setValue(initContent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handle funtion
    const handleSelectOption = (option: string | number) => {
        setValue(option);
        setHide(false);
    };

    const handleHide = () => {
        setHide((prev) => !prev);
    };

    return (
        <div>
            <Tippy
                placement="bottom"
                interactive
                visible={hide}
                onClickOutside={handleHide.bind(this)}
                render={(attrs) => (
                    <div
                        style={{
                            width: width,
                            height: heightOptions,
                        }}
                        className="max-h-[320px] shadow-xl bg-white
                    rounded-md py-1"
                        tabIndex={-1}
                        {...attrs}
                    >
                        <Scrollbars autoHide>
                            <div className="flex flex-col justify-center ">
                                {listContent.map((item) => {
                                    return (
                                        <div
                                            style={{
                                                height: heightitem,
                                            }}
                                            key={item}
                                            onClick={handleSelectOption.bind(this, item)}
                                            className={`${
                                                item === value ? 'bg-[rgba(22,24,35,0.03)]' : ''
                                            } hover:bg-[rgba(22,24,35,0.01)] cursor-pointer 
                                            h-8 px-3 text-white-opacity-03 text-sm flex items-center font-medium`}
                                        >
                                            <span> {item}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Scrollbars>
                    </div>
                )}
            >
                <div
                    style={{
                        width,
                        height,
                    }}
                    onClick={handleHide.bind(this)}
                    className={`
                    ${backgroundInput ? backgroundInput : 'bg-[rgba(22,24,35,.06)]'} 
                    ${border !== '' && border}
                    
                    h-11 px-3 rounded-[4px] 
                    flex items-center justify-between cursor-pointer text-white-opacity-34`}
                >
                    <span className={`${color} text-16 font-medium`}>{value}</span>
                    <motion.span
                        animate={{
                            rotate: hide ? 180 : 0,
                        }}
                        className={`text-sm ${color}`}
                        whileTap={{
                            rotate: 180,
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </motion.span>
                </div>
            </Tippy>
        </div>
    );
};

export default memo(ButtonOptions);
