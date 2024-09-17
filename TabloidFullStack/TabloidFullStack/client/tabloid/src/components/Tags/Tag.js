import React from "react";
import { EditPencil, TrashcanDelete } from "../Icons";

export default function Tag({ tag }) {
  return (
    <>
      <td>{tag.id}</td>
      <td>{tag.name}</td>
      <td>
        <a class="btn btn-outline-primary mx-1 text-primary" title="Edit">
          <EditPencil size={20} />
        </a>
        <a class="btn btn-outline-danger mx-1" title="View">
          <TrashcanDelete color="#b91c1c" size={20} />
        </a>
      </td>
    </>
  );
}
