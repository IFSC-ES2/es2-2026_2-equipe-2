# Testes de Aceitação do MVP (execução manual documentada)

| Campo | Valor |
|---|---|
| Data de execução | 18/11/2026 |
| Executor | Victor Eduardo Peixer Munarim (QA), com apoio de IA (ver `USO-IA.md`) |
| Versão testada | branch `docs/aceitacao` (base `main`, pós `v0.4.0`) |
| Ambiente | Docker Compose (nginx + web + api-estoque + PostgreSQL 17); API em `http://localhost:5000`, web em `http://localhost:3000` |
| Tipo de execução | Manual documentada: passos de API com `curl` (registrados em log) e passos de UI em navegador (checklist) |

## (a) Definição dos testes

Os testes foram derivados das funcionalidades essenciais do MVP (README, seção 2) e do que foi entregue até a Sprint 4. Cada cenário agrupa casos de teste.

| Cenário | Funcionalidade do MVP |
|---|---|
| AT-01 | Cadastro de clientes |
| AT-02 | Estoque: cadastro/consulta de produtos e saldo |
| AT-03 | Estoque: saída por venda (pedido) com baixa automática |
| AT-04 | Integridade na exclusão |
| AT-05 | Alertas de nível mínimo e dashboard |
| AT-06 | Documentação e disponibilidade |
| AT-07 | Funcionalidades do MVP ainda ausentes |

### Pré-condições

cp .env.example .env
make dev ou make prod
curl -s localhost:5000/ping

Variável usada nos passos: `A=http://localhost:5000`. Os casos de UI usam `http://localhost:3000`.

### Roteiro dos casos

| Caso | Passos | Resultado esperado |
|---|---|---|
| CT-01.1 | `POST $A/clientes` com nome, e-mail, documento | 201 e cliente criado |
| CT-01.2 | `GET $A/clientes/:id` | 200 com os dados do cliente |
| CT-01.3 | `PUT $A/clientes/:id` `{"nome":"Cliente Editado"}` e consultar | 200; nome persistido |
| CT-01.4 | `POST $A/clientes` sem e-mail | 400 |
| CT-01.5 | `GET` de ID inexistente; `GET /clientes/abc` | 404; 400 |
| CT-02.1 | `POST $A/produtos` com SKU, preço 100, quantidade 10 | 201 |
| CT-02.2 | `GET $A/produtos/:id` | 200 com `quantidade` (saldo), categoria e fornecedor |
| CT-02.3 | `PUT $A/produtos/:id` `{"preco":120,"estoque_minimo":4}` | 200; valores atualizados |
| CT-02.4 | `POST` com preço negativo; `POST` sem SKU | 400 em ambos |
| CT-02.5 | `POST` com SKU já existente (`ELE-0001`) | 4xx (409/400) sem detalhe interno do banco |
| CT-02.6 | `GET $A/categorias` e `GET $A/fornecedores` | 200 com itens |
| CT-03.1 | `POST $A/pedidos` com 4 un. a R$ 120 (saldo 10) | 201; saldo cai para 6 |
| CT-03.2 | `GET $A/pedidos/:id` | 200 com cliente e itens |
| CT-03.3 | Pedido com 999 un. | 400 "Estoque insuficiente"; saldo inalterado |
| CT-03.4 | Item a R$ 102 (−15%) e a R$ 100,80 (−16%) | 201; 400 "margem máxima de 15%" |
| CT-03.5 | Preço acima do cadastrado; `itens: []`; cliente inexistente | 400 nos três |
| CT-03.6 | `PUT $A/pedidos/:id` mudando 4 → 2 un. | 200; saldo sobe 2 |
| CT-03.7 | `DELETE $A/pedidos/:id` de todos os pedidos do produto | 200; saldo volta ao inicial |
| CT-04.1 | `DELETE $A/clientes/:id` de cliente com pedido | 4xx (409); cliente continua existindo |
| CT-04.2 | `DELETE $A/produtos/:id` de produto com pedido | 4xx; produto continua existindo |
| CT-04.3 | `DELETE` de cliente sem pedidos | 200; depois `GET` retorna 404 |
| CT-05.1 | `GET $A/dashboard` | 200 com vendas, ranking e estoque |
| CT-05.2 | `GET $A/dashboard?periodo=30\|90\|365` e `periodo=1W` | 200; 400 para valor inválido |
| CT-05.3 | `PUT` produto com `quantidade:1, estoque_minimo:5`; `GET $A/dashboard` | Produto aparece em `produtos_estoque_baixo` |
| CT-06.1 | `GET $A/ping` | `{"pong":true}` |
| CT-06.2 | Abrir `$A/docs/` | Swagger UI |
| CT-06.3 | `GET $A/nao-existe` | 404 |
| CT-07.1 | `GET $A/movimentacoes` | Histórico de movimentações (MVP) |
| CT-07.2 | `GET $A/conferencias` | Conferência de pedidos (MVP) |
| CT-07.3 | Procurar inativação de cliente (campo/ação "inativar") | Cliente pode ser inativado (MVP) |

## (b) Rastreabilidade com critérios de aceitação

Critérios vindos do escopo do MVP, das issues do `docs/entregas/sprint-4.md` e das regras de negócio implementadas.

| Critério de aceitação | Origem | Casos |
|---|---|---|
| Cadastrar, editar e consultar clientes com dados básicos | MVP: Clientes | CT-01.1, 01.2, 01.3 |
| Validar campos obrigatórios e IDs | MVP / DoD | CT-01.4, 01.5, 02.4 |
| Consultar saldo atual por produto | MVP: Estoque | CT-02.1, 02.2 |
| Cadastrar e editar produtos (SKU único, preço ≥ 0) | MVP: Estoque | CT-02.3, 02.4, 02.5 |
| Histórico de pedidos vinculados ao cliente | MVP: Clientes | CT-03.2 |
| Pedido dá baixa no estoque na mesma transação | Issue #147 | CT-03.1 |
| Bloquear venda acima do saldo | Issue #147 | CT-03.3 |
| Edição/exclusão de pedido mantém saldo coerente | Issue #147 | CT-03.6, 03.7 |
| Desconto máximo de 15% por item | Regra comercial (Sprint 3) | CT-03.4, 03.5 |
| Cliente com pedidos não pode ser excluído | README §3 (Clientes) | CT-04.1, 04.3 |
| Produto com pedidos não pode ser excluído | Integridade referencial | CT-04.2 |
| Alerta de itens abaixo do mínimo | MVP: Estoque | CT-05.3 |
| Dashboard com KPIs, ranking e estoque | Issues #158, #159 | CT-05.1, 05.2 |
| Swagger acessível, `/ping` saudável | Sprint 4 / DEPLOY.md | CT-06.1 a 06.3 |
| Histórico de movimentações de estoque | MVP: Estoque | CT-07.1 |
| Conferência de pedidos | MVP: Conferência | CT-07.2 |
| Inativação de clientes | MVP: Clientes | CT-07.3 |

## (c) Execução

Os passos de API foram executados manualmente com `curl`, na ordem do roteiro, e a saída completa (corpo e status HTTP) está em [`aceitacao/evidencias/execucao-manual-api.log`](./aceitacao/evidencias/execucao-manual-api.log). Os dados de teste (cliente, produto, pedidos) foram removidos ao final da execução.

Os casos de UI não foram executados nesta rodada; ver o checklist abaixo.

## (d) Resultados

Legenda: Aprovado, Reprovado, Aprovado com ressalvas.

| Caso | Resultado | Observação |
|---|---|---|
| CT-01.1 | Aprovado | 201 |
| CT-01.2 | Aprovado | 200 |
| CT-01.3 | Aprovado | Nome persistido |
| CT-01.4 | Aprovado | 400 "cliente email is required" |
| CT-01.5 | Aprovado | 404 e 400 |
| CT-02.1 | Aprovado | 201, saldo 10 |
| CT-02.2 | Aprovado | |
| CT-02.3 | Aprovado | |
| CT-02.4 | Aprovado | |
| CT-02.5 | Reprovado | BUG-AT-01: retorna 500 e expõe o erro `23505` do PostgreSQL. |
| CT-02.6 | Aprovado | |
| CT-03.1 | Aprovado | Saldo 10 → 6 |
| CT-03.2 | Aprovado com ressalvas | Pedido traz cliente e itens, mas não há endpoint/tela dedicada de histórico por cliente. |
| CT-03.3 | Aprovado | "Estoque insuficiente… Disponível: 6"; saldo inalterado |
| CT-03.4 | Aprovado | R$ 102 aceito; R$ 100,80 rejeitado |
| CT-03.5 | Aprovado | |
| CT-03.6 | Aprovado | Saldo 5 → 7 ao reduzir o pedido de 4 para 2 un. (o saldo era 5 porque o pedido de R$ 102 do CT-03.4 baixou 1 un.) |
| CT-03.7 | Aprovado | Saldo final 10 |
| CT-04.1 | Reprovado | BUG-AT-02: o cliente é preservado (FK), mas a API retorna 500 com detalhes internos. Esperado 409. |
| CT-04.2 | Aprovado | 400 `ForeignKeyViolationError` |
| CT-04.3 | Aprovado | |
| CT-05.1 | Aprovado | |
| CT-05.2 | Aprovado com ressalvas | A API aceita `periodo` em dias (30, 90, 365); o README documenta `1W\|1M\|3M\|1Y`, que retorna 400 (BUG-AT-03, documentação). |
| CT-05.3 | Aprovado | Produto aparece no alerta |
| CT-06.1 | Aprovado | |
| CT-06.2 | Aprovado | |
| CT-06.3 | Aprovado | |
| CT-07.1 | Reprovado (não implementado) | 404. A tabela `movimentacoes_estoque` existe, mas nada grava nela. Replanejado na Sprint 4. |
| CT-07.2 | Reprovado (não implementado) | 404. |
| CT-07.3 | Reprovado (não implementado) | Só há exclusão física; não existe campo `ativo`. |

### Resumo

| Resultado | Quantidade |
|---|---:|
| Aprovado | 23 |
| Aprovado com ressalvas | 2 |
| Reprovado | 5 (2 defeitos + 3 funcionalidades ausentes) |
| Total | 30 |

### Defeitos encontrados (para o backlog)

| ID | Gravidade | Descrição |
|---|---|---|
| BUG-AT-01 | Média | `POST /produtos` com SKU duplicado → 500 em vez de 409; vaza detalhe interno do banco. |
| BUG-AT-02 | Média | `DELETE /clientes/:id` com pedidos → 500 em vez de 409 (tratar `23503` como em `Produto.service.ts`). |
| BUG-AT-03 | Baixa | README diverge do contrato real de `?periodo=` (dias: 30/90/365). |

### Checklist manual completada de UI

A executar em `http://localhost:3000`. Marcar o resultado e anexar capturas de tela em `docs/aceitacao/evidencias/` (ex.: `UI-01.png`).

| Caso | Passos | Esperado |
|---|---|---|
| UI-01 | `/clientes` → incluir cliente | Aparece na tabela |
| UI-02 | `/clientes` → excluir cliente que tem pedido | Mensagem de bloqueio |
| UI-03 | `/estoque` → criar e editar produto | Lista atualizada com categoria e fornecedor |
| UI-04 | `/vendas` → novo pedido com desconto de 16% | Erro de desconto máximo |
| UI-05 | `/vendas` → pedido válido; voltar a `/estoque` | Saldo reduzido |
| UI-06 | `/dashboard` → trocar o filtro de período | KPIs e gráficos atualizam |

## (e) Evidências

| Arquivo | Conteúdo |
|---|---|
| [`aceitacao/evidencias/execucao-manual-api.log`](./aceitacao/evidencias/execucao-manual-api.log) | Registro da execução dos passos de API (comando, corpo e status HTTP) |
| [`aceitacao/evidencias/execucao-unitarios-api.log`](./aceitacao/evidencias/execucao-unitarios-api.log) | Testes unitários da API (apoio) |
| [`aceitacao/evidencias/execucao-frontend.log`](./aceitacao/evidencias/execucao-frontend.log) | Testes do frontend, 135 passando (apoio; não substitui a UI em navegador) |

## Conclusão

O fluxo central entregue (Cliente → Produto → Pedido com baixa de estoque → Dashboard) atende aos critérios de aceitação, inclusive as regras da issue #147. O MVP não está completo frente ao escopo declarado: faltam conferência, histórico de movimentações e inativação de clientes. Há dois defeitos de tratamento de erro (500) a corrigir.
