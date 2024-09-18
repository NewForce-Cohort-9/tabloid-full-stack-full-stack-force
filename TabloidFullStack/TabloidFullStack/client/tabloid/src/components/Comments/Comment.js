import React from "react";

export default function Comment({ comment }) {
  return (
    <>
      <td>{comment.subject}</td>
      <td>{comment.content}</td>
      <td>{comment.userProfile.displayName}</td>
      <td>{new Date(comment.createDateTime).toLocaleString()}</td>
    </>
  );
}
