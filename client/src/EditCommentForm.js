import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EditCommentForm = ({ comment, onEditComment, setEditClicked, setErrorData }) => {

    const [editComment, setEditComment] = useState(comment.comment_body)

    const submitEditComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`/api/v1/comments/${comment.id}`, {
                comment_body: editComment
            })
            onEditComment(response.data)
            setEditComment("")
            setEditClicked(false)
            setErrorData("")
        } catch (error) {
            setErrorData(error.response.data.error)
            setTimeout(() => {
                setErrorData("");
            }, 5000);
        }
    }

    const editCommentChange = (e) => {
        setEditComment(e.target.value)
    }

    return (
        <div>
            <Form style={{width: "30%"}}onSubmit={submitEditComment}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        name="editcomment"
                        value={editComment}
                        onChange={editCommentChange}
                    />
                    {editComment
                        ? <Button variant="secondary" size="sm" type="submit">Submit</Button>
                        : <Button variant="secondary" size="sm" type="button">Submit</Button>
                    }
                </InputGroup>
            </Form>
        </div>
    );
};

export default EditCommentForm;