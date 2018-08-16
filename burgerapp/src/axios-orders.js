import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-eaf11.firebaseio.com/'
});

export default instance;
