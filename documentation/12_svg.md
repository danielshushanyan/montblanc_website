Принцип работы с SVG-спрайтами:

1. Получаем векторные иконки в формате `.svg` (либо заранее подготовленные, либо экспортируем с помощью редактора).
   Сохраняем в папку `src/images/sprites/svg`:

   ```text
   nikoland-template
   └── src
       └── images
           └── sprites
               └── svg
                   └── phone.svg
   ```

2. Запускаем задачу `sprites:svg` (если уже запущен `gulp watch` или `gulp`, то данный шаг можно пропустить):

   ```bash
   gulp sprites:svg
   ```

3. Генератор оптимизирует и объединяет иконки в один спрайт:

   ```text
   nikoland-template
   └── build
       └── images
           └── sprites.svg
   ```

   В сборке содержится Pug-миксин для подключения SVG-спрайтов.<br>
   `src/pug/mixins/svg.pug`:

   ```pug
    mixin svg(name)
       svg&attributes(attributes)
           use(xlink:href=`${baseDir}images/sprites.svg#${name}`)
   ```

4. Подключаем иконку в Pug:

   ```pug
   footer
       a(href="tel:+71234567890")
           +svg("phone")
           | +7 (123) 456-78-90
   ```

   При необходимости иконку можно стилизовать:

   ```sass
   .footer
       a.link(href="#")
           svg
               display: inline-block
               vertical-align: middle
               width: 30px
               height: 30px
               fill: $color-black
           
   ```

   Если цвет заливки или обводки не удается изменить с помощью CSS, то необходимо открыть SVG-файл иконки в редакторе и удалить соответствующие атрибуты (`fill`, `stroke`) из кода.
