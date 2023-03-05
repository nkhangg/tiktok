import React from 'react';
import { motion } from 'framer-motion';
import Tab from './Tab';
import { Active } from '../../interface';
import { listTabs } from '../../ultils/setting';

interface TabsProps {
    active: Active;
    setActive: (value: Active) => void;
}

const Tabs = ({ active, setActive }: TabsProps) => {
    return (
        <div className={`w-[460px] h-[44px] flex items-center relative mb-2`}>
            {listTabs.map((item) => {
                return (
                    <Tab
                        active={active}
                        key={item.title}
                        setActive={setActive}
                        title={item.title}
                        icon={item.icon}
                        selected={item.title === active.value}
                    />
                );
            })}

            <div className="absolute w-full h-[1px] bg-gray-300 bottom-0"></div>
            <motion.div
                animate={{
                    left: active.left,
                }}
                className="absolute w-1/2 h-[2px] bg-white-opacity bottom-0"
            ></motion.div>
        </div>
    );
};

export default Tabs;
