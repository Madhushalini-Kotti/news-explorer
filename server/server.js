// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
}));

app.use(express.json()); // Enable JSON body parsing

// NewsAPI endpoint and API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = '6cb288226e744011bc46f142b04a50b1'; // Your NewsAPI key

// In-memory users array
let users = [];

// ----------------------
// ROUTES
// ----------------------

// Route to fetch news articles
app.get('/api/news', async (req, res) => {
    try {
        const { query, page } = req.query;

        const response = await axios.get(NEWS_API_URL, {
            params: {
                apiKey: API_KEY,
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 10,
                page: page || 1,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching news data' });
    }
});

// Helper to generate 6-digit unique ID
const generateUniqueId = () => {
    let id;
    do {
        id = Math.floor(100000 + Math.random() * 900000); // always 6 digits
    } while (users.find(user => user.id === id)); // ensure uniqueness
    return id;
};

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = { id: generateUniqueId(), name, email };
    users.push(newUser);

    console.log('Registered users:', users);

    res.json({ success: true, user: newUser });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = users.find(u => u.email === email);
    if (user) {
        res.json({ success: true, user }); // Send back user info
    } else {
        res.status(400).json({ success: false, message: 'Email not found' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
