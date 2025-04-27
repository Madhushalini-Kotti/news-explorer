import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/news'; 

const fetchNews = async (query = '', page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}?query=${query}&page=${page}`);
        return response.data.articles || []; // Assuming response has 'articles' data
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        return [];
    }
};

export default fetchNews;