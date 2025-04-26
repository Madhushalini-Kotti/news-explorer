import React from 'react';
import './NoResults.css'; // We'll style it too!

function NoResults() {
    return (
        <div className="no-results">
            <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No News"
                className="no-results-image"
            />
            <h2>No news found</h2>
            <p>Try searching for something else!</p>
        </div>
    );
}

export default NoResults;
