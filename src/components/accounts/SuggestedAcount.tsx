import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import React, { forwardRef, ForwardedRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../type';
import { Button } from '../button';
import { Img } from '../image';

interface SuggestedAcountProps {
    image: string;
    lastname: string;
    firstname: string;
    nickname: string;
    tick?: boolean;
    likeCount?: number;
    follwers?: number;
    isFollow?: boolean;
}

const SuggestedAcount = forwardRef(
    (
        { image, nickname, tick, lastname, firstname, likeCount, follwers, isFollow }: SuggestedAcountProps,
        ref: ForwardedRef<any>,
    ) => {
        const { darkMode } = useSelector((state: RootState) => state.app);
        return (
            <div>
                <Tippy
                    interactive
                    delay={[800, 0]}
                    offset={[0, 10]}
                    placement="bottom-start"
                    render={(attrs) => (
                        <div {...attrs} className="w-[320px] bg-white h-[171px] p-5 shadow-primary rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                                <Img className="w-[44px] h-[44px] rounded-full object-cover" src={image} alt="avatar" />
                                {!isFollow ? (
                                    <Button
                                        className={`${
                                            darkMode ? 'bg-[rgba(255,255,255,0.08)]' : ''
                                        }  p-4 flex items-center justify-center bg-primary rounded-md font-semibold`}
                                    >
                                        <span className="text-white">Follow</span>
                                    </Button>
                                ) : (
                                    <Button
                                        className={`${
                                            darkMode ? 'bg-[rgba(255,255,255,0.08)]' : ''
                                        }  p-4 flex items-center justify-center rounded-sm hover:bg-[rgba(22,24,35,0.03)]`}
                                    >
                                        <span className="text-black">Following</span>
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="block max-w-[260px] whitespace-nowrap font-bold">{nickname}</span>
                                {tick && (
                                    <span className="text-[rgba(32,213,236,1)]">
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </span>
                                )}
                            </div>

                            <span className="text-sm">{`${firstname} ${lastname}`}</span>

                            <div className="flex items-center gap-6">
                                <span className="flex items-center gap-1">
                                    <span className="font-bold">{follwers}</span>
                                    <span className="text-gray-400">Followers</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="font-bold">{likeCount}</span>
                                    <span className="text-gray-400">Likes</span>
                                </span>
                            </div>
                        </div>
                    )}
                >
                    <div className="h-[48px] w-full rounded-[4px] px-4 py-[9px] flex items-center cursor-pointer gap-4 hover:bg-[rgba(22,24,35,0.03)] select-none">
                        <div className="overflow-hidden h-[32px] w-[32px] rounded-full">
                            <Img className="w-full h-full object-cover" src={image} alt={nickname} />
                        </div>
                        <div className="flex flex-col">
                            <span className="flex gap-2 text-[15px] font-[600]">
                                <span className="block max-w-[260px] whitespace-nowrap font-bold">{nickname}</span>
                                {tick && (
                                    <span className="text-[rgba(32,213,236,1)]">
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </span>
                                )}
                            </span>
                            <span className="font-[400] text-[12px]">{`${firstname} ${lastname}`}</span>
                        </div>
                    </div>
                </Tippy>
            </div>
        );
    },
);

export default SuggestedAcount;
