import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import TagList from "./Tags/TagList";
import { PostList } from "./Post/PostList";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/tags" element={<TagList />} />
        <Route path="/posts" element={<PostList />} />
    </Routes>
  );
}
