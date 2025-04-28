// src/components/NoSavedPosts.js
import React from 'react';
import './NoSavedPosts.css';
import noSavedPostsImg from '../assets/noSavedPostsYet.jpg';

function NoSavedPosts() {
    return (
        <div className="no-saved-posts">
            <img
                src={noSavedPostsImg}
                alt="No Saved Posts"
                className="no-saved-posts-image"
            />
            <h2>No saved posts yet</h2>
            <p>Save articles you like to easily find them later!</p>
        </div>
    );
}

export default NoSavedPosts;
