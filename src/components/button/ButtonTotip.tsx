import Tippy from '@tippyjs/react';
import React, { ReactNode } from 'react';

interface ButtonTotipProps {
    title: string;
    children: ReactNode;
}

const ButtonTotip = ({ children, title }: ButtonTotipProps) => {
    return (
        <div>
            <Tippy content={title}>
                <div>{children}</div>
            </Tippy>
        </div>
    );
};

export default ButtonTotip;
