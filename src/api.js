import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use((config) => {
    const password = localStorage.getItem('dashboard_password');
    if (password) {
        config.headers['x-dashboard-password'] = password;
    }
    return config;
});

export default api;
