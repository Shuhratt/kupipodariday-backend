## Установка и запуск проекта

```bash
# Установка
$ npm install

# Генерация миграций
$ npm run migrate:generate src/database/migrations/initApp

# Применение миграции
$ npm run migrate:up

# Запуск проекта в режиме разработке
$ npm run start:dev
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# запуск форматера линтера
$ npm run format
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Команды запуска миграций

```bash
# Команда автомической генерации миграций на основе описанных в проекте сущностей orm
$ npm run migrate:generate

# Команда ручной генерации миграций
$ bpm run migrate:create

# Команда внедрения миграции
$ npm run migrate:up

# Команда откатки миграции
$ npm run migrate:down
```

### Минимальная версия node - v20.19.0
