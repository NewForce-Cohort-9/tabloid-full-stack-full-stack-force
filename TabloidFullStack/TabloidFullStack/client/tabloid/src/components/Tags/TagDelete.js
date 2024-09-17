import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTag } from "../../Managers/TagManager";
import TagPageHeader from "./TagPageHeader";

export default function TagDelete() {
  const { id: tagId } = useParams();
  const navigate = useNavigate();

  const onDeleteTagClick = async () => {
    try {
      await deleteTag(tagId);
      navigate("/tags");
    } catch (error) {
      navigate("/tags");
    }
  };

  return (
    <>
      <TagPageHeader title="Delete tag" />
      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <h1>Are you sure you wish to delete Tag Id #{tagId}?</h1>
        </div>
        <div className="d-flex flex-row gap-2">
          <button
            onClick={() => navigate("/tags")}
            type="button"
            className="btn mt-4 btn-outline-primary mx-1 text-primary w-100"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteTagClick}
            type="button"
            className="btn mt-4 btn-danger mx-1 text-white w-100"
          >
            Delete Tag
          </button>
        </div>
      </div>
    </>
  );
}
