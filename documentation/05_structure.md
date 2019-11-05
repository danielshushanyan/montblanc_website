# Структура папок и файлов

```text
nikoland-template
├── src
│   ├── images
│   ├── js
│   │   ├── vendor
│   │   │   └── .keep
│   │   ├── main.js
│   │   └── vendor.js
│   ├── pug
│   │   ├── mixins
│   │   │   ├── blocks.pug
│   │   │   └── svg.pug
│   │   ├── particles
│   │   ├── template
│   │   │   ├── header.pug
│   │   │   └── footer.pug
│   │   └── base.pug
│   ├── resources
│   │   └── fonts
│   └── sass
│       ├── ui
│       │   ├── _buttons.sass
│       │   ├── _form-elements.sass
│       │   └── _links.sass  
│       │   ├── _buttons.sass
│       │   ├── _typography.sass
│       │   └── _ui-elements.sass
│       ├── functions
│       │   └── _sprites.sass
│       ├── mixins
│       │   ├── _media.sass
│       │   ├── _sprites.sass
│       │   └── _transition.sass
│       ├── pages
│       │   ├── _main.sass
│       │   ├── _pages.sass
│       ├── particles
│       │   ├── _popups.sass
│       │   └── _particles.sass
│       ├── template
│       │   ├── _header.sass
│       │   ├── _footer.sass
│       │   └── _template.sass
│       ├── vendor
│       │   └── .keep
│       ├── _base.sass
│       ├── _fonts.sass
│       ├── _functions.sass
│       ├── _mixins.sass
│       ├── _sprites.hbs
│       ├── _sprites.sass
│       ├── _variables.sass
│       ├── _vendor.sass
│       └── main.sass
│   └── index.pug
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .npmrc
├── bitbucket-pipelines.yml
├── gulpfile.js
├── package.json
└── README.md
```

## `src`

В папке `src` хранятся исходные файлы проекта.

## `src/images`

Папка `images` предназначена для хранения изображений.
При сборке файлы из данной папки попадают в `build/images`.

## `src/js`

Папка `src/js` предназначена для хранения скриптов.

## `src/js/vendor`

Папка `src/js/vendor` предназначена для хранения скриптов сторонних библиотек, которых нет в репозитории npm.

## `src/js/main.js`

Файл `src/js/main.js` предназначен для хранения основной логики сайта.
При сборке данный файл попадает в `build/js`.


## `src/js/vendor.js`

Файл `src/js/vendor.js` предназначен для подключения скриптов сторонних библиотек. Библиотеки допустимо подключать и в
`main.js` и в `vendor.js`. В `main.js` подключается в том случае, если из библиотеки необходимо что-то импортировать,
и сама библиотека при этом не замедляет сборку. В иных случаях (ничего не нужно импортировать или значительно
замедляется сборка) следует подключать в `vendor.js`.

При сборке данный файл попадет в `build/js`.

## `src/pug`

Папка `src/pug` предназначена для хранения шаблонов.

## `src/pug/mixins`

Папка `src/pug/mixins` предназначена для хранения Pug-миксинов.

## `src/pug/mixins/blocks.pug`

В файле `src/pug/mixins/blocks.pug` хранится Pug-миксины для подключения идентичных блоков(например, карточка товара).

## `src/pug/mixins/svg.pug`

В файле `src/pug/mixins/svg.pug` хранится Pug-миксин для подключения SVG-иконок.

## `src/pug/base.pug`

В файле `src/pug/base.pug` хранится базовый шаблон страниц сайта.

## `src/sass`

Папка `src/sass` предназначена для хранения стилей.

## `src/sass/mixins`

Папка `src/sass/mixins` предназначена для хранения SASS-миксинов.

## `src/sass/_base.sass`

Файл `src/sass/_base.sass` предназначен для хранения базовых стилей.

## `src/sass/_mixins.sass`

Файл `src/sass/_mixins.sass` предназначен для подключения миксинов из папки `src/sass/mixins`.

## `src/sass/_variables.sass`

Файл `src/sass/_variables.sass` предназначен для хранения SASS-переменных.

## `src/sass/main.sass`

Файл `src/sass/main.sass` предназначен для хранения основных стилей сайта.
При сборке данный файл преобразуется в CSS и сохраняется в `build/css` вместе с файлом `main.css.map`.

## `src/index.pug`

`src/index.pug` — шаблон главной страницы.
При сборке все Pug-файлы из папки `src` преобразуются в HTML и сохраняются в `build`.

## `.babelrc`

`.babelrc` — файл настроек JavaScript-транспайлера Babel.

## `.editorconfig`

`.editorconfig` — файл настроек редактора.

## `.eslintignore`

`.eslintignore` — файл настроек ESLint для игнорирования файлов.

## `.eslintrc`

`.eslintrc` — файл настроек ESLint.

## `.gitignore`

`.gitignore` — файл настроек Git для игнорирования файлов.

## `.npmrc`

`.npmrc` — файл настроек npm.

## `.pug-lintrc.json`

`bitbucket-pipelines.yml` — файл настроек Bitbucket Pipelines.

## `gulpfile.js`

`gulpfile.js` — основной файл сборки, содержащий Gulp-задачи.

## `package.json`

`package.json` — файл, содержащий базовую информацию о проекте и список требуемых библиотек.

## `README.md`

`README.md` — описание проекта.
