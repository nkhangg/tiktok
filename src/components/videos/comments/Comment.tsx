import React from 'react';
import { Comment as typeComment } from '../../../interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Img } from '../../image';

interface CommentProps {
    data: typeComment;
}

const Comment = ({ data }: CommentProps) => {
    return (
        <div className="comment-item flex items-center justify-between mb-4">
            <div className="flex">
                <Link className="w-10 h-10 overflow-hidden rounded-full mr-3" to={`/@${data.user.nickname}`}>
                    <Img className="w-full h-full object-cover" src={data.user.avatar} alt="avartar" />
                </Link>
                <div>
                    <Link className="hover:underline font-bold text-lg leading-[25px]" to={`/@${data.user.nickname}`}>
                        {data.user.nickname}
                    </Link>
                    {data.user.is_followed && <span> . Following</span>}
                    <p className="text-16 leading-[22px] mb-[6px]">{data.comment}</p>
                    <div className="text-white-opacity-50 text-[14px] leading-5">
                        <span>{moment(data.created_at).fromNow()}</span>
                        <span className="ml-6 font-medium cursor-pointer">Reply</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center text-white-opacity-50 text-md leading-[17px] gap-1">
                <FontAwesomeIcon className="hover-icon text-lg opacity-0 cursor-pointer" icon={faEllipsis} />
                <FontAwesomeIcon icon={faHeart} />
                <span>{data.likes_count}</span>
            </div>
        </div>
    );
};

export default Comment;
