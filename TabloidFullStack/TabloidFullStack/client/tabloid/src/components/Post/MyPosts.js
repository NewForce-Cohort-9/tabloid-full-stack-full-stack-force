import React, { useState, useEffect } from "react";
import { getPostsByUser, deletePost } from "../../Managers/PostManager";
import Post from "./Post";
import { Link } from "react-router-dom";

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userId = JSON.parse(localStorage.getItem("userProfile")).id;

    useEffect(() => {
        getPostsByUser(userId).then(data => setPosts(data));
    }, [userId]);

    const handleDelete = (id) => {
        deletePost(id).then(() => {
            setPosts(posts.filter(post => post.id !== id)); 
        });
    };

    return (
        <>
            <header className="masthead bg-primary text-white text-center">
                <div className="container d-flex align-items-center flex-column">
                    <div className="divider-custom divider-light">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <h2 className="pre-wrap font-weight-light mb-0">My Posts</h2>
                </div>
            </header>

            <div className="container pt-5">
                <div className="container d-flex align-items-center justify-content-between w-full">
                    <h1>All My Posts</h1>
                    <Link to="/posts/create">
                        <button className="btn btn-outline-primary mx-1 text-primary">
                            Create New Post
                        </button>
                    </Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Published On</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 && posts.map(post => (
                            <tr key={post.id}>
                                <Post post={post} handleDelete={handleDelete} showButtons={true} /> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
