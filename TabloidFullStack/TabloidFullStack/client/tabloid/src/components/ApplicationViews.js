import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Category } from "./Category/CategoryList";
import { CategoryForm } from "./Category/CategoryForm";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route index path="categories" element={<Category />}/>
        <Route path="categories/create" element={<CategoryForm />} />
      </Routes>
   );
 
}