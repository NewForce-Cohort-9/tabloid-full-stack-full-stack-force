//test backend:https://localhost:5001/api/Comment?postId=3
//test frontend(commentlist page):http://localhost:3000/posts/20/comments
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GetAllComments } from "../../Managers/CommentManager";
import Comment from "./Comment";

export const CommentList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (postId) {
      GetAllComments(postId).then((data) => {
        const sortedComments = data.sort((a, b) => new Date(b.createDateTime) - new Date(a.createDateTime));
        setComments(sortedComments);
      });
    }
  }, [postId]);

  return (
    <div>
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <h2 className="pre-wrap font-weight-light mb-0">Comments</h2>
        </div>
      </header>

      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-between w-full">
          <h1>All Comments</h1>
        </div>

        <div>
          <Link to={`/posts/${postId}`} className="btn btn-secondary">Back to Post</Link>
        </div>

        {comments.length === 0 ? (
          <p>No comments available</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Content</th>
                <th>Author</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(comment => (
                <tr key={comment.id}>
                  <Comment comment={comment} />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
