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
        'Content-Type': 'application/json; charset=utf-8',
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
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // always fetch address to be able to fetch tokens
    const address = localStorage.getItem('address')
    const tokens = await getRefreshToken(address)

    if (tokens) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokens?.access?.token;
    }
    
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;