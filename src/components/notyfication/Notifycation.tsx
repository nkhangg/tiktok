import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../type';
import { slSetShowNoty } from '../../store/action/slice/slice';
import { sleep } from '../../ultils/app';
import { AnimatePresence, motion } from 'framer-motion';

const Notifycation = () => {
    const { noty } = useSelector((state: RootState) => state.notyfication);
    const dispatch = useDispatch();

    const data: { isShow: boolean; content: string } = noty;

    useEffect(() => {
        (async () => {
            if (data.isShow) {
                await sleep(2000);
                dispatch(slSetShowNoty({ isShow: false, content: '' }));
            }
        })();
    }, [data.isShow, dispatch]);

    return (
        <AnimatePresence>
            {data.isShow && (
                <motion.div
                    initial={{
                        y: -200,
                    }}
                    animate={{
                        y: 0,
                    }}
                    exit={{ y: -200 }}
                    className="fixed top-4 left-0 right-0 z-[9999] h-10 flex items-center justify-center font-semibold text-white"
                >
                    <span className="w-[50%] bg-[rgba(84,84,84,0.92)] py-[10px] px-2 flex items-center justify-center rounded-md">
                        <span>{data.content}</span>
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notifycation;
