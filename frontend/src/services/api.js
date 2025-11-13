import axios from 'axios';

// 1. Buat instance Axios dengan baseURL
const api = axios.create({
  // baseURL diambil dari endpoint kamu: http://127.0.0.1:8080/api
  baseURL: 'http://127.0.0.1:8080/api',
});

// 2. Membuat "Interceptor" (Pencegat)
// Ini adalah kode yang akan berjalan SETIAP KALI kita membuat request.
// Tujuannya adalah untuk mengecek apakah kita punya 'token' di localStorage
// dan otomatis menambahkannya ke header.

api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    
    // Jika token-nya ada, tambahkan ke header 'Authorization'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config; // Lanjutkan request
  },
  (error) => {
    // Lakukan sesuatu jika ada error
    return Promise.reject(error);
  }
);

export default api;