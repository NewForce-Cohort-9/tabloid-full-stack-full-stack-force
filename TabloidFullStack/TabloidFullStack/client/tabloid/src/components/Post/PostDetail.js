import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager"; 
import { addSubscription } from "../../Managers/SubscriptionManager";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

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

  const handleSubscribe = () => {
    if (post && userProfile) {
      addSubscription(userProfile.id, post.author.id)
        .then(() => alert(`Subscribed to ${post.author.displayName}`))
        .catch((err) => console.error("Failed to subscribe", err));
    } else {
      alert("You need to be logged in to subscribe.");
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

      {/* Link to the comment list page */}
      <Link to={`/posts/${id}/comments`} className="btn btn-outline-primary mx-1" title="View Comments">
               View Comments
      </Link>

      {/* Subscribe button */}
      <button className="btn btn-outline-success mx-1" onClick={handleSubscribe}>
        Subscribe to {post.author.displayName}
      </button>

    </div>
  );
}
