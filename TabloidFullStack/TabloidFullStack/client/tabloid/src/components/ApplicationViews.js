import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import { CategoryForm } from "./Category/CategoryForm";
import { CategoryDelete } from "./Category/CategoryDelete";
import { EditCategory } from "./Category/CategoryEdit";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm";
import TagDelete from "./Tags/TagDelete";
import PostList from "./Post/PostList";
import PostDetail from "./Post/PostDetail";
import MyPosts from "./Post/MyPosts";
import { CommentList } from "./Comments/CommentList";
import { CommentForm } from "./Comments/CommentForm";
import { DeleteComment } from "./Comments/DeleteComment";
import PostForm from "./Post/PostForm";
import UserProfileList from "./UserProfiles/UserProfileList";
import UserProfile from "./UserProfiles/UserProfile";

export default function ApplicationViews() {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route index path="categories" element={<Category />} />
      <Route path="/tags" element={<TagList />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:postId/comments" element={<CommentList />} />
      <Route path="/posts/:postId/comments/add" element={<CommentForm />} />
      <Route path="/posts/:postId/comments" element={<CommentList />} />
      <Route path="/tags/add" element={<TagForm />} />
      <Route path="/tags/delete/:id" element={<TagDelete />} />
      <Route path="/tags/edit/:id" element={<TagForm />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/create" element={<PostForm />} />
      <Route path="categories/create" element={<CategoryForm />} />
      <Route path="categories/delete/:id" element={<CategoryDelete />} />
      <Route path="categories/edit/:id" element={<EditCategory />} />

      <Route path="/tags" element={<TagList />} />
      <Route path="/tags/add" element={<TagForm />} />
      <Route path="/tags/delete/:id" element={<TagDelete />} />
      <Route path="/tags/edit/:id" element={<TagForm />} />

      <Route path="/posts" element={<PostList />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/:postId/comments" element={<CommentList />} />
      <Route path="/posts/:postId/comments/add" element={<CommentForm />} />
      <Route
        path="/posts/:postId/comments/delete/:commentId"
        element={<DeleteComment />}
      />

      <Route path="/profiles" element={<UserProfileList />} />
      <Route path="/profile/:id" element={<UserProfile />} />
    </Routes>
  );
}
