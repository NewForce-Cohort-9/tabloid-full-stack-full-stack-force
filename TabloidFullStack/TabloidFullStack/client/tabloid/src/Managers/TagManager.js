const apiUrl = "https://localhost:5001";
const tagBase = `${apiUrl}/api/tag`;

export const getAllTags = async () => {
  const response = await fetch(tagBase);
  if (response.ok) return await response.json();
};
