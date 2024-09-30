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
                navigate("/posts"); 
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
