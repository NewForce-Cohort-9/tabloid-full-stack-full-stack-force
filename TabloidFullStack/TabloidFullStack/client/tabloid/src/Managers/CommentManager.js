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

export const getCommentById = (commentId) => {
    return fetch(`${apiUrl}/${commentId}`)
        .then(res => res.json());
};

export const deleteComment = (commentId) => {
    return fetch(`${apiUrl}/${commentId}`, {
        method: 'DELETE',
    });
};

export const editComment = async (commentId, updatedComment) => {
    const response = await fetch(`${apiUrl}/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComment),
    });

};
