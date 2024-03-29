import { uniqueId } from 'lodash';
import buttonsLogic from './buttonsLogic';
import {renderPost} from './index.js';
import axiosGet from './axiosGet';

const getRss = (url, state) => {
  axiosGet(url)
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
    });
};

export default getRss;
