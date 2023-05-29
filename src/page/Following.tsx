import React, { useCallback, useEffect, useRef } from 'react';
import { apiGetVideos } from '../api/videos';
import { Loading } from '../components/loading';
import { VideoNonFollowing } from '../components/videos';
import { useInfiniteQuery } from 'react-query';
import { slSetScrollIntoView } from '../store/action/slice/slice';
import { useDispatch } from 'react-redux';

const Following = () => {
    const dispatch = useDispatch();

    // handle funtion
    const handleScrollIntoViews = useCallback(() => {
        dispatch(slSetScrollIntoView(true));
    }, [dispatch]);

    useEffect(() => {
        handleScrollIntoViews();
    }, [handleScrollIntoViews]);

    const refVideos = useRef<HTMLDivElement>(null);
    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
    } = useInfiniteQuery('/videos', ({ pageParam = 1 }) => apiGetVideos(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined;
        },
    });

    const intObserver: any = useRef();
    const lastPostRef = useCallback(
        (post: any) => {
            if (isFetchingNextPage) return;

            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage],
    );

    const contents = data?.pages.map((pg) => {
        return pg.map((video, i) => {
            if (pg.length === i + 1) {
                return <VideoNonFollowing ref={lastPostRef} key={video.id} image={video.thumb_url} souces={video.file_url} user={video.user} />;
            }
            return <VideoNonFollowing ref={lastPostRef} key={video.id} image={video.thumb_url} souces={video.file_url} user={video.user} />;
        });
    });

    return (
        <div ref={refVideos} className="pt-5">
            <div className={'grid grid-cols-3 gap-[18px]'}> {contents}</div>
            {isFetchingNextPage && (
                <div className="w-[692px] h-full flex flex-col items-center justify-center">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Following;
