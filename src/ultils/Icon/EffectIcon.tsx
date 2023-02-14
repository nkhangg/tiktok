import React, { ForwardedRef, forwardRef } from 'react';
import { IconsProps } from '../../interface';

const HomeActiveIcon = forwardRef(
    ({ className, width = '1em', height = '1em' }: IconsProps, ref: ForwardedRef<any>) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
                width={width}
                height={height}
            >
                <path
                    fill="black"
                    d="M0 18V9a9 9 0 0118 0v9H0zm15.75-2.25V9a6.75 6.75 0 00-9.978-5.93 6.744 6.744 0 016.619 2.971A4.483 4.483 0 0113.5 9v6.75h2.25zM6.502 5.257A4.5 4.5 0 002.25 9.75v6H4.5V9c0-1.56.795-2.936 2.002-3.743zm4.096 2.16A2.25 2.25 0 006.75 9v6.75h4.5v-6a4.48 4.48 0 00-.652-2.333z"
                ></path>
            </svg>
        );
    },
);

export default HomeActiveIcon;
