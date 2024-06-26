import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Post from './Post';
import CreatePostForm from './CreatePostForm';

const PostsContainer = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/v1/posts")
                setPosts(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const handleAddPost = (postObj) => {
        setPosts(prevPosts => [postObj, ...prevPosts])
    }

    const handleEditPost = (postObj) => {
        setPosts(prevPosts => prevPosts.map(post => (
            post.id === postObj.id ? postObj : post
        )))
    }

    const handleDeletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
    }

    const handleAddComment = (commentObj) => {
        setPosts(prevPosts => prevPosts.map(post => ({
            ...post,
            comments: post.id === commentObj.post_id
                ? [commentObj, ...post.comments]
                : post.comments
        })))
    }

    const handleEditComment = (commentObj) => {
        setPosts(prevPosts => prevPosts.map(post => ({
            ...post,
            comments: post.id === commentObj.post_id
                ? post.comments.map(comment => comment.id === commentObj.id ? commentObj : comment)
                : post.comments
        })))
    }

    const handleDeleteComment = (postId, commentId) => {
        setPosts(prevPosts => prevPosts.map(post => ({
            ...post,
            comments: post.id === postId
                ? post.comments.filter(comment => comment.id !== commentId)
                : post.comments
        })))
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='posts-container'>
            <CreatePostForm onAddPost={handleAddPost} />
            {posts.map(post =>
                <Post
                    key={post.id}
                    post={post}
                    onEditPost={handleEditPost}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    onEditComment={handleEditComment}
                    onDeletePost={handleDeletePost}
                />)}
        </div>
    );
};

export default PostsContainer;