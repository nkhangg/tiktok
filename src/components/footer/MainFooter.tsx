import React, { useState } from 'react';
import { contentsFooter } from '../../ultils/footer';
import { FooterBox } from '../box';
import { ButtonOptions } from '../button';

const MainFooter = () => {
    const [language, setLanguage] = useState<string | number>('');

    return (
        <footer className="w-full h-[356px] bg-black mt-4 relative">
            <div className="absolute flex left-[144px] top-[43px]">
                <img
                    src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
                    alt="logo"
                />
                <img
                    className="ml-[6px]"
                    src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logotext-9b4d14640f93065ec36dab71c806e135.svg"
                    alt="logo"
                />
            </div>
            <div className="relative mt-10 ml-[378px] flex">
                {contentsFooter.map((item) => {
                    return <FooterBox key={item.title} title={item.title} contents={item.contents} />;
                })}
            </div>
            <div className="w-full px-[144px] mt-[40px] text-white flex items-center justify-between mb-6">
                <ButtonOptions
                    border="border border-[#8a8b91]"
                    heightOptions={128}
                    heightitem={40}
                    color="text-white"
                    width={170}
                    height={36}
                    listContent={['Tiếng Việt', 'Tiếng Trung', 'English']}
                    value={language}
                    setValue={setLanguage}
                    initContent={'English'}
                />

                <div className="font-medium text-sm leading-6 text-[#8a8b91]">© {new Date().getFullYear()} TikTok</div>
            </div>
        </footer>
    );
};

export default MainFooter;
