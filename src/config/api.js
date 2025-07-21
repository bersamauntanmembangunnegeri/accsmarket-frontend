// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://accsmarket-backend.onrender.com/api'  // Updated Render backend URL
  : 'http://localhost:5000/api'

export { API_BASE_URL }

