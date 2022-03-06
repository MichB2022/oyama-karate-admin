import axios from 'axios';
import { API_URL } from '../configs/api';

export const httpRequest = async (method, url, data) => {
  switch (method) {
    case 'GET':
      return await axios.get(`${API_URL}${url}`);
    case 'PUT':
      return await axios.put(`${API_URL}${url}`, data);
    case 'POST':
      return await axios.post(`${API_URL}${url}`, data);
    case 'DELETE':
      return await axios.delete(`${API_URL}${url}`);
    default:
      return;
  }
};

export const redirect = (url) => {
  window.location.href = url;
};
