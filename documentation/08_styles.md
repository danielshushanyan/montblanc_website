# Работа со стилями

В сборке используется препроцессор [SASS](http://sass-lang.com/) и PostCSS-плагин [Autoprefixer](https://autoprefixer.github.io/ru/).

Стили размещаются в папке `src/sass`:

```text
nikoland-template
└── src
    └── sass
        ├── ui
        │   ├── _buttons.sass
        │   ├── _form-elements.sass
        │   └── _links.sass  
        │   ├── _buttons.sass
        │   ├── _typography.sass
        │   └── _ui-elements.sass
        ├── functions
        │   └── _sprites.sass
        ├── mixins
        │   ├── _media.sass
        │   ├── _sprites.sass
        │   └── _transition.sass
        ├── pages
        │   ├── _main.sass
        │   ├── _pages.sass
        ├── particles
        │   ├── _popups.sass
        │   └── _particles.sass
        ├── template
        │   ├── _header.sass
        │   ├── _footer.sass
        │   └── _template.sass
        ├── vendor
        │   └── .keep
        ├── _base.sass
        ├── _fonts.sass
        ├── _functions.sass
        ├── _mixins.sass
        ├── _sprites.hbs
        ├── _sprites.sass
        ├── _variables.sass
        ├── _vendor.sass
        └── main.sass
```

За сборку и преобразование SASS в CSS отвечает задача `sass`:

```bash
gulp sass
```

После выполнения команды в папке `build/css` появятся файлы `main.css` и `main.css.map`:

```text
nikoland-template
└── build
    └── css
        ├── main.css
        └── main.css.map
```

## Правила написания кода

### БЭМ

Для именования классов рекомендуется использовать [БЭМ-нотацию](https://ru.bem.info/methodology/naming-convention/).

```sass
.block
    &__element
        &--modificator
            // ...
```

### Классы состояний

Классы состояний рекомендуется записывать кратко:

```sass
.is-active
    // ...

.is-current
    // ...

.is-open
    // ...

.is-hidden
    // ...
```


### Переменные

В файл `src/scss/_variables.sass` следует выносить лишь основные переменные:

* `font-family` для шрифтов. Пример:

  ```sass
  $roboto: Roboto, sans-serif
  $ptSerif: PT Serif, serif
  ```

* Цвета. Пример:

  ```sass
  $aqua-deep: #005741
  $black: #000
  $white: #fff
  ```

  Для именования цветов можно пользоваться [данным сервисом](http://chir.ag/projects/name-that-color/).

Переменные, используемые лишь в одном блоке или компоненте следует записывать в том же файле, где они используются.

### `@mixin` и `@extend`

Повторяющиеся участки кода (20-30 строк и более), отличающиеся лишь значениями, следует выносить в отдельные миксины.

Не рекомендуется использовать директиву `@extend`. Вместо неё следует воспользоваться `@mixin`.

### Вендорные префиксы

В SASS-коде не должно присутствовать вендорных префиксов. Они автоматически расставляются в процессе сборки.

**Неправильно:**

```sass
input {
    -webkit-transition: border-color 0.3s;
    transition: border-color 0.3s;
    &::-webkit-input-placeholder
        color: #000

    &:-moz-placeholder
        color: #000

    &::-moz-placeholder
        color: #000

    &:-ms-input-placeholder
        color: #000

    &::placeholder 
        color: #000
    
```

**Правильно:**

```sass
input
    transition: border-color 0.3s

    &::placeholder 
        color: #000
    
```