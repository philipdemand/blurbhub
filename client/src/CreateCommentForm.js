import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CreateCommentForm = ({ onAddComment, postId, setCommentClicked }) => {

    const [comment, setComment] = useState("")

    const submitComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/v1/posts/${postId}/comments`, {
                comment_body: comment
            })
            onAddComment(response.data)
            setComment("")
            setCommentClicked(false)
        } catch (error) {
            console.error(error)
        }
    }

    const commentChange = (e) => {
        setComment(e.target.value)
    }

    const cancelClick = () => {
        setCommentClicked(false)
    }

    return (
        <div>
            <Form size="sm" style={{width: "30%"}}onSubmit={submitComment}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={commentChange}
                        placeholder="Create A Comment"
                        style={{ height: '30px' }}
                    />
                    {comment 
                        ? <Button variant="secondary" size="sm" type="submit">Submit</Button>
                        : <Button variant="secondary" size="sm" type="button" onClick={cancelClick}>Cancel</Button>
                    }
                </InputGroup>
            </Form>
        </div>
    );
};

export default CreateCommentForm;