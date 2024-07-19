DOMAIN=refresh-example.com

install-certificate:
	echo "Очищаем папку сертификатов"
	rm -rf nginx/certs
	mkdir -p nginx/certs
	echo "Начинаем установку сертификатов"
	mkcert -key-file nginx/certs/$(DOMAIN)-key.pem -cert-file nginx/certs/$(DOMAIN).pem $(DOMAIN)
	mkcert -key-file nginx/certs/id.$(DOMAIN)-key.pem -cert-file nginx/certs/id.$(DOMAIN).pem id.$(DOMAIN)
	echo "Сертификаты доступны в директории nginx/certs"

#DEVELOPMENT

dev-up:
	echo "Запуск локальной среды разработки"
	docker compose -f compose.yml --profile development up

dev-down:
	echo "Остановка локальной среды разработки"
	docker compose -f compose.yml --profile development down

dev-restart:
	echo "Перезапуск локальной среды разработки"
	docker compose -f compose.yml --profile development restart
