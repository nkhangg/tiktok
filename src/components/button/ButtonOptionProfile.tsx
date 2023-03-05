import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faBan, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React from 'react';

const ButtonOptionProfile = () => {
    return (
        <div>
            <Tippy
                placement="bottom-end"
                interactive
                render={(attrs) => (
                    <div
                        className="w-[180px] h-[113px] bg-white shadow-2xl py-2 text-16 
                        leading-[22px] rounded-lg flex flex-col items-center  overflow-hidden 
                        "
                        tabIndex={1}
                        {...attrs}
                    >
                        <div className="w-full px-4 h-12 hover:bg-white-opacity-06 flex items-center">
                            <FontAwesomeIcon icon={faFlag} />
                            <span className="font-bold ml-[15px]">Report</span>
                        </div>
                        <div className=" w-full px-4">
                            <div className="h-[1px] bg-gray-300"></div>
                        </div>
                        <div className="w-full px-4 h-12 hover:bg-white-opacity-06 flex items-center">
                            <FontAwesomeIcon icon={faBan} />
                            <span className="font-bold ml-[15px]">Block</span>
                        </div>
                    </div>
                )}
            >
                <span className="text-2xl">
                    <FontAwesomeIcon icon={faEllipsis} />
                </span>
            </Tippy>
        </div>
    );
};

export default ButtonOptionProfile;
