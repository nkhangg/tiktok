import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const MiniLoanding = () => {
    return (
        <div className="animate-wiggle">
            <FontAwesomeIcon icon={faSpinner} />
        </div>
    );
};

export default MiniLoanding;
