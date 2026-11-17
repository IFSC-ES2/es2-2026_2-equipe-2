# Avaliação da Entrega 8 - Sprint 4

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: AURA ERP — gestão de operações logísticas em distribuidoras
- Entrega: 8 - Sprint 4
- Repositório confirmado pela configuração: `IFSC-ES2/es2-2026_2-equipe-2`
- Pull request avaliado: [#190](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/190), `entrega-8` → `main`.
- Versão avaliada: `f59ed224`, merge do PR #190 em 11/11/2026 às 23h53 (UTC−3).
- Prazo: 11/11/2026.
- Release esperada: `v0.4.0`

## Documentos Consultados

- `README.md`, `USO-IA.md` e `.env.example`.
- `.github/pull_request_template.md` e workflows em `.github/workflows/`.
- `docs/entregas/sprint-4.md`, `docs/DEPLOY.md`, `docs/ARQUITETURA.md` e `docs/CI.md`.
- `docs/METRICAS.md`, `docs/metricas/M-01.md` a `M-06.md` e `docs/riscos.md`.
- `docs/adrs/ADR-0001` a `ADR-0008`.
- `docs/CONTRIBUICOES-S4.md`.
- `Makefile`, `docker-compose.yaml`, `docker-compose.dev.yaml`, `docker-compose.prod.yaml`, `conf/nginx.conf.template`, `conf/init-db.sql`, Dockerfiles e código/testes de `api-estoque/` e `frontend/`.
- Issues, Project 33, PRs da etapa (#173, #175, #176, #177, #178, #179, #181, #182, #188, #189, #190 e #192), checks, histórico Git e [release `0.4.0`](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/releases/tag/0.4.0).

## 1. Descrição — Resumo da Entrega

O MVP declarado no `README.md` é um ERP logístico com cadastro de clientes, controle de estoque e conferência. O recorte efetivamente desenvolvido inclui CRUD de clientes e produtos, pedidos/vendas, baixa e estorno de estoque, dashboard analítico, Swagger e execução conteinerizada. A conferência de mercadorias e o histórico de movimentações foram mantidos fora ou adiados, conforme `docs/entregas/sprint-4.md:105–117`.

A Sprint 4 apresenta um incremento funcional relevante: correção da baixa automática de estoque, dashboard com KPIs/gráficos/tabelas, deploy local reproduzível por Docker Compose/Makefile e documentação operacional.

O staging, porém, não é disponibilizado em endereço externo; a própria equipe o define como réplica local. O merge e a release ocorreram dentro do prazo de 11/11.

## 2. Itens Obrigatórios da Entrega

### 2.1 Planejamento e incremento funcional da Sprint 4

- **Atendido:** `docs/entregas/sprint-4.md` registra estado anterior, problemas, priorização, meta, issues, riscos e ajustes de escopo.
- **Atendido:** a baixa/estorno de estoque está implementada em `api-estoque/src/repositories/Pedido.repository.ts`; o dashboard possui rota, serviço, repositório, Swagger, frontend e testes.
- **Parcialmente atendido:** clientes, produtos, pedidos e estoque estão implementados, mas conferência permanece fora do escopo declarado originalmente. A mudança é explícita, porém a documentação deveria distinguir claramente o MVP inicial do recorte final. O contrato do dashboard diverge entre README e API (A1).

#### A1 — Contrato do dashboard diverge entre README e API

- **Categoria:** documentação e implementação.
- **Relevância:** baixa/média.
- **Evidência:** `README.md:153` documenta `periodo=1W|1M|3M|1Y`; `api-estoque/src/services/Dashboard.service.ts:6–7,28–31` aceita `30`, `90` ou `365`, conforme Swagger em `api-estoque/src/docs/dashboard/dashboard.docs.ts`.
- **Impacto:** consumidores que seguem o README usam parâmetros inválidos.
- **Recomendação:** alinhar README, frontend, Swagger e validação do backend em um único contrato.

### 2.2 Ambiente de staging ou equivalente acessível

- **Parcialmente atendido:** há equivalente local conteinerizado e documentado, que recebe crédito parcial.
- **Não atendido:** staging externo acessível. O avaliador não consegue acessar o ambiente sem executar Docker no próprio ambiente.

#### A2 — O staging entregue é somente local

- **Categoria:** aderência aos requisitos e implantação.
- **Relevância:** alta.
- **Evidência:** `docs/DEPLOY.md:143–145` define o staging como réplica local conteinerizada; `:321–337` registra ausência de nuvem; README e guia usam somente `localhost:8080`.
- **Impacto:** professor e avaliador não conseguem acessar o ambiente sem preparar Docker localmente, e não há prova de uma implantação online.
- **Recomendação:** disponibilizar uma URL de staging ou, caso a equivalência local seja aceita, anexar evidências executadas de `make prod`, healthchecks e smoke tests vinculadas ao commit/tag.

### 2.3 Deploy automatizado ou reprodutível

- **Atendido:** `make prod`, Compose de produção, banco PostgreSQL, volume `db-data`, seed, healthchecks, Nginx e smoke tests estão descritos em `docs/DEPLOY.md`. O deploy local é mais completo do que uma simples instrução manual.
- **Parcialmente atendido:** `make prod` automatiza a execução local e o Compose é substancialmente reprodutível, com persistência e seed, mas há divergências de HTTPS e portas (A5, A7) e não há registro de execução vinculado à versão entregue (A3).
- **Observação:** CD remoto não é exigido nesta entrega; o enunciado aceita deploy automatizado **ou** reprodutível. A ausência de servidor externo e de deploy contínuo, declarada pela equipe, não foi descontada neste item; a falta de staging acessível é tratada no item 2.2.

#### A3 — Deploy reprodutível sem evidência de execução vinculada à versão

- **Categoria:** deploy e rastreabilidade.
- **Relevância:** baixa.
- **Evidência:** `Makefile:21–31` e `docs/DEPLOY.md:127–139,172–185` fornecem comandos reprodutíveis, com healthchecks e smoke tests descritos; não há registro versionado (saída, data, commit) de uma execução de `make prod` e dos smoke tests sobre a versão entregue.
- **Impacto:** o processo é reprodutível, que é o que o enunciado exige quando não há automação; falta apenas evidência de que foi executado e validado sobre o commit da release.
- **Recomendação:** registrar no `docs/DEPLOY.md` ou na release uma execução de `make prod` com healthchecks e smoke tests, indicando o commit validado.

### 2.4 Manutenção e atualização da integração contínua

- **Atendido:** existem workflows de testes e build para pull requests, com `npm ci`, Vitest e construção das imagens quando os caminhos monitorados são alterados; os checks finais do PR #190 foram aprovados.
- **Parcialmente atendido:** os filtros não cobrem as alterações de infraestrutura da própria Entrega 8 e `docs/CI.md` está desatualizado.

#### A4 — CI não cobre alterações de infraestrutura e documentação de CI está desatualizada

- **Categoria:** testes/verificação.
- **Relevância:** média.
- **Evidência:** `.github/workflows/test-check.yaml:16–20` e `build-check.yaml:16–20` filtram apenas `api-estoque/**` e `frontend/**`. `docs/CI.md:8` contém placeholder e descreve nomes/capacidades divergentes. Não há job específico para validar Compose, Nginx, Makefile ou os workflows.
- **Impacto:** alterações importantes da Entrega 8 podem ser integradas sem build/teste correspondente.
- **Recomendação:** incluir infraestrutura nos filtros ou adicionar jobs de validação de Compose/Nginx/Makefile; atualizar `docs/CI.md` com os arquivos e checks reais.

### 2.5 Documentação de deploy

- **Atendido:** `docs/DEPLOY.md` documenta pré-requisitos, variáveis, comandos, Compose de produção, healthchecks, smoke tests e limitações, inclusive a ausência de nuvem e de deploy contínuo.
- **Parcialmente atendido:** o guia promete HTTPS em `4443` e Nginx como ponto único de entrada, o que não corresponde à configuração efetiva.

#### A5 — Promessa de HTTPS não corresponde ao Nginx

- **Categoria:** configuração/documentação.
- **Relevância:** média.
- **Evidência:** `docs/DEPLOY.md:27–30,74–82` descreve HTTP 8080 e HTTPS 4443; `docker-compose.yaml:5–6` publica `4443:443`; porém `conf/nginx.conf.template:8–10` contém apenas `listen 80`, sem certificado ou listener TLS.
- **Impacto:** a porta documentada como HTTPS não oferece o comportamento descrito.
- **Recomendação:** configurar TLS de forma reproduzível ou remover a promessa de HTTPS e declarar a limitação em todos os diagramas e instruções.

### 2.6 Atualização das métricas e riscos do projeto

- **Atendido:** `docs/ARQUITETURA.md` apresenta visões C4 e `ADR-0008` registra o backend monolítico modular, coerente em linhas gerais com `controllers/`, `services/`, `repositories/`, PostgreSQL, Docker e Nginx. O planejamento registra riscos da sprint.
- **Parcialmente atendido:** as fichas M-01 a M-06 existem, mas sem coleta específica da Sprint 4.

#### A6 — Métricas da Sprint 4 não foram fechadas

- **Categoria:** métricas e documentação.
- **Relevância:** média.
- **Evidência:** `docs/entregas/sprint-4.md:100–101` lista métricas como fundamento da sprint, mas `docs/METRICAS.md:46–49` mantém valores como coleta futura e M-01 a M-06 terminam sem fechamento específico da Sprint 4.
- **Impacto:** falta comparação quantitativa do planejado e executado e evidência de desempenho do processo na etapa.
- **Recomendação:** coletar as métricas no fechamento, indicar fonte/recorte e relacionar os resultados a commits, PRs e checks.

### 2.7 Qualidade, segurança e configuração do ambiente

- **Atendido:** `.env.example` versionado documenta as variáveis do ambiente.
- **Parcialmente atendido:** a configuração de portas e a exposição pública divergem da arquitetura documentada; `PORT_WEB` não é efetivamente usado para iniciar o servidor frontend.

#### A7 — Configuração de portas e entrada pública é inconsistente

- **Categoria:** arquitetura/configuração.
- **Relevância:** média.
- **Evidência:** `docs/DEPLOY.md:27–35` descreve Nginx como único ponto público e frontend interno em 3000; Compose/produção também publicam diretamente serviços web/API. `.env.example` expõe `PORT_WEB`, mas `frontend/Dockerfile:32–34` inicia sempre em 3000. `api-estoque/Dockerfile` declara porta 3000 enquanto Compose/aplicação usam 5000.
- **Impacto:** alterações de configuração podem desalinhar proxy, healthcheck e servidor; a arquitetura documentada não é fiel à exposição efetiva.
- **Recomendação:** centralizar a entrada no Nginx, parametrizar de fato as portas ou torná-las fixas explicitamente, e alinhar Dockerfiles, Compose e documentação.

### 2.8 Fluxo de trabalho evidenciado no repositório

- **Atendido:** a entrega foi consolidada pela branch `entrega-8`, com PRs intermediários e PR #190 para `main`, aprovações de Victor e Bernardo, checks finais aprovados e merge commit.
- **Atendido:** a API retornou proteção conclusiva para `main`, com uma aprovação obrigatória, administradores sujeitos às regras, bloqueio de force push/exclusão e `required_status_checks` configurado (sem checks nomeados). Rulesets ativos também abrangem `entrega-*`.
- **Atendido:** o merge do PR #190 ocorreu às 23h53 de 11/11 (UTC−3), dentro do prazo, coerente com o milestone do GitHub (11/11).
- **Parcialmente atendido:** houve atividade em 30/10 e 01/11, mas grande parte da implementação/documentação final ficou concentrada entre 09 e 11/11. O Project 33 e o milestone registram tarefas, porém a issue #164 permanecia aberta após a integração.

### 2.9 Release/tag do marco

- **Atendido:** a API confirmou a release/tag `0.4.0`, publicada às 23h59 de 11/11/2026 (UTC−3), dentro do prazo, e apontando para `f59ed224`, com descrição de funcionalidades e limitações.
- **Parcialmente atendido:** a documentação de planejamento espera `v0.4.0`, enquanto a tag publicada é `0.4.0` (sem o prefixo `v`).

### 2.10 Registro de contribuição individual

- **Atendido:** `docs/CONTRIBUICOES-S4.md` registra responsabilidades por integrante.
- **Parcialmente atendido:** as contribuições declaradas não corroboram igualmente todas as responsabilidades.

#### A8 — Contribuições declaradas têm comprovação desigual

- **Categoria:** processo e contribuição individual.
- **Relevância:** média.
- **Evidência:** `docs/CONTRIBUICOES-S4.md` atribui SQL/staging a Bernardo e protótipo a Monica. O histórico mostra documentação/revisões para Bernardo sem implementação SQL claramente atribuível; a tela final do dashboard é principalmente de Isac, enquanto Monica tem `55e6008` e PR #182 do protótipo. Daniel concentra backend, documentação e integração; Isac concentra infraestrutura, CI e frontend; Victor concentra métricas/riscos/revisões.
- **Impacto:** reduz a precisão do registro de autoria e da avaliação de colaboração, embora não elimine as contribuições documentadas.
- **Recomendação:** vincular cada responsabilidade a commits, PRs, reviews, issues e validações datadas, distinguindo protótipo, implementação final, revisão e integração.

#### Análise das Contribuições Individuais

Notas de contribuição são distintas da nota coletiva. Foram consideradas relevância, oportunidade, integração, revisão e responsabilidades — não apenas quantidade de commits.

- **Bernardo Amaral Lisboa:** dois commits na janela (`38021f9` e `e55f1a3`, 41 linhas), ambos às 22h de 11/11 e restritos a `docs/CONTRIBUICOES-S4.md`. Nesse registro ele se atribui a issue #158 (consultas SQL agregadas do dashboard), mas as consultas foram implementadas por Daniel (`84d0df1`, `DashboardRepository`); também se atribui a #169 (staging acessível), não entregue. Registrou seis aprovações de PR (#173, #178, #179, #189, #190 e #192), todas sem comentário; apenas a de #173, em 30/10, antecede o último dia. A contribuição rastreável é pequena, concentrada no fechamento e o registro de contribuições superestima sua participação.

- **Daniel Luiz da Rocha Cordeiro:** realizou a correção da baixa de estoque, planejamento, endpoints e testes do dashboard, Swagger, README, barra lateral e integração final; foi autor de diversos PRs. A contribuição é central e diversificada, mas grande parte da consolidação ficou concentrada no fechamento da janela.

- **Isac Lehmkuhl dos Santos:** atuou em deploy local, `DEPLOY.md`, CI, métricas e implementação/integração do dashboard frontend, além de revisões. As responsabilidades são razoavelmente confirmadas, mas o staging externo não foi entregue e a atividade concentrou-se no fim da janela.

- **Monica Cancellier:** um único commit na janela (`55e6008`, 60 linhas), às 20h07 de 11/11, com o protótipo e a especificação visual do dashboard (PR #182, issue #157). Diferentemente da Entrega 7, o artefato é alinhado à sua responsabilidade de UI/UX; porém foi entregue no último dia, depois de a tela já estar em implementação por Isac, o que limita seu efeito sobre o incremento. Não há revisões, testes, integração ou comunicação rastreável de progresso.

- **Victor Eduardo Peixer Munarim:** três commits pequenos, todos em 11/11 entre 19h14 e 20h09: métricas M-03/M-04 **da Sprint 3** (`e9fb299`), um novo risco (`7e1179f`) e execução de `make format` (`8a3bab4`). A issue #164 (métricas ao final da Sprint 4), da qual é responsável, permanece aberta, origem do achado A6; a issue #165 (validar ambiente implantado e registrar limitações) foi fechada sem artefato correspondente de sua autoria. Registrou três aprovações (#176, #181 e #190), sem comentário. As responsabilidades de QA/Scrum Master da sprint não foram cumpridas de forma rastreável.

## 3. Critérios de Avaliação (10 pts)

### Nota da Entrega

| Critério                                                         |   Máximo |    Nota |
| ---------------------------------------------------------------- | -------: | ------: |
| Planejamento e incremento da Sprint 4                            |      1,0 |     0,8 |
| Staging ou equivalente acessível, validável e associado à versão |      2,0 |     1,0 |
| Deploy automatizado ou reprodutível e `docs/DEPLOY.md`           |      1,5 |     1,3 |
| CI mantido e atualizado, com testes e checks nos PRs             |      1,5 |     1,1 |
| Métricas, riscos, documentação, README e IA                      |      1,0 |     0,6 |
| Configuração e segurança                                         |      1,0 |     0,8 |
| Fluxo de trabalho, checks, merge e release `v0.4.0`              |      2,0 |     1,8 |
| **Total**                                                        | **10,0** | **7,4** |

### Justificativa da Nota

**Nota coletiva: 7,4/10,0.** A entrega apresenta incremento funcional real e relevante, infraestrutura conteinerizada com banco persistente, seed, healthchecks, proxy, Makefile, documentação operacional extensa, CI de testes/build, arquitetura coerente em grande parte, PRs revisados e release/tag confirmada pela API. O deploy local é mais completo do que uma simples instrução manual.

A nota não é maior porque o requisito de staging acessível foi reduzido a um ambiente local (A2), a documentação promete HTTPS que a configuração não implementa (A5), há inconsistências de portas e exposição (A7), o CI não cobre alterações de infraestrutura (A4), as métricas da Sprint 4 não foram fechadas (A6) e existem divergências entre README e Swagger (A1). A tag também não segue o nome `v0.4.0`. As limitações explicitamente registradas pela equipe foram consideradas, mas não anulam os requisitos normativos.

### Notas Individuais

Escala 0–10, considerando conteúdo, relevância, aderência às responsabilidades, periodicidade/oportunidade, integração, revisão, comunicação e apoio aos colegas; não são proporcionais à contagem de commits.

| Integrante                    | Nota individual | Justificativa resumida                                                                                                                                                                          |
| ----------------------------- | --------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bernardo Amaral Lisboa        |         **5,0** | Apenas o registro de contribuições (41 linhas, 11/11) e aprovações sem comentário; SQL e staging que se atribui não são de sua autoria ou não foram entregues.                                  |
| Daniel Luiz da Rocha Cordeiro |         **8,8** | Correção de estoque, dashboard backend, Swagger, README e integração final; contribuição central, consolidada no fechamento da janela.                                                          |
| Isac Lehmkuhl dos Santos      |         **8,3** | Deploy local, `DEPLOY.md`, CI e dashboard frontend, com revisões; sem staging externo e atividade concentrada no fim da janela.                                                                 |
| Monica Cancellier             |         **4,5** | Um commit de 60 linhas com protótipo alinhado a UI/UX, entregue no último dia, depois do início da implementação da tela; sem revisões ou integração.                                           |
| Victor Eduardo Peixer Munarim |         **5,5** | Três commits pequenos em 11/11 (métricas da Sprint 3, um risco, formatação) e aprovações sem comentário; métricas da Sprint 4 e validação do ambiente, sob sua responsabilidade, não entregues. |

### Notas Compostas por Integrante

A nota composta da Entrega 8 combina 30% da nota coletiva e 70% da contribuição individual, com peso 10 para a entrega, em continuidade ao registro das Entregas 5–7. A média parcial está registrada em `NOTAS.md`.

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante                    | Coletiva | Individual |                              Cálculo | Nota composta |
| ----------------------------- | -------: | ---------: | -----------------------------------: | ------------: |
| Bernardo Amaral Lisboa        |      7,4 |        5,0 | `(7,4 × 0,30) + (5,0 × 0,70) = 5,72` |       **5,7** |
| Daniel Luiz da Rocha Cordeiro |      7,4 |        8,8 | `(7,4 × 0,30) + (8,8 × 0,70) = 8,38` |       **8,4** |
| Isac Lehmkuhl dos Santos      |      7,4 |        8,3 | `(7,4 × 0,30) + (8,3 × 0,70) = 8,03` |       **8,0** |
| Monica Cancellier             |      7,4 |        4,5 | `(7,4 × 0,30) + (4,5 × 0,70) = 5,37` |       **5,4** |
| Victor Eduardo Peixer Munarim |      7,4 |        5,5 | `(7,4 × 0,30) + (5,5 × 0,70) = 6,07` |       **6,1** |

## 4. Observações

### Observações sobre Uso de IA

**Conclusão explícita:** `USO-IA.md` é **substancialmente compatível** com os artefatos entregues: os usos declarados para deploy, README, dashboard, Swagger, seed, testes e documentação correspondem a arquivos existentes e ao tipo de apoio descrito. Há, contudo, lacunas de precisão: alguns registros não identificam responsável, commit ou resultado reproduzível; o registro do dashboard omite parte dos artefatos efetivamente citados pela implementação; e a afirmação de 133 testes frontend não está acompanhada de relatório versionado. Não foi encontrada evidência forte de uso de IA não declarado, plágio ou falsificação. O achado é de rastreabilidade e validação documental incompleta.

### Recomendações para a Equipe

- Publicar um staging acessível ou fornecer evidência executada e rastreável do equivalente local.
- Registrar uma execução validada de `make prod` (healthchecks e smoke tests) sobre o commit da release; automatizar o deploy quando houver infraestrutura disponível.
- Corrigir HTTPS/4443, portas, exposição direta dos serviços e parametrização do frontend.
- Fazer o CI validar alterações de infraestrutura, Compose, Nginx e Makefile, além de atualizar `docs/CI.md`.
- Fechar as métricas da Sprint 4 e reconciliar a issue #164 com o PR integrado.
- Alinhar contrato do dashboard, README, Swagger e código.
- Vincular contribuições individuais a evidências rastreáveis e registrar a divisão entre protótipo, implementação, testes, revisão e integração.
