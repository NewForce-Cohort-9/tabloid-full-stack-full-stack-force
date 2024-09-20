//Comment form manages add and edit
import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { addComment, editComment, getCommentById } from "../../Managers/CommentManager";

export const CommentForm = () => {
  const { postId, commentId } = useParams(); //get postId from URL 
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [commentBeingEdited, setCommentBeingEdited] = useState(false);
  const navigate= useNavigate();

  //for edit:
  useEffect(() => {
    if (commentId) {
      //fetch comment for edit
      getCommentById(commentId).then(comment => {
        setSubject(comment.subject);
        setContent(comment.content);
        setCommentBeingEdited(true);
      }).catch(() => {
        navigate(`/posts/${postId}/comments`);
      });
    }
  }, [commentId, navigate, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //get user profile from local storage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (!userProfile) {
      alert("You must be logged in to comment!");
      return;
    }

    const comment = {
      id: commentId, 
      subject,
      content,
      postId,
      userProfileId: userProfile.id,
    };

    if (commentBeingEdited) {
      // Edit
      await editComment(commentId, { ...comment }); 
    } else {
      // Add
      await addComment(comment);
    }

    navigate(`/posts/${postId}/comments`); //Go back to comments
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" >{commentBeingEdited ? "Save Changes" : "Add Comment"}</button>
    </form>
  );
};
