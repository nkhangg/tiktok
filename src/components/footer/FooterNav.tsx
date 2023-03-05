import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../type';
import { EffectIcon } from '../../ultils/Icon';
import { linkImageEffect } from '../../ultils/links';
import { footerNav } from '../../ultils/navbar';
import { Img } from '../image';

const FooterNav = () => {
    const { profileMode } = useSelector((state: RootState) => state.app);

    return (
        <div className="pt-4 pl-2 text-[rgba(22,24,35,.5)]">
            {!profileMode && (
                <div className="h-[52px] w-full rounded-lg overflow-hidden cursor-pointer relative mb-[30px]">
                    <Img src={linkImageEffect} alt="effect" className="w-full h-full object-cover " />
                    <div
                        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] 
                    flex items-center justify-center gap-2 text-[16px] hover:scale-[1.1] transition
                    ease-in duration-100"
                    >
                        <span>
                            <EffectIcon />
                        </span>
                        <span className="font-bold">Create effects</span>
                    </div>
                </div>
            )}

            <div className="text-xs mr-[6px] mt-[5px] flex items-center flex-wrap">
                {footerNav.map((item, index) => {
                    return (
                        <span key={index} className="mt-[5px] mr-[6px] mb-2 block hover:underline cursor-pointer">
                            {item}
                        </span>
                    );
                })}
            </div>
            <span className="mt-[5px] block text-xs">© 2023 TikTok</span>
        </div>
    );
};

export default FooterNav;
