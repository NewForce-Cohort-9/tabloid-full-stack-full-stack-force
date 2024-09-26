const apiUrl = "https://localhost:5001";

export const getPostTagsByPost = (postId) => {
    return fetch(`${apiUrl}/api/PostTag/${postId}`).then(res => res.json());
};

export const addPostTag = (postTag) => {
    return fetch(`${apiUrl}/api/PostTag`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
    });
};

export const deletePostTag = (postTagId) => {
    return fetch(`${apiUrl}/api/PostTag/${postTagId}`, {
        method: "DELETE",
    });
}