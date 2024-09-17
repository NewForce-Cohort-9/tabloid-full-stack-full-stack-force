const apiUrl = "https://localhost:5001";

export const GetAllCategories = () => {
    return fetch(`${apiUrl}/api/Category`).then((res) => res.json())
};