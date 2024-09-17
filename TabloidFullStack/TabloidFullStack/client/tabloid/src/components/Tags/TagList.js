import React, { useState, useEffect } from "react";
import { getAllTags } from "../../Managers/TagManager";
import Tag from "./Tag";

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
      <header class="masthead bg-primary text-white text-center">
        <div class="container d-flex align-items-center flex-column">
          <div class="divider-custom divider-light">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-line"></div>
          </div>
          <h2 class="pre-wrap font-weight-light mb-0">Tags</h2>
        </div>
      </header>

      <div class="container pt-5">
        <div className="container d-flex align-items-center justify-content-between w-full">
          <h1>All Tags</h1>
          <a class="btn btn-outline-primary mx-1 text-primary" title="Edit">
            Create New Tag
          </a>
        </div>
        <table class="table table-striped">
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
