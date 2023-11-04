import axios from 'axios';

const parser = new DOMParser();

const axiosGet = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((response) => parser.parseFromString(response.data.contents, 'application/xml'));

export default axiosGet;
