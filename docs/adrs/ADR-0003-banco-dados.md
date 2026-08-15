# ADR-0003: Banco de Dados (PostgreSQL)

## Status

Aceita

## Contexto

Qual banco de dados relacional será utilizado pelo sistema, considerando a necessidade de integridade referencial entre os módulos (cliente, pedido, estoque, conferência e carga/descarga), o conhecimento prévio da equipe e a facilidade de integração com a stack de backend escolhida.

## Decisão

Vamos utilizar PostgreSQL como banco de dados relacional principal do sistema.

## Alternativas consideradas

- **MySQL** — menos recursos avançados que o PostgreSQL, como suporte a JSON e constraints mais rígidas.
- **SQLite** — não adequado para acesso concorrente de múltiplos usuários simultâneamente.

## Consequências

### Positivas

- Maior suporte a integridade referencial, constraints e transações ACID.
- Gratuito e com boa integração com a stack de backend.
- Suporte nativo a tipos de dados mais flexíveis (JSON, arrays), úteis para necessidades futuras.

### Negativas / Riscos

- Pouca experiência prévia da equipe com PostgreSQL em relação ao MySQL.
- Ferramentas menos conhecidas para a equipe (ex: pgAdmin).
- Necessidade de manter a mesma versão do banco entre ambientes de desenvolvimento e produção.

## Metadados

| Campo | Valor |
| ----- | ----- |
| Autor | Bernardo Amaral Lisboa |
| Data  | 2026-08-14 |