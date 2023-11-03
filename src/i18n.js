import i18next from "i18next";

i18next.init({
  lng: 'ru',
  fallbackLng: ['en', 'ru'],
  resources: {
    ru: {
      translation: {
        h1: "RSS агрегатор",
        p1: "Начните читать RSS сегодня! Это легко, это красиво.",
        input: "Ссылка RSS",
        button: "Добавить",
        example: "Пример: https://ru.hexlet.io/lessons.rss или https://lorem-rss.herokuapp.com/feed?unit=second",
        valid: "Ссылка должна быть валидным URL",
        posts: "Посты",
        fids: "Фиды",
        load: "RSS успешно загружен",
        already: 'RSS уже загружен'
      },
    },
    en: {
      translation: {
        h1: "RSS aggregator",
        p1: "Start reading RSS today! It's easy, it's beautiful.",
        input: "RSS link",
        button: "Add",
        example: "Example: https://ru.hexlet.io/lessons.rss or https://lorem-rss.herokuapp.com/feed?unit=second",
        valid: "The link must be a valid URL",
        posts: "Posts",
        fids: "Fids",
        load: "RSS uploaded successfully",
        already: 'RSS is already loaded'
      },
    },
  },
});

export default i18next;
