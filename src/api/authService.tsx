import axios from 'axios';
import http from './httpClient';

export const registerUser = async (data: any) => {
  const res = await http.post('/auth/signup', data);
  return res.data;
};
export const loginUser = async (data: any) => {
  const res = await http.post('/auth/login', data);
  return res.data;
};
