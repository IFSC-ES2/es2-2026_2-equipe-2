# Projeto Engenharia de Software II

## Equipe

| Nome                          | Função                                      | Matrícula    |
| ----------------------------- | ------------------------------------------- | ------------ |
| Bernardo Amaral Lisboa        | Database Administrator (DBA)                | 202510703703 |
| Daniel Luiz da Rocha Cordeiro | Arquiteto de Software e Scrum Master        | 202510703715 |
| Isac Lehmkuhl dos Santos      | DevOps/Infra                                | 202510703633 |
| Monica Cancellier             | UI/UX Designer                              | 202320003698 |
| Victor Eduardo Peixer Munarim | Engenheiro de Qualidade (QA)                | 202510703662 |

## Tema

**ERP para gestão de operações logísticas em distribuidoras**

Sistema de apoio à gestão operacional de armazéns e centros de distribuição, voltado à digitalização e centralização de processos que hoje são conduzidos majoritariamente de forma manual ou em planilhas.

## Documentação e Referências

- **Visão do produto:** seção [1. Visão do Produto](#1-visão-do-produto);
- **Escopo do MVP:** seção [2. Definição do MVP](#2-definição-do-mvp);
- **Board:** [board do projeto](https://github.com/orgs/IFSC-ES2/projects/33);
- **Backlog:** [backlog/issues](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues);
- **DoD (Definition of Done):** [dod.md](./docs/dod.md);
- **ADRs:** [ADRs](./docs/adrs/);
- **Uso de Inteligência Artificial:** [USO-IA.md](./USO-IA.md);
- **Estimativas:** [ESTIMATIVAS.md](./docs/ESTIMATIVAS.md)
- **BaseLine:** [BASELINE.md](./docs/BASELINE.md)
- **Métricas:** [METRICAS.md](./docs/METRICAS.md)
- **Registro de riscos:** [riscos.md](./docs/riscos.md)
- **Fluxo de trabalho:** [FLUXO-DE-TRABALHO.md](./docs/FLUXO-DE-TRABALHO.md)
- **CI mínimo:** [CI.md](./docs/CI.md)
- **Critérios de qualidade:** [qualidade.md](./docs/qualidade.md)
- **Planejamento Sprint 1:** [planejamento-S1.md](./docs/planejamento-S1.md)
- **Escopo Sprint 1:** [escopo-S1.md](./docs/escopo-S1.md)
- **Contribuições Sprint 1:** [CONTRIBUICOES.md](./docs/CONTRIBUICOES.md)
- **Planejamento Sprint 2:** [planejamento-S2.md](./docs/planejamento-S2.md)
- **Contribuições Sprint 2:** [CONTRIBUICOES-S2.md](./docs/CONTRIBUICOES-S2.md)
- **Planejamento Sprint 3:** [sprint-3.md](./docs/entregas/sprint-3.md)
- **Contribuições Sprint 3:** [CONTRIBUICOES-S3.md](./docs/CONTRIBUICOES-S3.md)
- **Planejamento Sprint 4:** [sprint-4.md](./docs/entregas/sprint-4.md)
- **Protótipo do Dashboard:** [prototipo-dashboard.md](./docs/prototipo-dashboard.md)
- **Swagger de Pedidos:** [src/docs/pedido](./api-estoque/src/docs/pedido) (disponível em `/api/docs`)
- **Swagger do Dashboard:** [src/docs/dashboard](./api-estoque/src/docs/dashboard) (disponível em `/api/docs`)
- **Arquitetura (modelo C4):** [ARQUITETURA.md](./docs/ARQUITETURA.md)
- **Reengenharia do backend:** [REENGENHARIA.md](./docs/REENGENHARIA.md)
- **ADR-0008 (backend monolítico modular):** [ADR-0008](./docs/adrs/ADR-0008-backend-monolitico-modular.md)
- **Guia de Deploy e Staging:** [DEPLOY.md](./docs/DEPLOY.md)

- **PRs desta etapa:**
  - [#173 - feat: Baixa no estoque automática quando pedido é criado](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/173)
  - [#175 - docs: Planejamento da Sprint 4 e métricas da Sprint 3](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/175)
  - [#176 - docs: Criação do Guia de Deploy e Staging (DEPLOY.md)](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/176)
  - [#177 - feat: Consultas agregadas e API do Dashboard](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/177)
  - [#178 - docs: Atualização das métricas para a Sprint 3](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/178)
  - [#179 - docs: Registro e mitigação do Risco 06 (divergência entre local e CI)](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/179)
  - [#181 - feat: Tela de Dashboard com cards de KPIs, gráficos e tabelas analíticas](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/181)
  - [#182 - docs: Protótipo e especificação do Dashboard](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/182)

## 1. Visão do Produto

**(a) Problema que o sistema pretende resolver**  
Em muitas distribuidoras, o controle de estoque, a conferência de mercadorias e o cadastro de clientes ainda são feitos manualmente ou em planilhas separadas. Isso causa retrabalho, diferenças entre o estoque real e o registrado, e atrasos na conferência dos pedidos.

**(b) Área de aplicação**  
Gestão logística e operações de armazém, nos processos de recebimento, armazenagem, conferência e expedição de mercadorias em empresas distribuidoras.

**(c) Usuários principais e demais interessados**  
Operadores, responsáveis pelo registro de carga e descarga de mercadorias; Equipe de conferência, que valida pedidos recebidos e expedidos; Equipe administrativa/comercial, responsável pelo cadastro e gestão de cliente

**(d) Local, organização ou contexto de aplicação**  
O sistema é pensado para uma distribuidora de médio porte, com múltiplos depósitos, baseada em uma empresa real do setor conhecida pela equipe.

**(e) Proposta de valor**  
O sistema propõe trocar os controles manuais e as planilhas por um único sistema, com informação centralizada e rastreável, juntando cadastro de clientes, estoque e conferência. Isso diminui erros de digitação, evita divergências de estoque e dá mais visibilidade do andamento de cada operação.

**(f) Objetivos do produto neste semestre**

- Tirar do papel/planilha os processos de cadastro de clientes, estoque e conferência;
- Ter um MVP funcionando começando pela base do sistema (clientes, estoque e conferência), evoluindo depois para carga/descarga;
- Manter um histórico básico das movimentações de estoque;
- Testar se esse recorte de funcionalidades já ajuda na operação real de uma distribuidora.

**(g) Premissas, restrições e limitações conhecidas**

- O prazo é de um semestre, então o escopo precisa ser enxuto;
- A equipe tem só 5 pessoas, cada uma com um papel fixo (DBA, Arquitetura, DevOps/Infra, UI/UX, QA);
- Não vai ter integrações externas (GPS, marketplaces) nem módulo financeiro nesta fase;
- O sistema é baseado em uma empresa real conhecida pela equipe, mas sem acesso aos dados ou ao ambiente de produção dela;
- O sistema é de uso interno da distribuidora, não é voltado para clientes finais.

## 2. Definição do MVP

**(a) Objetivo do MVP**
Ter uma primeira versão funcionando que já mostre o começo do fluxo da operação, com cadastro de clientes e controle básico de estoque, para validar se o modelo de dados e a ideia do projeto fazem sentido antes de partir para a carga/descarga em versões seguintes.

**(b) Funcionalidades essenciais (primeira versão do MVP)**

**Cadastro de clientes**

- Cadastro, edição, consulta e inativação de clientes;
- Dados básicos (nome/razão social, documento, contato, endereço);
- Histórico de pedidos vinculados ao cliente.

**Estoque**

- Registro de entrada e saída de itens, com vínculo ao motivo (compra, venda, ajuste);
- Consulta de saldo atual por produto e por depósito;
- Alertas de nível mínimo, sinalizando itens a repor;
- Histórico de movimentações por item, para auditoria básica.

**Conferência**

- Checagem de itens recebidos contra o pedido de compra/nota de entrada;
- Checagem de itens expedidos contra o pedido de venda/saída;
- Registro de divergências (falta, sobra, avaria) com observação;
- Status de conferência por pedido (pendente, em andamento, concluído).

**(c) Funcionalidades fora do escopo neste momento**

- **Rastreamento de veículos** — localização em tempo real e histórico de trajeto de frota;
- **Rotas** — criação, edição e otimização de rotas de entrega;
- **Financeiro** — faturamento, contas a pagar/receber, emissão de nota fiscal;
- **Integrações externas** — conexão com GPS/telemetria e marketplaces;
- **Carga e descarga** - registros de movimentação de entrada e saida de produtos por veículos.

**(d) Por que esse recorte é viável para o semestre**

- Clientes, estoque e conferência são a base para os outros módulos, então é o ponto de partida mais seguro;
- Validar o básico primeiro evita retrabalho nos módulos seguintes;
- O time é pequeno, então um recorte menor é mais fácil de entregar com qualidade;
- Carga/descarga continua no plano, só entra depois da base pronta.

**(e) Critérios usados para decidir o que entra e o que fica de fora**

- O que é base para os outros módulos entrou primeiro;
- O que depende de módulos ainda não prontos ficou para depois;
- O que depende de sistemas externos ficou de fora do semestre;
- O que tem regras de negócio mais complexas, como financeiro, também ficou de fora por falta de tempo.

## 3. Funcionalidades Implementadas

### API de Estoque (`api-estoque`)

| Recurso          | Endpoints disponíveis                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Produtos         | `GET`, `POST /produtos` · `GET`, `PUT`, `DELETE /produtos/:id`                                                                                 |
| Categorias       | `GET`, `POST /categorias` · `GET`, `PUT`, `DELETE /categorias/:id`                                                                             |
| Fornecedores     | `GET /fornecedores`                                                                                                                            |
| Clientes         | `GET`, `POST /clientes` · `GET`, `PUT`, `DELETE /clientes/:id`                                                                                 |
| Pedidos (Vendas) | `GET`, `POST /pedidos` · `GET`, `PUT`, `DELETE /pedidos/:id` — criação e atualização em transação, com baixa e estorno automático no estoque   |
| Dashboard        | `GET /dashboard` — resumo analítico com KPIs de vendas, ticket médio, produtos top vendas, clientes e estoque (suporta `?periodo=1W\|1M\|3M\|1Y`) |
| Documentação     | `GET /docs` — Swagger UI com todos os endpoints documentados                                                                                   |

### Frontend

- **Barra lateral (`Sidebar`):** navegação entre Dashboard, Vendas, Clientes e Estoque com layout base compartilhado (`BaseLayout`) e cabeçalho unificado (`Header`);
- **Página de Dashboard (`/dashboard`):**
  - **Cards de KPIs (`KpiCard`):** Faturamento Total, Total de Pedidos Concluídos e Ticket Médio;
  - **Gráfico de Vendas (`AreaChart`):** evolução temporal do faturamento com filtro interativo de períodos (1 Semana, 1 Mês, 3 Meses e 1 Ano);
  - **Tabelas Analíticas Paginadas (`DashboardTable` e `Pagination`):** Ranking dos Produtos Mais Vendidos e Melhores Clientes por volume de compras;
  - **Gestão do Armazém:** Indicador visual de Produtos com Estoque Baixo/Crítico e Gráfico Donut (`DonutChart`) com distribuição percentual por categoria;
  - Feedback visual de carregamento (*loading skeletons*) e integração com `/api/dashboard`;
- **Página de Vendas (`/vendas`):** listagem de pedidos e criação de vendas via modal com itens dinâmicos, validação de desconto comercial máximo de 15% e baixa automática de estoque;
- **Página de Estoque (`/estoque`):** listagem, criação, edição e exclusão de produtos via modais (`ProductCreateModal`) com exibição de fornecedor e categoria;
- **Página de Clientes (`/clientes`):** listagem, inclusão, edição e exclusão protegida contra clientes associados a pedidos;
- **Qualidade e Testes:** ampla suíte de testes com Vitest e Testing Library cobrindo componentes atômicos, moleculares, serviços e páginas no frontend, e testes unitários de serviços no backend;
- Padronização e formatação de código com ESLint e Prettier no frontend e no backend.

## Como Rodar o Projeto

Para a documentação completa de deploy, variáveis de ambiente, validação passo a passo e limitações conhecidas do ambiente de homologação, consulte o [Guia de Deploy (DEPLOY.md)](./docs/DEPLOY.md).

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) (v24+) e [Docker Compose](https://docs.docker.com/compose/install/) (v2.20+) instalados;
- [Make](https://www.gnu.org/software/make/) (opcional, para executar comandos simplificados via Makefile);
- Arquivo `.env` na raiz do projeto (criado a partir de `.env.example`).

```bash
cp .env.example .env
```

### 1. Ambiente de Desenvolvimento (com Hot-Reload)

```bash
make dev
```

> Esse comando usa `docker compose watch` internamente, sincronizando alterações do código-fonte automaticamente com os containers (hot-reload no frontend e na API).

Para encerrar o ambiente de desenvolvimento:

```bash
make down-dev
# ou: make down
```

### 2. Ambiente de Produção / Staging (Deploy Conteinerizado)

Para subir a aplicação simulando o ambiente de produção/staging com bundles otimizados e multi-stage build:

```bash
make prod
```

Para acompanhar os logs:

```bash
make logs-prod
```

Para encerrar o ambiente de produção:

```bash
make down-prod
```

### Endereços de Acesso

Após subir a aplicação (em dev ou prod), acesse:

| Serviço             | Endereço                                                                                         | Descrição                             |
| :------------------ | :----------------------------------------------------------------------------------------------- | :------------------------------------ |
| **Frontend Web**    | [http://localhost:8080](http://localhost:8080) (ou [/dashboard](http://localhost:8080/dashboard)) | Aplicação web via Nginx Proxy         |
| **API Healthcheck** | [http://localhost:8080/api/ping](http://localhost:8080/api/ping)                                  | Verificação de status da API          |
| **API Dashboard**   | [http://localhost:8080/api/dashboard](http://localhost:8080/api/dashboard)                        | Endpoint de dados do Dashboard        |
| **Swagger UI**      | [http://localhost:8080/api/docs](http://localhost:8080/api/docs)                                  | Documentação interativa dos endpoints |

### Executando Testes e Qualidade de Código

Para instalar as dependências exatas fixadas, rodar a suíte de testes automatizados e linters:

```bash
# Instalar dependências fixadas no backend e frontend via npm ci (mitigação do Risco 06)
make ci

# Executar todos os testes automatizados (backend e frontend)
make test

# Executar checagem de estilo e linter (ESLint)
make lint

# Aplicar formatação automática de código (Prettier)
make format
```

> **Nota (Windows):** o `make` não vem instalado por padrão no Windows. Utilize WSL2, Git Bash, instale via Chocolatey (`choco install make`) ou execute os comandos equivalentes com `docker compose` descritos no [DEPLOY.md](./docs/DEPLOY.md).
