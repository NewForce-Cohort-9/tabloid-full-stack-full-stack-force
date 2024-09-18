import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCommentById, deleteComment } from "../../Managers/CommentManager";

export const DeleteComment = () => {
    const { postId, commentId } = useParams();
    const [comment, setComment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCommentById(commentId).then(data => {
            setComment(data);
        }).catch(() => {
            //handle error (go back to comments or show error msg)
            navigate(`/posts/${postId}/comments`);
        });
    }, [commentId, navigate, postId]);

    const handleDelete = () => {
        deleteComment(commentId).then(() => {
            navigate(`/posts/${postId}/comments`);
        });
    };

    if (!comment) {
        return <p>No comments to show</p>; 
    }

    return (
        <div>
            <h2>Delete Comment</h2>
            <p>Are you sure you want to delete the following comment?</p>
            <p><strong>Subject:</strong> {comment.subject}</p>
            <p><strong>Content:</strong> {comment.content}</p>
            <p><strong>Author:</strong> {comment.userProfile.displayName}</p>
            <p><strong>Created On:</strong> {new Date(comment.createDateTime).toLocaleString()}</p>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            <button onClick={() => navigate(`/posts/${postId}/comments`)} className="btn btn-secondary">Cancel</button>
        </div>
    );
};

