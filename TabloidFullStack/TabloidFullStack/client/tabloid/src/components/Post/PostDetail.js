import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager";
import { getReactionsForPost } from "../../Managers/PostReactionManager";
import { addSubscription } from "../../Managers/SubscriptionManager";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));
    fetchReactions(); //reaction
  }, [id]);

  //reaction
  const fetchReactions = () => {
    getReactionsForPost(id).then(setReactions);
  };

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
        .catch((err) => {
          alert("Failed to subscribe, you may already be subscribed.");
          console.error("Failed to subscribe", err);
        });
    } else {
      alert("You need to be logged in to subscribe.");
    }
  };
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {post.imageLocation ? (
        <img 
        src={`https://localhost:5001/${post.imageLocation}`}
        style={{ width: "150px", height: "150px" }}
          />
      ) : (
        <img style={{ width: "150px", height: "150px" }}/>
      )
    }
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Published on: {new Date(post.publishDateTime).toLocaleDateString()}</p>
      <p>Author: {post.author.displayName}</p>

      <button className="btn btn-secondary" onClick={() => navigate("/posts")}>
        Back to posts
      </button>

      {/* Link to the comment list page */}
      <Link
        to={`/posts/${id}/comments`}
        className="btn btn-outline-primary mx-1"
        title="View Comments"
      >
        View Comments
      </Link>
      <div>
        {reactions.map((reaction) => (
          <div key={reaction.id}>
            <img
              src={reaction.imageLocation}
              alt={reaction.name}
              style={{
                width: "50px",
                height: "50px",
                cursor: "pointer",
                padding: "10px",
              }}
            />
            <span>{reaction.reactionCount}</span>
          </div>
        ))}
      </div>
      {/* Subscribe button */}
      <button
        className="btn btn-outline-success mx-1"
        onClick={handleSubscribe}
      >
        Subscribe to {post.author.displayName}
      </button>
    </div>
  );
}
