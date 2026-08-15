# ADR-0004: Containerização da Aplicação via Docker

## Status

Aceita

## Contexto

O projeto é composto por múltiplas aplicações (frontend, backend e possivelmente outros serviços de apoio, como banco de dados), que precisam rodar de forma consistente em quaisquer ambiente. Sem uma forma padronizada de empacotar e executar essas aplicações, surgem problemas comuns como divergência entre ambientes, dependências de sistema incompatíveis entre integrantes da equipe e dificuldade para configurar novos ambientes rapidamente.

## Decisão

Vamos utilizar Docker para containerizar todas as aplicações do projeto. Cada aplicação terá seu próprio `Dockerfile`, responsável por construir sua imagem de forma isolada. Um `docker-compose.yaml` único, na raiz do projeto, orquestrará todos os serviços, permitindo subir o ambiente completo (frontend, backend, banco de dados, etc.) com um único comando.

## Alternativas consideradas

- **Rodar as aplicações diretamente na máquina** — maior complexidade para padronizar dependências entre os ambientes da equipe e dificuldade de reprodução do ambiente em diferentes máquinas e estágios (dev, teste, produção).
- **Múltiplos `docker-compose` separados por serviço** — descartado por aumentar a complexidade de orquestração, exigindo múltiplos comandos e maior esforço manual para subir o ambiente completo.

## Consequências

### Positivas

- Facilidade para replicar a aplicação em diferentes ambientes.
- Simplicidade para subir e testar a aplicação localmente, com um único comando (`docker-compose up`).
- Simplicidade para integrar com pipelines de CI/CD.
- Isolamento de dependências entre os serviços, evitando conflitos de versão entre eles.

### Negativas / Riscos

- Todo novo serviço/microsserviço precisará ser adicionado manualmente ao `docker-compose.yaml`, exigindo atenção para manter o arquivo atualizado.
- Necessidade de manter os Dockerfiles e o docker-compose atualizados conforme a aplicação evolui (ex: novas variáveis de ambiente, portas, volumes).

## Metadados

| Campo | Valor                    |
| ----- | ------------------------ |
| Autor | Isac Lehmkuhl dos Santos |
| Data  | 2026-08-14               |
