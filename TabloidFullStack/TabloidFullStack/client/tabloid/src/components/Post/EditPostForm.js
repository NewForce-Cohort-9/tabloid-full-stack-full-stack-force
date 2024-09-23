import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../Managers/PostManager';
import { GetAllCategories } from '../../Managers/CategoryManager';

export default function EditPostForm() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null); 
    const [categories, setCategories] = useState([]);

   
    useEffect(() => {
        getPostById(postId).then((existingPost) => {
            setPost({
                title: existingPost.title,
                content: existingPost.content,
                categoryId: existingPost.category?.id || '' 
            });
        });
        GetAllCategories().then(setCategories);
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: name === 'categoryId' ? Number(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!post) {
            console.error("Post data is not available.");
            return;
        }

        const updatedPost = {
            ...post,
            id: postId, 
            isApproved: true, 
            createDateTime: new Date().toISOString(), 
        };

        
        updatePost(updatedPost)
            .then(() => navigate(`/posts`)) 
            .catch((err) => console.error("Failed to update post:", err));
    };

    
    if (!post || !categories.length) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={post.title} 
                    onChange={handleChange} 
                    required 
                />
            </fieldset>
            <fieldset>
                <label htmlFor="content">Content</label>
                <textarea 
                    name="content" 
                    value={post.content} 
                    onChange={handleChange} 
                    required 
                />
            </fieldset>
            <fieldset>
                <label htmlFor="categoryId">Category</label>
                <select 
                    name="categoryId" 
                    value={post.categoryId} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </fieldset>
            <button type="submit">Save Changes</button>
        </form>
    );
}
