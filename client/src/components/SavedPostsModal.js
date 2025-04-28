// src/components/SavedPostsModal.js
import React from 'react';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import './SavedPostsModal.css'; // We'll style a little later

function SavedPostsModal({ savedArticles, user, onClose }) {
    return (
        <motion.div
            className="saved-posts-modal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <div className="saved-posts-header">
                <h2>❤️ Your Saved Posts</h2>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div className="saved-posts-list">
                {savedArticles.length > 0 ? (
                    savedArticles.map((article, index) => (
                        <NewsCard key={index} article={article} user={user} />
                    ))
                ) : (
                    <p className="no-saved">No saved posts yet.</p>
                )}
            </div>
        </motion.div>
    );
}

export default SavedPostsModal;
