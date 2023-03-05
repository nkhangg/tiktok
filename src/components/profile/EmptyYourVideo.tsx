import React from 'react';
import { useParams } from 'react-router-dom';
import { BlockIcon, UserIcon } from '../../ultils/Icon';

interface EmptyYourVideoProps {
    your: boolean | null;
    state: string;
}

const EmptyYourVideo = ({ your, state }: EmptyYourVideoProps) => {
    const { nickname } = useParams();
    return (
        <div className="w-full min-h-[490px] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <span className="w-[90px] h-[90px] text-[90px] text-white-opacity-50">
                    {state === 'Videos' && <UserIcon />}
                    {!your && state === 'Liked' && <BlockIcon />}
                </span>

                {your && state === 'Videos' && (
                    <>
                        <span className="text-2xl leading-7 mt-6 font-bold text-white-opacity">
                            Upload your first video
                        </span>
                        <p className="text-16 leading-[22px] text-white-opacity-75 mt-2">
                            Your videos will appear here
                        </p>
                    </>
                )}

                {!your && state === 'Videos' && (
                    <>
                        <span className="text-2xl leading-7 mt-6 font-bold text-white-opacity">Don't have a video</span>
                        <p className="text-16 leading-[22px] text-white-opacity-75 mt-2">
                            He's videos will appear here
                        </p>
                    </>
                )}
                {!your && state === 'Liked' && (
                    <>
                        <span className="text-2xl leading-7 mt-6 font-bold text-white-opacity">
                            This user's liked videos are private
                        </span>
                        <p className="text-16 leading-[22px] text-white-opacity-75 mt-2">
                            {`Videos liked by ${nickname?.slice(1, nickname.length)} are currently hidden`}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmptyYourVideo;
