import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EditPostForm = ({ onEditPost, post, setEditClicked, setErrorData }) => {

    const [editPost, setEditPost] = useState(post.post_body)

    const submitEditPost = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`/api/v1/posts/${post.id}`, {
                post_body: editPost
            })
            onEditPost(response.data)
            setEditPost("")
            setEditClicked(false)
            setErrorData("")
        } catch (error) {
            setErrorData(error.response.data.error)
            setTimeout(() => {
                setErrorData("");
            }, 5000);
        }
    }

    const editPostChange = (e) => {
        setEditPost(e.target.value)
    }

    return (
        <div>
            <Form onSubmit={submitEditPost} style={{ width: "30%" }}>
                <InputGroup>
                    <Form.Control type="text" value={editPost} onChange={editPostChange} />
                    {editPost
                        ? <Button variant="secondary" size="sm" type="submit">Submit</Button>
                        : <Button variant="secondary" size="sm" type="button">Submit</Button>
                    }
                </InputGroup>
            </Form>
        </div>
    );
};

export default EditPostForm;