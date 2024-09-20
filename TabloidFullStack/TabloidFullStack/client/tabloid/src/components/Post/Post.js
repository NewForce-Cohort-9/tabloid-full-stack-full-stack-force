import React from "react";
import { EditPencil, TrashcanDelete } from "../Icons";
import { Link } from "react-router-dom";

export default function Post({ post, handleDelete, showButtons }) {
  const confirmDelete = (postId) => {
    const confirmAction = window.confirm("Are you sure you want to delete this post?");
    if (confirmAction) {
      handleDelete(postId);
    }
  };
  return (
    <>
      <td>{post.id}</td>
      <td>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </td>
      <td>{post.author.displayName}</td>
      <td>{post.category.name}</td>
      <td>{new Date(post.publishDateTime).toLocaleDateString()}</td>
      {showButtons && ( 
        <td>
          <Link
            to={`/posts/edit/${post.id}`}
            className="btn btn-outline-primary mx-1 text-primary"
            title="Edit Post"
          >
            <EditPencil size={20} />
          </Link>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={() => confirmDelete(post.id)}
            title="Delete Post"
          >
            <TrashcanDelete color="#b91c1c" size={20} />
          </button>
        </td>
      )}
    </>
  );
}