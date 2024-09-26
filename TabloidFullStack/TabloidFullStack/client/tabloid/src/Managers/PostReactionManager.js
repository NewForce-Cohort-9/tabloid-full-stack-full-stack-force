//const apiUrl = "/api/reaction";
//"https://localhost:5001/api/Comment"
const apiUrl ="https://localhost:5001/api/Reaction"

export const getReactionsForPost = (postId) => {
    return fetch(`${apiUrl}/post/${postId}`)
        .then((res) => res.json());
};

