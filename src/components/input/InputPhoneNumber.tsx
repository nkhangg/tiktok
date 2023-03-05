import Tippy from '@tippyjs/react/headless';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { numberPhoneFomat } from '../../ultils/data/numberphones';
import { PhoneNumberFormat } from '../../interface';

interface InputPhoneNumberProps {
    value: string;
    placeholder?: string;
    setValue: (value: string) => void;
}

const InputPhoneNumber = ({ value, placeholder = 'Phone number', setValue }: InputPhoneNumberProps) => {
    const [content, setContent] = useState<PhoneNumberFormat>(numberPhoneFomat[237]);
    const [list, setList] = useState<PhoneNumberFormat[]>(numberPhoneFomat);
    const [hide, setHide] = useState(false);

    // state value
    const [search, setSearch] = useState('');

    const refDiv = useRef<HTMLDivElement>(null);
    const heghtTippy = useRef<number>();

    // handle funtion
    const handleSelectOption = (phone: PhoneNumberFormat) => {
        setContent(phone);
        setHide(false);
    };

    const handleHide = () => {
        setHide((prev) => !prev);
    };

    const contents = useMemo(() => {
        return list.map((item) => {
            return (
                <div
                    key={item.format + item.country}
                    onClick={handleSelectOption.bind(this, item)}
                    className={`hover:bg-[rgba(22,24,35,0.03)] cursor-pointer 
            h-8 px-3 text-white-opacity-03 text-sm flex items-center font-medium
            justify-between ${item.format === content.format ? 'bg-[rgba(22,24,35,0.03)]' : ''}`}
                >
                    <span> {`${item.country} ${item.format}`}</span>
                    {item.format === content.format ? (
                        <span className="text-black">
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                    ) : (
                        ''
                    )}
                </div>
            );
        });
    }, [list, content.format]);

    useEffect(() => {
        if (!refDiv.current) return;
        heghtTippy.current = refDiv.current.offsetWidth * 0.9;
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setList(numberPhoneFomat);
            return;
        }

        const newList = list.filter((item) => {
            return (
                item.country.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                item.format.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            );
        });

        setList(newList);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div className="w-full h-full">
            <Tippy
                onClickOutside={handleHide.bind(this)}
                interactive
                visible={hide}
                placement="bottom-start"
                render={(attrs) => (
                    <div
                        style={{
                            width: heghtTippy.current,
                        }}
                        className={` h-[300px] max-h-[320px] shadow-2xl bg-white
                        rounded-md flex flex-col justify-between`}
                        tabIndex={-1}
                        {...attrs}
                    >
                        <div
                            className="h-9 border-b border-b-white-opacity-12 flex items-center text-white-opacity-50
                        pr-4"
                        >
                            <span className="p-4 text-xs">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <input
                                placeholder="Search"
                                className="w-full h-full bg-transparent outline-none text-sm caret-primary"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <Scrollbars autoHide>
                                <div className="py-2">
                                    {contents.length <= 0 ? (
                                        <span>
                                            <div
                                                className={`hover:bg-[rgba(22,24,35,0.03)] cursor-pointer 
                                                h-8 px-3 text-white-opacity-03 text-sm flex items-center font-medium
                                                justify-center`}
                                            >
                                                <span> {`No results found`}</span>
                                            </div>
                                        </span>
                                    ) : (
                                        contents
                                    )}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                )}
            >
                <div
                    ref={refDiv}
                    className="w-full h-11 px-3 bg-[rgba(22,24,35,.06)] rounded-[4px]
                flex items-center justify-between cursor-pointer text-white-opacity-34 
                border border-white-opacity-12"
                >
                    <div
                        className="w-[30%] h-full flex items-center justify-between relative
                     text-white-opacity"
                    >
                        <div onClick={handleHide.bind(this)} className="flex-1 flex items-center justify-between mr-3">
                            <span className="text-16">{`${content?.country.substring(0, 2).toLocaleUpperCase()} ${
                                content?.format
                            }`}</span>
                            <motion.span
                                animate={{
                                    rotate: hide ? 180 : 0,
                                }}
                                className="text-sm "
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </motion.span>
                        </div>
                        <div className="h-[60%] w-[1px] right-0 absolute bg-[rgba(22,24,35,.1)]"></div>
                    </div>
                    <div
                        onClick={() => setHide(false)}
                        className="flex-1 flex items-center w-full h-full caret-primary pl-3"
                    >
                        <input
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            spellCheck
                            type="text"
                            className=" outline-none w-full h-full bg-transparent"
                        />
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default InputPhoneNumber;
