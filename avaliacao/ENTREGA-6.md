# Avaliação da Entrega 6 - Sprint 2

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: ERP para gestão de operações logísticas em distribuidoras
- Entrega: 6 - Sprint 2
- Repositório confirmado pela configuração: `IFSC-ES2/es2-2026_2-equipe-2`
- MVP declarado: sistema interno com clientes, estoque e conferência; clientes inclui inativação e histórico de pedidos, e estoque inclui movimentações, saldo por depósito, alertas e histórico.
- Incremento selecionado: CRUD/página de clientes, navegação compartilhada e edição/exclusão de produtos.
- Pull request final avaliado: [#121](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/121), de `entrega-6` para `main`.
- Versão considerada: commit `3e8e4017ea9a8daaf4a3680aa2149f2cd234156b`, merge em 01/10/2026 às 23:54:39 (UTC−3); cabeça da entrega `608a124`.
- Comparação com a Sprint 1: tag `0.1.0`, commit `2e6d3ec`.
- Release encontrada: `0.2.0`, apontando para o commit avaliado. Tag exigida: `v0.2.0`.
- Data prevista: 01/10/2026. Data da avaliação: 28/10/2026.

## Documentos Consultados

Somente documentos e artefatos da equipe:

- `README.md` e `USO-IA.md`.
- `.github/pull_request_template.md`.
- `.github/ISSUE_TEMPLATE/bug_report.md`, `custom_issue.md` e `feature_request.md`.
- `.github/workflows/build-check.yaml`, `test-check.yaml`, `check-branch-name.yaml` e `check-branch-name-pr-main.yaml`.
- `docs/planejamento-S2.md` e `docs/CONTRIBUICOES-S2.md`.
- `docs/planejamento-S1.md`, `docs/escopo-S1.md` e `docs/CONTRIBUICOES.md`.
- `docs/BASELINE.md`, `docs/ESTIMATIVAS.md` e `docs/CAPACIDADE.md`.
- `docs/METRICAS.md` e `docs/metricas/M-01.md` a `M-06.md`.
- `docs/riscos.md`, `docs/qualidade.md`, `docs/dod.md`, `docs/CI.md` e `docs/FLUXO-DE-TRABALHO.md`.
- `docs/adrs/ADR-0001-stack-front-end.md`.
- `docs/adrs/ADR-0002-stack-backend.md`.
- `docs/adrs/ADR-0003-banco-dados.md`.
- `docs/adrs/ADR-0004-containerizacao-aplicacao.md`.
- `docs/adrs/ADR-0005-arquitetura-microsservicos.md`.
- `docs/adrs/ADR-0006-tipagem-backend-e-cliente-proprio-bd.md`.
- `docs/adrs/ADR-0007-padroes-projeto-oo.md`.
- Documentação OpenAPI em `api-estoque/src/docs/`, código e testes em `api-estoque/` e `frontend/`.
- `Makefile`, Dockerfiles, arquivos Compose e configurações SQL/Nginx em `conf/`.
- Issues da etapa, especialmente #77, #87, #89–#95, #97–#103, #109 e #113, além das histórias originais de clientes #7–#11.
- PRs #88, #91, #96, #104–#108, #112, #116–#121; histórico de commits, revisões, checks, regras de proteção e release do repositório.
- [Project 33 — equipe 2](https://github.com/orgs/IFSC-ES2/projects/33), seus itens e eventos de acompanhamento.

## 1. Descrição — Resumo da Entrega

O MVP é um ERP interno para clientes, estoque e conferência. Estão fora do escopo atual rastreamento, rotas, financeiro, integrações externas e carga/descarga. A Sprint 2 selecionou clientes, barra lateral e conclusão do CRUD de produtos; conferência foi explicitamente adiada por dependências/capacidade.

O incremento é real: a nova página de clientes consome a API Express/TypeScript e o repositório PostgreSQL; produtos recebem edição/exclusão na interface, seleção por nome de categoria/fornecedor e uso de modais; o layout compartilhado integra a navegação. Há testes úteis, revisão formal e builds/testes remotos aprovados. Não se contabilizam novamente o CRUD backend de produtos, o pool, a fachada ou os workflows já existentes na Sprint 1.

Entretanto, “módulo de clientes completo” excede o entregue: há exclusão física, não inativação, e não há histórico de pedidos acessível. Há falha no esvaziamento de campos opcionais, validação insuficiente, Swagger divergente e ausência de testes HTTP/persistência. As métricas não foram coletadas no marco, os riscos e o board têm inconsistências e o planejamento foi registrado no encerramento. A release existe, mas usa a tag `0.2.0` e foi publicada em 02/10 às 00:02:56 (UTC−3), após o merge realizado dentro da data prevista. Não se aplica multa temporal não definida na rubrica nem se presume prorrogação.

## 2. Itens Obrigatórios da Entrega

Os itens abaixo são subitens comprovados; não representam pontuação integral automática nos critérios compostos:

### 2.1 Planejamento da Sprint 2

- **Atendido:** Meta e itens da Sprint 2 identificáveis, relacionados ao MVP, com justificativa do adiamento da conferência (`docs/planejamento-S2.md:3–27`).
- **Parcialmente atendido:** Planejamento coerente quanto à seleção, mas sem estimativas/capacidade específicas, uso quantitativo de métricas e fechamento de concluídos/parciais/replanejados; registro versionado somente no final da sprint.
- **Não atendido:** Balanço final explícito da sprint, com itens concluídos, parciais, replanejados e limitações.

#### A1 — Planejamento tardio e sem fechamento

- **Categoria:** requisitos/planejamento.
- **Evidência:** `docs/planejamento-S2.md:3–34` apresenta meta e recorte pertinentes, menciona R02 e capacidade, mas não quantifica esforço/capacidade S2, não usa valores de métricas nem classifica resultados e pendências. O documento foi introduzido por `11b3c28` em 01/10 às 23h23; a issue #97 foi criada em 29/09. Isso prova registro tardio, não inexistência de conversas anteriores. `CAPACIDADE.md:19–27` ainda se refere a 26/08–02/09.
- **Impacto:** atendimento parcial em planejamento e previsibilidade, sem imputação de planejamento fictício.
- **Recomendação:** registrar compromisso no início, vinculá-lo a estimativas/métricas/riscos e encerrar com planejado versus executado.

### 2.2 Incremento funcional do MVP

- **Atendido:** Incremento central de clientes, associado às issues #93/#94 e aos PRs #107/#118, com frontend, API e persistência implementados.
- **Atendido:** Edição/exclusão de produtos e melhorias de seleção/navegação identificáveis nos PRs #96/#105/#106/#108.
- **Parcialmente atendido:** Incremento integrado, porém com divergência entre CRUD e inativação/histórico do MVP, atualização incompleta de campos e validações frágeis.

Inativação, histórico e conferência não são tratados como obrigação de concluir todo o MVP nesta entrega. A avaliação distingue as pendências do produto das afirmações indevidas de completude e da alteração de requisitos sem replanejamento explícito.

#### A2 — CRUD não equivale ao módulo completo declarado

- **Categoria:** escopo/coerência do MVP.
- **Evidência:** `README.md:95–104` prevê inativação, histórico e operações de estoque além do cadastro. Entretanto, `Cliente.service.ts:139–155` chama exclusão física em `BaseRepository.ts:35–36`; não há estado ativo/inativo em `conf/init-db.sql:6–14`. As rotas em `Routes.ts:15–20` não expõem histórico de pedidos, movimentações, alertas ou conferência. “Módulo de clientes completo” e “primeiro módulo fechado de ponta a ponta” (`planejamento-S2.md:5,19–20` e release) superestimam o resultado. As histórias #7–#11 foram encerradas como duplicadas de #94; a agregadora pede CRUD, sem preservar os critérios de inativação/histórico. Não se interpreta todo fechamento como afirmação de implementação, mas houve perda de precisão do backlog.
- **Impacto:** crédito pelo incremento cadastral efetivo, sem aceitar completude do módulo.
- **Recomendação:** manter requisitos e pendências rastreáveis; implementar inativação preservando histórico ou justificar formalmente a mudança de escopo.

#### A3 — Esvaziar campos opcionais não é persistido

- **Categoria:** implementação/contrato de dados.
- **Evidência:** O formulário de cliente envia `null` para telefone, documento e endereço vazios (`frontend/src/components/organisms/Form/FormCreateClient/index.tsx:101–107`). O service encaminha os dados, mas `BaseRepository.ts:65–70` remove entradas com valor `null` da atualização. Há caminho equivalente para descrição/categoria/fornecedor de produtos. Pela análise estática, apagar um valor mantém o anterior; uma atualização contendo somente valores removidos pode lançar “No fields to update”.
- **Impacto:** defeito relevante na edição, não detectado pelas simulações da persistência nos testes. Não foi reproduzido em execução local.
- **Recomendação:** distinguir campo omitido de campo explicitamente limpo e testar o resultado salvo e recuperado no banco.

#### A4 — Validação, atribuição de campos e erros insuficientes

- **Categoria:** qualidade técnica/segurança.
- **Evidência:** `ClienteController.ts:68–75,96–103` recebe dados HTTP; `Cliente.service.ts:58–84,112–125` aceita campos por spread, valida presença na criação, mas não formato de e-mail nem mantém invariantes equivalentes na atualização. Tipos TypeScript não validam JSON em runtime. `BaseRepository.ts:39–57,65–89` usa chaves de `Object.entries(data)` como nomes de colunas SQL sem lista permitida; os valores são parametrizados, mas os identificadores não têm a mesma proteção. Há risco de atribuição em massa e manipulação de identificadores, sem exploração dinâmica realizada. Duplicidade e restrição de pedidos no cliente seguem como erros genéricos; o frontend depende de texto interno “still referenced” (`frontend/src/services/cliente.service.ts:89–98`).
- **Impacto:** atualização e contratos de erro frágeis, com risco de integridade; não se afirma comprometimento do banco.
- **Recomendação:** validar schema/tipos/invariantes, restringir campos permitidos e traduzir conflitos em respostas estáveis de negócio.

### 2.3 Testes automatizados relacionados às funcionalidades implementadas

- **Atendido:** Testes automatizados versionados e executados: CI final com **93 testes backend** e **95 testes frontend** aprovados.
- **Parcialmente atendido:** Suíte relevante e executável, mas com repositórios/serviços HTTP simulados, sem teste de integração backend–HTTP–PostgreSQL e sem cobertura explícita dos novos fluxos de edição/exclusão de produtos.
- **Não atendido:** Testes de integração simples do caminho HTTP e persistência, apesar das interações entre camadas entregues.
- **Não atendido:** Instruções locais claras para preparar e executar as duas suítes de testes.

#### A5 — Testes executam, mas não comprovam o caminho integrado

- **Categoria:** testes/verificação.
- **Evidência:** Os logs da [execução de testes 36957257391](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/actions/runs/36957257391) registram 3 arquivos/93 testes backend e 20 arquivos/95 testes frontend aprovados. `api-estoque/test/services/cliente.service.test.ts:19–26,51–54` simula o repositório; `frontend/src/pages/Cliente/index.test.tsx:7–12` simula o serviço HTTP. Há composição real de componentes e cenários úteis, mas não integração com API/banco. Os testes de Estoque/FormCreateProduct não exercitam claramente o modo novo de editar/excluir; os logs frontend também registram falhas de fetch/avisos, sem tornar a suíte reprovada.
- **Impacto:** crédito substancial por testes relevantes e CI real, com lacuna específica de integração e cobertura funcional. Não se infere percentual de cobertura a partir da contagem de testes.
- **Recomendação:** testar API/repository com banco de teste, persistência de atualizações e novos fluxos de produto; controlar dependências de rede nos testes e documentar execução local.

### 2.4 Integração contínua em uso

- **Atendido:** Checks de build/testes efetivamente executados e aprovados antes do merge final; obrigatoriedade confirmada nos rulesets.

Achado relacionado: A9 (item 2.5).

### 2.5 Fluxo de trabalho evidenciado no repositório

- **Atendido:** Desenvolvimento integrado em `entrega-6`, PRs aprovados por colegas e integração final por merge commit em `main`.
- **Parcialmente atendido:** Fluxo seguido na prática, com lacunas de nomenclatura/configuração de proteção, checklists incompletos e filtros que não cobrem mudanças exclusivas de configuração.

#### A9 — Fluxo efetivo adequado, proteção com lacunas localizadas

- **Categoria:** versionamento/CI.
- **Evidência:** Os 14 PRs intermediários mesclados consultados têm aprovação de outro integrante. No PR #121, Isac aprovou `608a124` às 23h48min21s; builds/testes terminaram antes do merge às 23h54min39s. O [build 36957257396](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/actions/runs/36957257396) compilou backend e frontend; os testes não foram apenas ignorados. No PR #105, falha de teste foi corrigida, houve nova execução verde e nova aprovação antes do merge, mostrando uso real do CI. Não se observou desenvolvimento direto na `main` no recorte. Os filtros de caminhos, porém, cobrem apenas frontend/backend e podem deixar mudanças exclusivas em Compose/Nginx/workflows sem validação correspondente. Checklists de #105/#118/#121 ficaram desmarcados.
- **Proteção verificada por API/CLI:** `branches/main/protection` exige uma aprovação, inclui administradores e impede force push/exclusão. As listas de checks clássicas são vazias, mas os rulesets ativos `build-check` (**23062294**) e `test-check` (**24337699**) exigem `build-api-estoque`, `build-frontend`, `test-api-estoque` e `test-frontend` para `main` e `entrega-*`, sem bypass nesses rulesets. Logo, **há proteção e checks obrigatórios**. O ruleset de testes foi criado em 01/10 às 19h30, não se comprovando sua vigência durante toda a janela. `no-commits-on-entrega-*` (**21973440**) exige PR/aprovação e merge. `no-commits-on-main` (**21973259**) prevê bypass para Daniel/Isac e contexto `check-main-pull-request`, enquanto o check observado se chama `check-branch-name` dentro daquele workflow. A discrepância deve ser corrigida; não se presume abuso do bypass. Squash/rebase permanecem permitidos nas configurações gerais, apesar da política documental, mas o método efetivamente usado foi o correto. A configuração atual não substitui auditoria histórica completa.
- **Impacto:** maior parte do fluxo atendida, sem equiparar checklist incompleto a aprovação ausente.
- **Recomendação:** ampliar filtros e validação de configurações, preencher os checklists e manter aprovação sobre o estado final.

### 2.6 Aplicação justificada de padrões OO

- **Atendido:** Fachada de inicialização e pool compartilhado identificáveis, com documentação de problema, decisão, benefícios e trade-offs na ADR-0007.
- **Parcialmente atendido:** Dois padrões documentados e identificáveis, mas herdados da Sprint 1 e com afirmações de testabilidade/evolução não comprovadas.

#### A6 — Padrões reais, mas formalizados retrospectivamente

- **Categoria:** arquitetura/padrões OO.
- **Evidência:** `database.ts:3–11` exporta um pool compartilhado por cache de módulo, e `SetupApplication` em `App.ts:9–51` encapsula configuração/partida; a ADR-0007 registra Singleton e Facade com problemas e trade-offs. Reconhece-se a intenção de instância compartilhada em Node, sem equipará-la integralmente a uma implementação clássica OO. Ambos os arquivos já estavam assim em `0.1.0`, sem diff na Sprint 2: a evidência nova é sobretudo a formalização, não aplicação de dois padrões durante esta evolução. A ADR afirma que `init()` devolve instância para Supertest (`:35`), mas ele retorna `void` (`App.ts:18–21`) e não há teste Supertest. O acesso é pela propriedade pública `app`.
- **Impacto:** atendimento parcial/substancial, não ausência de padrões; benefícios de testabilidade/gRPC não são resultados demonstrados.
- **Recomendação:** distinguir identificação de design existente de mudança implementada e corrigir a descrição, demonstrando benefícios em testes reais.

### 2.7 Atualização das métricas

- **Parcialmente atendido:** Riscos e contribuições registrados parcialmente; matriz desatualizada, métricas sem coleta e board com estados divergentes.
- **Não atendido:** Coleta final das métricas da Sprint 2, comparação com baseline/Sprint 1 e análise quantitativa planejado versus executado.

#### A7 — Métricas ausentes e riscos incoerentes

- **Categoria:** acompanhamento.
- **Evidência:** `docs/METRICAS.md:46–49` mantém a afirmação de que não há valores coletados; os históricos M-01 a M-06 continuam vazios e não foram alterados entre tags. Para M-04, conferência ainda não implementada pode justificar “não aplicável”, mas isso deveria constar expressamente. A issue #98 só foi encerrada em **22/10 às 22h26 (UTC−3)**; seu “Feito” atual no Project não comprova coleta na Sprint 2. `riscos.md:138–147` reconhece erro de estimativa e sobrecarga final, mas a matriz (`:111–117`) não acompanha as fichas: R02 está alto na ficha e médio na matriz, e outras reduções também não foram sincronizadas. Faltam estados e ações da próxima sprint sistematizados.
- **Impacto:** critério de acompanhamento significativamente incompleto; não se credita conclusão posterior.
- **Recomendação:** coletar dados no marco, analisar desvios e sincronizar matriz, fichas, responsáveis e mitigação.

### 2.8 Atualização dos riscos

- **Atendido:** Revisão de riscos da Sprint 2 e registro de contribuições com issues/PRs para quatro integrantes.

Achado relacionado: A7 (item 2.7).

### 2.9 Documentação atualizada

- **Atendido:** README operacional, documentação de API, registro de IA e release existentes.
- **Parcialmente atendido:** README, CI, Swagger, registro de IA e release úteis, mas incompletos ou inconsistentes com o artefato final.
- **Não atendido:** Declaração de responsabilidade pelo uso de IA equivalente à exigida pelo protocolo.

#### A10 — Documentação operacional e arquitetura não refletem integralmente o código

- **Categoria:** documentação/coerência técnica.
- **Evidência:** `README.md:149–153` lista Finanças, removida da Sidebar/rotas, e omite a página de clientes. `make down` (`README.md:184`) não existe: o Makefile define `down-dev`/`down-prod`. Há scripts de teste, mas não procedimento local claro para as duas suítes. `docs/CI.md` mantém placeholder e nomes/ordem de workflows divergentes. O planejamento diz reutilizar `GenericList`/`GenericSave`, removidos no incremento. A ADR-0006 explica TypeScript/SQL próprio, mas a arquitetura chamada de microsserviços na ADR-0005 corresponde, neste marco, a uma API compartilhada entre recursos: separar containers não demonstra decomposição de domínio.
- **Impacto:** instruções e visão arquitetural parcialmente confiáveis.
- **Recomendação:** revisar documentos contra o commit final, distinguindo decisão futura, topologia atual e funcionalidades efetivas.

#### A11 — Swagger e configuração de acesso com divergências

- **Categoria:** contratos/implementação.
- **Evidência:** `swagger.ts:12–18` usa servidor `http://localhost:8080`, mas Nginx encaminha API sob `/api/`; paths `/clientes` e `/produtos` não têm essa base. DELETE de cliente documenta objeto Cliente (`cliente.docs.ts:179–191`), mas controller/service retornam booleano. A descoberta Swagger busca `src/docs/**/*.ts`, enquanto a imagem runtime copia `dist`, não os fontes; o build verde não comprova disponibilidade das operações na documentação de produção. Produtos usam `localhost:5000`, clientes/categorias/fornecedores `localhost:8080/api`; isso não demonstra falha no ambiente local padrão, mas contraria consumo uniforme pelo gateway e limita implantação em outro host.
- **Impacto:** documentação executável/contratos não validados pelo CI.
- **Recomendação:** alinhar URL-base e schemas, incluir documentação no artefato runtime e parametrizar o acesso por ambiente, com smoke tests.

### 2.10 Release do marco

- **Não atendido:** Tag exata `v0.2.0` e conteúdo completo da release sobre padrões, testes, CI, limitações e pendências.

#### A12 — Release existente, porém incompleta e com tag divergente

- **Categoria:** documentação/release.
- **Evidência:** A [release `0.2.0`](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/releases/tag/0.2.0) aponta ao merge correto e lista entregas/PRs. O texto usa o cabeçalho `v0.2.0`, mas a tag efetiva é `0.2.0`. Não descreve adequadamente testes/resultados, situação do CI, padrões por nome, limitações e pendências. Publicação em 02/10 às 00h02min56s, enquanto o merge é de 01/10 às 23h54min39s (UTC−3).
- **Impacto:** marco parcialmente atendido, sem zerar a release nem classificar o código integrado no prazo como tardio. Não se aplica multa não prevista.
- **Recomendação:** publicar o marco com nome exato, resultados e limitações, no fechamento da entrega.

### 2.11 Registro das contribuições individuais

- **Não atendido:** Registro verificável de contribuição de Monica na Sprint 2.

#### A8 — Board existe, mas não fecha fielmente a etapa

- **Categoria:** processo GitHub/rastreabilidade.
- **Evidência:** O [Project 33](https://github.com/orgs/IFSC-ES2/projects/33) contém tarefas, responsáveis e PRs; as consultas cobriram as páginas disponíveis. #103 permanece “Fazendo” apesar de fechada e integrada por #104; #109 também aparece “Fazendo” e foi encerrada antes de abrir/integrar o PR correto #112. #89 foi movida para “Fazendo” em 01/10 às 19h04, após o merge às 19h03. A milestone `entrega-6` foi encerrada em 18/10, logo seu total atual não é retrato do prazo. As timelines permitem reconstruir casos, não todos os estados históricos.
- **Impacto:** acompanhamento parcial, sem acusação de falsificação ou abandono do board.
- **Recomendação:** reconciliar cartões/PRs e critérios antes do fechamento; preservar distinção entre duplicação, implementação e pendência.

#### A13 — Registro individual incompleto e IA com validação imprecisa

- **Categoria:** contribuições/uso de IA.
- **Evidência:** `CONTRIBUICOES-S2.md:5–41` vincula quatro integrantes a issues/PRs, mas a seção de Monica está vazia (`:42`) e o Scrum Master diverge entre README (Bernardo) e registro S2 (Victor). A menção de Monica na release não comprova trabalho. `USO-IA.md` referencia artefatos reais, mas a ADR tem nome diferente do citado, há descrição de categoria associada ao serviço frontend de produtos e falta declaração geral de responsabilidade.
- **Impacto:** rastreabilidade/precisão insuficientes, não prova de fraude ou uso oculto de IA.
- **Recomendação:** registrar responsabilidades efetivas, contribuição e validação humana verificáveis; conclusão específica de IA ao final.

#### Análise das Contribuições Individuais

A janela distingue o trabalho incorporado após `2e6d3ec` até `3e8e401`, as datas efetivas e a integração até 01/10. Há **54 commits não merge** incorporados: Bernardo 9, Daniel 21, Isac 17, Victor 7 e Monica 0. Um dos 17 de Isac (`35228b3`) tem data de 17/09 e foi incorporado depois; não é tratado como prova de trabalho realizado na janela S2. As contagens contextualizam, mas não determinam notas.

- **Bernardo Amaral Lisboa:** os nove commits são de 01/10, entre 14h21 e 19h39. Implementou model (`a4e1abc`), repository (`2dfe102`), service (`492a443`), controller (`b4c0eb9`), rotas (`0c086c5`) e testes (`a1e685b`) de clientes, com correções e integração pelo PR #107 às 19h43. Aderência forte ao backend/DBA. Aprovou seis PRs de colegas (#91/#106/#112/#116/#117/#118), inclusive #91 em 22/09: não se confunde ausência de commits antecipados com ausência de colaboração. O núcleo de que dependia a página de clientes só foi integrado no último dia, reduzindo a oportunidade de validação integrada. Não há registro suficiente para afirmar descumprimento de um compromisso interno específico ou bloqueio deliberado.

- **Daniel Luiz da Rocha Cordeiro:** 21 commits em 27/09 e 01/10, reunindo os aliases `daniel.lrc`/`daniellrc` associados à conta `Daniellrc`. Estilização, serviço HTTP, formulário/modal/página e testes de clientes (`262ae76`), correção do teste da Sidebar (`f00c69f`), documentação, riscos, contribuições, integração final e publicação da release. Aprovou #88/#96/#105, com nova aprovação após correção neste último. Contribuição ampla e central, mas o frontend de clientes entrou em 01/10 às 22h12 e planejamento/riscos/README se concentraram depois das 23h; as métricas sob responsabilidade compartilhada ficaram sem resultado. O próprio documento de riscos reconhece sobrecarga final. Não se atribui a ele absorção de tarefa especificamente abandonada por Monica sem evidência.

- **Isac Lehmkuhl dos Santos:** dos 17 commits incorporados, 16 se distribuem por 20/09, 22/09, 30/09 e 01/10; há também o commit anterior de Swagger citado acima. Refatorou modais, documentou API, implementou Sidebar/BaseLayout e componentes/testes, corrigiu integração em `46b19e7` e atualizou README/IA. PRs #88/#91/#105/#112 e seis aprovações (#104/#107/#108/#119/#120/#121) evidenciam apoio transversal. É a atuação mais distribuída no tempo. Sidebar/Swagger de clientes foram integrados perto do prazo e houve tentativas de PR com base incorreta, corrigidas sem merge indevido. A issue de métricas também o incluía. Os workflows já existiam e não foram modificados nesta sprint: não se lhe credita uma implementação nova de CI apenas pelo papel DevOps.

- **Monica Cancellier:** não foram encontrados commits, PRs, reviews ou artefatos diretamente atribuíveis a ela nesta sprint; sua seção no registro individual está vazia. A issue #77, herdada da Sprint 1 e atribuída a Monica, pedia `interface.md`, ausente no marco; foi encerrada por Daniel em 01/10 às 22h14, sem evidência de entrega da responsável. A menção como contribuinte da release não supre essa lacuna. As evidências não demonstram contribuição para pontuar o componente individual, mas isso não equivale a provar ausência absoluta de conversas, desenhos ou apoio por canais externos. Não se conta trabalho posterior de outubro como contribuição desta entrega.

- **Victor Eduardo Peixer Munarim:** sete commits em 27/09, 29/09 e 01/10, com seleção/exibição de categoria e fornecedor (`8741e3a`), ajustes de interfaces/testes, exclusão de produtos (`3f17f10`), edição (`0efdf79`) e ADR-0007 (`61693a3`), integrados por #96/#106/#108/#117. Há relevância funcional e alguma incrementalidade, apesar de poucos commits. Não houve aprovação de PR de colega no conjunto consultado. Como QA e Scrum Master registrado na S2, faltam coleta das métricas, revisão cruzada e comunicação rastreável de acompanhamento/impedimentos. A exclusão foi commitada em 29/09, mas integrada só em 01/10; edição também entrou no último dia. A ADR constitui contribuição documental, não autoria retroativa do pool/fachada existentes.

**Colaboração e limites:** PR #105 mostra reação a teste falho, correção de integração, nova execução verde e nova aprovação. Bernardo/Daniel/Isac realizaram revisões; as aprovações, em geral sem comentário, comprovam o ato formal, não a profundidade da leitura. Houve incrementos em 21/09, 22/09 e 28–29/09, mas backend/frontend centrais, edição e fechamento documental ficaram em 01/10. Isso reduz a oportunidade observável de revisão e estabilização, sem provar inatividade externa ou permitir atribuir causalidade individual a todo atraso. Não foram fornecidas avaliação entre pares, defesa ou justificativas externas de ausência. Evidências contemporâneas adicionais podem fundamentar revisão individual; simples atribuição retrospectiva de autoria não basta.

## 3. Critérios de Avaliação (10 pts)

### Nota da Entrega

| Critério | Máximo | Nota |
|---|---:|---:|
| Planejamento da Sprint 2 | 1,0 | 0,6 |
| Incremento funcional central, integrado e demonstrável | 2,0 | 1,4 |
| Testes automatizados coerentes e executáveis | 1,5 | 1,0 |
| Pelo menos dois padrões OO justificados | 1,5 | 1,0 |
| Métricas, riscos, backlog, board e contribuições | 1,0 | 0,4 |
| Fluxo de trabalho e CI | 1,5 | 1,3 |
| README, documentação, IA e release/tag | 1,5 | 0,8 |
| **Total** | **10,0** | **6,5** |

### Justificativa da Nota

**Nota coletiva: 6,5/10,0.** O incremento central é relevante, não apenas visual, e tem testes úteis, builds executados, aprovação e integração por merge commit. O bom fluxo efetivamente observado é reconhecido, inclusive a atuação do CI para impedir regressão em PR intermediário. Há decisões técnicas explicadas e artefatos documentais substanciais.

A pontuação não é integral porque o planejamento carece de dados e fechamento oportuno; a edição e validação apresentam lacunas funcionais; o módulo de clientes não corresponde à completude anunciada; faltam testes da integração HTTP/persistência; os dois padrões foram principalmente documentados retrospectivamente; nenhuma das seis fichas traz coleta da sprint; riscos/board/contribuições são incompletos; e instruções, Swagger, registro de IA e release divergem do estado final.

As lacunas são alocadas pelos efeitos próprios: defeito funcional no incremento, ausência de verificação em testes, precisão de instruções/relato na documentação e acompanhamento no critério específico. Não se aplica desconto integral duplicado por um mesmo defeito, não se exige todo o MVP concluído nesta sprint e não se confunde ausência de contribuição individual comprovada com ausência de mérito do produto coletivo. A proteção é reconhecida conclusivamente; limitações históricas não são convertidas em inexistência de regras. Publicação após a meia-noite é registrada sem multa temporal arbitrária.

### Notas Individuais

As notas avaliam contribuição observável, aderência às responsabilidades, relevância e resultado, rastreabilidade, periodicidade/oportunidade, integração, comunicação e colaboração. Não se aplica contagem de commits como medida isolada nem se presume desempenho pleno só porque o artefato final foi integrado.

| Integrante | Nota individual |
|---|---:|
| Bernardo Amaral Lisboa | **7,0** |
| Daniel Luiz da Rocha Cordeiro | **7,5** |
| Isac Lehmkuhl dos Santos | **8,5** |
| Monica Cancellier | **0,0** |
| Victor Eduardo Peixer Munarim | **7,0** |

- **Bernardo — 7,0:** implementação e testes centrais, com revisões úteis inclusive antecipadas; perda por concentração de toda a implementação no último dia e pouco espaço final para testar as dependências. A nota não desconsidera o valor de seus nove commits.
- **Daniel — 7,5:** atuação ampla em produto, testes, revisões e fechamento; perdas por planejamento/integração principais tardios e métricas compartilhadas pendentes, sem supor que tenha causado sozinho a sobrecarga.
- **Isac — 8,5:** melhor distribuição temporal, entregas transversais e apoio comprovado à integração/revisão; perdas por integração final próxima ao prazo, atritos operacionais corrigidos e pendência compartilhada de métricas.
- **Monica — 0,0:** contribuição da Sprint 2 não comprovada nas fontes examinadas. Não é punição apenas por zero commits: faltam também artefato de UI/UX, PR/review, registro individual e interação datada atribuível. A nota está sujeita à apresentação de evidências contemporâneas verificáveis, sem presunção de ausência absoluta de participação.
- **Victor — 7,0:** implementação relevante e distribuída em três dias, ajustes de testes e documentação; perdas por integração tardia de edição/exclusão e falta de evidência de revisão cruzada, métricas e acompanhamento compatíveis com QA/Scrum Master.

### Notas Compostas por Integrante

Seguindo o modelo de registro já adotado e solicitado pelo professor, as notas compostas combinam **30% da nota coletiva** e **70% da contribuição individual**. As pontuações dos critérios da entrega continuam sendo exclusivamente as da rubrica normativa.

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante | Nota coletiva | Nota individual | Cálculo | Nota composta |
|---|---:|---:|---:|---:|
| Bernardo Amaral Lisboa | 6,5 | 7,0 | `(6,5 × 0,30) + (7,0 × 0,70) = 6,85` | **6,9** |
| Daniel Luiz da Rocha Cordeiro | 6,5 | 7,5 | `(6,5 × 0,30) + (7,5 × 0,70) = 7,20` | **7,2** |
| Isac Lehmkuhl dos Santos | 6,5 | 8,5 | `(6,5 × 0,30) + (8,5 × 0,70) = 7,90` | **7,9** |
| Monica Cancellier | 6,5 | 0,0 | `(6,5 × 0,30) + (0,0 × 0,70) = 1,95` | **2,0** |
| Victor Eduardo Peixer Munarim | 6,5 | 7,0 | `(6,5 × 0,30) + (7,0 × 0,70) = 6,85` | **6,9** |

As notas de contribuição não foram transportadas de outra entrega: são justificadas pela janela da Sprint 2. As notas anteriores são preservadas em `NOTAS.md`, sem reavaliação das Entregas 1–5.

## 4. Observações

### Observações sobre Uso de IA

O `USO-IA.md` declara Gemini, Claude e Antigravity, com registros de templates, ADRs, planejamento anterior, regex, JOINs, testes, componentes, Swagger, navegação e clientes. A equipe declara **identificação de padrões já existentes** em 01/10 (`:99–103`), coerente com o histórico de pool/fachada preexistentes, embora a ADR use linguagem de aplicação/evolução mais forte.

- Templates, ADRs, baseline/estimativas, regex nos workflows e JOINs de `Produto.repository.ts` existem e são compatíveis com os tipos de apoio descritos. A execução manual dos JOINs no banco é relato da equipe, não reprodução local desta avaliação.
- Testes de categoria/componentes, Sidebar/Header/BaseLayout, formulários/modais/página de clientes e schemas Swagger existem, com conteúdo funcional e PRs revisados. CI verde sustenta execução automatizada de testes/build, não validação completa do comportamento integrado.
- O padrão literal `frontend/src/components/*/*.test.tsx` não corresponde à profundidade de vários testes, mas os artefatos são identificáveis. O registro de regex de 31/08 está duplicado.
- O arquivo de padrões existe como `ADR-0007-padroes-projeto-oo.md`, não `ADR-0007-padroes-de-projeto-oo.md` como declarado. Isso é erro de referência, não ausência da ADR.
- O registro de “ligação do banco de dados para Categoria.service” aponta `frontend/src/services/produto.service.ts`, serviço HTTP de produtos, sem identificar claramente a atividade.
- A validação declarada do Swagger não elimina URL-base/schema incorretos; a conferência de padrões deixou passar `init()` descrito como retorno de instância, embora retorne `void`. As afirmações de validação são, portanto, mais amplas que a evidência entregue.
- Não há declaração equivalente de revisão, compreensão, validação e responsabilidade integral, exigida pelo protocolo. A existência de revisões e CI é positiva, mas não substitui essa declaração nem demonstra domínio individual, a ser verificado na defesa.

**Conclusão explícita:** o uso declarado de IA é **substancialmente compatível com os tipos de apoio e a existência dos artefatos**, porém **parcialmente conforme quanto à precisão das referências, validação e responsabilidade documentada**. As divergências são verificáveis e afetam o critério documental; não há evidência concreta suficiente para afirmar apoio oculto de IA, plágio, falsificação ou ausência de compreensão. Estilo textual, contagem de testes e presença de IA declarada não são usados como prova de autoria indevida.

### Recomendações para a Equipe

- Planejar e distribuir as dependências no início da sprint, integrar incrementalmente e registrar progresso, impedimentos e replanejamento com oportunidade para revisão/testes.
- Distinguir CRUD de clientes/produtos de conclusão dos módulos do MVP; preservar critérios de inativação e histórico ao consolidar issues.
- Corrigir a atualização de valores nulos, validar dados em runtime e permitir apenas campos conhecidos na persistência.
- Acrescentar testes HTTP/API/PostgreSQL e dos novos fluxos de edição/exclusão; controlar chamadas de rede e documentar a execução local.
- Coletar as métricas no marco e sincronizar riscos, matriz, board, milestone e critérios de conclusão; não usar encerramento posterior como prova da etapa anterior.
- Ajustar contexto de check, restrições de merge e bypasses, ampliar filtros de CI e validar configurações relevantes.
- Alinhar README, planejamento, CI, Swagger e ADRs ao artefato efetivo; parametrizar URL-base e conferir documentação no container runtime.
- Publicar a tag exata e release com padrões, testes/CI, limitações e pendências; concluir antes do prazo definido.
- Registrar as contribuições de todos com evidências datadas, inclusive design e trabalho em pares; esclarecer o papel de Scrum Master.
- Revisar o registro de IA, corrigir caminhos/descrições e incluir declaração de responsabilidade e validação humana efetiva.
