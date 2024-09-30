import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager"; 
import { getReactionsForPost, addPostReaction, removePostReaction } from "../../Managers/PostReactionManager";
import { addSubscription, isSubscribed, unsubscribe } from "../../Managers/SubscriptionManager"; 

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [subscribedStatus, setSubscribedStatus] = useState(false); 
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState(null); 
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));

    if (userProfile && post) {
      isSubscribed(userProfile.id, post.author.id)
        .then((status) => setSubscribedStatus(status)) 
        .catch(() => setSubscribedStatus(false));
    }
  }, [id, post, userProfile]);

  const fetchReactions = () => {
    getReactionsForPost(id).then((data) => {
      setReactions(data);
      const userReactionRecord = data.find(r => r.userProfileId === userProfile.id);
      if (userReactionRecord) {
        setUserReaction(userReactionRecord.reactionId);
      }
    });
  };

  useEffect(() => {
    fetchReactions();
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

    const reaction = reactions.find(r => r.name.toLowerCase() === reactionType);
    if (!reaction) {
      alert("Reaction not found.");
      return;
    }
    const reactionId = reaction.id;

    if (userReaction === reactionId) {
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
        })
        .catch(error => {
          console.error("Error removing reaction:", error);
          alert("Failed to remove reaction.");
        });
      return;
    }

    addPostReaction(post.id, reactionId, userProfile.id)
      .then(() => {
        setUserReaction(reactionId);
        fetchReactions(); //refresh reaction count
      })
      .catch(error => {
        console.error("Error adding reaction:", error);
        alert("Failed to add reaction.");
      });
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

      <Link to={`/posts/${id}/comments`} className="btn btn-outline-primary mx-1" title="View Comments">
        View Comments
      </Link>

      {subscribedStatus ? (
        <button className="btn btn-outline-danger mx-1" onClick={handleUnsubscribe}>
          Unsubscribe from {post.author.displayName}
        </button>
      ) : (
        <button className="btn btn-outline-success mx-1" onClick={handleSubscribe}>
          Subscribe to {post.author.displayName}
        </button>
      )}

      <div>
        {reactions.map((reaction) => (
          <div key={reaction.id} style={{ display: 'inline-block', margin: '10px' }}>
            <img
              src={reaction.imageLocation}
              alt={reaction.name}
              style={{ width: '50px', height: '50px', padding:'10px', cursor: 'pointer', opacity: userReaction === reaction.id ? 1 : 0.5 }}
              onClick={() => handleReaction(reaction.name.toLowerCase())}
            />
            <span>{reaction.reactionCount}</span>
          </div>
        ))}
      </div>

      <Link to="/create-reaction" className="btn btn-outline-primary mx-1">
        Create New Reaction
      </Link>
    </div>
  );
}
