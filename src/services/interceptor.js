import axios from 'axios';

axios.interceptors.request.use(
  config => {
    // Insert logic to get auth token if needed
    const token = 'your-auth-token';
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // Handle a successful response
    return response;
  },
  error => {
    // Handle errors
    if (error.response.status === 401) {
      // Redirect to login, refresh token, etc.
    }
    return Promise.reject(error);
  }
);
