import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ post, handleDelete }) => (
  <div className='post'>
    <h3>{post.name}</h3>
    <p>{post.body}</p>
    <button id={post._id} onClick={handleDelete}>
      Delete Post
    </button>
  </div>
);

const PostsPage = () => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  const [deletedPost, setDeletedPost] = useState();

  const getAllPosts = async () => {
    try {
      console.log('trying to get all posts');
      const data = await axios.get('api/posts');
      console.log(data);
      setPosts(data.data);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        userId: user._id,
        name: user.name,
        body: message,
      };

      const response = await axios.post('api/posts', data, config);
      setPosts([response.data, ...posts]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (event) => {
    console.log('handleDelete');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        userId: user._id,
      };

      const response = await axios.delete(
        'api/posts/' + event.target.id,
        data,
        config
      );
      getAllPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='posts-container'>
      <form className='post-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter your message'
          className='post-input'
        />
        <button type='submit' className='post-button'>
          Submit
        </button>
      </form>
      <div className='posts-display'>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post._id} post={post} handleDelete={handleDelete} />
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
