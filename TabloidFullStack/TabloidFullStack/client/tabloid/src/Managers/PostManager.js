const apiUrl = "https://localhost:5001";

export const GetApprovedPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
        .then((res) => res.json());
};


export const getPostsByUser = (userId) => {
    return fetch(`${apiUrl}/api/post/myposts/${userId}`).then(res => res.json());
};

