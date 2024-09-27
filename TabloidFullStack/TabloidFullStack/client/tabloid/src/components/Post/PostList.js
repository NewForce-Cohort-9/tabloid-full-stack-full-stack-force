import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GetApprovedPosts,
  getPostsByCategory, getPostsByTag,
} from "../../Managers/PostManager";
import Post from "./Post";
import { GetAllCategories } from "../../Managers/CategoryManager";
import { getAllTags } from "../../Managers/TagManager";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    GetAllCategories().then((data) => setCategories(data));
  }, []);
  useEffect(() => {

  })

  useEffect(() => {
    getAllTags().then((data) => setTags(data));
  }, []);
  useEffect(() => {

  })

  useEffect(() => {
    callGetPosts();
  }, []);

  const callGetPosts = async () => {
    const posts = await GetApprovedPosts();
    setPosts(posts);
  };
  const postsByCategory = async (id) => {
    if (id > 0)
    {
      const posts = await getPostsByCategory(id);
      setPosts(posts)
    }
    else
    {
      callGetPosts()
    }
  }

  const postsByTag = async (id) => {
    if (id > 0)
    {
      const posts = await getPostsByTag(id);
      setPosts(posts)
    }
    else
    {
      callGetPosts()
    }
  }

  return (
    <>
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-line"></div>
          </div>
          <h2 className="pre-wrap font-weight-light mb-0">Posts</h2>
        </div>
      </header>

      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-between w-full">
          <h1>All Posts</h1>
          <div className="dropdown">
            <select className="btn btn-primary" onChange={(event) => {return postsByCategory(parseInt(event.target.value))}}>
              <option value="0">Filter by Category</option>
              {categories.map((category) => {
                return(
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="dropdown">
            <select className="btn btn-primary" onChange={(event) => {return postsByTag(parseInt(event.target.value))}}>
              <option value="0">Filter by Tag</option>
              {tags.map((tag) => {
                return(
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                )
              })}
            </select>
          </div>
          <Link to="/posts/create">
            <button className="btn btn-outline-primary mx-1 text-primary">
              Create New Post
            </button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Estimated Read Time</th>
              <th>Published On</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                return (
                  <tr key={post.id}>
                    <Post post={post} showActions={false} />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
