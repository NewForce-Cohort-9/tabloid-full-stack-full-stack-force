import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllCategories } from '../../Managers/CategoryManager'; 
import { addPost } from '../../Managers/PostManager'; 

export default function PostForm() {
    const [post, setPost] = useState({
        title: '',
        content: '',
        imageLocation: '',
        publishDateTime: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch all categories for dropdown
    useEffect(() => {
        GetAllCategories().then(setCategories);
    }, []);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { 
            ...post, 
            isApproved: true, 
            createDateTime: new Date().toISOString() //automatically setting date to current date
        };
        addPost(newPost).then(() => navigate(`/posts`)); 
    };

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
            <fieldset>
                <label htmlFor="imageLocation">Header Image URL (optional)</label>
                <input 
                    type="text" 
                    name="imageLocation" 
                    value={post.imageLocation} 
                    onChange={handleChange} 
                />
            </fieldset>
            <fieldset>
                <label htmlFor="publishDateTime">Publication Date (optional)</label>
                <input 
                    type="date" 
                    name="publishDateTime" 
                    value={post.publishDateTime} 
                    onChange={handleChange} 
                />
            </fieldset>
            <button type="submit">Save Post</button>
        </form>
    );
}
