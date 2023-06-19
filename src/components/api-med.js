import axios from 'axios';

const medApi = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

medApi.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default medApi;
