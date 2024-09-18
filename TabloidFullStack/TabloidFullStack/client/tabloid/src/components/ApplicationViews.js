import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import { CategoryForm } from "./Category/CategoryForm";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm";
import TagDelete from "./Tags/TagDelete";
import PostList from "./Post/PostList";
import { CategoryDelete } from "./Category/CategoryDelete";
import MyPosts from "./Post/MyPosts";
import { EditCategory } from "./Category/CategoryEdit";
import PostDetail from "./Post/PostDetail";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route index path="categories" element={<Category />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/tags/add" element={<TagForm />} />
      <Route path="/tags/delete/:id" element={<TagDelete />} />
      <Route path="/tags/edit/:id" element={<TagForm />} />

      <Route path="/posts" element={<PostList />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="categories/create" element={<CategoryForm />} />
      <Route path="categories/delete/:id" element={<CategoryDelete />} />
      <Route path="categories/edit/:id" element={<EditCategory />} />
    </Routes>
  );
}
