# ssr-refresh-example

## Установка
В системе должен быть установлен [mkcert](https://github.com/FiloSottile/mkcert)

1. Установить сертификаты для домена `refresh-example.com`

```shell
make install-certificate
```

2. Обновить файл /etc/hosts

```
# SSR Example
127.0.0.1        refresh-example.com
127.0.0.1        id.refresh-example.com
```

3. Запустить докер и выполнить команду

```shell
make dev-up
```

4. Дождитесь, пока поднимутся образы и откройте приложение по
   ссылке [https://refresh-example.com](https://refresh-example.com)

## На что обратить внимание

Конфигурация проекта сделана следующим образом:

- При открытии новый пользователь перенаправляется в сервис авторизации
- Новый пользователь получает анонимный AT и перенаправляется в приложение 
- При ручном переходе в сервис авторизации анонимный пользователь остаётся до тех пор, пока не нажмёт кнопку "Авторизоваться"

На что обратить внимание?

- Хук [useRouterPush](./src/shared/utils/useRouterPush.ts). Он оборачивает вызов router.push предварительной проверкой токена пользователя на клиенте.
- Компонент [CustomLink](./src/shared/components/CustomLink.tsx). Заменяет `next/link` и аналогично хуку проверяет токен перед переходом по ссылке. 
