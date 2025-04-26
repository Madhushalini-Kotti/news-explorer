// components/NewsCard.js
import React from 'react';
import './NewsCard.css'; // We'll create this for card-specific styles

function NewsCard({ article }) {
    return (
        <div className="news-card">
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
        </div>
    );
}

export default NewsCard;
