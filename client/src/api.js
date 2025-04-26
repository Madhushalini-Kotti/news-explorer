import axios from 'axios';

const API_KEY = '3e087ff14e59468e9c2107d612df4c1f';
const BASE_URL = 'https://newsapi.org/v2/';

const fetchNews = async (query = '', page = 1) => {
    try {
        let endpoint = 'everything';
        let params = {
            apiKey: API_KEY,
            pageSize: 10,
            page: page,
            language: 'en',
            sortBy: 'publishedAt',
        };

        if (query && query !== '') {
            params.q = query; // Search for query if it is provided
        }

        const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
        return response.data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        return [];
    }
};

export default fetchNews;
