// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './AuthPage.css'; // We'll use one file for Login and Signup styles

function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email });
            if (response.data.success) {
                const username = email.split('@')[0]; // Create a name from email
                onLoginSuccess({ name: username });
            } else {
                setError(response.data.message || 'Login failed. Try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Server error during login.');
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
