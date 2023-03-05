import React, { ForwardedRef, forwardRef } from 'react';
import { IconsProps } from '../../../interface';

const Email = forwardRef(({ className, width = '1em', height = '1em' }: IconsProps, ref: ForwardedRef<any>) => {
    return (
        <svg width="26" data-e2e="" height="26" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                fill="#0DBEF3"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.6327 14.8957C12.4779 14.8957 11.5417 15.8318 11.5417 16.9866V31.0131C11.5417 32.1679 12.4779 33.104 13.6327 33.104H34.3675C35.5223 33.104 36.4584 32.1679 36.4584 31.0131V16.9866C36.4584 15.8318 35.5223 14.8957 34.3675 14.8957H13.6327ZM33.7214 17.3809L24.0001 24.1142L14.2788 17.3809C13.9321 17.1407 13.4584 17.3889 13.4584 17.8106V19.0944L24.0001 26.396L34.5418 19.0944V17.8106C34.5418 17.3889 34.0681 17.1407 33.7214 17.3809Z"
                fill="white"
            ></path>
        </svg>
    );
});

export default Email;