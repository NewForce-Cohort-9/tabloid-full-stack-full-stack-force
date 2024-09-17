const apiUrl = "https://localhost:5001";

export const GetAllComments = () => {
    return fetch(`${apiUrl}/api/Comments`).then((res) => res.json())
};