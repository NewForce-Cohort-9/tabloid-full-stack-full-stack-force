import { useEffect, useState } from "react";
import { GetAllCategories } from "../../Managers/CategoryManager";
import { getAllTags } from "../../Managers/TagManager";
import {
  GetApprovedPosts,
  getPostsByCategory,
  getPostsByTag,
  GetUnapprovedPosts,
} from "../../Managers/PostManager";
import { Link, useNavigate } from "react-router-dom";
import Post from "./Post";

export const UnauthorizedPostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [approve, setApprove] = useState();

  let seeApprovedPost = approve;

  useEffect(() => {
    GetAllCategories().then((data) => setCategories(data));
  }, []);
  useEffect(() => {});

  useEffect(() => {
    getAllTags().then((data) => setTags(data));
  }, []);

  useEffect(() => {
    callGetPosts();
  }, []);
  const callGetPosts = async () => {
    const posts = await GetUnapprovedPosts();
    setPosts(posts);
  };
  const navigate = useNavigate();
  const approvedPosts = () => {
    setApprove(true);
      GetApprovedPosts().then((data) => setPosts(data));
  };
  const unapprovedPosts = () => {
    setApprove(false);
    GetUnapprovedPosts().then((data) => setPosts(data))
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
          {seeApprovedPost ? (
            <div>
              <h1>Approved Posts</h1>{" "}
              <button className="btn btn-outline-primary" onClick={unapprovedPosts}>
                See pending Posts
              </button>{" "}
            </div>
          ) : (
            <div>
              <h1>Posts Pending Approval</h1>{" "}
              <button className="btn btn-outline-primary" onClick={approvedPosts}>
                See approved Posts
              </button>{" "}
            </div>
          )}
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
                console.log(seeApprovedPost);
                return (
                  <tr key={post.id}>
                    <Post post={post} showActions={false} />
                    {post.isApproved ? (
                      <td
                        className="btn btn-danger"
                        title="approve"
                        onClick={() => navigate(`/post/disapprove/${post.id}`)}
                      >
                        Disapprove
                      </td>
                    ) : (
                      <td
                        className="btn btn-success"
                        title="approve"
                        onClick={() => navigate(`/post/approve/${post.id}`)}
                      >
                        Approve
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
