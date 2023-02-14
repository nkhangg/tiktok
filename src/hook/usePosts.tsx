import { useState, useEffect } from 'react';
import { apiGetVideos } from '../api/videos';
import { Video } from '../interface';

const usePosts = (pageNumber: number = 1) => {
    const [results, setResults] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPge, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();

        const { signal } = controller;

        apiGetVideos(pageNumber, { signal })
            .then((data) => {
                setResults((prev) => [...prev, ...data]);
                setHasNextPage(Boolean(data.length));
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                if (signal.aborted) return;
                setIsError(true);
                setError({ message: e.message });
            });

        return () => controller.abort();
    }, [pageNumber]);

    return { isLoading, isError, error, results, hasNextPge };
};

export default usePosts;
