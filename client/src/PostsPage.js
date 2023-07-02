import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Post = ({ post }) => (
  <div className="post">
    <h3>{post.name}</h3>
    <p>{post.body}</p>
  </div>
);



const PostsPage = () => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState();
  const [user, setUser] = useState()

  const getAllPosts = async () => {
    try {
      const data = await axios.get('api/posts');
      console.log(data)
      setPosts(data.data)
      console.log(posts)
    } catch(error) {
      console.log(error)
    }
  }


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
    try{
      const config = {
        headers:{
          'Content-Type': 'application/json'
        }
      }

      const data = {
        userId: user._id,
        name: user.name,
        body: message
      }

      const response = await axios.post('api/posts', data, config)
      setPosts([response.data, ...posts])
    }catch(error){
      console.log(error.message)
    }
  };

  
  

  return (
    <div className="posts-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="post-input"
        />
        <button type="submit" className="post-button">Submit</button>
      </form>
      <div className="posts-display">
  {Array.isArray(posts) && posts.map((post) => (
    <Post key={post._id} post={post} />
  ))}
</div>
    </div>
  );
}

export default PostsPage;