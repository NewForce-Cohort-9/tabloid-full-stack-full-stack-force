import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTags } from "../../Managers/TagManager";
import Tag from "./Tag";
import TagPageHeader from "./TagPageHeader";

export default function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    callGetTags();
  }, []);

  const callGetTags = async () => {
    const tags = await getAllTags();
    setTags(tags);
  };

  return (
    <>
      <TagPageHeader title="Tags" />

      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-between w-100">
          <h1 className="p-4">All Tags</h1>
          <Link
            to="/tags/add"
            className="btn btn-outline-primary mx-1 text-primary"
            title="Edit"
          >
            Create New Tag
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => {
                return (
                  <tr key={tag.id}>
                    <Tag tag={tag} />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
