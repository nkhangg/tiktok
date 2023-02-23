import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiGetVideos } from '../api/videos';
import { Loading } from '../components/loading';
import { VideoNonFollowing } from '../components/videos';
import { Video } from '../interface';
import { filterDulicate } from '../ultils/app';

const Following = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [hasmore, setHasmore] = useState(true);

    const fectVideos = useCallback(
        async (page: number) => {
            if (videos.length > 40) {
                setHasmore(false);
                return;
            }
            const responce = await apiGetVideos(page + 1);
            if (responce) {
                const arr = [...videos, ...responce];

                const res = await filterDulicate(arr);

                setVideos(res as Video[]);
            }
        },
        [videos],
    );

    useEffect(() => {
        fectVideos(0);
    }, [fectVideos]);

    return (
        <div className={`w-[720px] pt-[64px]`}>
            <InfiniteScroll
                dataLength={videos.length}
                hasMore={hasmore}
                next={hasmore ? fectVideos.bind(this, 1) : () => {}}
                loader={
                    <div className="flex items-center justify-center w-[720px]">
                        <Loading />
                    </div>
                }
                className={'grid grid-cols-3 gap-[18px]'}
            >
                {videos.map((video) => {
                    return (
                        <VideoNonFollowing
                            key={video.id}
                            image={video.thumb_url}
                            souces={video.file_url}
                            user={video.user}
                        />
                    );
                })}
            </InfiniteScroll>
        </div>
    );
};

export default Following;
