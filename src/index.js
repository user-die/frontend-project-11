import "./styles.scss";
import "bootstrap";
import * as yup from "yup";
import i18next from "./i18n.js";
import axios from "axios";
import { uniqueId } from "lodash";

const state = {
  isValid: true,
  posts: [],
  feeds: {
    title: "",
    description: "",
  },
  modalTitle: "",
  modalText: "",
};

const schema = yup.object().shape({
  website: yup
    .string()
    .required("notEmpty")
    .url("Ссылка должна быть валидным URL"),
});

const form = document.querySelector("form");
const p = document.querySelector(".feedback");

document.querySelector(".h-100").textContent = i18next.t("button");
document.querySelector("h1").textContent = i18next.t("h1");
document.querySelector(".lead").textContent = i18next.t("p1");
document.querySelector("label").textContent = i18next.t("input");
document.querySelector(".text-muted").textContent = i18next.t("example");

const posts = document.createElement("h2");
posts.textContent = i18next.t("posts");
posts.classList = "card-title h4";
const fids = document.createElement("h2");
fids.textContent = i18next.t("fids");
fids.classList = "card-title h4";

const ul = document.createElement("ul");
document.querySelector(".card").append(ul);

let parser = new DOMParser();

const promise = (url) => {
  axios
    .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
    .then((response) =>
      parser.parseFromString(response.data.contents, "application/xml")
    )
    .then((data) => {
      Array.from(data.querySelectorAll("item")).map((el) =>
        state.posts.push({ item: el, id: uniqueId() })
      );

      state.feeds.title = data.querySelector("title");
      state.feeds.description = data.querySelector("description");
    })

    .then(function () {
      document.querySelectorAll(
        "ul"
      )[1].innerHTML = `<li class='list-group-item border-0 border-end-0'><h3 class='h6 m-0'>${state.feeds.title.textContent}</h3><p class='m-0 small text-black-50'>${state.feeds.description.textContent}</p></li>`;

      p.classList = "text-success";
      p.textContent = "RSS успешно загружен";
      document.querySelectorAll(".card-body")[0].append(posts);
      document.querySelectorAll(".card-body")[1].append(fids);
    })

    .then(() => {
      ul.innerHTML = state.posts.map(
        (el) =>
          `<li class='list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'><a id="${
            el.id
          }"
              
             class="fw-bold" href= ${
               el.item.querySelector("link").textContent
             }>${el.item.querySelector("title").textContent}</a><button id="${
               el.id
             }" class="btn btn-outline-primary btn-sm">Просмотр</button></li>`
      );
    })

    .then(function () {
      const postButtons = document.querySelectorAll(".btn-outline-primary");

      postButtons.forEach((i) =>
        i.addEventListener("click", () => {
          document.querySelector(".modal").style = "display: block";
          document.querySelector(".modal").classList = "modal fade show";
          state.modalText = document.getElementById(`${i.id}`).textContent;
          document.querySelector("h5").textContent = state.modalText;
          document.querySelector(".full-article").href =
            document.getElementById(`${i.id}`).href;
          document.getElementById(`${i.id}`).classList =
            "fw-normal link-secondary";
          document.querySelector(".text-break").textContent =
            state.posts[i.id - 1].item.querySelector("description").textContent;
        })
      );

      document.querySelectorAll(".fw-bold").forEach((i) =>
        i.addEventListener("click", () => {
          document.getElementById(`${i.id}`).classList =
            "fw-normal link-secondary";
        })
      );

      document.querySelector(".btn-secondary").addEventListener("click", () => {
        document.querySelector(".modal").style = "display: none";
        document.querySelector(".modal").classList = "modal fade";
      });

      document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".modal").style = "display: none";
        document.querySelector(".modal").classList = "modal fade";
      });
    });
};

form.addEventListener("submit", (e) => {
  form.focus();
  e.preventDefault();
  const formData = new FormData(e.target);
  p.textContent = "";
  let data = formData.get("website");
  schema.validate({ website: data }).catch((errors) => {
    p.textContent = i18next.t("valid");
    state.isValid = false;
  });

  if (state.isValid === true) {
    promise(data);
  }
  console.log(state.posts);
});