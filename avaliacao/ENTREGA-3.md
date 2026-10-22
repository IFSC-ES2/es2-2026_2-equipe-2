# Avaliação da Entrega 3 - Estimativas e Métricas (Baseline)

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: ERP para gestão de operações logísticas em distribuidoras
- Entrega: 3 - Estimativas e Métricas (Baseline)
- Data prevista da entrega: 28/08/2026
- Pull request avaliado: PR #30, branch `entrega-3` para `main`
- Versão considerada: estado atual de `origin/main` após integração da Entrega 3

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `docs/BASELINE.md`.
- `docs/CAPACIDADE.md`.
- `docs/ESTIMATIVAS.md`.
- `docs/METRICAS.md`.
- `docs/metricas/M-01.md`.
- `docs/metricas/M-02.md`.
- `docs/metricas/M-03.md`.
- `docs/metricas/M-04.md`.
- `docs/metricas/M-05.md`.
- `docs/metricas/M-06.md`.
- `.github/pull_request_template.md`.
- `.github/ISSUE_TEMPLATE/custom_issue.md`.
- `.github/workflows/check-branch-name.yaml`.
- `.github/workflows/check-branch-name-pr-main.yaml`.
- Issues GitHub #7, #8, #9, #10, #11, #22, #23, #24 e #25.
- Pull requests GitHub #26, #28, #29 e #30.
- Histórico Git local e remoto.

## Resumo da Entrega

A equipe entregou os principais documentos esperados para a Entrega 3: baseline de planejamento, capacidade planejada, abordagem de estimativa, definição de métricas e fichas individuais de métricas. O README foi atualizado com referências para estimativas, baseline e métricas, e o `USO-IA.md` recebeu registros relacionados à criação de artefatos da etapa.

A entrega é consistente em termos de conteúdo, com bom detalhamento do recorte do backlog, priorização por MoSCoW, estimativas por T-Shirt Size, capacidade planejada por integrante e métricas distribuídas em produto, processo e projeto. A principal perda de processo está na ausência de checks executados no PR final.

## Critérios Atendidos

- O baseline foi registrado em `docs/BASELINE.md`, com recorte do backlog, priorização, estimativas, técnica adotada, hipóteses, capacidade planejada, previsão e data de registro.
- O recorte do backlog está ligado a issues reais do repositório, especialmente #7, #8, #9, #10 e #11.
- A priorização dos itens do MVP foi feita com a técnica MoSCoW.
- As estimativas foram registradas com técnica, unidade, participantes, critérios de dimensionamento, itens estimados, divergências, segunda rodada de discussão e limitações percebidas.
- A capacidade planejada foi declarada por integrante, papel, disponibilidade semanal, período considerado e total disponível.
- Foram definidas métricas de produto, processo e projeto.
- Há fichas individuais para seis métricas, incluindo objetivo, classificação, fórmula/definição, fonte dos dados, frequência, responsável e forma de interpretação.
- As issues #22, #23, #24 e #25 registram tarefas documentais da Entrega 3 com critérios de aceitação.
- O README foi atualizado com links para os artefatos da etapa.
- O PR #30 integrou a branch `entrega-3` à `main` por merge commit.
- O PR #30 possui aprovações formais registradas por integrantes da equipe.
- A branch `main` possui proteção configurada com exigência de uma aprovação em pull request.

## Critérios Parcialmente Atendidos

- O baseline apresenta previsão do que se espera concluir no período, mas o período considerado é 26/08 a 02/09, extrapolando o marco atualizado da Entrega 3; isso é aceitável como horizonte de planejamento, mas deveria estar explicitado como previsão para o próximo período.
- O baseline considera apenas itens do módulo de clientes, embora o MVP declarado no README também inclua estoque e conferência; o recorte pode ser válido como horizonte inicial, mas a justificativa não explicita por que os demais módulos essenciais ficaram fora desta linha de base.
- A capacidade planejada é detalhada, mas há uma disponibilidade muito discrepante para um integrante, com 40 horas em uma semana, sem justificativa individual mais específica.
- A capacidade é registrada em horas, enquanto as estimativas estão em T-Shirt Size; falta uma ponte explícita entre a capacidade disponível e a previsão de conclusão dos itens P/M/G.
- A métrica M-06 depende de conversão de tamanhos P/M/G/GG para peso numérico, mas essa regra de conversão ainda não foi definida.
- A seção “PRs desta etapa” do README, no estado atual, lista PRs da Entrega 4 (#40 a #43), não os PRs da Entrega 3 (#26, #28, #29 e #30), o que prejudica a rastreabilidade histórica da etapa.
- O PR #30 tem aprovações, mas uma aprovação anterior foi descartada e não há checks executados no PR.
- O board do GitHub é referenciado no README, mas não foi possível verificá-lo diretamente porque o token atual não possui o escopo `read:project`.

## Critérios Não Atendidos

- Não há checks obrigatórios executados ou registrados no PR #30; a consulta retornou `statusCheckRollup: []`.
- A proteção de branch possui seção de status checks, mas sem contextos/checks configurados, conforme retorno `contexts: []` e `checks: []`.

## Achados com Evidências

- README atualizado com referências para estimativas, baseline e métricas: `README.md`, linhas 19-30.
- Visão do produto e MVP atualizados no README: `README.md`, linhas 32-111.
- Registro de uso de IA da Entrega 3: `USO-IA.md`, linhas 15-25.
- Baseline com recorte do backlog: `docs/BASELINE.md`, linhas 3-12.
- Priorização por MoSCoW: `docs/BASELINE.md`, linhas 13-23.
- Estimativas dos itens priorizados: `docs/BASELINE.md`, linhas 25-35.
- Técnica adotada e descrição da dinâmica: `docs/BASELINE.md`, linhas 37-41.
- Hipóteses assumidas: `docs/BASELINE.md`, linhas 43-49.
- Capacidade planejada no baseline: `docs/BASELINE.md`, linhas 51-65.
- Previsão do período e data do baseline: `docs/BASELINE.md`, linhas 67-83.
- Documento específico de capacidade: `docs/CAPACIDADE.md`, linhas 1-40.
- MVP declarado com clientes, estoque e conferência: `README.md`, linhas 73-120; baseline restrito a issues de clientes: `docs/BASELINE.md`, linhas 3-12.
- Técnica e justificativa de estimativa: `docs/ESTIMATIVAS.md`, linhas 3-8.
- Participantes e unidade adotada: `docs/ESTIMATIVAS.md`, linhas 9-23.
- Critérios de dimensionamento: `docs/ESTIMATIVAS.md`, linhas 25-35.
- Itens estimados e consenso da equipe: `docs/ESTIMATIVAS.md`, linhas 37-45.
- Limitações, incertezas e segunda rodada de debate: `docs/ESTIMATIVAS.md`, linhas 48-76.
- Métricas organizadas por produto, processo e projeto: `docs/METRICAS.md`, linhas 5-30.
- Justificativa geral das métricas: `docs/METRICAS.md`, linhas 32-49.
- Fichas de métricas com campos principais: `docs/metricas/M-01.md` a `docs/metricas/M-06.md`.
- Instruções de template remanescentes: `docs/BASELINE.md`, linha 27, e `docs/METRICAS.md`, linha 34.
- Métrica M-06 com necessidade de conversão de T-Shirt Size para peso numérico ainda não especificada: `docs/metricas/M-06.md`, linha 8.
- Issues #22, #23, #24 e #25 documentam baseline, estimativas, métricas e fichas, com critérios de aceitação.
- Issues #7 a #11 representam o recorte funcional usado no baseline.
- Issues #7 a #11 não possuem assignees e retornaram `projectItems: []` na consulta da API; issues #22 a #25 possuem milestone `entrega-3`, mas também retornaram `projectItems: []`.
- PR #26 integrou métricas à branch `entrega-3` com aprovação formal.
- PR #28 integrou definição de capacidade à branch `entrega-3` com aprovação formal.
- PR #29 integrou baseline e estimativas à branch `entrega-3` com aprovação formal.
- PR #30 integrou `entrega-3` à `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/30`.
- PR #30 possui reviews formais registrados, incluindo aprovações de `Daniellrc` e `isaclds`.
- PR #30 sem checks registrados: consulta retornou `statusCheckRollup: []`.
- Integração por merge commit: commit `17d727b`, mensagem `Merge pull request #30 from IFSC-ES2/entrega-3`.
- Branch de entrega preservada no remoto: `origin/entrega-3` aponta para o commit `1c9dbc8`.
- Proteção da `main` exige uma aprovação em pull request, mas não possui checks obrigatórios configurados: retorno da API com `required_approving_review_count: 1`, `contexts: []` e `checks: []`.
- README atual lista PRs #40 a #43 como “PRs desta etapa”, mas os PRs da Entrega 3 observados foram #26, #28, #29 e #30: `README.md`, linhas 35-39.

## Recomendações para a Equipe

- Configurar checks reais no GitHub Actions e torná-los obrigatórios na proteção da branch `main`.
- Registrar o baseline com antecedência em relação ao encerramento da entrega, para que ele funcione como linha de base efetiva do planejamento.
- Explicitar a relação entre o recorte inicial do baseline e o MVP completo, especialmente quando módulos declarados como essenciais, como estoque e conferência, ficarem fora do horizonte inicial.
- Justificar disponibilidades individuais muito discrepantes, como 40 horas em uma semana, ou distribuir a capacidade de forma mais realista.
- Definir como os tamanhos P/M/G/GG serão relacionados à capacidade disponível ou à velocidade da equipe, quando essas informações forem usadas para prever conclusão.
- Tornar a prioridade das issues visível também no GitHub, por labels, milestone, campos do board ou outra evidência rastreável, além da tabela no baseline.
- Preencher os campos de histórico das métricas com data inicial e valor inicial quando aplicável, mesmo que os dados ainda sejam baseline ou “a coletar”.
- Remover instruções residuais de template dos documentos finais antes da entrega.
- Revisar pequenos problemas de formatação e pontuação no README para melhorar a legibilidade das referências.
- Manter a seção de PRs do README coerente com a etapa documentada ou separar claramente evidências por entrega.
- Manter o registro de IA com descrição mais específica do que foi aproveitado em cada documento gerado ou estruturado com apoio da ferramenta.

## Nota da Entrega

Nota: 4,2 / 5,0

## Justificativa da Nota

- Planejamento inicial e baseline coerentes com o MVP e o backlog priorizado: 0,9 / 1,0. O baseline é completo e ligado a issues reais; a perda remanescente decorre do horizonte avançar além do marco atualizado da entrega e de cobrir apenas o módulo de clientes sem justificar plenamente a relação com estoque e conferência, também declarados no MVP.
- Estimativas registradas com técnica, unidade, participantes, hipóteses e limitações: 0,9 / 1,0. O documento de estimativas é bem detalhado, com técnica, unidade, participantes, critérios, divergências e segunda rodada de discussão.
- Capacidade planejada da equipe declarada de forma realista e justificada: 0,8 / 1,0. A capacidade está documentada por integrante e papel, mas há disponibilidade individual muito alta sem justificativa específica e não há ligação explícita entre horas disponíveis e estimativas em T-Shirt Size.
- Métricas de produto, processo e projeto definidas com objetivo, fórmula, fonte, frequência e interpretação: 0,9 / 1,0. As métricas cobrem bem as categorias e possuem fichas individuais, com pequena perda por históricos ainda vazios, instruções de template remanescentes e ausência de regra de conversão para a métrica de velocidade baseada em P/M/G/GG.
- Evidências no repositório: README atualizado, PR revisado, checks obrigatórios e ramificação `entrega-3` integrada por commit de mesclagem: 0,7 / 1,0. Há README atualizado, PR aprovado, merge commit e integração dentro do prazo atualizado, mas não há checks executados ou configurados como obrigatórios.

## Observações sobre Uso de IA

A equipe declarou uso do Claude para criação de template para `BASELINE.md` e `ESTIMATIVAS.md`, com validação relacionada ao atendimento ao documento da entrega e coerência do conteúdo. A declaração é compatível com parte dos artefatos entregues, pois a entrega inclui baseline e estimativas estruturados em `docs/`.

Há, porém, fragilidades: `docs/BASELINE.md` e `docs/METRICAS.md` ainda preservam instruções de template, o que sugere revisão incompleta; o uso de IA para `METRICAS.md` e para as fichas `M-01` a `M-06` não foi declarado explicitamente, apesar de haver estrutura bastante padronizada e conteúdo de template residual em documento de métricas; e o `USO-IA.md` possui entradas duplicadas posteriores sobre regex de branch. Assim, o registro de IA atende parcialmente aos elementos mínimos, mas é incompleto quanto à rastreabilidade de todos os artefatos documentais da Entrega 3.
