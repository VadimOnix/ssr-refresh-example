# Делаем сборку на основе официального образа node (используем стабильную версию)
FROM node:20.15-alpine3.20 as web-app
# Устанавливаем рабочую директорию, создаётся автоматически
WORKDIR /web-app
COPY package.json package-lock.json  ./
# Устанавливаем зависимости
RUN npm install
# Копируем ресурсы проекта
COPY . .
