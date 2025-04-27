// src/pages/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './AuthPage.css'; // Reuse same CSS as login

function SignupPage({ onSignupSuccess }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { email, name });
            if (response.data.success) {
                onSignupSuccess({ name });
            } else {
                setError(response.data.message || 'Signup failed. Try again.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Server error during signup.');
        }
    };

    return (
        <motion.div
            className="auth-page"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {error && <p className="error-text">{error}</p>}
                <button type="submit">Signup</button>
            </form>
        </motion.div>
    );
}

export default SignupPage;
