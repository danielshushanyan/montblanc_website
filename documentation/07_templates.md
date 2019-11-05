# Работа с шаблонизатором Pug

В сборке используется шаблонизатор [Pug](https://pugjs.org/) (ранее назывался Jade).

Pug предоставляет множество возможностей, упрощающих работу с шаблонами:

* Переменные.
* Циклы.
* Условия.
* Фильтры.
* Наследование шаблонов.
* Миксины.

Шаблоны страниц размещаются в `src`, а дополнительные файлы и миксины в `src/pug`:

```text
nikoland-template
└── src
    ├── pug
        ├── mixins
        │   │   ├── blocks.pug
        │   │   └── svg.pug
        │   ├── particles
        │   ├── template
        │   │   ├── header.pug
        │   │   └── footer.pug
        │   └── base.pug
    └── index.pug
```

За сборку и преобразование Pug в HTML отвечает задача `pug`:

```bash
gulp pug
```

После выполнения команды в папке `build` появятся HTML-файлы:

```text
nikoland-template
└── build
    └── index.html
```

## Базовый шаблон и создание страниц

В качестве базового шаблона используется `src/pug/base.pug`.

Пример наследования и использования шаблона:

```jade
extends pug/base

block content
    // Содержимое страницы
```

Базовый шаблон определяет блоки (участки кода или место в шаблоне), которые можно изменять и дополнять при наследовании.

### `vars`

Блок `vars` хранит основные настройки шаблона:

* `baseDir` — корневая директория сайта (по умолчанию `/`).

* `title` — заголовок страницы (используется в `<title>` и метатегах).

* `description` — описание страницы (используется в метатегах).

* `image` — изображение страницы (используется в метатегах).

* `html` — настройки тега `<html>`:
  * `html.attrs` — объект для задания дополнительных атрибутов.
  * `html.classList` — массив классов.

* `body` — настройки тега `<body>`:
  * `body.attrs` — объект для задания дополнительных атрибутов.
  * `body.classList` — массив классов.

* `meta` — значения метатегов.

* `link` — значения тегов `<link>`.

Пример использования:

```jade
prepend vars
    - title = 'Заголовок'
    - description = 'Описание'
    - image = 'http://example.com/images/image.png'

append vars
    - link.icon16x16 = '/favicon_16x16.png'
    - link.icon32x32 = '/favicon_32x32.png'
```

### `head-start`

Блок `head-start` является альтернативой `prepend meta`.

### `meta`

В блоке `meta` подключаются метатеги.

Пример использования:

```jade
append meta
    meta(name="referrer" content="none")
```

### `links`

В блоке `links` подключаются внешние ресурсы.

Пример использования:

```jade
append links
    link(rel="prefetch" href="/images/background.jpg")
```

### `styles`

В блоке `styles` подключаются стили.

Пример использования:

```jade
append styles
    link(rel="stylesheet" href="/css/custom.css")
```

### `head-end`

Блок `head-end` является альтернативой `append links`.

### `body-start`

Блок `body-start` является альтернативой `prepend content`.

### `content`

Блок `content` предназначен для хранения содержимого страницы.

Пример использования:

```jade
block content
    .container
        h1
            | Заголовок страницы
```

### `scripts`

В блоке `scripts` подключаются скрипты.

Пример использования:

```jade
append scripts
    script(src="/js/custom.js")
```

### `body-end`

Блок `body-end` является альтернативой `append scripts`.

