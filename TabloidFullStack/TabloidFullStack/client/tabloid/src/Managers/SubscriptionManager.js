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
    return fetch(`https://localhost:5001/api/subscription/subscriptions/${userId}/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts by subscribed authors");
        }
        return res.json();
      });
};
  

  export const unsubscribe = (subscriberId, providerId) => {
    return fetch(
      `https://localhost:5001/api/subscription/unsubscribe?subscriberId=${subscriberId}&providerId=${providerId}`,
      {
        method: "POST",
      }
    ).then((response) => {
      if (!response.ok) {
        return Promise.reject("Failed to unsubscribe.");
      }
      return response.json().catch(() => {
        return { message: "Unsubscribed successfully without response body" };
      });
    });
  };

  export const isSubscribed = (subscriberId, providerId) => {
    return fetch(
      `https://localhost:5001/api/subscription/isSubscribed?subscriberId=${subscriberId}&providerId=${providerId}`
    )
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Failed to check subscription status");
        }
        return response.json();
      })
      .catch((err) => {
        console.error("Failed to check subscription status", err);
        return false; 
      });
  };
  