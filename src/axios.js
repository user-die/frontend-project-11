import axios from 'axios';
import { uniqueId } from 'lodash';
import buttonsLogic from './buttonsLogic';
import {renderPost} from '.';

const parser = new DOMParser();

const promise = (url, state) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
      .then((response) => parser.parseFromString(response.data.contents, 'application/xml'))
      .then((data) => {
        Array.from(data.querySelectorAll('item')).map((el) => state.posts.push({ item: el, id: uniqueId() }));
  
        state.feeds.push({
          title: data.querySelector('title').textContent,
          description: data.querySelector('description').textContent,
        });
      })
  
      .then(() => {
        renderPost(state);
      })
      .then(() => {
        buttonsLogic(state.modalText, state.posts);
      })
  };

export default promise;