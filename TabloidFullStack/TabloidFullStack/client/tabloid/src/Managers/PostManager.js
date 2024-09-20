const apiUrl = "https://localhost:5001";

export const GetApprovedPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
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
    });
};

export const deletePost = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`, {
        method: "DELETE",
    });
};
