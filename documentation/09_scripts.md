# Работа со скриптами

Скрипты размещаются в папке `src/js`:

```text
nikoland-template
└── src
    └── js
        ├── vendor
        │   └── .keep
        ├── main.js
        └── vendor.js
```

За сборку и преобразование JS отвечает задача `js`:

```bash
gulp js
```

После выполнения команды в папке `build/js` появятся файлы `main.js` и `vendor.js`:

```text
nikoland-template
└── build
    └── js
        ├── main.js
        └── vendor.js
```

Также дополнительно подключены библиотеки:

* [jQuery](https://jquery.com/)
* [ninelines-ua-parser](https://github.com/ninelines-team/ninelines-ua-parser)

[ninelines-ua-parser](https://github.com/ninelines-team/ninelines-ua-parser) основана на
[ua-parser-js](https://github.com/faisalman/ua-parser-js) и отвечает за определение устройства, браузера и операционной
системы пользователя, а также автоматически проставляет классы `<html>` элементу:

* `.is-os-mac-os`
* `.is-os-windows`
* `.is-os-linux`
* `.is-os-android`
* `.is-os-ios`
* `.is-device-mobile`
* `.is-device-tablet`
* `.is-device-desktop`
* `.is-engine-webkit`
* `.is-engine-gecko`
* `.is-browser-chrome`
* `.is-browser-firefox`
* `.is-browser-ie`
* `.is-browser-safari`

Данные классы можно использовать для стилизации элементов:

```sass
.for-desktop
    .is-device-mobile
        display: none
    
```

## Правила написания кода

### Короткие именна переменных

Не следует сокращать имена переменных.

**Неправильно:**

```js
$('.elements').each((i, e) => {
    // ...
});
```

**Правильно:**

```js
$('.elements').each((index, element) => {
    // ...
});
```

Исключение могут составить имена счетчиков в цикле (`i`, `j`, `k`):

```js
for (let i = 0; i < 10; i++) {
    // ...
}
```

### Именование jQuery-переменных

Название переменных, являющихся jQuery-объектами, следует начинать с `$`.

**Неправильно:**

```js
let element = $('.element');
```

**Правильно:**

```js
let $element = $('.element');
```
### Глобальные переменные
Следует избегать дублирования $(window), $(document), $('html'), $('body').
Для этого они вынесены в глобальные переменные $W, $D, $H, $B


### jQuery-селекторы

Следует избегать дублирования jQuery-селекторов.
Если обращение к элементу происходит многократно, то jQuery-объект можно сохранить в отдельную переменную, либо переписать код так, чтобы избежать дублирования.

**Неправильно:**

```js
$('.element').on('click', () => {
    // ...
});

$('.element').on('mouseenter', () => {
    // ...
});
```

**Правильно:**

```js
let $element = $('.element');

$element.on('click', () => {
    // ...
});

$element.on('mouseenter', () => {
    // ...
});
```

Или так:

```js
$('.element')
    .on('click', () => {
        // ...
    })
    .on('mouseenter', () => {
        // ...
    });
```

### Обработка событий с помощью jQuery

Для создания обработчика событий следует использовать функцию [`.on()`](http://api.jquery.com/on/).

**Неправильно:**

```js
$('button').click(() => {
    // ...
});

$('form').submit(() => {
    // ...
});
```

**Правильно:**

```js
$('button').on('click', () => {
    // ...
});

$('form').on('submit', () => {
    // ...
});
```