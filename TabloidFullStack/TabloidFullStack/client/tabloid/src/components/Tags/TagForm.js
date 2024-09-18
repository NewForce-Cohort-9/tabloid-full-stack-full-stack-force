import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import { addTag, updateTag } from "../../Managers/TagManager";
import TagPageHeader from "./TagPageHeader";

export default function TagForm() {
  const [tagName, setTagName] = useState("");

  const navigate = useNavigate();
  const { id: tagId } = useParams();

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    if (tagId) {
      await updateTag({ id: tagId, name: tagName });
      navigate("/tags");
    } else {
      const newTag = await addTag({ name: tagName });
      if (newTag) navigate("/tags");
    }
  };

  return (
    <>
      <TagPageHeader title={tagId ? "Edit tag" : "Create new tag"} />
      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <form onSubmit={handleTagSubmit}>
            {tagId ? (
              <h1 className="p-4">
                Editing Tag #{tagId}. Enter a new tag name.
              </h1>
            ) : (
              <h1 className="p-4">Enter a new tag name</h1>
            )}
            <Input onChange={(e) => setTagName(e.target.value)} />

            <button
              type="submit"
              className="btn mt-4 btn-primary mx-1 text-white w-100"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/tags")}
              type="button"
              className="btn mt-4 btn-outline-primary mx-1 text-primary w-100"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
