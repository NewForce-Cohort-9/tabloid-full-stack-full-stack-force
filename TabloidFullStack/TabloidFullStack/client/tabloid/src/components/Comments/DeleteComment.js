import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCommentById, deleteComment } from '../../Managers/CommentManager';

export const DeleteComment = () => {
    const { commentId, postId } = useParams(); //get commentId and postId from URL
    const [comment, setComment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCommentById(commentId).then(data => {
            setComment(data);
        });
    }, [commentId]);

    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteComment(commentId);
        navigate(`/posts/${postId}/comments`); //go back to comments after delete
    };


    return (
        <div>
            <h1>Delete Comment</h1>
            <h3>Are you sure you want to delete this comment?</h3>
            <div>
                <h4>Comment Details</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-2">Subject</dt>
                    <dd className="col-sm-10">{comment.subject}</dd>
                    <dt className="col-sm-2">Content</dt>
                    <dd className="col-sm-10">{comment.content}</dd>
                </dl>

                <form onSubmit={handleDelete}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button type="submit" className="btn btn-danger">Delete</button>
                    <span> | </span>
                    <button type="button" onClick={() => navigate(`/posts/${postId}/comments`)} className="btn btn-secondary">Cancel</button>
                </form>
            </div>
        </div>
    );
};


