import React, { useCallback, useRef, useState, memo, useMemo } from 'react';
import usePosts from '../../hook/usePosts';

import { Loading } from '../loading';
import { default as VideoComponent } from './Video';

const Videos = () => {
    const [pageNum, setPageNum] = useState(1);
    const { isLoading, isError, results, hasNextPge } = usePosts(pageNum);

    const refVideos = useRef<HTMLDivElement>(null);

    const intObserver = useRef<IntersectionObserver>();
    const lastPostRef = useCallback(
        (post: Element) => {
            if (isLoading) return;

            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPge) {
                    setPageNum((prev) => prev + 1);
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [isLoading, hasNextPge],
    );

    const constents = useMemo(() => {
        const content = results.map((video, index) => {
            if (results.length === index + 1) {
                return <VideoComponent ref={lastPostRef} key={video.id} data={video} />;
            }

            return <VideoComponent key={video.id + video.user_id + Math.random() * 100} data={video} />;
        });

        return content;
    }, [lastPostRef, results]);

    // handleLoadingEvent

    // use Effect

    if (isError)
        return (
            <div id="videos" className="pt-5">
                404 not found !
            </div>
        );

    return (
        <div ref={refVideos} className="pt-5">
            {constents}
            {isLoading && (
                <div className="w-[692px] h-full flex flex-col items-center justify-center">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default memo(Videos);
