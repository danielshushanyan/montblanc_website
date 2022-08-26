### Подключение шрифта с помощью `@font-face`

Требуемые форматы — `.woff` (обязательно) и `.woff2` (опционально).

Файлы `.ttf`, `.otf` или `.eot` можно сконвертировать в `.woff` и `.woff2` с помощью онлайн сервиса:

* [transfonter.org/](https://transfonter.org/)

Полученные файлы следует хранить в папке `src/resources/fonts`:

```text
nikoland-template
└── src
    └── resources
        └── fonts
            └── ...
```

Подключение шрифтов происходит в файле `src/sass/_fonts.sass`:



