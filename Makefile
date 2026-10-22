COMPOSE      = docker compose -f docker-compose.yaml
COMPOSE_DEV  = $(COMPOSE) -f docker-compose.dev.yaml
COMPOSE_PROD = $(COMPOSE) -f docker-compose.prod.yaml

.PHONY: lint format test dev dev-watch prod down-dev down-prod build-dev build-prod logs-dev logs-prod

dev:
	$(COMPOSE_DEV) up --build --watch
	
build-dev:
	$(COMPOSE_DEV) build --no-cache

down-dev:
	$(COMPOSE_DEV) down

logs-dev:
	$(COMPOSE_DEV) logs -f

prod:
	$(COMPOSE_PROD) up -d --build

build-prod:
	$(COMPOSE_PROD) build --no-cache

down-prod:
	$(COMPOSE_PROD) down

logs-prod:
	$(COMPOSE_PROD) logs -f

lint:
	cd api-estoque && npm run lint
	cd frontend && npm run lint

format:
	cd api-estoque && npm run format
	cd frontend && npm run format

test:
	cd api-estoque && npx vitest run
	cd frontend && npx vitest run
