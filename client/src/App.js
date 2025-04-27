import React, { useState, useEffect, useCallback } from 'react';
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
        setNews(fetchedNews); // Reset news on page 1
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
    setNews([]); // Clear existing news
    setNoResults(false);
    debouncedFetchNews(searchTerm, 1); // Trigger search
  };

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      return; // Don't fetch again if the same category is clicked
    }
    setSelectedCategory(category);
    setSearchInput(''); // Clear the search bar
    setQuery(category === "All" ? 'all' : category);
    setPage(1);
    setNews([]); // Clear existing news
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
    setSearchInput(''); // Clear the search input
    debouncedFetchNews('all', 1);
  };

  useEffect(() => {
    debouncedFetchNews(query, page);
  }, [query, page, debouncedFetchNews]);

  return (
    <div className="app">
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
            <li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
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
    </div>
  );
}

export default App;
