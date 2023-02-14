import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faDesktop, faMobileAndroidAlt } from '@fortawesome/free-solid-svg-icons';
import ButtonIcon from './ButtonIcon';
import { UpIcon } from '../../ultils/Icon';
import { useDispatch } from 'react-redux';
import { slSetScrollIntoView } from '../../store/action/slice/slice';

const ButtonGetApp = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [hideUpIcon, setHideUpIcon] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // handle funtion

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setHideUpIcon(true);
        } else {
            setHideUpIcon(false);
        }
    };

    const handleOpen = () => {
        setOpenPopup(true);
    };

    const handleClose = () => {
        setOpenPopup(false);
    };

    const handleScrollIntoViews = () => {
        dispatch(slSetScrollIntoView(hideUpIcon));
        setHideUpIcon(false);
    };

    return (
        <div>
            <AnimatePresence>
                {!openPopup && (
                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: 90,
                        }}
                        exit={{
                            width: 0,
                        }}
                        className="fixed bottom-4 right-6 flex flex-col items-end select-none"
                    >
                        <motion.button
                            onClick={handleOpen}
                            className=" text-[rgba(22,24,35,.75)] h-8 px-2 text-center
                            bg-white shadow-xl border border-[rgba(22,24,35,.12)] text-sm rounded-[52px] min-w-[90px]
                            font-bold"
                        >
                            Get app
                        </motion.button>

                        {hideUpIcon && (
                            <motion.span
                                onClick={handleScrollIntoViews}
                                initial={{
                                    y: 100,
                                }}
                                animate={{
                                    y: 0,
                                }}
                                exit={{
                                    y: 100,
                                }}
                                className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center 
                                mt-2 hover:opacity-95 cursor-pointer"
                            >
                                <UpIcon />
                            </motion.span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {openPopup && (
                    <motion.div
                        initial={{
                            width: 0,
                            height: 0,
                        }}
                        animate={{
                            width: 290,
                            height: 110,
                        }}
                        exit={{
                            width: 0,
                            height: 0,
                        }}
                        className="fixed  bottom-4 right-6 border border-[rgba(22,24,35,0.03)]
                        bg-[rgb(255,255,255)] text-[16px] rounded-lg shadow-lg flex flex-col items-center justify-between"
                    >
                        <span onClick={handleClose} className="absolute right-4 top-3 text-[20px] cursor-pointer">
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                        <motion.div
                            exit={{
                                display: 'none',
                            }}
                            className="ml-4 mr-12 "
                        >
                            <ButtonIcon icon={faDesktop} title="Get TikTok for desktop" />
                            <div className="h-[1px] bg-[rgba(22,24,35,0.12)] w-full mx-2"></div>
                            <ButtonIcon icon={faMobileAndroidAlt} title="Get TikTok App" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ButtonGetApp;
