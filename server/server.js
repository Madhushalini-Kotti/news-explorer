const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] }));
app.use(express.json());

// News API setup
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = '70e28aab2c6a44d490e457f66bb02d7e';

// In-memory storage
let users = [
    {
        id: 234567,
        name: 'Madhushalini',
        email: 'madhushalinikotti@gmail.com',
        likedPosts: [],
        dislikedPosts: [],
        savedPosts: []
    }
];

let posts = [];

// Helper to create 6-digit unique ID
const generateUniqueId = () => {
    let id;
    do {
        id = Math.floor(100000 + Math.random() * 900000);
    } while (users.find(user => user.id === id));
    return id;
};

// Fetch News
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

        const articlesWithMetrics = response.data.articles.map(article => {
            const id = Buffer.from(article.url).toString('base64');
            const existingPost = posts.find(p => p.id === id);

            return {
                ...article,
                id,
                likes: existingPost?.likes || 0,
                dislikes: existingPost?.dislikes || 0,
                saves: existingPost?.saves || 0 // ✅ Save count
            };
        });

        res.json(articlesWithMetrics);
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching news data' });
    }
});

// Like post
app.post('/api/like', (req, res) => {
    const { userId, postId } = req.body;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    let post = posts.find(p => p.id === postId);
    if (!post) {
        post = { id: postId, likes: 0, dislikes: 0, saves: 0 };
        posts.push(post);
    }

    if (user.likedPosts.includes(postId)) {
        user.likedPosts = user.likedPosts.filter(id => id !== postId);
        post.likes -= 1;
    } else {
        user.likedPosts.push(postId);
        post.likes += 1;

        if (user.dislikedPosts.includes(postId)) {
            user.dislikedPosts = user.dislikedPosts.filter(id => id !== postId);
            post.dislikes -= 1;
        }
    } 

    res.json({ success: true, post });
});

// Dislike post
app.post('/api/dislike', (req, res) => {
    const { userId, postId } = req.body;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    let post = posts.find(p => p.id === postId);
    if (!post) {
        post = { id: postId, likes: 0, dislikes: 0, saves: 0 };
        posts.push(post);
    }

    if (user.dislikedPosts.includes(postId)) {
        user.dislikedPosts = user.dislikedPosts.filter(id => id !== postId);
        post.dislikes -= 1;
    } else {
        user.dislikedPosts.push(postId);
        post.dislikes += 1;

        if (user.likedPosts.includes(postId)) {
            user.likedPosts = user.likedPosts.filter(id => id !== postId);
            post.likes -= 1;
        }
    }

    res.json({ success: true, post });
});

// Save or Unsave post
app.post('/api/save', (req, res) => {
    const { userId, postId, articleData } = req.body;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    let post = posts.find(p => p.id === postId);
    if (!post) {
        // First time saving this post in backend "posts" array
        post = { id: postId, likes: 0, dislikes: 0, saves: 0 };
        posts.push(post);
    }

    const alreadySaved = user.savedPosts.find(p => p.id === postId);

    if (alreadySaved) {
        // Unsave it
        user.savedPosts = user.savedPosts.filter(p => p.id !== postId);
        post.saves -= 1;
        res.json({ success: true, saved: false, saves: post.saves });
    } else {
        // Save the full article data
        const postToSave = {
            id: postId,
            title: articleData.title,
            description: articleData.description,
            url: articleData.url,
            urlToImage: articleData.urlToImage,
            likes: post.likes,
            dislikes: post.dislikes,
            saves: post.saves 
        };
        user.savedPosts.push(postToSave);
        post.saves += 1;
        res.json({ success: true, saved: true, saves: post.saves });
        console.log(user);
    }
});


// Get full saved posts
app.get('/api/getsavedposts', (req, res) => {
    const { userId } = req.query;

    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, savedPosts: user.savedPosts });
});

// Signup
app.post('/api/signup', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = {
        id: generateUniqueId(),
        name,
        email,
        likedPosts: [],
        dislikedPosts: [],
        savedPosts: []
    };
    users.push(newUser);

    console.log('Registered users:', users);

    res.json({ success: true, user: newUser });
});

// Login
app.post('/api/login', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            likedPosts: user.likedPosts,
            dislikedPosts: user.dislikedPosts,
            savedPosts: user.savedPosts
        };
        res.json({ success: true, user: safeUser });
    } else {
        res.status(400).json({ success: false, message: 'Email not found, Please Sign up' });
    }
});

// Get user data
app.get('/api/userdata', (req, res) => {
    const { userId } = req.query;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
        likedPosts: user.likedPosts,
        dislikedPosts: user.dislikedPosts,
        savedPosts: user.savedPosts
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
