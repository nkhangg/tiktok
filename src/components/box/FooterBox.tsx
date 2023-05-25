import React from 'react';

interface FooterBoxProps {
    title: string;
    contents: string[];
}

const FooterBox = ({ title, contents }: FooterBoxProps) => {
    return (
        <div className="flex-1 max-w-[226px] mr-2  text-white text-sm leading-7 flex flex-col">
            <h4 className="font-bold">{title}</h4>
            {contents.map((item) => {
                return (
                    <div key={item} className="font-medium inline text-[#ccc]   pb-[2px]">
                        <span className="border-b-2 border-b-transparent cursor-pointer hover:border-b-[#ccc]">
                            {item}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default FooterBox;
