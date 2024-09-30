// import React, { useState, useEffect } from 'react';
// import { addReaction, getAllReactions } from '../../Managers/ReactionManager';

// export default function CreateReaction({ onReactionAdded }) {
//     const [name, setName] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [reactions, setReactions] = useState([]);

//     useEffect(() => {
//         fetchReactions();
//     }, []);

//     const fetchReactions = () => {
//         getAllReactions().then(setReactions).catch((error) => {
//             alert(`Error fetching reactions: ${error.message}`);
//         });
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     try {
//     //         const newReaction = await addReaction(name, imageUrl);
//     //         alert('Reaction added successfully!');
//     //         // setReactions((prev) => [...prev, newReaction]); // Update local state
//     //         onReactionAdded(newReaction);  // Notify the parent component
//     //         setName('');
//     //         setImageUrl('');
//     //     } catch (error) {
//     //         alert(`Error: ${error.message}`);
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             const newReaction = await addReaction(name, imageUrl);
//             alert('Reaction added successfully!');
            
//             fetchReactions(); // Fetch the updated reactions list
    
//             onReactionAdded(newReaction);  
//             setName('');
//             setImageUrl('');
//         } catch (error) {
//             alert(`Error: ${error.message}`);
//         }
//     };
    

//     return (
//         <div>
//             <h1>Add New Reaction</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>
//                         Reaction Name:
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Image URL:
//                         <input
//                             type="text"
//                             value={imageUrl}
//                             onChange={(e) => setImageUrl(e.target.value)}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <button type="submit">Add Reaction</button>
//             </form>

//             <h2>Current Reactions</h2>
//             <ul>
//                 {reactions.map((reaction) => (
//                     <li key={reaction.id}>
//                         {reaction.name} - <img src={reaction.imageLocation} alt={reaction.name} style={{ width: '20px', height: '20px' }} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateReaction() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const reactionData = { name, imageLocation: imageUrl };

        fetch("https://localhost:5001/api/Reaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reactionData),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Failed to create reaction");
            })
            .then(() => {
                navigate("/posts"); // Redirect to posts or back to PostDetails
            })
            .catch((error) => {
                console.error("Error adding reaction:", error);
                alert("Error adding reaction. Please try again.");
            });
    };

    return (
        <div className="container">
            <h1>Create New Reaction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Reaction Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Reaction</button>
            </form>
        </div>
    );
}
