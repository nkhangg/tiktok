import React, { useCallback, useRef, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { apiGetVideos } from '../../api/videos';
import Video from './Video';
import { Loading } from '../loading';
import { useDispatch } from 'react-redux';
import { slSetScrollIntoView } from '../../store/action/slice/slice';

const Videos = () => {
    const refVideos = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    // handle funtion
    const handleScrollIntoViews = useCallback(() => {
        dispatch(slSetScrollIntoView(true));
    }, [dispatch]);

    useEffect(() => {
        handleScrollIntoViews();
    }, [handleScrollIntoViews]);

    const {
        fetchNextPage, //function
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
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

    if (status === 'error') return <p className="center">Error: </p>;

    const contents = data?.pages.map((pg) => {
        return pg.map((post, i) => {
            if (pg.length === i + 1) {
                return <Video ref={lastPostRef} key={post.id} data={post} />;
            }
            return <Video ref={lastPostRef} key={post.id} data={post} />;
        });
    });

    return (
        <div ref={refVideos} className="pt-5">
            {contents}
            {isFetchingNextPage && (
                <div className="w-[692px] h-full flex flex-col items-center justify-center">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Videos;
