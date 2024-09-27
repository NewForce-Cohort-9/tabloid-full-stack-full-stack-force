import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import { CommentList } from "./Comments/CommentList";
import MyPosts from "./Post/MyPosts";
import PostDetail from "./Post/PostDetail";
import UserProfileList from "./UserProfiles/UserProfileList";
import Header from "./Header";
import UserHeader from "./UserHeader";
import PostForm from "./Post/PostForm";
import PostDetails from "./Post/PostDetail";
import EditPostForm from "./Post/EditPostForm";
import { CommentForm } from "./Comments/CommentForm";
import { DeleteComment } from "./Comments/DeleteComment";

export const UserView = (isLoggedIn, setIsLoggedIn) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <UserHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Outlet />
           
          </>
        }>
        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/edit/:postId" element={<EditPostForm />} />
        <Route path="/posts/:postId/comments" element={<CommentList />} />
        <Route
          path="/posts/:postId/comments/add"
          element={<CommentForm />}
        />
        <Route
          path="/posts/:postId/comments/delete/:commentId"
          element={<DeleteComment />}
        />
        <Route
          path="/posts/:postId/comments/edit/:commentId"
          element={<CommentForm />}
        />
      </Route>
    </Routes>
  );
};
