// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'http://127.0.0.1:8000'
  },
  production: {
    baseURL: 'https://bookstoredb.onrender.com/'
  }
};

// Determine environment
const environment = process.env.NODE_ENV || 'development';

// Export the current config
export const API_BASE_URL = API_CONFIG[environment].baseURL;

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};