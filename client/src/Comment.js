import React, { useState } from 'react';
import axios from 'axios'
import EditCommentForm from './EditCommentForm';
import Button from 'react-bootstrap/Button';

const Comment = ({ comment, onDeleteComment, onEditComment }) => {

    const [editClicked, setEditClicked] = useState(false)
    const [errorData, setErrorData] = useState("")

    const deleteComment = async () => {
        try {
            await axios.delete(`/api/v1/comments/${comment.id}`)
            onDeleteComment(comment.post_id, comment.id)
        } catch (error) {
            setErrorData(error.response.data.error)
            setTimeout(() => {
                setErrorData("");
            }, 5000);
        }
    }

    const toggleEdit = () => {
        setEditClicked(!editClicked)
    }

    const dateTime = () => {
        const date = new Date(comment.created_at);

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
        <div className="post" style={{marginRight: "10px", paddingTop: "10px", marginTop: "20px"}}>
            <h6>From {comment.commenter} on {dateTime()}</h6>
            {editClicked 
                ? <div style={{marginTop: "20px", marginBottom: "20px"}}>
                    <EditCommentForm 
                        comment={comment}
                        onEditComment={onEditComment}
                        setEditClicked={setEditClicked}
                        setErrorData={setErrorData}
                    />
                  </div>
                : <h5>{comment.comment_body}</h5>
            }
            {errorData
                ? <ul style={{ color: 'red', marginTop: '10px', listStyleType: 'none', padding: 0 }}><li>{errorData}</li></ul>
                : null
            }
            <div className="stacked-buttons">
            {editClicked
            ? <Button variant="secondary" size="sm" onClick={toggleEdit}>Cancel</Button>
            : <Button variant="secondary" size="sm" onClick={toggleEdit}>Edit Comment</Button>
            }
            <Button variant="secondary" size="sm" onClick={deleteComment}>Delete Comment</Button>
            </div>
        </div>
    );
};

export default Comment;