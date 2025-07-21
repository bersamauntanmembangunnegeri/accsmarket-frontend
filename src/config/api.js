// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-backend-url.onrender.com/api'  // Replace with your Render backend URL
  : 'http://localhost:5000/api'

export { API_BASE_URL }

