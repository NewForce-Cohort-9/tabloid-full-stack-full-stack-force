const apiUrl = "https://localhost:5001";

export const GetApprovedPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
        .then((res) => res.json());
};

