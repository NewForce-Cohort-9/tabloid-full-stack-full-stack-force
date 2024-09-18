//test backend:
//https://localhost:5001/api/Comment?postId=3
//test front:
//http://localhost:3000/comments/5
import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { GetAllComments } from "../../Managers/CommentManager";
import Comment from "./Comment";
//import { GetPostById } from "../../Managers/PostManager";

export const CommentList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  //const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    if (postId) {
      GetAllComments(postId).then((data) => {
        //sort comments by most recent 
        const sortedComments = data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        setComments(sortedComments);
      });
    }
  }, [postId]);
        // GetPostById(postId) //fetch post title
        //     .then((post) => setPostTitle(post.title))
            

  return (
    <div>
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-line"></div>
          </div>
          <h2 className="pre-wrap font-weight-light mb-0">Comments</h2>
        </div>
      </header>

      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-between w-full">
          <h1>All Comments</h1>
          <a className="btn btn-outline-primary mx-1 text-primary" title="Edit">
            Create New Comment
          </a>
        </div>

        {comments.length === 0 ? (
          <p>No comments available</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Subject</th>
                <th >Content</th>
                <th>Author</th>
                <th>Creation Date</th>
                <th>Actions</th>
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
