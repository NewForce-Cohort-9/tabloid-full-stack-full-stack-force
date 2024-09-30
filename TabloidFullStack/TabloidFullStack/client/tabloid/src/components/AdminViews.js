import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
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
import Header from "./Header";
import UserProfileConfirm from "./UserProfiles/UserProfileConfirm";
import UserProfileEdit from "./UserProfiles/UserProfileEdit.js";
import EditPostForm from "./Post/EditPostForm.js";
import  HomePage  from "./Homepage.js";
import AddReaction from "./Reaction/AddReaction.js";

export default function ApplicationViews(isLoggedIn, setIsLoggedIn) {
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

        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Hello />} />
        <Route path="/tags" element={<TagList />} />
        <Route path="/tags/add" element={<TagForm />} />
        <Route path="/tags/delete/:id" element={<TagDelete />} />
        <Route path="/tags/edit/:id" element={<TagForm />} />

        <Route index path="categories" element={<Category />} />
        <Route path="categories/create" element={<CategoryForm />} />
        <Route path="categories/delete/:id" element={<CategoryDelete />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />

        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/edit/:postId" element={<EditPostForm />} />
        <Route path="/posts/:postId/comments" element={<CommentList />} />
        <Route path="/posts/:postId/comments/add" element={<CommentForm />} />
        <Route
          path="/posts/:postId/comments/delete/:commentId"
          element={<DeleteComment />}
        />
        <Route
          path="/posts/:postId/comments/edit/:commentId"
          element={<CommentForm />}
        />

        <Route path="/profiles" element={<UserProfileList />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route
          path="/profile/deactivate/:id"
          element={<UserProfileConfirm />}
        />
        <Route
          path="/profile/reactivate/:id"
          element={<UserProfileConfirm />}
        />
        <Route path="/profile/edit/:id" element={<UserProfileEdit />} />

        <Route path="/reactions" element={<AddReaction />} />
      </Route>
    </Routes>
  );
}
