import React from "react";
import { EditPencil, TrashcanDelete } from "../Icons";

export default function Comment({ comment }) {
  return (
    <>
      <td style={{ maxWidth: '400px'}}>{comment.subject}</td>
      <td style={{ maxWidth: '400px'}}> {comment.content}</td>
      <td>{comment.userProfile.displayName}</td>
      <td>{comment.createDateTime}</td>
      <td>
        <a className="btn btn-outline-primary mx-1 text-primary" title="Edit Comment">
          <EditPencil size={20} />
        </a>
        <a className="btn btn-outline-danger mx-1" title="Delete Comment">
          <TrashcanDelete color="#b91c1c" size={20} />
        </a>
      </td>
    </>
  );
}
