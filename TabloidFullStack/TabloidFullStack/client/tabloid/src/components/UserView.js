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
        }
        >
        
        </Route>
    </Routes>
  );
};
