import { faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import React, { memo } from 'react';
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
            <ButtonRouded icon={faCommentDots} title={`${coments}`} />
            <ButtonRouded icon={faShare} title={`${shares}`} />
        </div>
    );
};

export default memo(Interaction);
