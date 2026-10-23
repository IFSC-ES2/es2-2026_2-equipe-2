# Avaliação da Entrega 4 - Riscos e Consolidação

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: ERP para gestão de operações logísticas em distribuidoras
- Entrega: 4 - Riscos e Consolidação
- Data prevista considerada: 03/09/2026, conforme cronograma geral do projeto
- Pull request avaliado: PR #47, branch `entrega-4` para `main`
- Versão considerada: `origin/main` no commit `5151a1f`

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `.github/pull_request_template.md`.
- `.github/ISSUE_TEMPLATE/bug_report.md`.
- `.github/ISSUE_TEMPLATE/custom_issue.md`.
- `.github/ISSUE_TEMPLATE/feature_request.md`.
- `.github/workflows/check-branch-name.yaml`.
- `.github/workflows/check-branch-name-pr-main.yaml`.
- `docs/dod.md`.
- `docs/BASELINE.md`.
- `docs/ESTIMATIVAS.md`.
- `docs/METRICAS.md`.
- `docs/CI.md`.
- `docs/FLUXO-DE-TRABALHO.md`.
- `docs/qualidade.md`.
- `docs/riscos.md`.
- `docs/metricas/M-01.md`.
- `docs/metricas/M-02.md`.
- `docs/metricas/M-03.md`.
- `docs/metricas/M-04.md`.
- `docs/metricas/M-05.md`.
- `docs/metricas/M-06.md`.
- `docs/adrs/ADR-0001-stack-front-end.md`.
- `docs/adrs/ADR-0002-stack-backend.md`.
- `docs/adrs/ADR-0003-banco-dados.md`.
- `docs/adrs/ADR-0004-containerizacao-aplicacao.md`.
- `docs/adrs/ADR-0005-arquitetura-microsservicos.md`.
- Issues GitHub #7, #8, #9, #10, #11, #31, #32, #33, #34, #35, #36, #37, #38 e #39.
- Pull requests GitHub #40, #41, #42, #43, #46 e #47.
- Histórico Git local e remoto.

## Resumo da Entrega

A equipe entregou os principais artefatos esperados para a Entrega 4: registro de riscos, análise e priorização, plano de resposta, documentação do fluxo de trabalho, documentação de CI, critérios iniciais de qualidade, relação entre riscos e qualidade, atualização do README e evidências de pull requests internos para a branch `entrega-4` e PR final para `main`.

O MVP declarado continua sendo um ERP interno para distribuidoras, com foco inicial em cadastro de clientes, estoque e conferência. A Entrega 4 mantém coerência com esse escopo ao mapear riscos de escopo, estimativas/prazo, equipe, tecnologia e testes, além de associar atributos de qualidade como manutenibilidade, confiabilidade, segurança e usabilidade aos riscos mais relevantes.

A entrega é sólida em documentação e organização do processo. As principais ressalvas são que o PR final #47 não apresenta checks registrados, a proteção da branch `main` exige aprovação mas não possui checks obrigatórios configurados, o CI implementado valida basicamente nomes de branches e a declaração de uso de IA da Entrega 4 não cobre explicitamente os documentos de riscos e qualidade.

## Critérios Atendidos

- O registro inicial de riscos foi versionado em `docs/riscos.md`.
- Foram registrados cinco riscos relevantes, cobrindo escopo, prazo, equipe, tecnologia e qualidade/processo.
- Cada risco possui natureza, descrição, causa, consequência/impacto, probabilidade, impacto, prioridade, mitigação, ações preventivas, ações caso ocorra, acompanhamento e responsável.
- O documento de riscos define critério de classificação de probabilidade e impacto.
- Há matriz de riscos e destaque dos riscos mais críticos.
- Há justificativa para a prioridade atribuída aos riscos.
- O plano de resposta aos riscos contempla ações preventivas, ações de contingência e forma de acompanhamento.
- O fluxo de trabalho foi documentado em `docs/FLUXO-DE-TRABALHO.md`.
- O fluxo define branches de entrega, branches de trabalho, integração via pull request, revisão, aprovação mínima, proibição de push direto e merge commit.
- O template de pull request foi atualizado com checklist mínimo de revisão.
- Há workflows de CI em `.github/workflows/` para validação de nomes de branches.
- PRs internos da Entrega 4 tiveram checks executados com sucesso, especialmente #40, #41, #42 e #43.
- O documento de qualidade seleciona quatro atributos prioritários: manutenibilidade, confiabilidade, segurança e capacidade de interação/usabilidade.
- O documento de qualidade justifica a relevância dos atributos para o contexto do MVP.
- Há relação explícita entre riscos e atributos de qualidade.
- A definição preliminar de avaliação da qualidade referencia a ISO/IEC 25010 e lista métricas preliminares por atributo.
- O README foi atualizado com links para riscos, fluxo de trabalho, CI, critérios de qualidade e PRs de evidência da etapa.
- A entrega foi desenvolvida na branch `entrega-4` e integrada à `main` por merge commit.
- O PR #47 possui aprovação formal registrada por integrante da equipe.

## Critérios Parcialmente Atendidos

- O CI mínimo existe, mas seu escopo prático é restrito à validação de nomes de branches; não há build, testes, lint, verificação dos documentos da entrega ou validação técnica do produto.
- O documento `docs/CI.md` menciona estágios de testes e build como bloqueadores, mas os workflows presentes no repositório não implementam esses estágios.
- A proteção da branch `main` exige uma aprovação, mas a consulta da API retornou `contexts: []` e `checks: []`, portanto não há evidência de checks obrigatórios configurados na proteção.
- Os PRs internos para `entrega-4` tiveram checks, mas o PR final #47, que integra a entrega à `main`, retornou `statusCheckRollup: []`.
- O fluxo de trabalho é bem documentado, mas afirma que a proteção bloqueia merge sem checks obrigatórios; a evidência de proteção da `main` não confirma checks obrigatórios.
- As métricas de qualidade em `docs/qualidade.md` são úteis, mas algumas metas são ambiciosas ou pouco conectadas ao estado atual do projeto, como disponibilidade esperada de 99% ainda na fase de planejamento.
- O README lista PRs #40 a #43 como evidência da etapa, mas não inclui o PR final #47 na lista de PRs da etapa.
- O board é referenciado no README, mas não pôde ser verificado diretamente porque o token atual não possui o escopo `read:project`.

## Critérios Não Atendidos

- Não há checks obrigatórios configurados na proteção da branch `main`, conforme retorno da API com listas vazias de contextos e checks obrigatórios.
- O PR final #47 não teve checks registrados na consulta do GitHub, apesar de a entrega exigir evidência de checks nos PRs.
- O `USO-IA.md` não registra explicitamente uso de IA para `docs/riscos.md`, `docs/qualidade.md`, `docs/FLUXO-DE-TRABALHO.md` ou `docs/CI.md`; os registros da Entrega 4 cobrem apenas criação de regex para check de nome de branch e aparecem duplicados.

## Achados com Evidências

- Equipe e papéis registrados no README: `README.md`, linhas 3-11.
- Tema e proposta do ERP logístico registrados no README: `README.md`, linhas 13-18.
- Documentação e referências do projeto, incluindo Entrega 4: `README.md`, linhas 19-39.
- MVP declarado no README: `README.md`, linhas 73-120.
- DoD com revisão, testes, CI/CD e deploy: `docs/dod.md`, linhas 1-29.
- Baseline anterior com recorte do backlog e capacidade: `docs/BASELINE.md`, linhas 1-83.
- Registro de riscos com cinco naturezas cobertas: `docs/riscos.md`, linhas 1-95.
- Risco de escopo com ações preventivas e acompanhamento: `docs/riscos.md`, linhas 7-22.
- Risco de prazo/estimativas com prioridade alta: `docs/riscos.md`, linhas 25-40.
- Risco de equipe por indisponibilidade: `docs/riscos.md`, linhas 43-58.
- Risco tecnológico com Docker, Nginx e microsserviços: `docs/riscos.md`, linhas 61-76.
- Risco de qualidade/processo por poucos testes automatizados: `docs/riscos.md`, linhas 79-94.
- Critério de probabilidade e impacto: `docs/riscos.md`, linhas 96-110.
- Matriz de riscos: `docs/riscos.md`, linhas 111-117.
- Riscos mais críticos e justificativa de prioridade: `docs/riscos.md`, linhas 119-136.
- Fluxo de branches e proibição de desenvolvimento direto na `main`: `docs/FLUXO-DE-TRABALHO.md`, linhas 5-19.
- Integração por PR, aprovação, proteção e template: `docs/FLUXO-DE-TRABALHO.md`, linhas 20-33.
- Checks obrigatórios descritos no fluxo: `docs/FLUXO-DE-TRABALHO.md`, linhas 34-40.
- Estratégia de merge por merge commit: `docs/FLUXO-DE-TRABALHO.md`, linhas 41-45.
- Resumo operacional do fluxo: `docs/FLUXO-DE-TRABALHO.md`, linhas 47-58.
- Padrão de commits documentado: `docs/FLUXO-DE-TRABALHO.md`, linhas 59-85.
- Template de PR com checklist de revisão: `.github/pull_request_template.md`, linhas 1-37.
- Workflow `check-branch-name.yaml` valida branches de trabalho em PRs que não têm `main` como destino: `.github/workflows/check-branch-name.yaml`, linhas 1-30.
- Workflow `check-branch-name-pr-main.yaml` valida que PRs para `main` venham de branch `entrega-numero`: `.github/workflows/check-branch-name-pr-main.yaml`, linhas 1-24.
- Documento de CI descreve workflows atuais e uso do `act`: `docs/CI.md`, linhas 1-113.
- `docs/CI.md` menciona workflows `check-branch-name.yml` e `check-main-pull-request.yml`, mas os arquivos reais usam nomes `.yaml` e `check-branch-name-pr-main.yaml`: `docs/CI.md`, linhas 5-9, e `.github/workflows/`.
- Atributos de qualidade e orientação futura: `docs/qualidade.md`, linhas 1-20.
- Relação entre riscos e qualidade: `docs/qualidade.md`, linhas 21-30.
- Referência à ISO/IEC 25010 e métricas preliminares: `docs/qualidade.md`, linhas 31-44.
- Issues #31 a #39 registram tarefas da Entrega 4, todas fechadas.
- Issue #35 registra intenção de configurar CI mínimo com evidência no PR da etapa.
- PR #40 integrou configuração inicial de CI à branch `entrega-4`, com aprovação e check `check-branch-name` concluído com sucesso.
- PR #41 integrou fluxo de trabalho, com aprovação e check concluído com sucesso.
- PR #42 integrou qualidade, teve solicitação de mudanças inicial e aprovação posterior.
- PR #43 integrou riscos, teve comentário de revisão e aprovação posterior.
- PR #47 integrou `entrega-4` à `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/47`.
- PR #47 possui aprovação formal de `Daniellrc` em 04/09/2026 02:23:59 UTC.
- PR #47 retornou `statusCheckRollup: []` na consulta do GitHub.
- PR #47 foi mesclado por merge commit: commit `5151a1f`, mensagem `Merge pull request #47 from IFSC-ES2/entrega-4`.
- Branch remota `origin/entrega-4` preservada no commit `3fe8bf29d242784fe7e126a08e02fa8dbc6f7e91`.
- Proteção da `main` exige uma aprovação, mas não lista checks obrigatórios: `required_approving_review_count: 1`, `contexts: []` e `checks: []`.
- Consulta ao GitHub Project #33 não pôde ser realizada por falta do escopo `read:project` no token atual.
- Registro de uso de IA da Entrega 4 em `USO-IA.md`: linhas 27-37, com registros duplicados sobre regex de branch.

## Recomendações para a Equipe

- Configurar checks obrigatórios reais na proteção da branch `main`, incluindo pelo menos os checks de validação de branch já existentes.
- Garantir que o PR final da entrega também execute checks visíveis no GitHub antes do merge.
- Evoluir o CI para além de validação de nomes, incluindo verificação de documentos essenciais da entrega, build, testes e lint conforme o produto evoluir.
- Corrigir a documentação de CI para refletir os nomes reais dos arquivos `.yaml` e remover estágios ainda não implementados ou marcá-los claramente como planejados.
- Atualizar o README para incluir também o PR final da entrega como evidência.
- Remover duplicidade e detalhar melhor os registros de uso de IA, incluindo riscos, qualidade, fluxo e CI quando houver apoio de IA nesses artefatos.
- Tornar o acompanhamento dos riscos mais operacional, com gatilhos, frequência, responsáveis por atualização e ligação direta com métricas já definidas.
- Revisar metas de qualidade para que sejam realistas e mensuráveis no estágio atual do MVP.

## Nota da Entrega

Nota: 4,1 / 5,0

## Justificativa da Nota

- Registro inicial de riscos, análise, priorização e plano de resposta: 1,5 / 1,6. Os riscos são relevantes, cobrem naturezas diferentes, possuem campos completos e incluem ações e acompanhamento; a perda é pequena por inconsistências pontuais de matriz/prioridade e redação.
- Consolidação do fluxo de trabalho e CI mínimo: 0,9 / 1,2. O fluxo é detalhado e há workflows de CI, mas o CI é limitado a nome de branch, o PR final não teve checks registrados e a proteção da `main` não possui checks obrigatórios configurados.
- Critérios iniciais de qualidade e relação com riscos: 1,1 / 1,2. O documento seleciona quatro atributos, relaciona riscos e propõe métricas preliminares; a perda ocorre por métricas ainda pouco conectadas ao estado atual do projeto e algumas metas pouco realistas para esta fase.
- Atualização do README e documentação da etapa: 0,5 / 0,5. O README aponta os artefatos da Entrega 4 e PRs internos de evidência.
- Evidências de processo no repositório: 0,1 / 0,5. Há PR final aprovado e merge commit, além de PRs internos revisados, mas faltam checks no PR final e checks obrigatórios na proteção da branch principal.

## Observações sobre Uso de IA

A equipe declarou uso do Claude em 31/08/2026 para criação de regex de validação de nomes de branches, com artefato em `.github/workflows` e validação com nomes válidos e inválidos. Essa declaração é compatível com os workflows entregues, que validam padrões de branch em pull requests. Porém, o registro aparece duplicado e não menciona explicitamente apoio de IA nos documentos centrais da Entrega 4, como `docs/riscos.md`, `docs/qualidade.md`, `docs/FLUXO-DE-TRABALHO.md` e `docs/CI.md`; se houve uso de IA nesses documentos, ele deve ser registrado com ferramenta, finalidade, artefato e validação.
