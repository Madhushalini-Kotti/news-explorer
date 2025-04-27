import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import fetchNews from './api';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from './components/NoResults';
import LoadingSpinner from './components/LoadingSpinner';
import { FaGithub } from 'react-icons/fa';
import './App.css';

const categories = ["All", "Technology", "Science", "Business", "Health", "Sports"];

function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchInput, setSearchInput] = useState('');

  const debouncedFetchNews = useCallback(
    debounce(async (searchTerm, pageNum) => {
      setLoading(true);
      const fetchedNews = await fetchNews(searchTerm, pageNum);

      if (fetchedNews.length === 0 && pageNum === 1) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      if (pageNum === 1) {
        setNews(fetchedNews);
      } else {
        setNews((prevNews) => [...prevNews, ...fetchedNews]);
      }

      setHasMore(fetchedNews.length > 0);
      setLoading(false);
    }, 800),
    []
  );

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setQuery('all');
      setSelectedCategory('All');
    } else {
      setQuery(searchTerm);
      setSelectedCategory('All');
    }
    setPage(1);
    setNews([]);
    setNoResults(false);

    // 🆕 Scroll to top after a new search
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    debouncedFetchNews(searchTerm, 1);
  };

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setSearchInput('');
    setQuery(category === "All" ? 'all' : category);
    setPage(1);
    setNews([]);
    setNoResults(false);
    debouncedFetchNews(category === "All" ? 'all' : category, 1);
  };

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLogoClick = () => {
    setSelectedCategory('All');
    setQuery('all');
    setPage(1);
    setNews([]);
    setNoResults(false);
    setSearchInput('');
    debouncedFetchNews('all', 1);
  };

  useEffect(() => {
    debouncedFetchNews(query, page);
  }, [query, page, debouncedFetchNews]);

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <header className="header">
        <div className="header-left" onClick={handleLogoClick}>
          <h1>📰 News Explorer</h1>
        </div>
        <div className="header-center">
          <SearchBar
            onSearch={handleSearch}
            value={searchInput}
            onInputChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="header-right">
          <a
            href="https://github.com/Madhushalini-Kotti/news-explorer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} color="black" />
          </a>
        </div>
      </header>

      <div className="header-categories">
        <ul>
          {categories.map((category) => (
            <motion.li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {category}
            </motion.li>
          ))}
        </ul>
      </div>

      <InfiniteScroll
        dataLength={news.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={page > 1 ? <LoadingSpinner /> : null}
      >
        <section className="news-section">
          {loading && page === 1 ? (
            <LoadingSpinner />
          ) : noResults ? (
            <NoResults />
          ) : (
            news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          )}
        </section>
      </InfiniteScroll>
    </motion.div>
  );
}

export default App;
