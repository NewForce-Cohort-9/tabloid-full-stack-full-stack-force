const baseUrl = "https://localhost:5001/api/reaction";

export const addReaction = (name, imageLocation) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, imageLocation }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to add reaction');
        }
        return res.json();
    });
};

export const getAllReactions = () => {
    return fetch(baseUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch reactions');
            }
            return res.json();
        });
};

export const getReactionsByPostId = (postId) => {
    return fetch(`${baseUrl}/post/${postId}`)
        .then((res) => res.json());
};

export const addPostReaction = (postId, reactionId, userId) => {
    return fetch(`${baseUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, reactionId, userId }),
    });
};

export const removePostReaction = (postId, userId, reactionId) => {
    return fetch(`${baseUrl}/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, reactionId }),
    });
};
