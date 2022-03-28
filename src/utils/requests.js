import axios from 'axios';
import { API_URL } from '../configs/api';

export const httpRequest = async (method, url, data) => {
  axios.defaults.withCredentials = true;
  switch (method) {
    case 'GET':
      return await axios.get(`${API_URL}${url}`);
    case 'PUT':
      return await axios.put(`${API_URL}${url}`, data);
    case 'POST':
      return await axios(`${API_URL}${url}`, {
        method: 'post',
        data: someJsonData,
        withCredentials: true
      });
    // return await axios.post(`${API_URL}${url}`, data, withCredentials: true);
    case 'DELETE':
      return await axios.delete(`${API_URL}${url}`);
    default:
      return;
  }
};

export const redirect = (url) => {
  window.location.href = url;
};
