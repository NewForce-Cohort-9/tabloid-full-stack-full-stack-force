import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../Managers/PostManager';
import { GetAllCategories } from '../../Managers/CategoryManager';

export default function EditPostForm() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);

    // Fetch post data and categories for dropdown
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

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));

        if (!userProfile) {
            console.error("UserProfile not found in localStorage");
            return;
        }

        const updatedPost = {
            id: Number(postId),
            title: post.title,
            content: post.content,
            imageLocation: "default.jpg",  
            createDateTime: new Date().toISOString(),
            publishDateTime: new Date().toISOString(),
            isApproved: true,
            categoryId: post.categoryId,
            category: {
                id: post.categoryId,
                name: categories.find(c => c.id === post.categoryId)?.name || 'string'
            },
            userProfileId: userProfile.id,
            author: {
                id: userProfile.id,
                firstName: userProfile.firstName || 'string',
                lastName: userProfile.lastName || 'string',
                displayName: userProfile.displayName || 'string',
                email: userProfile.email || 'user@example.com',
                createDateTime: userProfile.createDateTime || new Date().toISOString(),
                imageLocation: userProfile.imageLocation || 'default.jpg',
                userTypeId: userProfile.userTypeId,
                userType: {
                    id: userProfile.userTypeId,
                    name: userProfile.userType?.name || 'string'
                }
            }
        };

        console.log('Updated Post Payload:', updatedPost);

        updatePost(updatedPost)
            .then(() => navigate(`/posts`))
            .catch((err) => {
                console.error("Failed to update post:", err);
            });
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
