import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://note-app-csuf.onrender.com/api',
  withCredentials: true,
});

export default axiosInstance;
