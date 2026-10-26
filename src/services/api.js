import axios from 'axios';

const api = axios.create({
  // 10.0.2.2 aponta para o localhost do seu computador dentro do emulador Android
  baseURL: 'http://10.0.2.2:8080',
});

export default api;