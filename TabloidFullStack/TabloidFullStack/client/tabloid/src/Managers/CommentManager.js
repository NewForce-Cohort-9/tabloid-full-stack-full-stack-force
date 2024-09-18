// const apiUrl = "https://localhost:5001";

// export const GetAllComments = () => {
//     return fetch(`${apiUrl}/api/Comment`).then((res) => res.json())
// };

const apiUrl = "https://localhost:5001/api/Comment";

export const GetAllComments = (postId) => {
  return fetch(`${apiUrl}?postId=${postId}`).then((res) => res.json());
};
