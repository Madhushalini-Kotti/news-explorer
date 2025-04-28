import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import fetchNews from './api';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from './components/NoResults';
import LoadingSpinner from './components/LoadingSpinner';
import { motion } from 'framer-motion';
import Modal from './components/Modal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LogoutIcon from '@mui/icons-material/Logout';
import Toast from './components/Toast';
import './App.css';

const categories = ["All", "Technology", "Science", "Business", "Health", "Sports"];

function MainApp() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSavedPosts, setShowSavedPosts] = useState(false);


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('news-explorer-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('news-explorer-user');
    handleLogoClick();
    setToastMessage('Logged out successful.');
    setToastType('success');
  };

  useEffect(() => {
    debouncedFetchNews(query, page);
  }, [query, page, debouncedFetchNews]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
          {user ? (
            <div className="user-section">
              <span className="user-greeting">Hi, {user.name}</span>
              <LogoutIcon
                onClick={handleLogout}
                style={{ cursor: 'pointer', fontSize: '28px', color: '#333' }}
                titleAccess="Logout"
              />
            </div>
          ) : (
            <>
              <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
              <button className="auth-button" onClick={() => setShowSignup(true)}>Signup</button>
            </>
          )}
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
          {/* 👉 Saved Posts Button */}
          {user && (
            <motion.li
              className="saved-posts-button"
              onClick={() => setShowSavedPosts(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ❤️ Saved Posts
            </motion.li>
          )}
        </ul>
      </div>


      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginPage onLoginSuccess={(user) => {
            setUser(user);
            setShowLogin(false);
            setToastMessage('Login successful!');
            setToastType('success');
          }} />
        </Modal>
      )}

      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <SignupPage onSignupSuccess={(user) => {
            setUser(user);
            setShowSignup(false);
            setToastMessage('Signup successful!');
            setToastType('success');
          }} />
        </Modal>
      )}

      {showSavedPosts && user && (
        <SavedPostsModal
          savedPosts={user.savedPosts}
          onClose={() => setShowSavedPosts(false)}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

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
              <NewsCard key={index} article={article} user={user} />
            ))
          )}
        </section>
      </InfiniteScroll>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
