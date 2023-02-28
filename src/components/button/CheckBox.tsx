import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface CheckBoxProps {
    checked: boolean;
    setChecked: (state: boolean | React.SetStateAction<boolean>) => void;
}

const CheckBox = ({ checked, setChecked }: CheckBoxProps) => {
    const handleClick = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className="flex items-start gap-2 w-full h-full">
            {!checked ? (
                <motion.div
                    whileTap={{
                        scale: 0.8,
                    }}
                    onClick={handleClick.bind(this)}
                    className="w-6 h-6 block border border-white-opacity-2 rounded-sm cursor-pointer"
                ></motion.div>
            ) : (
                <motion.div
                    whileTap={{
                        scale: 0.8,
                    }}
                    onClick={handleClick.bind(this)}
                    className="w-6 h-6  border border-primary rounded-sm bg-primary flex items-center justify-center cursor-pointer"
                >
                    <FontAwesomeIcon icon={faCheck} color={'#fff'} />
                </motion.div>
            )}
            <p className="text-xs flex-1 text-white-opacity-75">
                Get trending content, newsletters, promotions, recommendations, and account updates sent to your email
            </p>
        </div>
    );
};

export default memo(CheckBox);
