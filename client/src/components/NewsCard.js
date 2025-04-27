import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
import './NewsCard.css';

function NewsCard({ article, user }) {
    const [liked, setLiked] = useState(user?.likedPosts?.includes(article.id) || false);
    const [disliked, setDisliked] = useState(user?.dislikedPosts?.includes(article.id) || false);
    const [likesCount, setLikesCount] = useState(article.likes || 0);
    const [dislikesCount, setDislikesCount] = useState(article.dislikes || 0);

    const handleLike = async () => {
        if (!user) return alert('Please login to like posts!');
        try {
            const res = await axios.post('http://localhost:5000/api/like', {
                userId: user.id,
                postId: article.id
            });

            const { likes, dislikes } = res.data.post;
            setLikesCount(likes);
            setDislikesCount(dislikes);
            setLiked(!liked);
            if (disliked) setDisliked(false);

        } catch (error) {
            console.error('Error liking post:', error.response?.data || error.message);
            alert('Failed to like the post.');
        }
    };

    const handleDislike = async () => {
        if (!user) return alert('Please login to dislike posts!');
        try {
            const res = await axios.post('http://localhost:5000/api/dislike', {
                userId: user.id,
                postId: article.id
            });

            const { likes, dislikes } = res.data.post;
            setLikesCount(likes);
            setDislikesCount(dislikes);
            setDisliked(!disliked);
            if (liked) setLiked(false);

        } catch (error) {
            console.error('Error disliking post:', error.response?.data || error.message);
            alert('Failed to dislike the post.');
        }
    };

    return (
        <motion.div
            className="news-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
        >
            {article.urlToImage && (
                <img src={article.urlToImage} alt="news" className="news-image" />
            )}
            <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-description">{article.description}</p>

                <div className="actions-row">
                    <button
                        className={`action-button ${liked ? 'active' : ''}`}
                        onClick={handleLike}
                    >
                        <FaThumbsUp size={18} /> {likesCount}
                    </button>

                    <button
                        className={`action-button ${disliked ? 'active' : ''}`}
                        onClick={handleDislike}
                    >
                        <FaThumbsDown size={18} /> {dislikesCount}
                    </button>

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-more"
                    >
                        Read more →
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default NewsCard;
