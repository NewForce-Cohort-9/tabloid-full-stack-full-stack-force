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
