import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../../Managers/PostManager";

export default function PostDetail() {
    const { id } = useParams(); // This is a hook that allows us to extract the id from the URL
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostById(id).then(data => setPost(data));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            {post.imageLocation && <img src={post.imageLocation} alt="Header" />}
            <p>{post.content}</p>
            <p><strong>Published on:</strong> {new Date(post.publishDateTime).toLocaleDateString()}</p>
            <p><strong>Author:</strong> {post.author.displayName}</p>

             {/* Link to the comment list page */}
             <Link to={`/posts/${id}/comments`} className="btn btn-outline-primary mx-1" title="View Comments">
               View Comments
            </Link>
        </div>

    );
}
