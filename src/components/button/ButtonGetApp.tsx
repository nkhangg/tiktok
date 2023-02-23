import React, { useEffect, useState, MouseEvent } from 'react';
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

    const handleClose = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setOpenPopup(false);
    };

    const handleScrollIntoViews = () => {
        dispatch(slSetScrollIntoView(hideUpIcon));
        setHideUpIcon(false);
    };

    return (
        <div className="fixed right-4 bottom-2 bg-white">
            <div
                style={{
                    transform: `${hideUpIcon ? '' : 'translateY(50%)'}`,
                }}
                className="flex items-end gap-2 flex-col bg-white transition-all ease-in duration-200 delay-200"
            >
                <div
                    onClick={handleOpen}
                    className="min-w-[90px] h-8 font-bold text-sm text-black-opacity-75 
                border border-white-opacity-12 rounded-[52px] bg-white shadow-sm
                hover:bg-white hover:border-white-opacity-2 transition-all ease-in relative
                flex items-center justify-center cursor-pointer select-none"
                >
                    <span>Get app</span>

                    <AnimatePresence>
                        {openPopup && (
                            <motion.div
                                initial={{
                                    width: 0,
                                    height: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    width: 290,
                                    height: 110,
                                    opacity: 1,
                                }}
                                exit={{
                                    width: 0,
                                    height: 0,
                                    opacity: 0,
                                }}
                                className="absolute  bottom-0 right-0 border border-[rgba(22,24,35,0.03)]
                            bg-[rgb(255,255,255)] text-[16px] rounded-lg shadow-lg flex flex-col items-center justify-between"
                            >
                                <span
                                    onClick={handleClose}
                                    className="absolute right-2 top-2 text-[20px] cursor-pointer p-2 flex items-center justify-center"
                                >
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

                <button
                    onClick={handleScrollIntoViews}
                    className="bg-primary h-8 w-8 flex items-center justify-center 
                rounded-full text-white mt-2"
                >
                    <UpIcon />
                </button>
            </div>
        </div>
    );
};

export default ButtonGetApp;
