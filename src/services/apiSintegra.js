import axios from 'axios';

const apiSintegra = axios.create({
  baseURL: 'https://www.sintegraws.com.br/',
});

export default apiSintegra;
