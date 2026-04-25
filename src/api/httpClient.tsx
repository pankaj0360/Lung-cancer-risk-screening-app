import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const http = axios.create({
  baseURL: 'https://ununiting-everett-tailless.ngrok-free.dev', // ngrok/AWS
  headers: {
    'Content-Type': 'application/json',
  },
});
http.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
