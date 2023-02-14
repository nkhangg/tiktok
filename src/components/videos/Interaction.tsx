import { faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ButtonRouded } from '../button';

interface InteractionProps {
    like: number;
    shares: number;
    coments: number;
}

const Interaction = ({ like, shares, coments }: InteractionProps) => {
    return (
        <div className="flex flex-col gap-3 mb-3">
            <ButtonRouded icon={faHeart} iconActive={faHeart} title={`${like}`} />
            <ButtonRouded icon={faCommentDots} title={`${shares}`} />
            <ButtonRouded icon={faShare} title={`${coments}`} />
        </div>
    );
};

export default Interaction;
