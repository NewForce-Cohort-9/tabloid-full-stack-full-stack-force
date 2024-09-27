const apiUrl = "https://localhost:5001";

export const GetApprovedPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
        .then((res) => res.json());
};
export const GetUnapprovedPosts = () => {
    return fetch(`${apiUrl}/api/Post/unapproved`)
        .then((res) => res.json());
};


export const getPostsByUser = (userId) => {
    return fetch(`${apiUrl}/api/post/myposts/${userId}`).then(res => res.json());
};

export const getPostById = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`).then(res => res.json());
}

export const addPost = (post) => {
    return fetch(`${apiUrl}/api/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    .then(res => {
        if (!res.ok) {
            // Log the status and error message if the response isn't ok
            return res.json().then(errorData => {
                console.error('Error:', res.status, errorData);
                throw new Error('Failed to add post');
            });
        }
        return res.json();
    }).then((post) => {
        return post.id;
    });
};

export const deletePost = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`, {
        method: "DELETE",
    });
};


export const updatePost = (post) => {
    return fetch(`${apiUrl}/api/post/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(errorData => {
                console.error('Error:', res.status, errorData);
                throw new Error('Failed to update post');
            });
        }
        // Handle if the response doesn't return JSON
        return res.text().then(text => text ? JSON.parse(text) : {});
    });
};

export const getPostsByCategory = (categoryId) => {
    return fetch(`${apiUrl}/api/Post/category/${categoryId}`).then(res => res.json())
}

export const getPostsByTag = (tagId) => {
    return fetch(`${apiUrl}/api/Post/tag/${tagId}`).then(res => res.json())
}