import React, { useState } from 'react';
import { IconChat } from '../../../ultils/Icon';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';

const AddComments = () => {
    const [comments, setComments] = useState('');
    const [isHideEmoji, setIsHideEmoji] = useState(false);

    const handleControllEmoji = () => {
        setIsHideEmoji((prev) => !prev);
    };

    const handleEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
        setComments((prev) => prev + emoji.emoji);
    };

    return (
        <div className="w-full flex items-center py-[21px] px-[30px] max-h-[82px]  ">
            <div className="py-1 pr-2 bg-white-opacity-06 flex items-center w-full rounded-md border-[1px] ">
                <input
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comment..."
                    className="flex-1 outline-none border-none bg-transparent pl-2 caret-primary"
                    type="text"
                />
                <span className="p-[5px] hover:bg-white-opacity-12 cursor-pointer transition-all rounded-md flex items-center justify-center mr-2">
                    <IconChat width="22px" height="22px" />
                </span>

                <span
                    onClick={handleControllEmoji.bind(this)}
                    className="p-[5px] select-none text-white-opacity-90 hover:bg-white-opacity-12 cursor-pointer relative transition-all rounded-md flex items-center justify-center text-[22px] mr-2"
                >
                    <Tippy
                        onClickOutside={() => setIsHideEmoji(false)}
                        interactive
                        visible={isHideEmoji}
                        offset={[-100, 40]}
                        render={(attrs) => (
                            <div {...attrs} className="text-sm">
                                <EmojiPicker onEmojiClick={handleEmoji.bind(this)} lazyLoadEmojis />
                            </div>
                        )}
                    >
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </Tippy>
                </span>
            </div>

            <span
                style={{
                    color: comments === '' ? 'rgba(22, 24, 35, 0.34)' : '',
                }}
                className="text-primary font-semibold ml-[4%] cursor-pointer select-none"
            >
                Post
            </span>
        </div>
    );
};

export default AddComments;
