import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import { addTag } from "../../Managers/TagManager";
import TagPageHeader from "./TagPageHeader";

export default function TagAdd() {
  const [tagName, setTagName] = useState("");

  const navigate = useNavigate();

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    const newTag = await addTag({ name: tagName });

    if (newTag) navigate("/tags");
  };

  return (
    <>
      <TagPageHeader title="Create new tag" />
      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <form onSubmit={handleTagSubmit}>
            <h1 className="p-4">Enter a new tag name</h1>
            <Input onChange={(e) => setTagName(e.target.value)} />

            <button
              type="submit"
              className="btn mt-4 btn-primary mx-1 text-white w-100"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/tags")}
              type="submit"
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
