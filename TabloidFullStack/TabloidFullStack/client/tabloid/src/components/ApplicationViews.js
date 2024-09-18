import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import { CategoryForm } from "./Category/CategoryForm";
import TagList from "./Tags/TagList";
import TagAdd from "./Tags/TagAdd";
import TagDelete from "./Tags/TagDelete";
import PostList from "./Post/PostList";
import { CategoryDelete } from "./Category/CategoryDelete";
import MyPosts from "./Post/MyPosts";
import { EditCategory } from "./Category/CategoryEdit";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route index path="categories" element={<Category />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/tags/add" element={<TagAdd />} />
      <Route path="/tags/delete/:id" element={<TagDelete />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="categories/create" element={<CategoryForm />} />
      <Route path="categories/delete/:id" element={<CategoryDelete />} />
      <Route path="categories/edit/:id" element={<EditCategory/>} /> 
    </Routes>
  );
}
