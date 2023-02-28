import React, { forwardRef, ForwardedRef } from 'react';
import { IconsProps } from '../../interface';

const EysOff = forwardRef(({ className, width = '34px', height = '34px' }: IconsProps, ref: ForwardedRef<any>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="1em" height="1em">
            <g stroke="#161823" opacity="0.5">
                <path d="M9.8 4.8c3 0 5.3 1.7 7 5-1.7 3.3-4 5-7 5s-5.3-1.7-7-5c1.6-3.4 4-5 7-5z"></path>
                <path d="M9.8 11.8a2 2 0 100-4 2 2 0 000 4z"></path>
            </g>
        </svg>
    );
});

export default EysOff;
