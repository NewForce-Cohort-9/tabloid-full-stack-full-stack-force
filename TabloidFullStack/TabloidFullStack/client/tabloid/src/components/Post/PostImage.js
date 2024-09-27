import { useState } from "react";

export const PostImage = ({postId}) => {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0])
 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
        const response = await fetch(`https://localhost:5001/api/Post/upload?Id=${postId}`, {
            method: "POST",
            body: formData,
          });
          if(!response.ok) throw new Error("Upload failed");
          const data = await response.json();
          console.log("Upload successful:", data);
          window.location.reload();

          setFile(null);
          event.target.reset();
        } catch (error) {
            console.error("Upload failed:", error)
        }
    }
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload image</button>
      </form>
    );
  };
