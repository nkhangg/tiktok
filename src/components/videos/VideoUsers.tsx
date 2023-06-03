import React from 'react';
import { Video } from '../../interface';
import VideoUser from './VideoUser';

interface VideoUsersProps {
    listVideo: Video[] | null;
}

const VideoUsers = ({ listVideo }: VideoUsersProps) => {
    return (
        <div className="w-full grid grid-cols-8 gap-x-4 gap-y-6">
            {listVideo &&
                listVideo.map((item) => {
                    return (
                        <VideoUser
                            key={item.id}
                            id={item.id}
                            nickname={item.user.nickname}
                            title={item.description}
                            image={item.thumb_url}
                            video={item.file_url}
                            like={item.likes_count}
                        />
                    );
                })}
        </div>
    );
};

export default VideoUsers;
