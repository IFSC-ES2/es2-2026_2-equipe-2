# Planejamento Inicial — Sprint 1
 
## Meta da Sprint 1
 
Entregar o primeiro incremento funcional do MVP: um vertical slice completo de cadastro e
listagem de itens de estoque, passando por interface, API e banco de dados, com testes de
unidade automatizados.
 
## Itens do backlog selecionados
 
- Cadastro de item de estoque (formulário + criação);
- Listagem de itens de estoque;
- Edição de item de estoque;
- CRUD de categorias (models, repository, service e testes de unidade);
- Estrutura de infraestrutura: Docker Compose (dev/prod), Nginx como reverse proxy e banco
  PostgreSQL;
- Estrutura base do frontend em componentes reutilizáveis (Atomic Design).
## Justificativa da escolha
 
- Estoque é uma das funcionalidades essenciais definidas na Definição do MVP, junto com
  clientes;
- É a funcionalidade mais simples de demonstrar de ponta a ponta (interface → API →
  banco), servindo como base para validar a arquitetura definida nas ADRs antes de partir
  para módulos mais dependentes, como conferência;
- A capacidade da equipe nesta sprint permite cobrir infraestrutura (Docker/Nginx/banco) e um
  primeiro CRUD completo, mas não todos os módulos do MVP ao mesmo tempo.
## Decisões tomadas e ajustes de escopo
 
- Optou-se por construir os componentes de frontend de forma genérica (`GenericList`,
  `GenericSave`), reaproveitáveis por qualquer entidade, em vez de telas específicas por
  módulo;
- O backend passou a usar a biblioteca `pg` com queries diretas, em vez de Sequelize
  (ajuste em relação à decisão original da ADR-0002), com padrão de repositório
  (`BaseRepository`) para reduzir duplicação de código;
- A funcionalidade de categorias teve sua lógica de negócio (service, repository e testes)
  implementada nesta sprint; a exposição da rota HTTP ficou para conclusão em sequência.