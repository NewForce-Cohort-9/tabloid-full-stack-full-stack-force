import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllCategories } from '../../Managers/CategoryManager';
import { addPost } from '../../Managers/PostManager';
import { getUserProfileById } from '../../Managers/UserProfileManager';
import { getAllTags } from '../../Managers/TagManager';
import { addPostTag } from '../../Managers/PostTagManager';

export default function PostForm() {
    const [post, setPost] = useState({
        title: '',
        content: '',
        imageLocation: '',
        publishDateTime: '',
        categoryId: '' 
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();

    // Fetch categories for the dropdown
    useEffect(() => {
        GetAllCategories().then(setCategories);
    }, []);
    useEffect(() => {
        getAllTags().then(setTags)
    }, [])
    // Fetch full user profile from API
    useEffect(() => {
        const localProfile = JSON.parse(localStorage.getItem("userProfile"));
        
        if (localProfile && localProfile.id) {
            getUserProfileById(localProfile.id).then((profileData) => {
                localStorage.setItem("userProfile", JSON.stringify(profileData)); // Update local storage with full profile
                setPost({ ...post, author: profileData });
            });
        }
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: name === 'categoryId' ? Number(value) : value 
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const userProfile = JSON.parse(localStorage.getItem("userProfile")); 
        const selectedCategory = categories.find(c => c.id === post.categoryId);

        if (!userProfile || !selectedCategory) {
            console.error("Missing userProfile or selectedCategory");
            return;
        }

        const newPost = {
            ...post,
            isApproved: true,
            createDateTime: new Date().toISOString(),
            category: {
                id: selectedCategory.id,
                name: selectedCategory.name
            },
            userProfileId: userProfile.id,
            author: {
                id: userProfile.id,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                displayName: userProfile.displayName,
                email: userProfile.email,
                createDateTime: userProfile.createDateTime,
                imageLocation: userProfile.imageLocation || "default.jpg",
                userTypeId: userProfile.userTypeId,
                userType: {
                    id: userProfile.userTypeId,
                    name: userProfile.displayName 
                }
            }
        };

        addPost(newPost)
        .then((data) => {
            if(data) {
                {
                    selectedTags.map((tag) => {
                        const newPostTag = {
                            PostId: data,
                            TagId: tag
                        };
                        addPostTag(newPostTag);
                    })
                }
            }
        })
            .then(() => navigate(`/posts`)) 
            .catch((err) => console.error("Failed to add post:", err));
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
            <fieldset>
            <div>
              <p>Select Tags: </p>
              {tags.map((tag) => {
                return (
                  <div className="item-tags">
                    <input
                      type="checkbox"
                      key={tag.id}
                      id={tag.id}
                      value={tag.id}
                      onClick={(event) => {
                        
                          selectedTags.push(parseInt(event.target.value))
                          

                        console.log(selectedTags);
                      }}
                    ></input>
                    <label>{tag.name}</label>
                  </div>
                );
              })}
            </div>
            </fieldset>
            <button type="submit">Save Post</button>
        </form>
    );
}
