// Environment configuration
const env = {
  // API URL based on environment - explicitly using port 5002
  API_URL: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL || 'https://fenilpatel-1.onrender.com/api'
    : process.env.REACT_APP_API_URL || 'http://localhost:5002/api',
};

export default env; 