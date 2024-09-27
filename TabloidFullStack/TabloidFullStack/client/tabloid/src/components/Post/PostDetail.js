import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "../../Managers/PostManager"; 
// import { getReactionsForPost } from "../../Managers/ReactionManager";
import { getReactionsForPost, addPostReaction } from "../../Managers/PostReactionManager";
import { addSubscription } from "../../Managers/SubscriptionManager";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState(null); // 'up', 'down', or null
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));
    fetchReactions(); //reaction
  }, [id]);

  //reaction
  // const fetchReactions = () => {
  //   getReactionsForPost(id).then(setReactions);
  // };

  const fetchReactions = () => {
    getReactionsForPost(id).then((data) => {
      setReactions(data);
      // Check if the user has already reacted
      const userReactionRecord = data.find(r => r.userProfileId === userProfile.id);
      if (userReactionRecord) {
        setUserReaction(userReactionRecord.reactionId === 1 ? 'up' : 'down'); // Assuming 1 is thumbs up and 2 is thumbs down
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
            .then(() => alert(`Subscribed to ${post.author.displayName}`))
            .catch((err) => {
                alert("Failed to subscribe, you may already be subscribed.");
                console.error("Failed to subscribe", err);
            });
    } else {
        alert("You need to be logged in to subscribe.");
    }
};

// const handleReaction = (reactionId) => {
//   if (!userProfile) {
//     alert("You need to be logged in to react.");
//     return;
//   }

//   addPostReaction(post.id, reactionId, userProfile.id)
//     .then(() => {
//       alert("Reaction added!");
//       fetchReactions(); // Refresh the reactions count
//     })
//     .catch((err) => {
//       console.error("Error adding reaction:", err);
//     });
// };


const handleReaction = (reactionType) => {
  const reactionId = reactionType === 'up' ? 1 : 2; // Assuming 1 is thumbs up and 2 is thumbs down

  // If user already reacted with the same reaction, do nothing
  if (userReaction === reactionType) {
    return;
  }

  // Handle the reaction toggle
  addPostReaction(post.id, reactionId, userProfile.id)
    .then(() => {
      setUserReaction(reactionType);
      fetchReactions(); // Refresh the reactions count
    })
    .catch(error => {
      console.error("Error adding reaction:", error);
      alert("An error occurred while adding your reaction.");
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

      {/* Link to the comment list page */}
      <Link to={`/posts/${id}/comments`} className="btn btn-outline-primary mx-1" title="View Comments">
        View Comments
      </Link>

      {/* Subscribe button */}
      <button className="btn btn-outline-success mx-1" onClick={handleSubscribe}>
        Subscribe to {post.author.displayName}
      </button>

      {/* Reaction */}
      {/* <div>
            {reactions.map((reaction) => (
                <div key={reaction.id}>
                    <img
                        src={reaction.imageLocation}
                        alt={reaction.name}
                        style={{ width: '50px', height: '50px', cursor: 'pointer', padding: '10px' }}
                        onClick={() => handleReaction(reaction.id)}
                    />
                    <span>{reaction.reactionCount}</span> 
                </div>
            ))}
        </div> */}

<div>
        <img
          src="thumbs-up-icon.png" // Update with your actual thumbs up icon path
          alt="Thumbs Up"
          onClick={() => handleReaction('up')}
          style={{ cursor: 'pointer', opacity: userReaction === 'up' ? 0.5 : 1 }}
        />
        <span>{reactions.find(r => r.id === 1)?.reactionCount}</span>
        
        <img
          src="thumbs-down-icon.png" // Update with your actual thumbs down icon path
          alt="Thumbs Down"
          onClick={() => handleReaction('down')}
          style={{ cursor: 'pointer', opacity: userReaction === 'down' ? 0.5 : 1 }}
        />
        <span>{reactions.find(r => r.id === 2)?.reactionCount}</span>
      </div>

      


    </div>
  );
}
