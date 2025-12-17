import axios from 'axios';

// Create an Axios instance with the Base URL
const api = axios.create({
    baseURL: 'https://event-platform-yzx5.onrender.com/api' // <--- Your Render URL here
});

export default api;