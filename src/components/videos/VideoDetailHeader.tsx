import React from 'react';
import { ButtonVideoDetail } from '../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const VideoDetailHeader = () => {
    // navigate
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };
    return (
        <div className="w-full absolute min-h-[100px] bg-transparent top-0 left-0 z-50 flex items-center justify-center">
            <ButtonVideoDetail onClick={handleClose.bind(this)} location={[20, 0, 0, 20]}>
                <FontAwesomeIcon icon={faClose} />
            </ButtonVideoDetail>

            <div className="bg-black min-h-[46px] mb-5 w-[500px] bg-transparent rounded-full overflow-hidden border-[1px] border-white text-white text-[16px] flex items-center">
                <input
                    placeholder="Find related content"
                    className="py-3 px-4 flex-1 w-full h-full bg-transparent caret-[rgb(254,44,85)] border-none outline-none placeholder:text-white"
                    type="text"
                />
                <span className="line-find w-[52px] h-[46px] text-xl flex items-center justify-center relative hover:bg-white-opacity-12 cursor-pointer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
            </div>

            <ButtonVideoDetail
                style={{
                    width: 100,
                    padding: '10px 16px',
                    fontSize: 14,
                    fontWeight: 700,
                    gap: 8,
                }}
                location={[20, 20, 'auto', 'auto']}
            >
                <FontAwesomeIcon icon={faFlag} />
                <span>Report</span>
            </ButtonVideoDetail>
        </div>
    );
};

export default VideoDetailHeader;
