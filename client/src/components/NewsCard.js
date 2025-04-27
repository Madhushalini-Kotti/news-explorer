// src/components/NewsCard.js
import React from 'react';
import { motion } from 'framer-motion';
import './NewsCard.css';

function NewsCard({ article }) {
    return (
        <motion.div
            className="news-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
        >
            {article.urlToImage && (
                <img src={article.urlToImage} alt="news" className="news-image" />
            )}
            <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-description">{article.description}</p>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                >
                    Read more
                </a>
            </div>
        </motion.div>
    );
}

export default NewsCard;
