import React from "react";
import { EditPencil, TrashcanDelete } from "../Icons";

export default function Post({ post }) {
  return (
    <>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.author.displayName}</td>
      <td>{post.category.name}</td>
      <td>{new Date(post.publishDateTime).toLocaleDateString()}</td>
      <td>
        <a className="btn btn-outline-primary mx-1 text-primary" title="Edit Post">
          <EditPencil size={20} />
        </a>
        <a className="btn btn-outline-danger mx-1" title="Delete Post">
          <TrashcanDelete color="#b91c1c" size={20} />
        </a>
      </td>
    </>
  );
}
