import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { SliceRedux } from '../../interface';

interface PopupProps {
    height?: string;
    width?: string;
    slice: (flag?: boolean) => SliceRedux;
    visible: boolean;
    children: ReactNode;
    full?: boolean;
}

const Popup = ({ height, width, slice, children, visible, full = false }: PopupProps) => {
    //redux
    const dispatch = useDispatch();
    return (
        <AnimatePresence>
            {visible ? (
                <section
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(slice());
                    }}
                    className="fixed w-full h-full inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[9999]"
                >
                    <motion.div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        exit={{
                            scale: 0,
                            opacity: 0,
                        }}
                        className={`bg-white  
                        ${width ? 'w-' + width : ''} 
                        ${height ? 'h-' + height : ''}
                        ${full ? '' : 'pt-12'}
                        min-h-70 rounded-md shadow-lg  select-none relative z-[9999]`}
                    >
                        {children}
                    </motion.div>
                </section>
            ) : (
                ''
            )}
        </AnimatePresence>
    );
};

export default Popup;
