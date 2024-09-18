import React, { useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { addComment } from "../../Managers/CommentManager";

export const CommentForm = () => {
  const { postId } = useParams(); //get postId from URL 
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //get user profile from local storage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (!userProfile) {
      alert("You must be logged in to comment!");
      return;
    }

    const newComment = {
      subject,
      content,
      postId,
      userProfileId: userProfile.id,
    };

    await addComment(newComment);
    //go back to comments after save/submit
    navigate(`/posts/${postId}/comments`);
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
      <button type="submit" >Save</button>
    </form>
  );
};
