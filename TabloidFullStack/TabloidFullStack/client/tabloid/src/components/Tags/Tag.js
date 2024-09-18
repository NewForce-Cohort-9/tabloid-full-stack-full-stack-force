import React from "react";
import { Link } from "react-router-dom";
import { EditPencil, TrashcanDelete } from "../Icons";

export default function Tag({ tag }) {
  return (
    <>
      <td>{tag.id}</td>
      <td>{tag.name}</td>
      <td>
        <Link
          to={`/tags/edit/${tag.id}`}
          className="btn btn-outline-primary mx-1 text-primary"
          title="Edit"
        >
          <EditPencil size={20} />
        </Link>
        <Link
          to={`/tags/delete/${tag.id}`}
          className="btn btn-outline-danger mx-1"
          title="View"
        >
          <TrashcanDelete color="#b91c1c" size={20} />
        </Link>
      </td>
    </>
  );
}
