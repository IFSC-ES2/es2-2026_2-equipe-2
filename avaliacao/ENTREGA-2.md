# Avaliação da Entrega 2 - Inception

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: ERP para gestão de operações logísticas em distribuidoras
- Entrega: 2 - Inception
- Data limite considerada para avaliação: 15/08/2026
- Pull request avaliado: PR #21, branch `entrega-2` para `main`

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `docs/dod.md`.
- `docs/adrs/ADR-0001-stack-front-end.md`.
- `docs/adrs/ADR-0002-stack-backend.md`.
- `docs/adrs/ADR-0003-banco-dados.md`.
- `docs/adrs/ADR-0004-containerizacao-aplicacao.md`.
- `docs/adrs/ADR-0005-arquitetura-microsservicos.md`.
- `.github/ISSUE_TEMPLATE/bug_report.md`.
- `.github/ISSUE_TEMPLATE/custom_issue.md`.
- `.github/ISSUE_TEMPLATE/feature_request.md`.
- `.github/PULL_REQUEST_TEMPLATE/bugfix.md`.
- `.github/PULL_REQUEST_TEMPLATE/feature.md`.
- Issues GitHub #3, #4, #7, #8, #9, #10, #11 e #12.
- Pull requests GitHub #13, #15, #16, #17, #18, #19, #20 e #21.
- Histórico Git local e remoto atualizado após `git fetch origin`.

## Resumo da Entrega

A equipe entregou uma Inception registrada principalmente no README, com visão do produto, definição de MVP, referências ao board e backlog, DoD em `docs/dod.md` e cinco ADRs iniciais. O backlog foi criado em issues e a integração final ocorreu pela branch `entrega-2`, mesclada ao ramo `main` por meio do PR #21. A avaliação foi refeita após atualização das referências remotas, considerando `origin/main` no commit `97d9e30`.

A entrega evoluiu em relação ao Kickoff, corrigindo matrículas e Scrum Master, reduzindo o MVP, corrigindo referências do README e criando documentação arquitetural relevante. As principais lacunas estão na ausência de um documento específico de Inception em `docs/`, no backlog ainda concentrado em apenas parte do MVP, em checks ausentes e em uma decisão arquitetural de microsserviços que parece complexa para o recorte atual.

## Critérios Atendidos

- O README apresenta a visão do produto, incluindo problema, área de aplicação, usuários, contexto, proposta de valor, objetivos do semestre e premissas/restrições.
- O tema permanece coerente com a linha temática de gestão de serviços e processos institucionais.
- O README informa integrantes, matrículas e papéis, incluindo Scrum Master, Arquiteto de Software, DevOps/Infra e Engenheiro de Qualidade.
- O MVP foi redefinido com objetivo, funcionalidades essenciais, itens fora do escopo, justificativa de viabilidade e critérios de decisão.
- O escopo do MVP foi reduzido em relação à Entrega 1, deixando carga/descarga, financeiro, rotas, rastreamento e integrações externas fora do escopo imediato.
- A equipe criou issues de backlog com descrições, urgência e critérios de aceitação.
- A equipe registrou uma Definition of Done em `docs/dod.md`.
- Foram registradas ADRs iniciais sobre frontend, backend, banco de dados, containerização e arquitetura geral.
- O PR #21 foi aprovado formalmente por outro integrante antes do merge.
- A branch `main` possui proteção com exigência de uma aprovação em pull request.
- A integração da Entrega 2 ocorreu por merge commit da branch `entrega-2` para `main`.
- A Entrega 2 foi integrada dentro do prazo autorizado até 15/08/2026.

## Critérios Parcialmente Atendidos

- A visão do produto está clara, mas foi registrada diretamente no README; não há arquivo próprio de Inception, apesar de a estrutura sugerida indicar `docs/inception.md`.
- O MVP está mais enxuto, mas ainda abrange três áreas funcionais com várias operações em cada uma: cadastro de clientes, estoque e conferência.
- O backlog possui prioridade relativa por urgência nas issues funcionais consultadas.
- O backlog foi registrado em issues, mas cobre principalmente cadastro de clientes; há pouca decomposição explícita para estoque e conferência, que também fazem parte do MVP declarado.
- O GitHub Project #33 foi verificado e contém issues funcionais #7 a #11 no status `Backlog`, além de itens documentais da entrega em `Feito`.
- A DoD é objetiva, mas inclui pipeline CI/CD, deploy e testes automatizados como critérios de pronto, embora não haja checks executados nos PRs desta entrega nem checks obrigatórios configurados na proteção da branch.
- As ADRs seguem a estrutura esperada, mas a decisão por microsserviços com Docker e Nginx pode ser excessivamente complexa para o MVP e para o estágio atual do projeto.
- O README foi atualizado com referências para os artefatos da etapa, e os links para `docs/dod.md` e `USO-IA.md` foram verificados como corrigidos no estado atual de `origin/main`.
- O registro de IA declara apoio na criação de templates para ADRs, mas não descreve o que foi aproveitado com maior precisão.

## Critérios Não Atendidos

- Não há checks obrigatórios configurados na proteção da `main`, nem checks executados ou registrados no PR #21; a consulta retornou `required_status_checks: []` e `statusCheckRollup: []`.
- Não foi encontrado arquivo `docs/inception.md` ou equivalente dentro de `docs/`; a Inception está concentrada no README.

## Achados com Evidências

- README com integrantes, matrículas e papéis: `README.md`, linhas 3-11.
- Scrum Master identificado: `README.md`, linha 9.
- Visão do produto registrada no README: `README.md`, linhas 29-57.
- Problema, área, usuários e contexto definidos: `README.md`, linhas 31-41.
- Proposta de valor e objetivos do semestre definidos: `README.md`, linhas 43-50.
- Premissas, restrições e limitações: `README.md`, linhas 52-57.
- MVP com objetivo e funcionalidades essenciais: `README.md`, linhas 59-81.
- Itens fora do escopo do MVP: `README.md`, linhas 83-89.
- Justificativa de viabilidade e critérios de decisão do MVP: `README.md`, linhas 91-101.
- Links de documentação no README: `README.md`, linhas 19-27.
- Link para DoD corrigido: `README.md`, linha 25, aponta para `./docs/dod.md`, arquivo existente no repositório.
- Link para uso de IA corrigido: `README.md`, linha 27, aponta para `./USO-IA.md`, arquivo existente na raiz do repositório.
- DoD registrada: `docs/dod.md`, linhas 1-29.
- DoD exige review, testes automatizados, pipeline CI/CD e deploy: `docs/dod.md`, linhas 13-29.
- ADR de frontend registrada: `docs/adrs/ADR-0001-stack-front-end.md`, linhas 1-36.
- ADR de backend registrada: `docs/adrs/ADR-0002-stack-backend.md`, linhas 1-42.
- ADR de banco de dados registrada: `docs/adrs/ADR-0003-banco-dados.md`, linhas 1-39.
- ADR de containerização registrada: `docs/adrs/ADR-0004-containerizacao-aplicacao.md`, linhas 1-39.
- ADR de arquitetura com microsserviços, Docker e Nginx registrada: `docs/adrs/ADR-0005-arquitetura-microsservicos.md`, linhas 1-39.
- A ADR de microsserviços registra riscos de maior dificuldade de configuração e diagnóstico: `docs/adrs/ADR-0005-arquitetura-microsservicos.md`, linhas 28-32.
- Backlog inicial em issues: #7 `Cadastrar novo cliente`, #8 `Editar dados de cliente`, #9 `Consultar clientes`, #10 `Inativar um cliente` e #11 `Consultar histórico de pedidos`.
- Board verificado no GitHub Project #33: issues #7, #8, #9, #10 e #11 constam no status `Backlog`; issues #3, #4 e #12 constam em `Feito`.
- Issues #7 a #11 possuem critérios de aceitação e urgência registrada.
- Issue #7 foi verificada novamente e registra apenas urgência alta.
- Issues #7 a #11 estão concentradas no módulo de cadastro de clientes, embora o MVP também inclua estoque e conferência.
- Issue #12 organizou a atualização do README com visão, MVP e referências.
- Issue #3 organizou a criação da DoD e issue #4 organizou a criação das ADRs.
- PR #21 integrou a branch `entrega-2` em `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/21`.
- PR #21 possui review `APPROVED` por `isaclds` em 15/08/2026 03:37:30 UTC.
- PR #21 foi mesclado em 15/08/2026 03:37 UTC, dentro do prazo autorizado para a Entrega 2.
- PR #21 sem checks registrados: consulta retornou `statusCheckRollup: []`.
- Integração por merge commit: commit `97d9e30`, mensagem `Merge pull request #21 from IFSC-ES2/entrega-2`.
- Histórico de `origin/main` contém merge da Entrega 2 após a recuperação da Entrega 1: `97d9e30 Merge pull request #21 from IFSC-ES2/entrega-2`.
- Branch `main` protegida com exigência de uma aprovação, mas sem checks obrigatórios: API de proteção retornou `required_approving_review_count: 1` e `required_status_checks: []`.
- Registro de IA da Entrega 2: `USO-IA.md`, linhas 9-13, declara uso do Claude para criação de templates de ADRs e validação do conteúdo gerado.

## Recomendações para a Equipe

- Manter nas próximas entregas a integração ao ramo `main` dentro do prazo autorizado, preservando rastreabilidade por PR e merge commit.
- Criar um documento específico de Inception em `docs/`, ou deixar explícito que o README concentra esse artefato, evitando divergência com a estrutura esperada.
- Manter os links do README consistentes com os caminhos reais dos artefatos.
- Expandir o backlog para cobrir também estoque e conferência, não apenas cadastro de clientes.
- Manter a prioridade relativa do backlog consistente nas próximas issues funcionais.
- Configurar checks obrigatórios na proteção da `main`, ou documentar claramente quais validações manuais serão usadas enquanto o pipeline ainda não existir.
- Reavaliar se a arquitetura de microsserviços é proporcional ao MVP; se a decisão for mantida, justificar melhor como a equipe irá mitigar a complexidade operacional.
- Ajustar a DoD para diferenciar critérios já aplicáveis nesta etapa de critérios planejados para etapas futuras, como CI/CD e deploy.
- Detalhar melhor o registro de uso de IA, indicando o que foi aproveitado e como a equipe revisou cada artefato impactado.

## Nota da Entrega

Nota: 3,9 / 5,0

## Justificativa da Nota

- Visão do produto clara, contextualizada e coerente com o tema aprovado: 0,8 / 1,0. A visão cobre os pontos obrigatórios e é coerente com o tema, mas ficou concentrada no README e não em documento específico de Inception.
- MVP definido com escopo viável, funcionalidades essenciais e itens fora do escopo: 0,8 / 1,0. O MVP foi reduzido e está melhor justificado, mas ainda abrange múltiplos módulos com várias operações.
- Backlog inicial priorizado, registrado em issues/board e com critérios de aceitação: 0,8 / 1,0. Há issues funcionais no board com critérios e urgência consistente; a principal ressalva é que o backlog cobre principalmente cadastro de clientes.
- DoD objetiva e compatível com o fluxo de trabalho da equipe: 0,7 / 1,0. A DoD é objetiva, mas inclui critérios ainda não evidenciados na prática, como pipeline, testes automatizados e deploy.
- ADRs iniciais registradas e README atualizado com referências para os artefatos da etapa: 0,8 / 1,0. Há cinco ADRs e README atualizado com links corrigidos; a principal ressalva restante é que a decisão por microsserviços parece complexa para o MVP atual.

## Observações sobre Uso de IA

A equipe declarou uso do Claude para criação de templates para ADRs, com validação de que o conteúdo gerado condizia com o esperado para uma ADR. A declaração é compatível com os artefatos entregues, pois a entrega inclui ADRs em `docs/adrs/`. O registro atende parcialmente ao protocolo, mas deveria detalhar melhor o que foi efetivamente aproveitado e como a revisão humana foi realizada em cada ADR.
