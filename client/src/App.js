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

function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const debouncedFetchNews = useCallback(
    debounce(async (searchTerm, pageNum) => {
      const fetchedNews = await fetchNews(searchTerm, pageNum);

      if (fetchedNews.length === 0 && pageNum === 1) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

      setLoading(false);

      if (pageNum === 1) {
        setNews(fetchedNews);
      } else {
        setNews((prevNews) => [...prevNews, ...fetchedNews]);
      }

      setHasMore(fetchedNews.length > 0);
    }, 800),
    []
  );

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
    setNews([]);
    setNoResults(false);
    setLoading(true);
  };

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLogoClick = () => {
    // When logo is clicked, reset the search to its default value (e.g., 'all')
    setQuery('all');
    setPage(1);
    setNews([]);
    setNoResults(false);
    setLoading(true);

    // Fetch news immediately after reset
    debouncedFetchNews('all', 1);
  };

  useEffect(() => {
    debouncedFetchNews(query, page);
  }, [query, page, debouncedFetchNews]);

  useEffect(() => {
    if (query.trim() !== '') {
      debouncedFetchNews(query, page);
    } else {
      debouncedFetchNews(query, page);
    }
  }, [query, page, debouncedFetchNews]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-left" onClick={handleLogoClick}>
          <h1>📰 News Explorer</h1>
        </div>
        <div className="header-center">
          <SearchBar onSearch={handleSearch} small />
        </div>
        <div className="header-right">
          <a
            href="https://github.com/Madhushalini-Kotti/news-explorer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} color="white" />
          </a>
        </div>
      </header>

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
