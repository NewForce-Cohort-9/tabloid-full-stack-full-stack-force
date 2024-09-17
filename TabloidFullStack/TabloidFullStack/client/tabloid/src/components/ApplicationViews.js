import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import { PostList } from "./Post/PostList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/categories" element={<Category />}/>
        <Route path="/posts" element={<PostList />} />
      </Routes>
   );
 
}