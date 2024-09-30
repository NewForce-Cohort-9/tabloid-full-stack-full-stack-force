import React, { useState, useEffect } from 'react';
import { addReaction, getAllReactions } from '../../Managers/ReactionManager';

export default function AddReaction({ onReactionAdded }) {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        fetchReactions();
    }, []);

    const fetchReactions = () => {
        getAllReactions().then(setReactions).catch((error) => {
            alert(`Error fetching reactions: ${error.message}`);
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const newReaction = await addReaction(name, imageUrl);
    //         alert('Reaction added successfully!');
    //         // setReactions((prev) => [...prev, newReaction]); // Update local state
    //         onReactionAdded(newReaction);  // Notify the parent component
    //         setName('');
    //         setImageUrl('');
    //     } catch (error) {
    //         alert(`Error: ${error.message}`);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const newReaction = await addReaction(name, imageUrl);
            alert('Reaction added successfully!');
            
            fetchReactions(); // Fetch the updated reactions list
    
            onReactionAdded(newReaction);  
            setName('');
            setImageUrl('');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    

    return (
        <div>
            <h1>Add New Reaction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Reaction Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Reaction</button>
            </form>

            <h2>Current Reactions</h2>
            <ul>
                {reactions.map((reaction) => (
                    <li key={reaction.id}>
                        {reaction.name} - <img src={reaction.imageLocation} alt={reaction.name} style={{ width: '20px', height: '20px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
