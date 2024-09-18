import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager"; 

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => {
        alert("Post deleted successfully.");
        navigate("/posts"); 
      });
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Published on: {new Date(post.publishDateTime).toLocaleDateString()}</p>
      <p>Author: {post.author.displayName}</p>

      
      <button className="btn btn-secondary" onClick={() => navigate("/posts")}>
        Back to posts
      </button>
    </div>
  );
}
