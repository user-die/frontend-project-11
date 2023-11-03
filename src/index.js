import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import i18next from './i18n.js';
import promise from './getRss.js';
import checkUpdate from './checkUpdates.js';

const state = {
  lng: 'ru',
  url: '',
  isValid: false,
  isLoaded: false,
  isCheck: false,
  posts: [],
  feeds: [],
  modalTitle: '',
  modalText: '',
};

const schema = yup.object().shape({
  website: yup.string().url('Ссылка должна быть валидным URL'),
});

const form = document.querySelector('form');
const p = document.querySelector('.feedback');

document.querySelector('.h-100').textContent = i18next.t('button');
document.querySelector('h1').textContent     = i18next.t('h1');
document.querySelector('.lead').textContent  = i18next.t('p1');
document.querySelector('label').textContent  = i18next.t('input');
document.querySelector('.text-muted').textContent = i18next.t('example');

const posts       = document.createElement('h2');
posts.textContent = i18next.t('posts');
posts.classList   = 'card-title h4';
const fids        = document.createElement('h2');
fids.textContent  = i18next.t('fids');
fids.classList    = 'card-title h4';
const ul          = document.createElement('ul');
ul.classList      = 'list-group border-0 rounded-0';
document.querySelector('.card').append(ul);

const render = () => {
  p.classList = 'feedback m-0 position-absolute small text-success';
  p.textContent = i18next.t('load');;

  document.querySelectorAll('.card-body')[0].append(posts);
  document.querySelectorAll('.card-body')[1].append(fids);
}

const renderPost = (state) => {
  document.querySelectorAll('ul')[1].innerHTML = state.feeds
    .map(
            (el) => `<li class='list-group-item border-0 border-end-0'><h3 class='h6 m-0'>${el.title}</h3><p class='m-0 small text-black-50'>${el.description}</p></li>`,
          ).join('');
  
  document.querySelectorAll('ul')[0].innerHTML = state.posts
    .map(
            (el) => `<li class='list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'><a id="${
              el.id
            }" class="fw-bold" href= ${
              el.item.querySelector('link').textContent
            }>${el.item.querySelector('title').textContent}</a><button id="${
              el.id
            }" aria-expanded="true" data-bs-toggle="collapse" data-bs-target="#modal" class="btn btn-outline-primary btn-sm">Просмотр</button></li>`,
          ).join('');
}

form.addEventListener('submit', (e) => {
  form.focus();
  e.preventDefault();
  const formData = new FormData(e.target);
  p.textContent = '';
  const data = formData.get('website');

  if (state.isLoaded && state.isCheck) {
    p.textContent = i18next.t('already');
    p.classList = 'feedback m-0 position-absolute small text-success text-danger';
  }

  if (data !== state.url) {
    schema
      .validate({ website: data })
      .catch((errors) => {
        p.textContent = i18next.t('valid');
        state.isValid = false;
        return errors;
      })
      .then((data) => {
        if (data.website !== undefined) {
          state.isValid = true;
        }
      })
      .then(() => {
        if (state.isValid === true) {
          state.url = data;
        }
      })
      .then(() => {
        if (state.isValid === true) {
          promise(state.url, state);
          render(); 
          state.isLoaded = true;
        }
      })
      .then(() => {
        if (state.isLoaded === true) {
          checkUpdate(state.url, state);
          state.isCheck = true;
        }
      });
  }
});

export {state, renderPost};