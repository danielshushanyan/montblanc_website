# Подключение сторонних библиотек

Библиотеки подключаются с помощью npm.
При установке следует указывать ключ `--save` или `--save-dev`.

Пример:

```bash
npm install --save jquery
npm install --save-dev gulp
```

`--save` указывается для библиотек, код которых попадает в итоговую сборку (папку `build`) и будет использоваться на сайте.

`--save-dev` указывается для библиотек, которые используются только для сборки.

После установки необходимо подключить нужные файлы библиотеки:

* скрипты — в `src/js/vendor.js` или `src/js/main.js`.
* стили — в `src/sass/_vendor.scss`.
* изображения — в `src/images`.
* любые другие файлы — в `src/resources`.

Полный пример, описывающий установку библиотеки fancybox:

1. Установка:

   ```bash
   npm install --save fancybox
   ```

2. Подключение скриптов в файл `src/js/vendor.js`:

   ```js
   import 'fancybox';
   ```

3. Подключение стилей в файл `src/sass/_vendor.sass`:

   ```sass
   $fancybox-image-url: "../images"

   @import "../../node_modules/fancybox/dist/scss/jquery.fancybox"
   ```


Если библиотека отсутствует в npm, либо её нужно модифицировать, то файлы следует скачать и закинуть в папки `src/js/vendor` и `src/sass/vendor`.
