import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onDeleteComment, onEditComment }) => {
    return (
        <div>
            <ul>
                {comments.map(comment => <li key={comment.id}>
                    <Comment 
                        comment={comment}
                        onDeleteComment={onDeleteComment}
                        onEditComment={onEditComment}
                    /></li>)}
            </ul>
        </div>
    );
};

export default CommentList;