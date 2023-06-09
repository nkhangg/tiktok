import React, { ForwardedRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Img } from '../image';

interface MinSuggestedAcountProps {
    image: string;
    lastname: string;
    firstname: string;
    nickname: string;
    tick?: boolean;
    likeCount?: number;
    follwers?: number;
    isFollow?: boolean;
}

const MinSuggestedAcount = forwardRef(({ image, nickname, tick, lastname, firstname, likeCount, follwers, isFollow }: MinSuggestedAcountProps, refs: ForwardedRef<any>) => {
    return (
        <div className="">
            <Link to={`/@${nickname}`} className="transition ease-in duration-200 flex items-center justify-center rounded-md w-[55px] h-[48px] p-2 hover:bg-white-opacity-06 ">
                <Img className="rounded-full object-cover w-[36px] h-[36px]" src={image} alt="avatar" />
            </Link>
        </div>
    );
});

export default MinSuggestedAcount;
