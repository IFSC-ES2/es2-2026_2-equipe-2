# Avaliação da Entrega 1 - Kickoff

## Identificação

- Equipe: es2-2026_2-equipe-2
- Projeto: ERP para gestão de operações logísticas em distribuidoras
- Entrega: 1 - Kickoff
- Data limite considerada para avaliação: 07/08/2026

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `.github/ISSUE_TEMPLATE/bug_report.md`.
- `.github/ISSUE_TEMPLATE/custom_issue.md`.
- `.github/ISSUE_TEMPLATE/feature_request.md`.
- `.github/PULL_REQUEST_TEMPLATE/bugfix.md`.
- `.github/PULL_REQUEST_TEMPLATE/feature.md`.
- Pull request GitHub #1.
- Histórico Git local e remoto.

## Resumo da Entrega

A equipe entregou um README inicial para um ERP de gestão de operações logísticas em distribuidoras, com boa contextualização do problema, usuários, área de aplicação, contexto e proposta de solução. O repositório contém templates de issues e pull requests, registro de uso de IA e uma branch `entrega-1` integrada à `main` por pull request com aprovação.

A entrega atende bem aos itens de tema, contextualização e README, mas apresenta lacunas importantes na identificação da equipe, na delimitação do MVP e na governança mínima, principalmente pela ausência de issues criadas e ausência de checks.

## Critérios Atendidos

- O README identifica o tema do projeto e apresenta descrição do sistema.
- O README responde explicitamente às perguntas obrigatórias sobre problema, área de aplicação, usuários, contexto de aplicação, relevância e proposta de solução.
- O projeto é uma aplicação de gestão logística e está situado na linha temática "gestão de serviços e processos institucionais", compatível com as restrições gerais da disciplina.
- O README apresenta escopo inicial do MVP e itens fora do escopo.
- Há registro de uso de IA em `USO-IA.md`, com ferramenta, finalidade, artefato e validação.
- O repositório contém templates de issue em `.github/ISSUE_TEMPLATE/`.
- O repositório contém templates de pull request em `.github/PULL_REQUEST_TEMPLATE/`.
- A entrega foi desenvolvida na branch `entrega-1` e integrada à `main` por merge commit do PR #1.
- O PR #1 possui uma aprovação registrada antes do merge.
- A equipe possui board para acompanhamento do projeto.
- A entrega foi integrada em 06/08/2026, dentro do prazo estendido considerado para a Entrega 1, até 07/08/2026.

## Critérios Parcialmente Atendidos

- A equipe informa funções, mas não informa matrículas dos integrantes.
- Os papéis exigidos aparecem parcialmente: há Arquiteto de Software, DevOps/Infra e Engenheiro de Qualidade, mas não há Scrum Master identificado; há papéis adicionais de DBA e UI/UX Designer.
- O MVP está organizado por áreas funcionais, mas ainda é amplo para uma primeira versão, incluindo cadastro de clientes, estoque, conferência, carga e descarga, com múltiplas operações em cada módulo.
- Há templates de issue, mas eles não incluem critérios de aceitação explícitos; usam descrições, urgência e notas adicionais.
- Há templates de pull request, mas eles não incluem checklist de validação, aprovação ou checks obrigatórios.
- Há PR com aprovação, mas não há evidências de checks obrigatórios configurados ou executados.

## Critérios Não Atendidos

- Não há issues criadas para organizar o kickoff; `gh issue list --state all` não retornou itens.
- Não há evidência de critérios de aceitação em issues, pois não foram encontradas issues no repositório.
- Não há evidência de checks obrigatórios no PR #1; a consulta retornou `statusCheckRollup: []`.
- A branch `main` não está protegida, conforme resposta da API de proteção de branch: `Branch not protected`.
- Não há milestone criada no repositório; a API de milestones retornou lista vazia.

## Achados com Evidências

- Equipe com cinco integrantes, composição aceita para esta entrega: `README.md`, linhas 3-11.
- Ausência de matrículas: `README.md`, linhas 3-11, lista nomes e funções, mas não informa matrículas.
- Ausência de Scrum Master explícito: `README.md`, linhas 5-11, lista DBA, Arquiteto de Software, DevOps/Infra, UI/UX Designer e Engenheiro de Qualidade.
- Tema definido: `README.md`, linhas 13-19.
- Perguntas obrigatórias respondidas: `README.md`, linhas 21-50.
- MVP amplo: `README.md`, linhas 52-75, inclui quatro áreas funcionais principais com múltiplas operações.
- Itens fora do escopo registrados: `README.md`, linhas 77-82.
- Registro de IA com validação: `USO-IA.md`, linhas 1-7.
- Templates de issue existentes: `.github/ISSUE_TEMPLATE/bug_report.md`, `.github/ISSUE_TEMPLATE/custom_issue.md` e `.github/ISSUE_TEMPLATE/feature_request.md`.
- Templates de issue sem critérios de aceitação explícitos: `.github/ISSUE_TEMPLATE/bug_report.md`, linhas 8-26; `.github/ISSUE_TEMPLATE/custom_issue.md`, linhas 8-24; `.github/ISSUE_TEMPLATE/feature_request.md`, linhas 8-17.
- Templates de PR existentes: `.github/PULL_REQUEST_TEMPLATE/bugfix.md` e `.github/PULL_REQUEST_TEMPLATE/feature.md`.
- Templates de PR sem checklist de validação/revisão: `.github/PULL_REQUEST_TEMPLATE/bugfix.md`, linhas 1-15; `.github/PULL_REQUEST_TEMPLATE/feature.md`, linhas 1-12.
- PR de entrega existente e mesclado: PR #1, branch `entrega-1` para `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-2/pull/1`.
- PR com aprovação registrada: PR #1 possui review `APPROVED` por `Daniellrc` em 07/08/2026 01:28:07 UTC.
- PR sem checks registrados: PR #1 retornou `statusCheckRollup: []`.
- Integração por merge commit: commit `e3c2b74`, mensagem `Merge pull request #1 from IFSC-ES2/entrega-1`.
- Branch de entrega preservada no remoto: `origin/entrega-1` aponta para o commit `8af765b`.
- Board existente para acompanhamento do projeto.
- Ausência de issues: `gh issue list --state all --limit 50` não retornou itens.
- Ausência de milestones: API de milestones retornou `[]`.
- Branch principal sem proteção: API de proteção de branch retornou `Branch not protected`.

## Recomendações para a Equipe

- Ajustar a identificação da equipe para informar matrículas dos integrantes.
- Identificar explicitamente o Scrum Master da primeira sprint.
- Reduzir ou priorizar o MVP para poucas funcionalidades centrais, separando claramente o que será validado primeiro do que ficará para entregas futuras.
- Criar issues para organizar as próximas entregas, vinculando tarefas a critérios de aceitação objetivos.
- Ajustar os templates de issue para incluir seção explícita de critérios de aceitação.
- Ajustar os templates de PR para incluir checklist de validação, referência à branch correta, atualização de documentação e aprovação por pelo menos um integrante.
- Configurar ou planejar checks obrigatórios para pull requests.
- Vincular issues ao board de acompanhamento para melhorar a rastreabilidade do fluxo de trabalho.
- Criar milestones por entrega ou marco para melhorar a rastreabilidade.

## Nota da Entrega

Nota: 4,0 / 5,0

## Justificativa da Nota

- Equipe formada dentro do prazo: 0,6 / 1,0. A equipe foi identificada dentro do prazo estendido e a composição com cinco integrantes foi aceita para esta entrega, mas não informa matrículas e não explicita o Scrum Master.
- Tema definido de forma clara, contextualizada, relevante e em conformidade com as restrições: 1,8 / 2,0. O tema é bem contextualizado, relevante e responde às perguntas obrigatórias, mas o escopo do MVP ainda está amplo para a restrição de poucas funcionalidades principais.
- README inicial preenchido, incluindo escopo do MVP e informações básicas: 0,9 / 1,0. O README está bem preenchido e organizado, mas faltam matrículas e maior delimitação do MVP.
- Governança mínima do repositório: 0,7 / 1,0. Há branch de entrega, PR aprovado, merge commit, templates e board, mas faltam issues, critérios de aceitação em issues reais, checks obrigatórios, proteção de branch e milestones.

## Observações sobre Uso de IA

A equipe declarou uso do Gemini para formatação de Markdown e organização das pastas para o GitHub, informando artefato impactado e validação. A declaração é compatível com os artefatos entregues, pois o repositório contém templates em `.github/` e documentação em Markdown. O registro atende melhor ao protocolo do que apenas declarar a ferramenta, mas ainda pode evoluir com descrições mais específicas do que foi aproveitado e de como a revisão humana foi realizada.
