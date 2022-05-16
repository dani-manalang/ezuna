import axios from 'axios';
import getRefreshToken from './getRefreshToken';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const tokens = localStorage.getItem('tokens')

    if (tokens) {
      const { access } = JSON.parse(tokens)

      config.headers = {
        'Authorization': `Bearer ${access.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    return config;
  },
  error => {
    Promise.reject(error)
  });

// // Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const tokens = getRefreshToken()

    if (tokens) {
      const { access } = tokens
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access.token;
    }
    
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;