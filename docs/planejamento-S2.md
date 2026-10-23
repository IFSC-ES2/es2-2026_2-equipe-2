# Planejamento Inicial — Sprint 2

## Meta da Sprint 2

Entregar o segundo incremento funcional do MVP: o módulo de clientes completo, a barra lateral de navegação e a conclusão do CRUD de itens de estoque com edição
e exclusão de produto.

## Itens do backlog selecionados

- CRUD de clientes;
- Página de clientes;
- Barra lateral de navegação do sistema;
- Edição e exclusão de produto;

## Justificativa da escolha

- Clientes é a outra funcionalidade essencial definida na Definição do MVP, junto com
  estoque, que foi entregue na Sprint 1;
- Edição e exclusão de produto completam o CRUD de estoque iniciado na Sprint 1, deixando
  o primeiro módulo fechado de ponta a ponta;
- A barra lateral de navegação permite acessar estoque e clientes no mesmo sistema e serve
  de base para os próximos módulos;
- A estrutura da Sprint 1 pode ser
  reaproveitada em clientes, o que reduz o risco de estimativa (R02) e mantém o escopo
  dentro do MVP;
- A capacidade da equipe nesta sprint permite cobrir clientes, navegação e o fechamento do
  CRUD de produtos, mas não módulos mais dependentes, como conferência.

## Decisões tomadas e ajustes de escopo

- A página de clientes reutiliza os componentes genéricos (`GenericList`, `GenericSave`)
  criados na Sprint 1, em vez de telas específicas;
- O módulo de clientes segue o mesmo padrão do backend da Sprint 1 (`BaseRepository`,
  service e testes de unidade).