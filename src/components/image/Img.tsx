import React, { useState } from 'react';
import { linkNonImage } from '../../ultils/links';

interface ImageProps {
    className?: string;
    alt: string;
    src: string | null;
}

const Img = ({ className, alt, src }: ImageProps) => {
    const [fallback, setFallback] = useState(src);

    const handleError = () => {
        setFallback(linkNonImage);
    };

    return <img onError={handleError.bind(this)} className={className} alt={alt} src={fallback ? fallback : ''} />;
};

export default Img;
