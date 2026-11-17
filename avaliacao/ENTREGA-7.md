# Avaliação da Entrega 7 - Sprint 3

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: AURA — ERP para gestão de operações logísticas em distribuidoras
- Entrega: 7 - Sprint 3
- Repositório confirmado pela configuração: `IFSC-ES2/es2-2026_2-equipe-2`
- MVP declarado: cadastro/edição/consulta/inativação de clientes e histórico de pedidos; estoque com entradas/saídas, saldos por produto/depósito, alertas e histórico; conferência de recebimento/expedição, divergências e estados.
- Pull request final: [#155](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/155), `entrega-7` → `main`, aprovado sobre `7ade4dd`.
- Versão avaliada: `d389ed0`, merge do PR #155 em 22/10/2026 às 23h43min53s (UTC−3).
- Checkout consultado: `main`, commit `c034867`; o diff para a tag modifica somente `avaliacao/ENTREGA-6.md` e `avaliacao/NOTAS.md`.
- Tag e release: tag **`0.3.0`** (título da release `v0.3.0`), apontando ao merge; publicação em 22/10/2026 às 23h50min32s (UTC−3).

## Documentos Consultados

Somente documentos e artefatos do repositório avaliado:

- `README.md`, `USO-IA.md`, `api-estoque/README.md` e `frontend/README.md`.
- `.github/pull_request_template.md`, templates de issues em `.github/ISSUE_TEMPLATE/` e workflows em `.github/workflows/`.
- `docs/entregas/sprint-3.md`, `docs/ARQUITETURA.md` e `docs/REENGENHARIA.md`.
- Todos os oito ADRs em `docs/adrs/`, de ADR-0001 a ADR-0008, incluindo a decisão de backend monolítico modular.
- `docs/METRICAS.md` e fichas `docs/metricas/M-01.md` a `M-06.md`.
- `docs/riscos.md`, `docs/qualidade.md`, `docs/dod.md`, `docs/CI.md` e `docs/FLUXO-DE-TRABALHO.md`.
- `docs/BASELINE.md`, `docs/CAPACIDADE.md` e `docs/ESTIMATIVAS.md`.
- `docs/planejamento-S1.md`, `docs/escopo-S1.md` e `docs/planejamento-S2.md`.
- `docs/CONTRIBUICOES.md`, `docs/CONTRIBUICOES-S2.md` e `docs/CONTRIBUICOES-S3.md`.
- Documentação OpenAPI de pedidos em `api-estoque/src/docs/pedido/pedido.docs.ts` e `api-estoque/src/docs/schemas/pedido.schema.ts`.
- Código, testes, SQL, Makefile, manifests, Compose e configuração Nginx.
- PRs #136–#155, issues, milestones, reviews, checks, rulesets e [release `0.3.0`](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/releases/tag/0.3.0).
- [Project 33 — equipe 2](https://github.com/orgs/IFSC-ES2/projects/33): campos, 162 itens (28 do milestone `entrega-7`) e eventos de status (`ProjectV2ItemStatusChangedEvent`/`AddedToProjectV2Event`) consultados pela API GraphQL em 06/11/2026.

## 1. Descrição — Resumo da Entrega

O replanejamento em `docs/entregas/sprint-3.md:49–88` prioriza **pedidos e vendas**, adia baixa física para a Sprint 4, retira conferência do semestre e mantém fornecedores somente para consulta. A justificativa é concreta: pedidos conectam os cadastros existentes e preparam movimentações. Esses cortes foram considerados replanejamento explícito, não promessa de entregar todos os módulos originais na Sprint 3. Rastreamento, rotas, financeiro, integrações externas e carga/descarga estão fora do escopo declarado e não foram cobrados.

O incremento é relevante: CRUD de pedidos na API, persistência de cabeçalho e itens em transação, cálculo do total no backend, validações comerciais, Swagger e tela integrada de vendas com formulário, edição/exclusão, filtros, gráfico e ranking. PostgreSQL, SQL parametrizado e camadas Controller → Service → Repository sustentam o incremento. A evolução para backend monolítico modular é formalizada na ADR-0008. Testes são executados e exigidos no CI.

Entretanto, registrar pedido não baixa nem reserva estoque nesta versão; pedidos novos permanecem `PENDENTE`, sem transição operacional de conclusão/cancelamento. O gráfico não seleciona realmente o intervalo temporal anunciado. A refatoração de IDs, embora descrita como concluída, **não foi publicada no código**, e suas métricas finais são contraditas pelo snapshot. Métricas e riscos não encerram a Sprint 3, e o MVP replanejado não foi propagado ao README.

## 2. Itens Obrigatórios da Entrega

### 2.1 Inspeção e replanejamento da Sprint 3

- **Atendido:** diagnóstico concreto, prioridades e cortes claros em `docs/entregas/sprint-3.md:49–88`, com justificativa técnica para priorizar pedidos e vendas.
- **Parcialmente atendido:** formalização no fechamento (commit `e4f24e5`, do último dia, após o núcleo implementado) e ausência de confronto final quantitativo planejado × executado; ajustes de escopo não propagados às fontes principais.

#### A1 — MVP replanejado não propagado às fontes principais

- **Categoria:** escopo e documentação. 
- **Relevância:** média.
- **Evidência:** `docs/entregas/sprint-3.md:72,85–87` retira conferência e adia baixa; `README.md:76–81,111–116,126–131` mantém conferência como objetivo do semestre/essencial. O README ainda lista PRs S2 como “desta etapa” (`:46–57`) e não referencia planejamento/contribuições S3. O README do frontend mantém vendas em desenvolvimento e vinculada à conferência; o README da API chama o backend de microsserviço e omite pedidos da tabela de endpoints.
- **Impacto:** não há visão documental consolidada do escopo vigente. A inspeção S3 é concreta, mas não fecha sistematicamente planejado × entregue. O commit tardio do planejamento não prova inexistência de discussão anterior.
- **Recomendação:** preservar a visão original como histórico e indicar claramente o MVP revisado, funcionalidades concluídas, pendentes, adiadas e excluídas.

### 2.2 Incremento funcional da Sprint 3

- **Atendido:** pedidos/vendas reais, integrados e rastreáveis — repository transacional, regras de service, Swagger e UI de vendas; backend integrado antes da UI. Persistência transacional de cabeçalho/itens em `Pedido.repository.ts:29–120` (`BEGIN`, `COMMIT`, `ROLLBACK` e `release` em um `PoolClient`), total calculado no backend, SQL parametrizado e esquema com FKs, unicidade e checks positivos.
- **Parcialmente atendido:** lacunas na validação runtime de preço e na semântica dos indicadores limitam a consolidação; ciclo de estados não implementado. A baixa física adiada para a Sprint 4 não gera desconto autônomo.
- **Parcialmente atendido:** board atualizado — o Project 33 representa as tarefas da sprint e seus estados finais, mas só foi montado em 18/10 e foi movido apenas por automação (A14).

#### A2 — Validação de preço e estrutura depende de tipos não assegurados em runtime

- **Categoria:** implementação e regra comercial. 
- **Severidade:** alta; cenário derivado por análise estática, sem chamada à API/banco.
- **Evidência:** `api-estoque/src/controllers/PedidoController.ts:55–61,80–87` recebe o corpo sob interfaces TypeScript, sem validação estrutural runtime. `Pedido.service.ts:106–151` não exige preço numérico finito nem `Array.isArray(itens)`. `config/database.ts:1–11` não configura parser de `NUMERIC`; `repositories/BaseRepository.ts:27–32` devolve a linha de `pg` sem normalização. Em `Pedido.service.ts:137`, o limite superior compara diretamente `item.preco_unitario > produto.preco`.
- **Impacto:** com preço do PostgreSQL como string e preço de entrada também string, a comparação pode ser lexicográfica: `"100.00" > "75.49"` é falsa, permitindo contornar o teto comercial antes da gravação numérica. Interfaces não protegem a API de payload direto. Entradas sem preço ou com tipos/estrutura inadequados também podem chegar a erro interno/banco em vez do erro de validação documentado. Não é alegação de exploração executada.
- **Recomendação:** normalizar os valores do driver, validar esquema e tipos em runtime e testar os tipos reais retornados pelo banco, além dos mocks numéricos.

#### A3 — Indicadores de vendas não representam o período anunciado

- **Categoria:** comportamento funcional e documentação da interface. 
- **Severidade:** média.
- **Evidência:** `frontend/src/pages/Vendas/GraficoVendas/index.tsx:33–78` calcula total/ranking com todo o histórico não cancelado; `:89–176` muda agrupamentos por hora/dia/mês, sem restringir datas. O rótulo (`:187–188`) anuncia faturamento acumulado “do período”. `Vendas/index.tsx:254–258` passa todos os pedidos ao gráfico, sem propagar os filtros da tabela.
- **Impacto:** selecionar dia/semana/mês/ano não seleciona o intervalo esperado; dados de épocas diferentes podem ser agregados como se fossem do período. Pedidos pendentes entram no faturamento, cuja definição precisa ser explícita. Os testes da página não validam esse recorte temporal.
- **Recomendação:** definir regra de faturamento e intervalos, alinhar gráfico/filtros e testar datas de fronteira. Não se exige módulo financeiro, explicitamente fora do escopo.

#### A4 — Transações implementadas, mas seu alcance não equivale a ciclo completo de vendas/estoque

- **Categoria:** implementação e limites da verificação. 
- **Severidade:** média.
- **Evidência:** a validação de preço/produto ocorre antes da transação; não há teste real de rollback/concorrência no PostgreSQL. `pedido.service.test.ts` cobre consultas/criação com mocks, sem cobertura correspondente de update/delete. `conf/init-db.sql:43–57` prevê estados, mas repository/model não implementam transições; pedidos novos ficam pendentes e registros do seed concluídos/cancelados podem ser editados/excluídos. Nenhuma baixa/reserva é efetuada pelo fluxo S3.
- **Impacto:** a atomicidade de escrita tem fundamento no código, mas não prova execução ponta a ponta nem consistência comercial sob concorrência. A ausência de transições é limitação do CRUD, não obrigação nova inventada para a sprint.
- **Recomendação:** documentar limites da venda atual e ampliar testes para atualização/exclusão, falha intermediária e regras do ciclo.

### 2.3 Documentação da arquitetura

- **Atendido:** visões de contexto, contêineres e componentes em `docs/ARQUITETURA.md`, com boa aderência às camadas reais.
- **Parcialmente atendido:** HTTPS e exclusividade do proxy não correspondem integralmente à configuração entregue.

#### A5 — Arquitetura boa, com infraestrutura representada de forma inexata

- **Categoria:** arquitetura efetiva. 
- **Relevância:** média/localizada.
- **Evidência:** `docs/ARQUITETURA.md:18,47` indica HTTPS, enquanto `conf/nginx.conf.template:8–29` configura somente HTTP/porta 80; publicar a porta 443 no Compose não configura TLS. `ARQUITETURA.md:40,56–58,117` chama o Nginx de ponto único, mas o Compose também expõe frontend/API diretamente; `frontend/src/services/produto.service.ts:13` usa a porta 5000 e `pedido.service.ts:8` fixa `http://localhost:8080/api/pedidos`.
- **Impacto:** contexto/contêineres/componentes e camadas são reconhecidos; porém a visão não explica todo o tráfego real. URL localhost limita acesso de outros computadores e não corresponde a evolução sem alterar clientes.
- **Recomendação:** separar acesso recomendado, portas efetivamente expostas e hipótese futura de implantação; documentar HTTP local e parametrizar o endereço da API quando aplicável.

### 2.4 ADRs consolidados

- **Atendido:** superações formalizadas (ADR-0002 superada pela ADR-0006; ADR-0005 parcialmente superada pela ADR-0008) e ADR-0008 pertinente, com alternativas/consequências e boa justificativa do backend único e transações locais.
- **Parcialmente atendido:** status e algumas justificativas/correspondências anteriores ainda incompletos.

#### A6 — Consolidação dos ADRs é real, mas ainda incompleta

- **Categoria:** decisões técnicas. 
- **Relevância:** baixa/média.
- **Evidência:** ADR-0001/0007 não têm status explícito; ADR-0006 contém justificativa interrompida e associação não demonstrada entre ORM/vazamento e SQL próprio/segurança. ADR-0007:35 diz que `init()` retorna Express, mas `api-estoque/src/App.ts:18–21` retorna `void`.
- **Impacto:** decisões fundamentais estão mais coerentes que antes, sem atendimento integral ao histórico e às consequências declaradas.
- **Recomendação:** completar status e argumentos técnicos e revisar afirmações contra assinaturas/artefatos reais. Não foi exigida ADR adicional para a extração interna de ID, cujo baixo impacto arquitetural é justificável.

### 2.5 Manutenção/reengenharia

- **Atendido:** diagnóstico de duplicação real na validação de IDs, PR identificável ([#144](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/144)) e testes adicionais de controller.
- **Não atendido:** a extração de validação descrita não foi executada no código entregue.

#### A7 — Refatoração principal declarada, mas ausente da entrega

- **Categoria:** reengenharia e aderência aos requisitos. 
- **Severidade:** alta.
- **Evidência:** `docs/REENGENHARIA.md:23–29` declara criação de `api-estoque/src/utils/assertValidId.ts` e substituição de nove blocos nos services. A árvore da tag não contém a função nem `api-estoque/test/utils/assertValidId.test.ts`. Os nove blocos continuam em `Categoria.service.ts:43–44,99–100,132–133`, `Cliente.service.ts:38–39,105–106,144–145` e `Produto.service.ts:48–49,119–120,161–162`, sob `api-estoque/src/services/`. O PR #144 altera somente `USO-IA.md`, o relatório de reengenharia e o teste de controllers; não altera os services nem cria o utilitário. A comparação com `0.2.0` confirma nove blocos antes e nove depois nos três services indicados.
- **Impacto:** a intervenção central exigida não está comprovada. Os testes adicionais são trabalho real, mas não materializam a refatoração. É a principal perda no critério de reengenharia; não se aplica desconto integral repetido em fluxo Git por essa mesma ausência.
- **Recomendação:** confrontar relatório e diff antes de declarar conclusão; publicar e validar a intervenção ou registrar honestamente sua pendência.

### 2.6 Comparação de métrica antes/depois da reengenharia

- **Parcialmente atendido:** `REENGENHARIA.md` apresenta valores antes/depois, mas eles não correspondem à árvore publicada.
- **Não atendido:** antes/depois verdadeiro da intervenção, já que a extração não foi entregue.

#### A8 — Métricas e validação da reengenharia contradizem o snapshot

- **Categoria:** testes, mensuração e confiabilidade documental. 
- **Severidade:** alta, associada a A7.
- **Evidência:** `REENGENHARIA.md:35–55` afirma seis testes do utilitário, 36 testes de controller, redução de nove para zero blocos e nove chamadas novas. `api-estoque/test/controllers/validacao-id.controller.test.ts:81–99` tem 27 casos parametrizados de IDs inválidos, sem o cenário válido anunciado. O utilitário e seus testes não existem. O CI final registra 144 testes backend, não os 135 declarados.
- **Impacto:** os resultados “depois” não são reproduzíveis no marco. Pipeline verde não comprova diminuição de duplicação nem execução de teste ausente. A divergência é factual; não se atribui intenção ou fraude. A7 e A8 compõem uma única insuficiência central de reengenharia, sem descontos cumulativos independentes fora da rubrica; o crédito residual é pelo diagnóstico, PR e testes verificáveis.
- **Recomendação:** fixar SHA-base e SHA-final, registrar saída efetiva e distinguir experimentos locais do que foi versionado.

### 2.7 Testes automatizados integrados ao pipeline

- **Atendido:** testes versionados executados automaticamente em PR, falhas propagadas ao check e checks de build/teste obrigatórios confirmados por rulesets (`23062294` e `24337699`). Execução verde efetiva no fechamento: run 39890446079, com 144 testes backend e 106 frontend aprovados antes da aprovação/merge do PR #155. Avisos de testes/dependências não foram tratados como falha da execução aprovada.

### 2.8 Atualização de métricas, riscos e documentação

- **Atendido:** documentação e declaração de IA extensas; READMEs internos atualizados na sprint.
- **Parcialmente atendido:** instruções de execução incompatíveis com o ambiente entregue; validação declarada no registro de IA não sustentada para a reengenharia.
- **Não atendido:** atualização das métricas com valores S3 e revisão dos riscos para a sprint.

#### A9 — Métricas e riscos não encerram a Sprint 3

- **Categoria:** acompanhamento do projeto. 
- **Relevância:** média/alta.
- **Evidência:** as fichas M-01 a M-06 publicadas terminam em **01/10/S2**, não em 22/10; `docs/METRICAS.md:48` ainda afirma ausência de valores coletados. M-03 usa commits de fix como bugs sem demonstrar equivalência; M-06 define velocidade em esforço, mas registra quantidades de issues/PRs/commits. `docs/riscos.md:138–147` só apresenta revisão S2 e R04 mantém pressuposto de microsserviços. O documento de riscos não mudou entre as tags S2 e S3. A issue #133 foi encerrada, mas a revisão S3 não está materializada; #130 permanece aberta. Acréscimos de 01/11 em outra branch não corrigem o marco avaliado.
- **Impacto:** a fundamentação por métricas/riscos é mencionada, mas sem coleta atual verificável nem comparação consistente com baseline. Não se confunde data do commit com data do fenômeno medido.
- **Recomendação:** coletar valores S3 com população, unidade, janela e fonte; revisar estados/ações dos riscos e relacionar qualidade aos resultados efetivamente observados. Não usar quantidade de commits como medida isolada de produtividade ou contribuição.

#### A10 — Instruções de execução incompatíveis com o ambiente entregue

- **Categoria:** reprodutibilidade e documentação. 
- **Relevância:** média.
- **Evidência:** `README.md:169–178`, o README da API e o README do frontend orientam criar `.env.development`; `docker-compose.dev.yaml:3–4,9–10,28–29` exige `.env` e o Makefile não passa `--env-file .env.development`. `README.md:190–194` manda `make down`; os alvos reais são `down-dev` e `down-prod`. O README da API informa TypeScript 7.0, enquanto o manifesto declara 6.0.2, e descreve validação de CPF/CNPJ/telefone não demonstrada pelo service de cliente.
- **Impacto:** um clone limpo seguindo a sequência publicada não recebe o ambiente esperado. CI verde não elimina esse problema: o workflow de build prepara `.env` por outro procedimento. Não houve execução de containers nesta avaliação.
- **Recomendação:** revisar comandos/nomes e validar instruções a partir de ambiente limpo; separar validação estrutural de dados da mera presença/normalização de campos.

#### A11 — Validação declarada no registro de IA incompatível com parte da entrega

- **Categoria:** IA e confiabilidade documental. 
- **Relevância:** alta no caso da reengenharia.
- **Evidência:** `USO-IA.md:154–158` afirma conferência de contagens/resultados da reengenharia que não correspondem à árvore publicada: função/testes ausentes e duplicação preservada (A7/A8).
- **Impacto:** o problema é a afirmação de que contagens/resultados foram conferidos, apesar da ausência dos artefatos centrais. A inspeção não permite concluir se houve experimento local não publicado, erro de integração ou outra causa, nem intenção de enganar. A falha de reengenharia é pontuada principalmente no critério de reengenharia; o critério documental já tem perdas independentes por métricas, riscos e execução, sem nova sanção autônoma por IA.
- **Recomendação:** associar registros a SHA/PR e resultados verificáveis, corrigir caminhos e explicitar validação local não publicada quando for o caso.

### 2.9 Fluxo de trabalho evidenciado no repositório

- **Atendido:** ramificação `entrega-7`, 14 PRs integrados no recorte com aprovações cruzadas, CI verde, aprovação de Victor sobre o último head do PR #155 e integração por merge commit. Não há evidência de desenvolvimento direto indevido na `main`.
- **Parcialmente atendido:** check de fluxo exigido com nome inconsistente; revisão técnica pouco documentada.

#### A12 — Proteção e checks obrigatórios existentes; inconsistência localizada no fluxo da main

- **Categoria:** processo GitHub. 
- **Relevância:** média/localizada.
- **Evidência:** a proteção clássica de `main` exige uma aprovação e aplica-se a administradores, mas tem listas próprias de checks vazias. Isso é complementado pelos **rulesets efetivos**: `23062294` exige `build-api-estoque`/`build-frontend` e `24337699` exige `test-api-estoque`/`test-frontend` em `main` e `entrega-7`, sem bypass nesses rulesets. Em `entrega-7`, o ruleset `21973440` exige PR/uma aprovação, somente merge e `check-branch-name`. O 404 clássico dessa branch não significa ausência de proteção. Lacuna: o ruleset `21973259` da `main` exige `check-main-pull-request`, mas o job emitido é `check-branch-name`; há bypass `always` de dois usuários nesse ruleset específico, um identificado como Daniel. Isso não estende bypass aos checks de build/teste e não comprova push direto indevido. A configuração permite globalmente squash/rebase, embora a entrega tenha usado corretamente merge e `entrega-*` restrinja esse método.
- **Impacto:** Builds/testes são obrigatórios; não se afirma o contrário com base somente no endpoint clássico. A ressalva é a robustez da regra de fluxo/nome. As consultas atuais não substituem auditoria histórica completa.
- **Recomendação:** alinhar nomes dos checks exigidos/emitidos e revisar exceções e métodos disponíveis conforme a política adotada.

### 2.10 Release/tag do marco

- **Atendido:** release publicada no prazo, apontando para o merge correto (`d389ed0`).
- **Parcialmente atendido:** notas não delimitam bem testes, refatoração e limitações.
- **Não atendido:** tag com o nome exato `v0.3.0`.

#### A13 — Fluxo rastreável, revisão formal com pouca discussão e release nominalmente divergente

- **Categoria:** Git, colaboração e publicação. **Relevância:** baixa/média.
- **Evidência:** as aprovações consultadas têm corpo vazio e checklists majoritariamente não preenchidos; as consultas não localizaram comentários de revisão detalhados. A release existe e aponta para o merge correto, mas a tag `0.3.0` não cumpre o nome `v0.3.0`, e as notas não delimitam bem testes/refatoração/limitações.
- **Impacto:** colaboração e aprovação são reconhecidas; a ausência de discussão registrada limita a comprovação de profundidade, sem provar revisão inexistente. Fechamentos de issues/milestone em 30/10 não anulam a publicação de 22/10. Trata-se de divergência nominal, não de ausência de publicação.
- **Recomendação:** utilizar checklists, registrar verificações e limitações, corrigir a identificação dos próximos marcos e alinhar a release à realidade do artefato, sem mover silenciosamente tag publicada.

### 2.11 Registro de contribuição individual

- **Atendido:** `docs/CONTRIBUICOES-S3.md` registra atividades por integrante, rastreáveis a commits, PRs e revisões.
- **Parcialmente atendido:** papéis e redistribuições (Scrum Master, #132, #133) não estão claramente formalizados. O board confirma atribuições por issue, mas foi montado tardiamente (A14).

#### A14 — Project 33 consultado: quadro completo, montado tardiamente e movido só por automação

- **Categoria:** processo GitHub / backlog, board e contribuições.
- **Relevância:** média.
- **Evidência:** o [Project 33](https://github.com/orgs/IFSC-ES2/projects/33) tem 162 itens (issues e PRs) com `Status` (`Backlog`, `A fazer`, `Fazendo`, `Feito`) e milestone; 28 pertencem a `entrega-7`, cobrindo todos os itens obrigatórios da definição (#124–#135 e #149), com responsáveis. As issues #124–#134 foram criadas e adicionadas ao quadro por Daniel em **18/10, entre 18h02 e 18h39** (UTC−3), e #135 em 19/10 às 00h28 — **17 dias após o início da sprint**. Todas as mudanças de status posteriores são de `github-project-automation`, disparadas por vínculo e merge de PRs: #125 `Fazendo` em 19/10 e `Feito` em 21/10; #135 `Fazendo` em 20/10 e `Feito` em 21/10; #126 `Fazendo`/`Feito` em 21/10; #129 `Fazendo`/`Feito` em 22/10 às 19h14/19h50; #127/#128 `Feito` em 22/10 às 20h13; #124/#131/#133 `Feito` em 22/10 às 22h26–22h27; #134 às 22h59. #149 foi criada às 21h36 de 22/10 e encerrada às 22h26. #130 (métricas) permanece `A fazer`, coerente com A9. **#133 (riscos) está `Feito`**, embora a revisão S3 não esteja materializada (A9). **#132 (release) só passou a `Feito` em 30/10** às 00h23, oito dias após a publicação.
- **Impacto:** o quadro é real, cobre o escopo da sprint e os estados finais correspondem em geral ao trabalho integrado; a automação reflete de forma confiável os PRs. Porém, antes de 18/10 não havia representação rastreável da Sprint 3, o que corrobora o planejamento tardio (A1) e a ausência de commits entre 02 e 17/10. Não há movimentação manual que indique progresso fora dos PRs, e dois estados não representam o trabalho real (#133 concluída sem entrega; #132 reconciliada após o prazo). As atribuições confirmam Daniel como organizador do quadro e a atribuição de #129 a Bernardo, de #133/#134 a Victor e de #149 a Monica somente em 22/10.
- **Recomendação:** montar o quadro no início da sprint, movimentar os cartões também quando o trabalho começa fora de um PR e só marcar `Feito` itens cujo critério de aceitação foi cumprido.

#### Análise das Contribuições Individuais

Janela: fechamento S2 em 01/10 até publicação S3 em 22/10. Não foram localizados commits de desenvolvimento S3 entre 02 e 17/10 nas referências disponíveis; isso indica **ausência de atividade rastreável nessas fontes**, não ausência absoluta de trabalho. As contagens excluem merges e são auxiliares. Não se transportaram avaliações de outras equipes nem notas anteriores como prova da participação nesta entrega.

- **Bernardo Amaral Lisboa:** quatro commits próprios em 22/10, entre 19h06 e 19h18; `126d532`/`cc6ddda` adicionam/ajustam testes de controllers; `22192f5` documenta a reengenharia; PR #144. Aprova #136 em 19/10 e #139 em 21/10, demonstrando colaboração anterior ao último dia. A #129 e o registro S3 lhe atribuem a refatoração; função, substituições e teste unitário não estão entregues. Há testes úteis, mas eles não cumprem a intervenção prometida. A #132 termina atribuída a Bernardo, enquanto a autoria da release é de Daniel; o apoio de Bernardo não é excluído, mas a publicação por ele não foi comprovada. Produção própria concentrada no fechamento; não há evidência equivalente de organização contínua como Scrum Master nem comunicação rastreável explicando o resultado não publicado. Não se presume fraude ou ausência total de colaboração.

- **Daniel Luiz da Rocha Cordeiro:** 21 commits próprios em 18, 19, 20 e 22/10. `a054190` implementa o repository transacional; `d0793a7`, regras de service; `d454a62`, testes; `8e5df44`/`ff1ac89` evoluem atualização/regras. `27799d9`, `c28dd87` e `e4f24e5` registram arquitetura, ADR-0008 e inspeção. PRs #136/#137/#145/#150, integração #155 e publicação da release. A principal implementação backend antecede e habilita a UI; criação de issues/milestone, revisão de vários PRs e fechamento técnico evidenciam articulação. Entregas incrementais em quatro dias, mas início rastreável apenas em 18/10 numa janela de três semanas; planejamento formal do último dia. A #136 necessitou complemento em #137; a aprovação de #144 não detectou a extração ausente; testes não acompanham integralmente update/delete/transação. A atualização de métricas de 01/11 não foi creditada como trabalho publicado em S3.

- **Isac Lehmkuhl dos Santos:** 17 commits próprios em 19–22/10. `8bd7592`/`05621ac` documentam Swagger; `9339d26` integra serviço HTTP; `886f090` e `7495140` implementam formulário/modal e página; `1f23ba5` amplia o seed; `e52e333` ajusta o ambiente; `7720c42` padroniza `npm ci`. PRs #139/#143/#148, revisões #137/#145/#146 e registro de contribuições. Entrega a interface funcional central e infraestrutura além do papel estrito de DevOps; o backend integrado em 19–20/10 precede sua UI em 21/10, evidenciando integração entre as partes. Concentração nos quatro últimos dias; o PR #143 mistura várias responsabilidades. #138/#141 foram abertos inicialmente para `main`, fechados sem merge após falha de nome e substituídos por #139/#143 para `entrega-7`: retrabalho corrigido, não integração indevida efetivada. A migração para `.env` não foi propagada aos READMEs e os indicadores de vendas têm limites funcionais.

- **Monica Cancellier:** dois commits próprios integrados, `f69cd15` e `fb2f2ed`, em 22/10 às 22h12/22h15; READMEs da API/frontend nos PRs #152/#153, aprovados por Daniel. Os commits `2af2846`, `872b737` e `cb026a8`, de 21–22/10 em `origin/recuperacao-1`, incluem definição de interface; sua existência é reconhecida, mas não integram o marco S3 nem foram contados como implementação entregue nesta sprint. Esses commits também não foram aceitos como recuperação da Entrega 5 (issue #77): não houve PR para `main` nem foi seguido o rito de recuperação. A tarefa #149 foi criada, atribuída e incluída no board por Daniel às 21h36 de 22/10 e encerrada por ele às 22h26; toda a produção integrada de Monica ocorreu em cerca de uma hora, no fechamento da sprint. Não se imputa atraso anterior à atribuição dessa tarefa, mas também não há outra responsabilidade rastreável cumprida por ela na janela. Os READMEs não refletem o incremento da própria Sprint 3: o da API não menciona pedidos, funcionalidade central da sprint, e descreve o backend como microsserviço, contrariando a ADR-0008; o do frontend apresenta Vendas como módulo “em desenvolvimento” vinculado à conferência retirada do escopo; ambos orientam a criação de `.env.development`, incompatível com o Compose, e há divergência de versão do TypeScript. O alcance técnico e a utilidade desses documentos para a entrega são, portanto, pequenos. Não foi localizada revisão sua nos 14 PRs integrados, nem comentário de progresso ou impedimento; o registro de sua contribuição em `CONTRIBUICOES-S3.md` foi feito por Isac (`03e5c7e`). A UI funcional foi de Isac, a quem a #126 já estava atribuída; não há base para afirmar que ele absorveu tarefa formalmente atribuída a Monica.

- **Victor Eduardo Peixer Munarim:** quatro commits próprios em 22/10. `c552453` ajusta lint/dependências/configuração e fontes/testes; `dde5740` trata métricas; `7684e3f`/`b988651` atualizam o README. PRs #146/#151/#154; aprovações #143 em 21/10 e #150/#155 em 22/10, incluindo o último head do fechamento. A contribuição técnica não se resume a documentação, e a aprovação final é colaboração verificável. Entretanto, a revisão de riscos atribuída em #133 não produz revisão S3 publicada nem justificativa de manutenção; métricas não encerram S3. Testes novos centrais são rastreáveis principalmente a Daniel/Bernardo; não há evidência equivalente de plano/execução sistemática de QA por Victor. O README continua referindo PRs S2, e o registro S3 o chama também de Scrum Master, diferente do README, sem formalização suficientemente clara da mudança de papéis.

**Colaboração e limites:** o backend antecedeu o frontend e ambos tiveram CI verde antes do merge. Bernardo, Monica e Victor concentram commits próprios no último dia, mas Bernardo e Victor têm revisões anteriores. Consultas de comentários não localizaram discussões de impedimentos, redistribuição ou revisão profunda, o que limita o reconhecimento de comunicação sem provar falta de conversa fora do GitHub. A concentração final reduz a oportunidade observável de validação integrada, mas não se atribuiu a um aluno um bloqueio causal ou atraso coletivo não demonstrado. O efeito técnico comprovado mais importante é a revisão/integração de #144 sem a refatoração anunciada. As notas podem ser revistas mediante evidências contemporâneas verificáveis.

## 3. Critérios de Avaliação (10 pts)

### Nota da Entrega

| Critério | Máximo | Nota |
|---|---:|---:|
| Inspeção e replanejamento | 1,0 | 0,8 |
| Incremento funcional da Sprint 3 | 1,5 | 1,2 |
| Arquitetura real documentada | 1,5 | 1,2 |
| ADRs revisados e consolidados | 1,0 | 0,8 |
| Reengenharia, PR e métrica antes/depois | 1,5 | 0,2 |
| Testes automatizados integrados ao CI | 1,0 | 1,0 |
| Métricas, riscos, documentação, README e IA | 1,0 | 0,3 |
| Fluxo de trabalho, checks, merge e release | 1,5 | 1,2 |
| **Total** | **10,0** | **6,7** |

### Justificativa da Nota

**Nota coletiva: 6,7/10,0.** O produto evoluiu de cadastros para pedidos/vendas integrados, com arquitetura mais coerente, nova ADR pertinente e testes executados e exigidos no CI. Branch, PRs, revisões cruzadas, CI verde, merge commit e release estão comprovados. Isso recebe crédito substancial.

A nota é limitada principalmente pela ausência da refatoração anunciada e pela mensuração incompatível com o snapshot (A7/A8), com crédito residual apenas pelo diagnóstico, PR e testes verificáveis; e pelo acompanhamento S3 não consolidado — métricas e riscos sem fechamento, instruções incompatíveis e validação declarada não sustentada (A9–A11). Somam-se fragilidades funcionais localizadas (A2–A4), imprecisões de arquitetura e ADRs (A5–A6), escopo replanejado não propagado (A1), check de fluxo inconsistente (A12) e tag nominalmente incorreta (A13).

Não foi exigida conclusão da conferência retirada do escopo, baixa física adiada, financeiro ou integrações externas. Descontos são alocados por efeito, sem perda integral duplicada pelo mesmo problema: a ausência da refatoração não é descontada novamente em fluxo Git nem no registro de IA.

### Notas Individuais

Escala 0–10, considerando conteúdo, relevância, aderência às responsabilidades, periodicidade/oportunidade, integração, revisão, comunicação e apoio aos colegas; não são proporcionais à contagem de commits.

| Integrante | Nota individual | Justificativa resumida |
|---|---:|---|
| Bernardo Amaral Lisboa | **4,5** | Testes e revisões reais, mas cumprimento parcial do compromisso central de reengenharia e divergência grave de validação. |
| Daniel Luiz da Rocha Cordeiro | **8,5** | Contribuição central e integradora forte no backend, arquitetura, ADR e fechamento; desconto por acompanhamento temporal curto, revisão falha de #144 e consolidação parcial. |
| Isac Lehmkuhl dos Santos | **8,5** | Interface funcional central, Swagger, infraestrutura e revisões; sem comprovação de acompanhamento durante toda a janela nem fechamento documental inteiramente consistente. |
| Monica Cancellier | **1,5** | Contribuição pequena: dois READMEs produzidos em cerca de uma hora no fechamento, desalinhados do incremento da sprint, sem revisões, comunicação rastreável ou registro próprio; trabalho em branch de recuperação fora do marco e não aceito como recuperação. |
| Victor Eduardo Peixer Munarim | **6,0** | Correções técnicas e aprovação final úteis; alcance de QA/acompanhamento abaixo das responsabilidades e documentação final insuficientemente validada. |

### Notas Compostas por Integrante

A nota composta da Entrega 7 combina 30% da nota coletiva e 70% da contribuição individual, com peso 10 para a entrega. Os critérios técnicos continuam exclusivamente os da rubrica normativa. A média parcial está registrada em `NOTAS.md`.

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante | Coletiva | Individual | Cálculo | Nota composta |
|---|---:|---:|---:|---:|
| Bernardo Amaral Lisboa | 6,7 | 4,5 | `(6,7 × 0,30) + (4,5 × 0,70) = 5,16` | **5,2** |
| Daniel Luiz da Rocha Cordeiro | 6,7 | 8,5 | `(6,7 × 0,30) + (8,5 × 0,70) = 7,96` | **8,0** |
| Isac Lehmkuhl dos Santos | 6,7 | 8,5 | `(6,7 × 0,30) + (8,5 × 0,70) = 7,96` | **8,0** |
| Monica Cancellier | 6,7 | 1,5 | `(6,7 × 0,30) + (1,5 × 0,70) = 3,06` | **3,1** |
| Victor Eduardo Peixer Munarim | 6,7 | 6,0 | `(6,7 × 0,30) + (6,0 × 0,70) = 6,21` | **6,2** |

## 4. Observações

### Observações sobre Uso de IA

Foi lido integralmente `USO-IA.md`. Não se penalizou o uso de IA por si só nem se atribuiu autoria pela aparência de código/texto.

| Declarações | Artefatos e compatibilidade |
|---|---|
| Templates, ADRs, BASELINE, ESTIMATIVAS e regex de workflows | Arquivos correspondentes existem; o template de ADR é referenciado genericamente. Há registro duplicado de regex. |
| Componentes, testes frontend, Sidebar/Header/BaseLayout e formulários de clientes | Diretórios e testes existem, compatíveis com a categoria de apoio declarada. Referências amplas não provam todas as validações manuais relatadas. |
| Joins de produtos, testes de categorias e schemas/Swagger de clientes/produtos | Arquivos existem e correspondem em geral às atividades. A entrada de `produto.service.ts` descreve “ligação do banco para Categoria.service”, imprecisa para um cliente HTTP de produtos. |
| ADR-0007 | A decisão existe como `ADR-0007-padroes-projeto-oo.md`; o registro usa `ADR-0007-padroes-de-projeto-oo.md`. Erro de caminho, não ausência da decisão. |
| CRUD de pedidos, testes de PedidoService e Swagger | Repository/service/controller, suíte e documentação existem. Testes do service concentram-se em consulta/criação, com mocks. |
| Seed, gráfico/filtros, OrderItemAdder, formulário e integração de pedidos | Artefatos existem, com as limitações temporais/contratuais descritas nos achados. Validação ponta a ponta integral de criação/edição/exclusão não ficou comprovada pelos testes versionados. |
| Reengenharia e conferência de contagens/testes | Documento existe, mas `USO-IA.md:154–158` afirma conferência de resultados que não correspondem à árvore publicada (A11). |
| Arquitetura, ADR-0008 e planejamento S3 | Existem e são amplamente compatíveis com o apoio declarado, com imprecisões documentadas na avaliação. |

**Conclusão explícita:** a declaração é **amplamente compatível quanto aos tipos de apoio e à existência da maioria dos artefatos**, mas **parcialmente divergente quanto à validação dos resultados**, sobretudo da reengenharia. Não foram encontrados indícios fortes suficientes de apoio relevante de IA sem declaração correspondente. Não há fundamento para acusar uso oculto com base em estilo ou volume. O impacto está na confiabilidade do que foi entregue e revisado, não na ferramenta utilizada. A compreensão técnica deverá ser verificada na defesa.

### Recomendações para a Equipe

- Reconciliar imediatamente reengenharia e artefato publicado: confirmar o que foi efetivamente implementado, medir a árvore real e corrigir o relato de validação, sem confundir CI verde com transformação de design.
- Fechar o acompanhamento S3: métricas comparáveis, riscos com evidência/status/ação, fontes e revisão do planejado × executado.
- Consolidar escopo e execução: README vigente, comandos corretos de ambiente/encerramento e READMEs internos alinhados a pedidos e ao monólito.
- Robustecer o incremento: validação runtime de payload/preço, semântica temporal do gráfico, testes de atualização/exclusão/rollback e limites claros de status/estoque.
- Separar acesso recomendado e portas expostas na arquitetura, documentar HTTP local e completar status e justificativas dos ADRs.
- Melhorar revisão e fluxo: exigir o nome correto do check, usar checklists com evidência, revisar em parcelas menores antes do fechamento e publicar tags conforme o padrão exigido.
- Montar o Project 33 no início da sprint e marcar `Feito` apenas itens com critério de aceitação cumprido (#133), reconciliando estados no fechamento (#132).
- Qualificar registros individuais e de IA: identificar resultados, revisão, SHA/PR, redistribuição e validação de cada artefato, sem declarar contagens não verificáveis no marco.
