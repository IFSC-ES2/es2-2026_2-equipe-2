# Escopo da Sprint 1

## Issues planejadas

- Definição do banco de dados (tabelas de itens)
- Setup do backend em TypeScript
- Setup do frontend com Vite, React e TypeScript
- CRUD de itens via cliente próprio de banco (sem ORM)
- CRUD de categorias (service, repository e testes)
- Tela de cadastro/listagem de itens
- Ambiente com Docker Compose e Nginx
- Testes de unidade do CRUD de categorias
- Rodar os testes automaticamente no CI

## Issues concluídas

- Definição do banco de dados
- Setup do backend em TypeScript
- Setup do frontend com Vite, React e TypeScript
- CRUD de itens via cliente próprio de banco
- Tela de cadastro/listagem de itens (mockada, consumindo endpoints do backend)
- Ambiente com Docker Compose e Nginx
- CRUD de categorias: lógica de negócio (service, repository) e testes de unidade

## Issues parciais ou replanejadas

- **Expor rota HTTP do CRUD de categorias**: service e repository prontos e testados, mas o
  controller e as rotas ainda não foram criados/ligados ao roteador principal. Replanejado
  para conclusão logo no início da próxima sprint;
- **Rodar os testes automaticamente no CI**: workflow de testes já existe em uma branch separada
  (`ci/verifica-testes`), mas ainda não foi mesclado à `entrega-5`. Replanejado para integração
  antes do fechamento da entrega.

## Justificativa da escolha do vertical slice

O vertical slice escolhido para esta sprint foi o **cadastro e listagem de itens de estoque**,
por ser uma das funcionalidades essenciais definidas na Definição do MVP, junto com clientes.
Essa escolha permite validar, de ponta a ponta (interface → API → banco), a arquitetura definida
nas ADRs (TypeScript, Docker, Nginx, banco relacional) antes de avançar para módulos mais
dependentes, como conferência e carga/descarga, que só fazem sentido depois que estoque e
clientes estiverem funcionando.

Aproveitando a infraestrutura montada para o estoque, a equipe também avançou na lógica de
negócio do CRUD de categorias, já que categorias e produtos estão diretamente relacionados no
modelo de dados — mesmo essa funcionalidade não sendo o vertical slice principal da sprint.