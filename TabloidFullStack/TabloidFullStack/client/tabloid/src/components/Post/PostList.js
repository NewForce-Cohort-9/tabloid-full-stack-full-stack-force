import { useState, useEffect } from "react";
import { GetApprovedPosts } from "../../Managers/PostManager";

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        GetApprovedPosts().then(data => setPosts(data));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>By: {post.author.displayName}</p>
                    <p>Category: {post.category.name}</p>
                    <p>Published on: {new Date(post.publishDateTime).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};
