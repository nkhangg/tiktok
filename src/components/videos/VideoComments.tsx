import React, { memo, useEffect, useState } from 'react';
import { Video } from '../../interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckCircle, faCommentDots, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ButtonIconDetailVideo, ButtonTotip, ShareButton } from '../button';
import { listShare } from '../../ultils/detailvideo';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { slSetShowNoty } from '../../store/action/slice/slice';

import AddComments from './comments/AddComments';
import Comments from './comments/Comments';

interface VideoCommentsProps {
    data: Video | undefined;
}

const VideoComments = ({ data }: VideoCommentsProps) => {
    const [isCoppy, setIsCoppy] = useState(false);

    const dispatch = useDispatch();

    // handel funtion

    useEffect(() => {
        if (isCoppy) {
            dispatch(slSetShowNoty({ isShow: true, content: 'Copied !' }));
            setIsCoppy(false);
        }
    }, [isCoppy, dispatch]);

    return (
        <div className="w-[28%] h-full bg-white flex flex-col gap-2 ">
            <div className="pt-8 px-8 pb-1">
                <div className="pt-[22px] flex items-center justify-between mb-[15px]">
                    <div className="flex items-center">
                        <img loading="lazy" className="w-10 h-10 object-cover mr-3 rounded-full" src={data?.user.avatar} alt="avatar" />
                        <div className="">
                            <h2>
                                <Link to={`/@${data?.user.nickname}`} className="font-bold text-lg hover:underline cursor-pointer">
                                    {data?.user.nickname}
                                </Link>
                                {data?.user.tick && (
                                    <span className="text-[rgb(32,213,236)] text-sm">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                )}
                            </h2>
                            <span className="font-semibold">
                                {data?.user.first_name} {data?.user.last_name} . <span>{moment(data?.created_at).fromNow()}</span>
                            </span>
                        </div>
                    </div>

                    {!data?.user.is_followed ? (
                        <button
                            className="text-primary border border-primary rounded text-[16px] font-[600] 
                    select-none cursor-pointer px-[8px] min-w-[106px] min-h-[28px] hover:bg-[rgba(22,24,35,.06)] py-[6px]"
                        >
                            Follow
                        </button>
                    ) : (
                        <button
                            className="block border border-gray-300 text-black rounded text-[16px] font-[600] 
                    select-none cursor-pointer px-[8px] min-w-[106px] min-h-[28px] hover:bg-[rgba(22,24,35,.06)] py-[6px]"
                        >
                            Following
                        </button>
                    )}
                </div>

                <div className="w-full text-16 leading-6">
                    <p className="font-normal">{data?.description}</p>
                </div>

                <h4 className="font-bold text-16 mt-[10px] mb-[16px] leading-6 hover:underline cursor-pointer">
                    {data?.music !== '' && <FontAwesomeIcon className="mr-1" icon={faMusic} />}
                    {data?.music}
                </h4>

                <div className="flex flex-col gap-4 ">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-8">
                            <ButtonIconDetailVideo title={data?.likes_count}>
                                <FontAwesomeIcon icon={faHeart} />
                            </ButtonIconDetailVideo>
                            <ButtonIconDetailVideo title={data?.comments_count}>
                                <FontAwesomeIcon icon={faCommentDots} />
                            </ButtonIconDetailVideo>
                            <ButtonIconDetailVideo title={data?.shares_count}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </ButtonIconDetailVideo>
                        </div>

                        <div className="flex items-center gap-2">
                            {listShare.map((item) => {
                                return (
                                    <ButtonTotip key={item.title} title={item.title}>
                                        <item.content width="26" height="26" />
                                    </ButtonTotip>
                                );
                            })}
                            <ShareButton />
                        </div>
                    </div>

                    <div className="border-[1px] border-white-opacity-12 text-sm text-white-opacity-75 w-full flex rounded-md">
                        <p className="flex-1 pt-[7px] pl-[12px] pb-[5px] bg-white-opacity-06 text-ellipsis truncate overflow-hidden">{window.location.href}</p>
                        <CopyToClipboard onCopy={() => setIsCoppy(true)} text={window.location.href}>
                            <button className="bg-white-opacity-06 font-bold cursor-pointer py-[7px] px-[18px] hover:bg-white-opacity-03">Copy link </button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
            <Comments data={data} />
            <AddComments data={data} />
        </div>
    );
};

export default memo(VideoComments);
