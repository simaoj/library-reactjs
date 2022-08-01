import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    window.location = '/logout';
  }
});

export default instance;
