import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface CheckBoxProps {
    checked: boolean;
    setChecked: (state: boolean | React.SetStateAction<boolean>) => void;
    title?: string;
    classNameTitle?: string;
    size?: string | number;
    classCheckIcon?: string;
}

const CheckBox = ({
    checked,
    classCheckIcon,
    size = 24,
    classNameTitle = 'text-xs flex-1 text-white-opacity-75',
    title = 'Get trending content, newsletters, promotions, recommendations, and account updates sent to your email',
    setChecked,
}: CheckBoxProps) => {
    const handleClick = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className="flex items-center gap-2 w-full h-full select-none">
            {!checked ? (
                <motion.div
                    style={{
                        width: size,
                        height: size,
                    }}
                    whileTap={{
                        scale: 0.8,
                    }}
                    onClick={handleClick.bind(this)}
                    className=" block border border-white-opacity-2 rounded-sm cursor-pointer"
                ></motion.div>
            ) : (
                <motion.div
                    style={{
                        width: size,
                        height: size,
                    }}
                    whileTap={{
                        scale: 0.8,
                    }}
                    onClick={handleClick.bind(this)}
                    className="  border border-primary rounded-sm bg-primary flex items-center justify-center cursor-pointer"
                >
                    <span className={`${classCheckIcon ? classCheckIcon : ''}`}>
                        <FontAwesomeIcon icon={faCheck} color={'#fff'} />
                    </span>
                </motion.div>
            )}
            <p className={classNameTitle}>{title}</p>
        </div>
    );
};

export default memo(CheckBox);
