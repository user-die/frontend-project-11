import "./styles.scss";
import "bootstrap";
import * as yup from "yup";
import i18next from "./i18n.js";
import axios from "axios";

const state = {
  isValid: true,
};

const schema = yup.object().shape({
  website: yup.string().url("Ссылка должна быть валидным URL").required(),
});

const form = document.querySelector("form");
const p = document.querySelector(".feedback");

document.querySelector("button").textContent = i18next.t("button");
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
const h2 = document.createElement("h2");
document.querySelector(".card").append(ul);

let parser = new DOMParser();

const promise = (url) => {
  axios
    .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
    .then((response) =>
      parser.parseFromString(response.data.contents, "application/xml")
    )

    .then(function (data) {
      document.querySelectorAll(
        "ul"
      )[1].innerHTML = `<li class='list-group-item border-0 border-end-0'><h3 class='h6 m-0'>${
        data.querySelector("title").textContent
      }</h3><p class='m-0 small text-black-50'>${
        data.querySelector("description").textContent
      }</p></li>`;

      p.classList = "text-success";
      p.textContent = "RSS успешно загружен";
      document.querySelectorAll(".card-body")[0].append(posts);
      document.querySelectorAll(".card-body")[1].append(fids);

      return Array.from(data.querySelectorAll("item"));
    })

    .then(
      (data) =>
        (ul.innerHTML = data.map(
          (el) =>
            `<li class='list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'><a class="fw-bold" href= ${
              el.querySelector("link").textContent
            }>${
              el.querySelector("title").textContent
            }</a><button class="btn btn-outline-primary btn-sm">Просмотр</button></li>`
        ))
    );
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
});
