import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tippy from '@tippyjs/react/headless';
import Scrollbars from 'react-custom-scrollbars-2';

interface ContentProps {
    content: string | number;
    state: boolean;
}

interface ButtonOptionProps {
    initContent: string;
    listContent: string[] | number[];
}

const ButtonOption = ({ initContent, listContent }: ButtonOptionProps) => {
    const [content, setContent] = useState<ContentProps>({ content: initContent, state: false });
    const [hide, setHide] = useState(false);

    // handle funtion
    const handleSelectOption = (option: string | number) => {
        setContent({ content: option, state: true });
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
                        className="w-120 h-[200px] max-h-[320px] shadow-xl bg-white
                    rounded-md"
                        tabIndex={-1}
                        {...attrs}
                    >
                        <Scrollbars autoHide>
                            <div className="flex flex-col justify-center py-2">
                                {listContent.map((item) => {
                                    return (
                                        <div
                                            key={item}
                                            onClick={handleSelectOption.bind(this, item)}
                                            className="hover:bg-[rgba(22,24,35,0.03)] cursor-pointer 
                                            h-8 px-3 text-white-opacity-03 text-sm flex items-center font-medium"
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
                    onClick={handleHide.bind(this)}
                    className="w-120 h-11 px-3 bg-[rgba(22,24,35,.06)] rounded-[4px] 
            flex items-center justify-between cursor-pointer text-white-opacity-34"
                >
                    <span className={`${content.state ? 'text-black text-16 font-medium' : ''}`}>
                        {content.content}
                    </span>
                    <motion.span
                        animate={{
                            rotate: hide ? 180 : 0,
                        }}
                        className="text-sm text-black"
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

export default ButtonOption;
