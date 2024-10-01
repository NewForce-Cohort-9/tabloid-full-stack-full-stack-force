import React, { useEffect, useState } from "react";
import { getPostsBySubscribedAuthors } from "../Managers/SubscriptionManager";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    if (userProfile) {
      getPostsBySubscribedAuthors(userProfile.id)
        .then((data) => setPosts(data))
        .catch((err) => console.error("Failed to fetch posts", err));
    }
  }, [userProfile]);

  if (!posts.length) {
    return <p>No posts from your active subscriptions yet.</p>;
  }

  return (
    <div>
      <h2>Posts from Authors You're Subscribed To</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>By {post.author.displayName} on {new Date(post.publishDateTime).toLocaleDateString()}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
