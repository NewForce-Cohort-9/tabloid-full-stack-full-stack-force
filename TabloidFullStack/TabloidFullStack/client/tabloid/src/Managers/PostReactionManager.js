// const apiUrl = "https://localhost:5001/api/PostReaction";

// export const addPostReaction = (postId, reactionId, userProfileId) => {
//   return fetch(`${apiUrl}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       postId: postId,
//       reactionId: reactionId,
//       userProfileId: userProfileId,
//     }),
//   }).then((res) => {
//     if (!res.ok) {
//       throw new Error("Failed to add reaction");
//     }
//     return res.json();
//   });
// };


const baseUrl = "https://localhost:5001/api/PostReaction";

export const getReactionsForPost = (postId) => {
  return fetch(`${baseUrl}/post/${postId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch reactions");
      return res.json();
    });
};

export const addPostReaction = (postId, reactionId, userProfileId) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      reactionId,
      userProfileId,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add reaction");
    }
    return res.json();
  });
};
