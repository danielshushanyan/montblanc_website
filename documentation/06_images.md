# Работа с изображениями

Изображения следует хранить в папке `src/images`.
При запуске задачи `images` файлы из папки `src/images` копируются в `build/images`.

```text
nikoland-template
├── build
│   └── images
└── src
    └── images
```

Для оптимизации изображений можно использовать задачу `optimize:images`.

> `optimize:images` оптимизирует только исходные файлы из папки `src/images`!

Предварительно оптимизированные изображения рекомендуется хранить в папке `src/resources/images`.
В таком случае при запуске задачи `optimize:images` данные файлы не будут затронуты.

```text
nikoland-template
└── src
    └── resources
        └── images
```
