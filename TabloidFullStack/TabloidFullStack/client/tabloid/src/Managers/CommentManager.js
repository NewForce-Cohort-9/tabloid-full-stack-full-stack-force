// const apiUrl = "https://localhost:5001";

// export const GetAllComments = () => {
//     return fetch(`${apiUrl}/api/Comment`).then((res) => res.json())
// };

const apiUrl = "https://localhost:5001/api/Comment";

export const GetAllComments = (postId) => {
  return fetch(`${apiUrl}?postId=${postId}`).then((res) => res.json()); // get specific post's comments
};

export const addComment = async (singleComment) => {
  return fetch(apiUrl,{
      method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(singleComment),
});
};

// Fetch a comment by its ID
export const getCommentById = (commentId) => {
    return fetch(`${apiUrl}/${commentId}`)
        .then(res => res.json());
};

// Delete a comment by its ID
export const deleteComment = (commentId) => {
    return fetch(`${apiUrl}/${commentId}`, {
        method: 'DELETE',
    });
};
