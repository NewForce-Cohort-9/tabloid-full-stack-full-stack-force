import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager";
import { getReactionsForPost, addPostReaction, removePostReaction } from "../../Managers/PostReactionManager";
import { addSubscription, isSubscribed, unsubscribe } from "../../Managers/SubscriptionManager"; 
import { PostImage } from "./PostImage";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [subscribedStatus, setSubscribedStatus] = useState(false); 
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState(null); // up, down, or null
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));

    if (userProfile && post) {
      isSubscribed(userProfile.id, post.author.id)
        .then((status) => setSubscribedStatus(status)) 
        .catch(() => setSubscribedStatus(false)); // Default to not subscribed on error
    }
    fetchReactions(); // Load reactions
  }, [id, post, userProfile]);

  const fetchReactions = () => {
    getReactionsForPost(id).then((data) => {
      setReactions(data);
      const userReactionRecord = data.find(r => r.userProfileId === userProfile.id);
      if (userReactionRecord) {
        setUserReaction(userReactionRecord.reactionId === 1 ? 'up' : 'down'); // 1 is thumbs up and 2 is thumbs down
      }
    });
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
        .then(() => {
          setSubscribedStatus(true); 
          alert(`Subscribed to ${post.author.displayName}`);
        })
        .catch((err) => {
          alert("Failed to subscribe, you may already be subscribed.");
          console.error("Failed to subscribe", err);
        });
    } else {
      alert("You need to be logged in to subscribe.");
    }
  };

  const handleUnsubscribe = () => {
    if (post && userProfile) {
      unsubscribe(userProfile.id, post.author.id)
        .then(() => {
          setSubscribedStatus(false); 
          alert(`Unsubscribed from ${post.author.displayName}`);
        })
        .catch((err) => console.error("Failed to unsubscribe", err));
    } else {
      alert("You need to be logged in to unsubscribe.");
    }
  };

  const handleReaction = (reactionType) => {
    if (!userProfile) {
      alert("You need to be logged in to react.");
      return;
    }

    const reactionId = reactionType === 'up' ? 1 : 2; // 1 is thumbs up and 2 is thumbs down

    if (userReaction === reactionType) {
      removePostReaction(post.id, userProfile.id, reactionId)
        .then(() => {
          setUserReaction(null);
          setReactions(prevReactions => 
            prevReactions.map(r => 
              r.id === reactionId 
                ? { ...r, reactionCount: r.reactionCount - 1 } 
                : r
            )
          );
          fetchReactions();
        })
        .catch((error) => {
          console.error("Error removing reaction:", error);
          alert("Failed to remove reaction.");
        });
      return;
    }

    addPostReaction(post.id, reactionId, userProfile.id)
      .then(() => {
        setUserReaction(reactionType);
        fetchReactions();
      });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleImageUpload = (newImagePath) => {
    console.log(newImagePath)
    setPost((prevProfile) => ({
      ...prevProfile,
      imageLocation: newImagePath, //update image location
    }));
  };

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
    <PostImage postId = {post.id} onImageUpload={handleImageUpload} />
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

      {/* Conditional Subscribe/Unsubscribe button */}
      {subscribedStatus ? (
        <button className="btn btn-outline-danger mx-1" onClick={handleUnsubscribe}>
          Unsubscribe from {post.author.displayName}
        </button>
      ) : (
        <button className="btn btn-outline-success mx-1" onClick={handleSubscribe}>
          Subscribe to {post.author.displayName}
        </button>
      )}

      {/* Reaction */}
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25297.png" 
          alt="Thumbs Up"
          onClick={() => handleReaction('up')}
          style={{ width: '50px', height: '50px', padding: '10px',cursor: 'pointer', opacity: userReaction === 'up' ? 1 : 0.5 }}
        />
        <span>{reactions.find(r => r.id === 1)?.reactionCount}</span>
        
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Jt4fWTTKq-a3g4LAk1FNBRURO87dt5UDjg&s" 
          alt="Thumbs Down"
          onClick={() => handleReaction('down')}
          style={{ width: '50px', height: '50px', padding: '11px',cursor: 'pointer', opacity: userReaction === 'down' ? 1 : 0.5 }}
        />
        <span>{reactions.find(r => r.id === 2)?.reactionCount}</span>
      </div>

    </div>
  );
}
