import axios from 'axios';
const api = axios.create({
    baseURL: `https://go-staging-v21-dot-health-hero-bot.oa.r.appspot.com`,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;