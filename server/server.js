// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS for the frontend domain (Adjust the URL based on your frontend domain)
app.use(cors({
    origin: 'http://localhost:3000', // replace with your actual frontend URL or '*' for any
    methods: 'GET',
}));

// NewsAPI endpoint and API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = '6cb288226e744011bc46f142b04a50b1'; // Replace with your actual API key

// Route to fetch news articles based on a search query
app.get('/api/news', async (req, res) => {
    try {
        const { query } = req.query; // Get search query from frontend

        const response = await axios.get(NEWS_API_URL, {
            params: {
                apiKey: API_KEY,
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 10,
            },
        });

        // Send the news data to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from NewsAPI:', error);
        res.status(500).json({ message: 'Error fetching data from NewsAPI' });
    }
});

// Start the server on port 5000 (or any other port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
