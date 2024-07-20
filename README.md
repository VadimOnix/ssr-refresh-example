# ssr-refresh-example

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
