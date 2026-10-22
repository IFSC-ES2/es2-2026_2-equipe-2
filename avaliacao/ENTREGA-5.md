# Avaliação da Entrega 5 - Sprint 1

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: ERP para gestão de operações logísticas em distribuidoras
- Entrega: 5 - Sprint 1
- MVP declarado: sistema interno com cadastro de clientes, controle de estoque e conferência; o estoque inclui movimentações, consulta de saldo, alertas e histórico.
- Vertical slice escolhido: cadastro e listagem de produtos de estoque, atravessando frontend React, API Express/TypeScript e PostgreSQL.
- Versão avaliada: commit `2e6d3ec`, tag `0.1.0`, integrado pelo PR #83.
- Data prevista: 17/09/2026.

## Documentos Consultados

- `README.md`.
- `USO-IA.md`.
- `frontend/README.md`.
- `.github/pull_request_template.md`.
- `.github/ISSUE_TEMPLATE/bug_report.md`.
- `.github/ISSUE_TEMPLATE/feature_request.md`.
- `.github/ISSUE_TEMPLATE/custom_issue.md`.
- `.github/workflows/build-check.yaml`.
- `.github/workflows/test-check.yaml`.
- `.github/workflows/check-branch-name.yaml`.
- `.github/workflows/check-branch-name-pr-main.yaml`.
- `docs/planejamento-S1.md`.
- `docs/escopo-S1.md`.
- `docs/CONTRIBUICOES.md`.
- `docs/BASELINE.md`.
- `docs/CAPACIDADE.md`.
- `docs/ESTIMATIVAS.md`.
- `docs/METRICAS.md`.
- `docs/metricas/M-01.md` a `docs/metricas/M-06.md`.
- `docs/dod.md`.
- `docs/FLUXO-DE-TRABALHO.md`.
- `docs/CI.md`.
- `docs/qualidade.md`.
- `docs/riscos.md`.
- `docs/adrs/ADR-0001-stack-front-end.md` a `docs/adrs/ADR-0006-tipagem-backend-e-cliente-proprio-bd.md`.
- Issues e pull requests associados à milestone `entrega-5`.
- Histórico Git, código-fonte, testes, proteção de branches, rulesets, tag e release do repositório.

## Resumo da Entrega

A equipe entregou um incremento funcional relevante para a base do módulo de estoque. O fluxo de cadastro e listagem de produtos atravessa a interface React, a API Express e o PostgreSQL, com Nginx e Docker Compose. Em cópia temporária do commit avaliado, a aplicação foi iniciada e o fluxo foi reproduzido: o frontend respondeu por Nginx, a API listou os registros iniciais e um produto criado por `POST /api/produtos` foi persistido e recuperado posteriormente.

Os builds da API e do frontend passaram. Foram executados 62 testes da API e 74 testes do frontend, todos aprovados. O PR final #83 teve aprovação, checks de branch, build e testes concluídos com sucesso e integração por merge commit. A API/CLI também confirmou proteção e rulesets ativos para `main` e `entrega-*`.

As perdas concentram-se na coleta de métricas, na coerência documental do fechamento, nas instruções incompletas do README e na tag incorreta (`0.1.0` em vez de `v0.1.0`). O registro das contribuições existe, mas contém tarefas não concluídas e não apresenta evidência verificável suficiente para Monica.

## Critérios Atendidos

- O planejamento define meta, escopo e justificativa para o vertical slice de produtos de estoque.
- O incremento é funcional e atravessa interface, API e persistência PostgreSQL.
- Há cadastro e listagem reais por `POST` e `GET /api/produtos`.
- Docker Compose, Nginx, frontend, API e banco foram integrados e executados.
- Os testes automatizados são versionados, relevantes e executáveis por Vitest.
- Foram aprovados 136 testes no total: 62 na API e 74 no frontend.
- Os workflows executam builds e testes de API e frontend nos pull requests.
- A branch `entrega-5` foi integrada à `main` pelo PR #83, com aprovação e merge commit.
- Os checks do PR #83 foram concluídos com sucesso.
- Existem documentos específicos de planejamento, escopo e contribuições da Sprint 1.
- A release possui nota detalhada e aponta para o commit avaliado, embora a tag esteja nomeada incorretamente.
- A maior parte dos usos de IA declarados possui artefatos correspondentes no código e nos testes.

## Critérios Parcialmente Atendidos

- O planejamento relaciona estoque ao MVP, mas não registra claramente a substituição da prioridade anterior de clientes definida na baseline.
- A capacidade utilizada no planejamento corresponde ao período de 26/08 a 02/09 e não compara esforço selecionado com as 118 horas declaradas.
- O slice é funcional, mas representa principalmente CRUD de produtos, não as movimentações, saldos por depósito, alertas e histórico descritos no escopo amplo de estoque.
- Os testes cobrem bem services e componentes, mas não há teste automatizado integrado entre HTTP, banco e frontend.
- O registro de contribuições associa integrantes a issues, mas não distingue tarefas concluídas de atribuições e não fornece links diretos para commits, PRs ou reviews.
- O board possui evidências de inclusão e mudança de estado por eventos, mas sua visão completa não pôde ser consultada por falta do escopo `read:project`.
- O README descreve Docker e Makefile, mas não informa claramente o estado funcional da Sprint 1 nem como executar os testes.
- A release existe e é detalhada, mas usa `0.1.0`, sem o prefixo obrigatório `v`, e foi publicada após a data prevista.
- O uso de IA é amplamente declarado, porém há sobreposição imprecisa entre Claude e Gemini nos testes frontend e validações pouco rastreáveis.

## Critérios Não Atendidos

- As métricas M-01 a M-06 não foram coletadas ao final da Sprint 1, comparadas com o planejado ou analisadas.
- `docs/METRICAS.md` ainda afirma que não há valores coletados, e os históricos das seis fichas permanecem vazios.
- O README não contém instruções para executar os testes automatizados.
- O comando documentado `make prod` não funciona em checkout limpo sem criar `.env.production`, procedimento não explicado no snapshot.
- `docs/escopo-S1.md` afirma que rotas de categoria e workflow de testes ainda estavam pendentes, embora ambos já existissem no commit final.
- Não foi criada a tag exata `v0.1.0`.
- Não há contribuição individual diretamente rastreável de Monica por commit, PR, review, comentário ou artefato no estado avaliado.

## Achados com Evidências

- **Planejamento e MVP:** `docs/planejamento-S1.md` define o slice de produtos, enquanto `docs/BASELINE.md` priorizava clientes. **Impacto:** o recorte é coerente com o MVP, mas o replanejamento não ficou completamente rastreável. Recomendação: registrar explicitamente alterações da baseline e sua motivação.
- **Vertical slice:** `GenericList`, `GenericCreate`, `produto.service.ts`, rotas, controller, service, repository e `conf/init-db.sql`. **Impacto:** comprova o incremento entre UI, API e banco. Recomendação: evoluir de CRUD de produtos para movimentação real de estoque.
- **Execução:** `POST /api/produtos` retornou 201, o produto foi recuperado por GET e frontend e API responderam por Nginx. **Impacto:** sustenta a utilizabilidade e a demonstração do incremento. Recomendação: automatizar um smoke test desse fluxo no CI.
- **Contrato de dados:** PostgreSQL devolve `NUMERIC` como string, enquanto o frontend declara `preco: number`; `createProduto` não representa o envelope real da API. **Impacto:** há risco de erros de tipagem e uso futuro da resposta. Recomendação: criar DTOs e normalizar tipos na fronteira HTTP.
- **Testes:** 62 testes da API e 74 do frontend passaram, mas faltam testes HTTP/banco e integração real dos componentes. **Impacto:** o atendimento é forte, mas não integral. Recomendação: acrescentar testes de integração simples e serviços HTTP.
- **Lint:** o lint do frontend falhou em `GenericList/index.tsx`, e o lint da API não carregou a configuração. **Impacto:** o pipeline verde não detecta problemas estáticos. Recomendação: corrigir os lints e torná-los checks obrigatórios.
- **Segurança:** a auditoria da API encontrou vulnerabilidade crítica transitiva em `proxy-addr`; CORS está aberto e não há autenticação. **Impacto:** há risco técnico caso o sistema deixe o ambiente local. Recomendação: atualizar dependências e restringir origens e acesso.
- **Métricas:** M-01 a M-06 ficaram sem coleta, e a issue #69 só foi fechada posteriormente. **Impacto:** perda relevante no acompanhamento da sprint. Recomendação: registrar valores, comparação e análise no fechamento.
- **Escopo:** `docs/escopo-S1.md` ficou desatualizado quanto às rotas de categoria e ao CI. **Impacto:** a documentação não representa o commit entregue. Recomendação: fazer revisão documental imediatamente antes do PR final.
- **Contribuições:** `docs/CONTRIBUICOES.md` lista issues, mas algumas não foram concluídas; #77 não possui artefato de Monica. **Impacto:** reduz a confiabilidade do registro individual. Recomendação: vincular cada contribuição a commit, PR, review ou documento concluído.
- **Proteção de branches:** a API confirmou uma aprovação na `main`; rulesets exigem builds e check da origem; `entrega-*` exige aprovação e check. **Impacto:** a governança principal está configurada e foi observada no PR #83. Recomendação: remover bypasses permanentes de Daniel e Isac ou restringi-los a emergência auditável.
- **Fluxo:** o PR #83 foi aprovado, teve checks verdes e merge commit; o PR #85 foi mesclado sem aprovação em branch intermediária. **Impacto:** o fluxo principal foi atendido, com fragilidade localizada. Recomendação: exigir revisão também nas branches intermediárias.
- **Prazo e release:** o PR #83 foi mesclado em 18/09 às 00:26, a release foi publicada às 00:32 e a tag foi `0.1.0`. **Impacto:** o marco foi entregue após a data e com nome divergente. Recomendação: publicar `v0.1.0` sobre o commit correto antes do prazo.
- **Uso de IA:** testes, joins e componentes existem, mas o registro de 17/09 associa Categoria.service a `produto.service.ts`. **Impacto:** compatibilidade parcial e inconsistência material em uma entrada. Recomendação: identificar os arquivos corretos e separar claramente a contribuição de cada ferramenta.

## Análise das Contribuições Individuais

- **Bernardo Amaral Lisboa:** definiu as tabelas e os dados iniciais do banco; implementou service, controller, rotas e testes de produtos; produziu `docs/CONTRIBUICOES.md` no PR #78; e revisou os PRs #51 e #75. As evidências são coerentes com o papel de DBA e com a participação em backend, testes e documentação. Parte relevante do trabalho foi integrada pelo PR #80, aberto por Isac, o que reduz o protagonismo rastreável por PR próprio.
- **Daniel Luiz da Rocha Cordeiro:** produziu a ADR-0006, o planejamento e o escopo da sprint; realizou a estilização do frontend no PR #82; fez a integração final pelo PR #83 e publicou a release; e revisou os PRs #56, #78 e #80. A atuação é coerente com arquitetura e organização do marco. O escopo e a release foram concluídos após o prazo, e as métricas e a atualização completa do README atribuídas a Daniel não estavam concluídas.
- **Isac Lehmkuhl dos Santos:** configurou frontend, backend, Docker, Compose, Nginx e Makefile; implementou categorias, integração frontend/backend e correções do CRUD; criou os workflows de build e testes; abriu vários PRs técnicos; e revisou os PRs #55, #60, #63, #64, #82, #83 e #86. A contribuição é central e coerente com DevOps/Infra, além de backend, frontend e testes. Há forte concentração de conhecimento e integração em um único integrante.
- **Monica Cancellier:** `docs/CONTRIBUICOES.md` associa Monica à issue #77, “Definição da interface”, e o PR #82 menciona aplicar o estilo definido pela designer, fornecendo apenas evidência indireta. Não há commit, PR, review, comentário ou documento diretamente atribuível a Monica no período; a issue #77 não contém artefato verificável, foi fechada somente em 02/10 e Monica não aparece na lista de contribuidores da release. A nota reconhece a declaração da equipe, mas é limitada à evidência rastreável disponível.
- **Victor Eduardo Peixer Munarim:** implementou a listagem e o cadastro genéricos e seus testes nos PRs #60 e #64; integrou a listagem com o backend; corrigiu o Docker; registrou o uso de IA relacionado a componentes e testes; e revisou os PRs #57 e #66. A atuação é compatível com QA, combinando testes, revisão e implementação funcional. A contribuição declarada na coleta de métricas não possui artefato correspondente.
- **Identidades e limitações de autoria:** Bernardo aparece como `Bernardo Lisboa <bernardo.al2006@aluno.ifsc.edu.br>` / `Bernardo-Lisboa`; Daniel como `daniellrc`, `daniel.lrc` e `Daniel Cordeiro`, com diferentes e-mails vinculados à conta `Daniellrc`; Isac como `Isac Lehmkuhl dos Santos <isacldossan@gmail.com>` / `isaclds`; Monica pela conta `Monica-cancellier`, sem identidade Git atribuível na faixa avaliada; e Victor como `victor` e `victormunarim`, vinculados à conta `victormunarim`. As notas consideram autoria, conteúdo, issues, PRs, reviews e documentos verificáveis, e não apenas quantidade de commits.

## Notas Individuais

As notas abaixo avaliam a contribuição individual observável e são independentes da nota coletiva da entrega.

| Integrante | Nota individual |
|---|---:|
| Bernardo Amaral Lisboa | **9,0** |
| Daniel Luiz da Rocha Cordeiro | **8,5** |
| Isac Lehmkuhl dos Santos | **9,5** |
| Monica Cancellier | **2,0** |
| Victor Eduardo Peixer Munarim | **8,8** |

- **Bernardo - 9,0:** contribuição forte e coerente em banco, backend, testes, documentação e reviews; a integração por PR de outro integrante reduz o protagonismo rastreável.
- **Daniel - 8,5:** atuação relevante em arquitetura, planejamento, frontend, integração, release e reviews; houve pendências documentais, métricas ausentes e conclusão após o prazo.
- **Isac - 9,5:** contribuição técnica central em infraestrutura, integração, implementação, CI e reviews; houve concentração significativa de conhecimento e integração.
- **Monica - 2,0:** a equipe declarou contribuição de design, mas há somente evidência indireta, sem artefato ou interação diretamente rastreável no período.
- **Victor - 8,8:** contribuição consistente em componentes genéricos, testes, integração, Docker, uso de IA e reviews; não há artefato para a coleta de métricas atribuída.

## Notas Compostas por Integrante

As notas compostas combinam 30% da nota coletiva da entrega e 70% da nota individual de contribuição:

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante | Nota coletiva | Nota individual | Cálculo | Nota composta |
|---|---:|---:|---:|---:|
| Bernardo Amaral Lisboa | 7,6 | 9,0 | `(7,6 × 0,30) + (9,0 × 0,70) = 8,58` | **8,6** |
| Daniel Luiz da Rocha Cordeiro | 7,6 | 8,5 | `(7,6 × 0,30) + (8,5 × 0,70) = 8,23` | **8,2** |
| Isac Lehmkuhl dos Santos | 7,6 | 9,5 | `(7,6 × 0,30) + (9,5 × 0,70) = 8,93` | **8,9** |
| Monica Cancellier | 7,6 | 2,0 | `(7,6 × 0,30) + (2,0 × 0,70) = 3,68` | **3,7** |
| Victor Eduardo Peixer Munarim | 7,6 | 8,8 | `(7,6 × 0,30) + (8,8 × 0,70) = 8,44` | **8,4** |

As notas compostas da Entrega 5 são: Bernardo **8,6**; Daniel **8,2**; Isac **8,9**; Monica **3,7**; Victor **8,4**.

As diferenças refletem a evidência individual disponível. Bernardo, Daniel, Isac e Victor possuem contribuições técnicas, documentais e de revisão diretamente rastreáveis. Isac apresenta a participação mais ampla; Bernardo e Victor contribuíram substancialmente com backend e testes; Daniel atuou em arquitetura, documentação e integração. Para Monica, há apenas declaração da equipe e menção indireta ao trabalho de design, sem artefato, commit ou interação rastreável suficiente no marco avaliado.

## Recomendações para a Equipe

- Coletar e analisar as métricas no encerramento de cada sprint.
- Atualizar planejamento, escopo, README e CI para refletirem exatamente o commit final.
- Documentar preparação dos arquivos `.env` e comandos de testes.
- Usar a tag exata solicitada e publicar a release antes do prazo.
- Incluir lint e smoke test integrado como checks obrigatórios.
- Remover ou restringir bypasses permanentes das proteções.
- Vincular cada contribuição individual a evidências concluídas.
- Corrigir contratos de dados entre API e frontend e parametrizar a URL da API.
- Registrar uso de IA com arquivos precisos, sem sobreposição ou duplicidade.

## Nota da Entrega

| Critério | Máximo | Nota |
|---|---:|---:|
| Planejamento inicial da Sprint 1 | 1,0 | 0,8 |
| Primeiro incremento funcional como vertical slice | 2,0 | 1,8 |
| Testes de unidade automatizados | 1,5 | 1,5 |
| Escopo, backlog, board, métricas e contribuições | 1,5 | 0,5 |
| Fluxo de trabalho | 2,0 | 2,0 |
| README, documentação, uso de IA e release | 2,0 | 1,0 |
| **Total** | **10,0** | **7,6** |

## Justificativa da Nota

O grupo entregou um incremento real, funcional e bem testado, com CI efetivo e fluxo principal de PR corretamente seguido. A redução decorre principalmente da ausência total das coletas de métricas, da documentação de fechamento desatualizada, do README sem instruções de testes e preparação completa do ambiente e da release com tag incorreta. O pequeno atraso foi registrado, sem penalidade autônoma adicional não prevista na rubrica.

## Observações sobre Uso de IA

A equipe declarou Claude e Gemini para testes frontend, testes de `Categoria.service`, joins em `Produto.repository.ts` e consulta para criação de componentes. Esses artefatos existem, e os testes finais passaram no CI e na execução independente. Não foram encontrados indícios fortes e verificáveis de apoio de IA relevante sem declaração correspondente.

Há, porém, divergências: o registro de 17/09 declara “ligação do banco de dados para Categoria.service”, mas aponta para `frontend/src/services/produto.service.ts`, que consome produtos por HTTP e não implementa `Categoria.service`; Claude e Gemini são descritos de forma sobreposta na criação dos testes frontend; o registro de regex aparece duplicado; e falta a declaração explícita de responsabilidade acadêmica e técnica.

**Conclusão:** o uso de IA é majoritariamente compatível com os artefatos entregues, mas há uma divergência material entre finalidade e artefato no registro de 17/09 e deficiências de precisão, validação e rastreabilidade. Não há evidência suficiente de fraude ou de uso oculto relevante.
