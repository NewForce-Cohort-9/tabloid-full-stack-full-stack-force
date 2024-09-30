// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { getPostById, deletePost } from "../../Managers/PostManager"; 
// import { getReactionsForPost, addPostReaction, removePostReaction } from "../../Managers/PostReactionManager";
// import { addSubscription } from "../../Managers/SubscriptionManager";

// export default function PostDetails() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const navigate = useNavigate();
//   const [reactions, setReactions] = useState([]);
//   const [userReaction, setUserReaction] = useState(null); //up, down or null
//   const userProfile = JSON.parse(localStorage.getItem('userProfile'));

//   useEffect(() => {
//     getPostById(id).then((data) => setPost(data));
//     fetchReactions(); //reaction
//   }, [id]);

//   const fetchReactions = () => {
//     getReactionsForPost(id).then((data) => {
//       setReactions(data);
//       //check if the user has already reacted
//       const userReactionRecord = data.find(r => r.userProfileId === userProfile.id);
//       if (userReactionRecord) {
//         setUserReaction(userReactionRecord.reactionId === 1 ? 'up' : 'down'); // 1 is thumbs up and 2 is thumbs down
//       }
//     });
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       deletePost(id).then(() => {
//         alert("Post deleted successfully.");
//         navigate("/posts"); 
//       });
//     }
//   };


//   const handleSubscribe = () => {
//     if (post && userProfile) {
//         addSubscription(userProfile.id, post.author.id)
//             .then(() => alert(`Subscribed to ${post.author.displayName}`))
//             .catch((err) => {
//                 alert("Failed to subscribe, you may already be subscribed.");
//                 console.error("Failed to subscribe", err);
//             });
//     } else {
//         alert("You need to be logged in to subscribe.");
//     }
// };

// const handleReaction = (reactionType) => {
//   if (!userProfile) {
//     alert("You need to be logged in to react.");
//     return;
//   }

//   const reactionId = reactionType === 'up' ? 1 : 2; // 1 is thumbs up and 2 is thumbs down

//   // //do nothing if user already reacted with the same reaction
//   // if (userReaction === reactionType) {
//   //   return;
//   // }

//    //if user clicks same reaction, remove it (toggle off)
//    if (userReaction === reactionType) {
//     removePostReaction(post.id, userProfile.id, reactionId)
//       .then(() => {
//         setUserReaction(null);
//         //update reaction count 
//         setReactions(prevReactions => 
//           prevReactions.map(r => 
//             r.id === reactionId 
//               ? { ...r, reactionCount: r.reactionCount - 1 } 
//               : r
//           )
//         );
//         fetchReactions(); //refresh reactions after removal
//       })
//       .catch((error) => {
//         console.error("Error removing reaction:", error);
//         alert("Failed to remove reaction.");
//       });
//     return;
//   }

//   //handle reaction toggle
//   addPostReaction(post.id, reactionId, userProfile.id)
//     .then(() => {
//       setUserReaction(reactionType);
//       fetchReactions(); //refresh reaction count after adding a new reaction
//     })
// };

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       <p>Published on: {new Date(post.publishDateTime).toLocaleDateString()}</p>
//       <p>Author: {post.author.displayName}</p>

//       <button className="btn btn-secondary" onClick={() => navigate("/posts")}>
//         Back to posts
//       </button>

//       {/* Link to the comment list page */}
//       <Link to={`/posts/${id}/comments`} className="btn btn-outline-primary mx-1" title="View Comments">
//         View Comments
//       </Link>

//       {/* Subscribe button */}
//       <button className="btn btn-outline-success mx-1" onClick={handleSubscribe}>
//         Subscribe to {post.author.displayName}
//       </button>

//       {/* Reaction */}
//       <div>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/25/25297.png" 
//                 alt="Thumbs Up"
//                 onClick={() => handleReaction('up')}
//                 style={{ width: '50px', height: '50px', padding: '10px',cursor: 'pointer', opacity: userReaction === 'up' ? 1 : 0.5 }}
//               />
//               <span>{reactions.find(r => r.id === 1)?.reactionCount}</span>
              
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Jt4fWTTKq-a3g4LAk1FNBRURO87dt5UDjg&s" 
//                 alt="Thumbs Down"
//                 onClick={() => handleReaction('down')}
//                 style={{ width: '50px', height: '50px', padding: '11px',cursor: 'pointer', opacity: userReaction === 'down' ? 1 : 0.5 }}
//               />
//               <span>{reactions.find(r => r.id === 2)?.reactionCount}</span>
//       </div>

//     </div>
//   );
// }













import React, { useState, useEffect } from 'react';
import { getReactionsByPostId, addPostReaction, removePostReaction } from '../../Managers/ReactionManager';
import CreateReaction from '../Reaction/CreateReaction';

export default function PostDetails({ postId, userProfile }) {
    const [reactions, setReactions] = useState([]);
    const [userReactions, setUserReactions] = useState({}); // Track the user's reaction for each type

    useEffect(() => {
        fetchReactions();
    }, []);

    const fetchReactions = () => {
        getReactionsByPostId(postId).then(setReactions).catch((error) => {
            alert(`Error fetching reactions: ${error.message}`);
        });
    };

    const handleReactionClick = async (reactionId) => {
        const currentReaction = userReactions[reactionId];

        if (currentReaction) {
            // User has already reacted with this reaction, remove it
            await removePostReaction(postId, userProfile.id, reactionId);
            setUserReactions(prevReactions => {
                const newReactions = { ...prevReactions };
                delete newReactions[reactionId]; // Remove reaction from state
                return newReactions;
            });
        } else {
            // User hasn't reacted yet, add this reaction
            await addPostReaction(postId, reactionId, userProfile.id);
            setUserReactions(prevReactions => ({
                ...prevReactions,
                [reactionId]: true // Mark this reaction as the user's
            }));
        }
        fetchReactions(); // Refresh the reactions list
    };

    return (
        <div>
            <h1>Post Details</h1>
            {/* Render the post content here */}
            
            <h2>Reactions</h2>
            <div>
                {reactions.map((reaction) => (
                    <div key={reaction.id} style={{ display: 'inline-block', margin: '10px' }}>
                        <img
                            src={reaction.imageLocation}
                            alt={reaction.name}
                            style={{ width: '30px', height: '30px', cursor: 'pointer', opacity: userReactions[reaction.id] ? 1 : 0.5 }}
                            onClick={() => handleReactionClick(reaction.id)}
                        />
                        <span>{reaction.reactionCount}</span> {/* Display the count */}
                    </div>
                ))}
            </div>

             {/* CreateReaction component - passing the fetchReactions function */}
             <CreateReaction onReactionAdded={fetchReactions} />
        </div>
    );
}
