import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

userApi.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default userApi;
