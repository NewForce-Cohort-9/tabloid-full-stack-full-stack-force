const apiUrl = "https://localhost:5001";
const tagBase = `${apiUrl}/api/tag`;

export const getAllTags = async () => {
  const response = await fetch(tagBase);
  if (response.ok) return await response.json();
};

export const getById = async (tagId) => {
  const response = await fetch(`${tagBase}/${tagId}`);
  if (response.ok) return await response.json();
};

export const addTag = async (tag) => {
  const response = await fetch(tagBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });
  return await response.json();
};

export const deleteTag = async (tagId) => {
  await fetch(`${tagBase}/${tagId}`, {
    method: "DELETE",
  });
};

export const updateTag = async (tag) => {
  await fetch(`${tagBase}/${tag.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });
};
