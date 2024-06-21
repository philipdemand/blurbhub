import React, { useState } from 'react';
import EditPostForm from './EditPostForm';
import CreateCommentForm from './CreateCommentForm';
import CommentList from './CommentList';
import axios from 'axios'
import Button from 'react-bootstrap/Button';

const Post = ({ post, onEditPost, onAddComment, onDeleteComment, onEditComment, onDeletePost }) => {

    const [editClicked, setEditClicked] = useState(false)
    const [commentClicked, setCommentClicked] = useState(false)
    const [errorData, setErrorData] = useState('')

    const toggleEdit = () => {
        setEditClicked(!editClicked)
    }

    const toggleComment = () => {
        setCommentClicked(!commentClicked)
    }

    const deletePost = async () => {
        try {
            await axios.delete(`/api/v1/posts/${post.id}`)
            onDeletePost(post.id)
        } catch (error) {
            setErrorData(error.response.data.error)
            setTimeout(() => {
                setErrorData("");
            }, 5000);
        }
    }

    const dateTime = () => {
        const date = new Date(post.created_at);

        const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const formattedYear = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);

        const day = date.getDate();
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${formattedMonth} ${day}${daySuffix(day)}, ${formattedYear}`;
    };

    return (
        <div className="post">
            <h6>from {post.username} on {dateTime()}</h6>
            {editClicked ?
                <div style={{ marginTop: "20px", marginBottom: "17px" }}>
                    <EditPostForm
                        onEditPost={onEditPost}
                        post={post}
                        setEditClicked={setEditClicked}
                        setErrorData={setErrorData}
                    />
                </div>
                : <h4>{post.post_body}</h4>
            }
            {errorData
                ? <ul style={{ color: 'red', marginTop: '10px', listStyleType: 'none', padding: 0 }}><li>{errorData}</li></ul>
                : null
            }
            <div className="stacked-buttons">
                {editClicked
                    ? <Button variant="secondary" size="sm" onClick={toggleEdit}>Cancel</Button>
                    : <Button variant="secondary" size="sm" onClick={toggleEdit}>Edit Post</Button>}
                <Button variant="secondary" size="sm" onClick={deletePost}>Delete Post</Button>
                {commentClicked ?
                    <CreateCommentForm
                        onAddComment={onAddComment}
                        postId={post.id}
                        setCommentClicked={setCommentClicked}
                    />
                    : <Button variant="secondary" size="sm" onClick={toggleComment}>Add Comment</Button>
                }
            </div>
            {post.comments &&
                <CommentList
                    comments={post.comments}
                    onDeleteComment={onDeleteComment}
                    onEditComment={onEditComment}
                />
            }
        </div>
    );
};

export default Post;