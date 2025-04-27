// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SearchBar.css';

function SearchBar({ onSearch, value, onInputChange }) {
    const [query, setQuery] = useState(value || '');

    useEffect(() => {
        setQuery(value);
    }, [value]);

    const handleSearch = () => {
        if (query.trim() === '') {
            onSearch('');
        } else {
            onSearch(query);
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
            onInputChange(e);
        }
    };

    return (
        <div className="search-section">
            <motion.input
                type="text"
                className="search-input"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Search latest news..."
                whileFocus={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
            <motion.button
                className="search-button"
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
                Search
            </motion.button>
        </div>
    );
}

export default SearchBar;
