import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CreatePostForm = ({ onAddPost }) => {

    const [post, setPost] = useState("")

    const submitPost = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/v1/posts", {
                post_body: post
            })
            onAddPost(response.data)
            setPost("")
        } catch (error) {
            console.error(error)
        }
    }

    const postChange = (e) => {
        setPost(e.target.value)
    }

    return (
        <div>
            <Form onSubmit={submitPost} style={{ paddingLeft: "10px", marginTop: "30px", marginBottom: "30px", width: "33%" }}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Create a Post!"
                        name="post"
                        value={post}
                        onChange={postChange}
                    />

                    {post
                        ? <Button variant="secondary" size="sm" type="submit">Submit</Button>
                        : <Button variant="secondary" size="sm" type="button">Submit</Button>
                    }
                </InputGroup>
            </Form>
        </div>
    );
};

export default CreatePostForm;