const apiUrl = "https://localhost:5001";

export const addPostTag = (postTag) => {
    return fetch(`${apiUrl}/api/PostTag`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
    });
};