import { uniqueId } from 'lodash';
import buttonsLogic from './buttonsLogic';
import { state, renderPost } from './index.js';
import axiosGet from './axiosGet';

const checkUpdate = (url) => {
  axiosGet(url)
    .then((data) => {
      const map = () => state.posts.map((el) => el.item.querySelector('title').textContent);

      Array.from(data.querySelectorAll('item')).forEach((el) => {
        if (!map().includes(el.querySelector('title').textContent)) {
          state.posts.push({ item: el, id: uniqueId() });
        }
      });

      if (
        Array.from(data.querySelectorAll('item')).length !== state.posts.length
      ) {
        renderPost(state);
      }
    })

    .then(() => {
      buttonsLogic(state.modalText, state.posts);
    });
  setTimeout(checkUpdate, 5000, url);
};

export default checkUpdate;
