import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ category, onCategorySelect }) => {
    const categories = ['all', 'business', 'technology', 'health', 'sports', 'entertainment'];

    return (
        <div className="category-filter">
            {categories.map((cat) => (
                <button
                    key={cat}
                    className={`category-btn ${category === cat ? 'active' : ''}`} // Add the 'active' class if this is the selected category
                    onClick={() => onCategorySelect(cat)}
                >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
