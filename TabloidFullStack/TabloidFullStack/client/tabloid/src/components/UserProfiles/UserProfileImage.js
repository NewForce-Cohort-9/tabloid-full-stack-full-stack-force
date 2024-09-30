import React, { useState } from "react";

const UserProfileImage = ({ userId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `https://localhost:5001/api/userprofile/upload?userId=${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      console.log("Upload successful:", data);
      window.location.reload(); //reload page

      setFile(null);
      event.target.reset(); //clear file input
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UserProfileImage;
