import React, { useEffect, useState } from 'react';
import { apiGetComments } from '../../../api/videos';
import { Video, Comment as typeComment } from '../../../interface';
import Comment from './Comment';

interface CommentsProps {
    data: Video | undefined;
}

const Comments = ({ data }: CommentsProps) => {
    const [comments, setComments] = useState<typeComment[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await apiGetComments(data?.id);

                if (res) {
                    setComments(res);
                }
            } catch (error) {}
        })();
    }, [data]);

    return (
        <div className="flex-1 w-full overflow-auto border-t-[1px] border-t-white-opacity-2 border-b-[1px] border-b-white-opacity-2 py-6 px-8 bg-[rgb(248,248,248)]">
            {comments.map((item) => {
                return <Comment key={item.id} data={item} />;
            })}
        </div>
    );
};

export default Comments;
