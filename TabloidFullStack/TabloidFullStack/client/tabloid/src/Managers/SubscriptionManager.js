const apiUrl = "https://localhost:5001/api/subscription";

export const addSubscription = (subscriberId, providerId) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ subscriberId, providerId })
    }).then(res => res.ok ? res.json() : Promise.reject("Failed to subscribe"));
};
