import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import { CategoryForm } from "./Category/CategoryForm";
import TagList from "./Tags/TagList";
import PostList from "./Post/PostList";
import { CommentList } from "./Comments/CommentList";
import TagForm from "./Tags/TagForm";
import TagDelete from "./Tags/TagDelete";
import { CategoryDelete } from "./Category/CategoryDelete";
import MyPosts from "./Post/MyPosts";
import { EditCategory } from "./Category/CategoryEdit";
import PostDetail from "./Post/PostDetail";
import UserProfileList from "./UserProfiles/UserProfileList";
import Header from "./Header";

export default function AdminViews(isLoggedIn, setIsLoggedIn) {
  return (
    <Routes>
        <Route
        path="/"
        element={
            <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Outlet />
            </>
        }
        >
      <Route path="/" element={<Hello />} />
      <Route index path="categories" element={<Category />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:postId/comments" element={<CommentList />} />
      <Route path="/tags/add" element={<TagForm />} />
      <Route path="/tags/delete/:id" element={<TagDelete />} />
      <Route path="/tags/edit/:id" element={<TagForm />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="categories/create" element={<CategoryForm />} />
      <Route path="categories/delete/:id" element={<CategoryDelete />} />
      <Route path="categories/edit/:id" element={<EditCategory />} />
      <Route path="/profiles" element={<UserProfileList />} />
      </Route>
    </Routes>
  );
}
