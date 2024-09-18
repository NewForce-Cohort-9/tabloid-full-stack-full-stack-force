const apiUrl = "https://localhost:5001";

export const GetAllCategories = () => {
    return fetch(`${apiUrl}/api/Category`).then((res) => res.json())
};

export const getCategoryById = (id) => {
    return fetch(`${apiUrl}/api/Category/${id}`).then((res) => res.json())
}

export const addCategory = (category) => {
    return fetch(`${apiUrl}/api/Category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
};

export const updateCategory = (category) => {
    return fetch(`${apiUrl}/api/Category/${category.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category)
    });
};

export const deleteCategory = (id) => {
    return fetch(`${apiUrl}/api/Category/${id}`, {method: "DELETE"});
};