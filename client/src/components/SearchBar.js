import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, value, onInputChange }) {
    const [query, setQuery] = useState(value || ''); // Initialize with value from App.js

    useEffect(() => {
        setQuery(value); // Update local state when value prop changes
    }, [value]);

    const handleSearch = () => {
        if (query.trim() === '') {
            onSearch('');  // Trigger page refresh when the search bar is empty
        } else {
            onSearch(query);  // Normal search
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (onInputChange) {
            onInputChange(e); // Communicate the input change back to App.js
        }
    };

    return (
        <div className="search-section">
            <input
                type="text"
                className="search-input"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Search latest news..."
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;
