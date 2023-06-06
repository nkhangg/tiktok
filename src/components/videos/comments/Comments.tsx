import React, { memo, useEffect, useState, useCallback } from 'react';
import { apiGetComments } from '../../../api/videos';
import { Video, Comment as typeComment } from '../../../interface';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../type';
import { slSetReloadComments } from '../../../store/action/slice/slice';

interface CommentsProps {
    data: Video | undefined;
}

const Comments = ({ data }: CommentsProps) => {
    const [comments, setComments] = useState<typeComment[]>([]);

    const { reloadComments } = useSelector((state: RootState) => state.app);

    const dispath = useDispatch();

    const postComments = useCallback(async () => {
        try {
            const res = await apiGetComments(data?.id);

            if (res) {
                setComments(res);
            }
        } catch (error) {}
    }, [data]);

    useEffect(() => {
        postComments();
    }, [postComments]);

    useEffect(() => {
        if (reloadComments) {
            postComments();
        }

        return () => {
            dispath(slSetReloadComments(false));
        };
    }, [reloadComments, postComments, dispath]);

    return (
        <div
            id="box-comments"
            className="flex-1 w-full overflow-auto border-t-[1px] border-t-white-opacity-2 border-b-[1px] border-b-white-opacity-2 py-6 px-8 bg-[rgb(248,248,248)]"
        >
            {comments.map((item) => {
                return <Comment key={item.id} data={item} />;
            })}
        </div>
    );
};

export default memo(Comments);
