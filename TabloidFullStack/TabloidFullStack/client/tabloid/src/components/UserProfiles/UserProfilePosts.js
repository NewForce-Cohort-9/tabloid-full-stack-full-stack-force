import { Link } from "react-router-dom";

export default function UserProfilePosts({ posts }) {
  return (
    <div>
      <h5>Posts by this user</h5>
      <div className="card mt-3">
        <ul className="list-group list-group-flush">
          {posts && posts.length > 0 ? (
            posts.map((post) => {
              return (
                <li
                  key={post.id}
                  style={{ flex: 1 }}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <Link
                    to={`/posts/${post.id}`}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      minWidth: "3rem",
                    }}
                    className="col text-primary"
                  >
                    {post.title}
                  </Link>
                  <span className="text-secondary col">
                    {post.content.slice(0, 20)}...
                  </span>
                  <span className="text-secondary col">
                    {post.category.name}
                  </span>
                  <span className="text-secondary col">
                    {new Date(post.createDateTime).toLocaleDateString()}
                  </span>
                </li>
              );
            })
          ) : (
            <span>No posts found for user.</span>
          )}
        </ul>
      </div>
    </div>
  );
}
