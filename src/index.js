import "./styles.scss";
import "bootstrap";
import * as yup from "yup";
import i18next from "./i18n.js";

const schema = yup.object().shape({
  website: yup.string().url("Ссылка должна быть валидным URL"),
});

const form = document.querySelector("form");
const input = document.querySelector("input");
const p = document.querySelector(".feedback");

document.querySelector("button").textContent = i18next.t("button");
document.querySelector("h1").textContent = i18next.t("h1");
document.querySelector(".lead").textContent = i18next.t("p1");
document.querySelector("label").textContent = i18next.t("input");
document.querySelector(".text-muted").textContent = i18next.t("example");

form.addEventListener("submit", (e) => {
  form.focus();
  e.preventDefault();

  const formData = new FormData(e.target);
  p.textContent = "";
  let data = formData.get("website");
  console.log(data);
  schema.validate({ website: data }).catch((errors) => {
    p.textContent = i18next.t("valid");
  });
});
