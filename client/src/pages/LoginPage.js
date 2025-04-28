// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './AuthPage.css'; // Shared CSS

function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // ✅ New

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email });
            if (response.data.success) {
                const user = response.data.user;
                localStorage.setItem('news-explorer-user', JSON.stringify(user));
                onLoginSuccess(user);
                setSuccessMessage('Login successful! 🎉');
            } else {
                setError(response.data.message || 'Login failed. Try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                const backendMessage = err.response.data?.message || 'Login failed.';
                setError(backendMessage);
            } else {
                setError('Server error. Please try again later.');
            }
        }
    };

    return (
        <motion.div
            className="auth-page"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Login</h2>

            {successMessage && <p className="success-text">{successMessage}</p>} {/* ✅ Success message */}

            <form onSubmit={handleLogin} className="auth-form">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {error && <p className="error-text">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </motion.div>
    );
}

export default LoginPage;
