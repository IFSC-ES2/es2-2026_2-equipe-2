# ADR-0002: Stack Backend (Node.js com Express)

## Status

Aceita

## Contexto

Qual linguagem e quais frameworks serão utilizados para desenvolver o backend, considerando o conhecimento da equipe, o prazo do projeto e a curva de aprendizagem das stacks consideradas. A equipe já possui experiência prévia com JavaScript, o que reduz o tempo de aprendizado e favorece o cumprimento do prazo.

## Decisão

Vamos utilizar Node.js com Express para criação da API do backend, com Sequelize como ORM.

## Alternativas consideradas

- **Java com Spring Boot** — pouco conhecimento da equipe em cima do framework em relação ao escolhido.
- **Python com FastAPI** — complexidade na utilização de código assíncrono.

## Consequências

### Positivas

- Simplicidade da linguagem.
- Diversidade de bibliotecas.
- Simplicidade de trabalhar com Express para lidar com a API.
- Facilidade para subir, testar e rodar a aplicação em diferentes ambientes.
- Mesma linguagem base do frontend (React com TypeScript), facilitando reuso de conhecimento da equipe e possível compartilhamento de tipos/interfaces entre as camadas.

### Negativas / Riscos

- Falta de tipagem na linguagem (mitigável futuramente com TypeScript).
- Gargalo de desempenho em tarefas complexas.
- Thread única.
- Falhas com dependências desatualizadas.

## Metadados

| Campo | Valor                    |
| ----- | ------------------------ |
| Autor | Isac Lehmkuhl dos Santos |
| Data  | 2026-08-14               |
