export const addSubscription = (subscriberId, providerId) => {
    return fetch(`https://localhost:5001/api/subscription?subscriberId=${subscriberId}&providerId=${providerId}`, {
      method: "POST",
    })
    .then((response) => {
      if (!response.ok) {
       
        return Promise.reject("Failed to subscribe.");
      }
      
      return response.json().catch(() => {
        
        return { message: "Subscription successful without response body" };
      });
    });
  };

  export const getPostsBySubscribedAuthors = (userId) => {
    return fetch(`/api/post/subscriptions/${userId}`)
        .then(res => res.json());
};