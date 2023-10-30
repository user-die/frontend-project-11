import i18next from "i18next";

i18next.init({
  lng: "ru",
  resources: {
    ru: {
      translation: {
        h1: "RSS агрегатор",
        p1: "Начните читать RSS сегодня! Это легко, это красиво.",
        input: "Ссылка RSS",
        button: "Добавить",
        example: "Пример: https://ru.hexlet.io/lessons.rss",
        valid: "Ссылка должна быть валидным URL",
      },
    },
    en: {
      translation: {
        h1: "RSS aggregator",
        p1: "Start reading RSS today! It's easy, it's beautiful.",
        input: "RSS link",
        button: "Add",
        example: "Example: https://ru.hexlet.io/lessons.rss",
        valid: "The link must be a valid URL",
      },
    },
  },
});

export default i18next;
