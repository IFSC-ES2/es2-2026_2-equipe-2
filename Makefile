DEV_FILES = -f docker-compose.yaml -f docker-compose.dev.yaml
PROD_FILES = -f docker-compose.yaml -f docker-compose.prod.yaml

DEV_ENV = --env-file .env.development
PROD_ENV = --env-file .env.production

.PHONY: dev prod down-dev down-prod build build-prod logs-dev logs-prod ps-dev ps-prod restart-dev restart-prod

dev:
	docker compose $(DEV_FILES) $(DEV_ENV) watch

prod:
	docker compose $(PROD_FILES) $(PROD_ENV) up -d

down-dev:
	docker compose $(DEV_FILES) $(DEV_ENV) down

down-prod:
	docker compose $(PROD_FILES) $(PROD_ENV) down

build:
	docker compose $(DEV_FILES) $(DEV_ENV) build --no-cache

build-prod:
	docker compose $(PROD_FILES) $(PROD_ENV) build --no-cache

logs-dev:
	docker compose $(DEV_FILES) $(DEV_ENV) logs -f

logs-prod:
	docker compose $(PROD_FILES) $(PROD_ENV) logs -f

ps-dev:
	docker compose $(DEV_FILES) $(DEV_ENV) ps

ps-prod:
	docker compose $(PROD_FILES) $(PROD_ENV) ps

restart-dev: down-dev dev

restart-prod: down-prod prod