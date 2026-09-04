# Riscos do Projeto

Aqui será registrado os possíveis riscos iniciais do projeto, cobrindo as naturezas: escopo, prazo, equipe, tecnologia e qualidade/processo.

## Registro dos Riscos

### Risco 01 - Aumento do escopo do MVP

| Campo | Descrição |
|---|---|
| **Natureza** | Escopo |
| **Descrição** | O MVP pode crescer durante o semestre, com a equipe tentando fazer funcionalidades que ficaram fora da primeira versão, antes de terminar o necessário. |
| **Causa** | Vontade de entregar um programa mais completo ou esquecer das funcionalidades básicas combinadas para o escopo do MVP. |
| **Consequência / Impacto** | Atraso na entrega da primeira versão e risco de nada ficar realmente pronto ao final do semestre. |
| **Probabilidade** | Baixa |
| **Impacto** | Médio |
| **Prioridade** | Média |
| **Estratégia de mitigação** | Manter o escopo do MVP no README e revisá-lo em cada sprint, garantindo que novas funcionalidades só entrem em versões futuras. |
| **Ações preventivas** | - Revisar o escopo do MVP no início de cada sprint, comparando com o README/backlog inicial.<br>- Qualquer ideia de funcionalidade fora do MVP vira issue marcada como "futuro", não entra direto na sprint atual.<br>- O Arquiteto (Daniel) valida se uma issue nova realmente pertence ao escopo do MVP antes dela ser priorizada. |
| **Ações caso o risco se concretize** | - Pausar a funcionalidade fora do escopo assim que identificada e movê-la para o backlog futuro.<br>- Reunir a equipe para revisar o que ainda falta do MVP original e repriorizar imediatamente. |
| **Acompanhamento da evolução** | Revisão do escopo comparado ao backlog inicial a cada sprint review; acompanhamento indireto pela métrica M-05 (distribuição de issues), observando se estão surgindo issues fora do recorte planejado. |
| **Responsável** | Daniel Luiz da Rocha Cordeiro (Arquiteto de Software) |


### Risco 02 - Estimativas erradas

| Campo | Descrição |
|---|---|
| **Natureza** | Prazo |
| **Descrição** |  O tempo estimado para cada parte do sistema pode não bater com o tempo que será gasto. |
| **Causa** | Falta de experiência da equipe com o processo de estimativa e erros de cálculo, principalmente em tarefas de infraestrutura, como Docker e Nginx, que a equipe ainda está aprendendo. |
| **Consequência / Impacto** | Atraso nas próximas entregas do semestre, podendo comprometer a finalização do projeto. |
| **Probabilidade** | Média |
| **Impacto** | Alto |
| **Prioridade** | Alta |
| **Estratégia de mitigação** | Reavaliar as estimativas a cada entrega, com base no que deu tempo de fazer e, caso necessário, cortar uma parte do escopo. |
| **Ações preventivas** | - Reestimar em grupo no planning de cada sprint, usando itens já concluídos como referência de comparação.<br>- Quebrar tarefas grandes em subtarefas menores antes de estimar, reduzindo a margem de erro.<br>- Buscar tutoriais/documentação sobre Docker e Nginx antes de estimar tarefas de infraestrutura, para reduzir a incerteza nesses itens. |
| **Ações caso o risco se concretize** | - Cortar escopo da sprint atual (mover item para a próxima sprint) em vez de tentar compensar trabalhando mais horas.<br>- Repriorizar o backlog com base na capacidade real restante da equipe. |
| **Acompanhamento da evolução** | Comparação entre estimativa e tempo real gasto a cada sprint, usando as métricas M-01 (issues abertas vs. fechadas) e M-06 (velocidade da equipe); discussão do desvio na retrospectiva. |
| **Responsável** | Daniel Luiz da Rocha Cordeiro (Arquiteto de Software) |


### Risco 03 - Indisponibilidade de um integrante

| Campo | Descrição |
|---|---|
| **Natureza** | Equipe |
| **Descrição** | Como a equipe é pequena, a indisponibilidade de um integrante pode deixar uma área do projeto para. |
| **Causa** | Provas e trabalhos de outras disciplinas no mesmo período, problemas pessoais ou de saúde. |
| **Consequência / Impacto** | A parte do integrante ausente irá atrasar e o resto da equipe precisará deixar de fazer parte de sua função para compensar a parte atrasada. |
| **Probabilidade** | Média |
| **Impacto** | Alto |
| **Prioridade** | Média |
| **Estratégia de mitigação** | Documentar decisões técnicas e processos, para que seja possivel dar continuidade ao trabalho, para evitar que o conhecimento esteja apenas em uma pessoa. |
| **Ações preventivas** | - Manter documentação técnica sempre atualizada e acessível a todos.<br>- Evitar que apenas uma pessoa domine uma parte crítica do sistema, incentivando revisão cruzada de código entre integrantes.<br>- Avisar a equipe com antecedência sobre possíveis indisponibilidades já previstas. |
| **Ações caso o risco se concretize** | - Redistribuir as tarefas do integrante ausente entre os demais, com base na documentação já registrada.<br>- Se necessário, reduzir o escopo comprometido da sprint atual para acomodar a ausência. |
| **Acompanhamento da evolução** | Checagem da disponibilidade da equipe no início de cada sprint, acompanhamento pela métrica M-05 para perceber se uma ausência já desequilibrou a distribuição de trabalho. |
| **Responsável** | Daniel Luiz da Rocha Cordeiro(Arquiteto de Software) |


### Risco 04 - Dificuldade para fazer Docker, Nginx e os microsserviços funcionarem juntos

| Campo | Descrição |
|---|---|
| **Natureza** | Tecnologia |
| **Descrição** | O projeto irá usar microsserviços com Docker e Nginx, porém, parte da equipe não domina totalmente essas ferramentas, podendo dar problema para fazer tudo se comunicar direito. |
| **Causa** | Pouca prática com Docker Compose e configuração de rotas no Nginx. |
| **Consequência / Impacto** | Perder tempo para descobrir por que os serviços não conversam entre si, atrasando o começo dos testes. |
| **Probabilidade** | Média |
| **Impacto** | Médio |
| **Prioridade** | Média |
| **Estratégia de mitigação** | Testar o Docker e Nginx com um serviço simples primeiro, antes de tentar subir tudo de uma vez. |
| **Ações preventivas** | - Criar um protótipo simples de Docker Compose + Nginx roteando um único serviço, antes de integrar todos os microsserviços.<br>- Consultar a documentação oficial e tutoriais confiáveis antes de configurar o ambiente definitivo.<br>- DevOps (Isac) compartilhar um guia básico com o restante da equipe, para que não fique concentrado só com ele. |
| **Ações caso o risco se concretize** | - Isolar o problema testando cada serviço separadamente, em vez de depurar tudo integrado de uma vez.<br>- Buscar apoio externo se o bloqueio persistir por mais de alguns dias.<br>- Se necessário, rodar os serviços localmente sem Docker de forma temporária, para não travar o desenvolvimento das demais funcionalidades. |
| **Acompanhamento da evolução** | Status da infraestrutura reportado nas reuniões semanais da equipe, acompanhamento da taxa de sucesso do pipeline de CI assim que configurado. |
| **Responsável** | Isac Lehmkuhl dos Santos(DevOps)|


### Risco 05 - Pouco ou nenhum teste automatizado

| Campo | Descrição |
|---|---|
| **Natureza** | Qualidade/Processo |
| **Descrição** | Com o prazo apertado, certas funcionalidades podem acabar sendo feitas sem testes automatizados. |
| **Causa** | Foco em entregar as funcionalidades a tempo, deixando os testes de fora pela falta de tempo sobrando. |
| **Consequência / Impacto** | Bugs que aparecem depois de pronto, dando mais trabalho do que se fossem encontrados anteriormente. |
| **Probabilidade** | Média |
| **Impacto** | Médio |
| **Prioridade** | Média |
| **Estratégia de mitigação** | Definir um mínimo de testes automatizados para as funcionalidades do MVP e configurar para rodar automáticamente nos pull requests. |
| **Ações preventivas** | - Definir, junto com a equipe, um mínimo obrigatório de testes por Pull Request.<br>- Configurar o pipeline de CI para rodar os testes automaticamente e bloquear o merge caso falhem. |
| **Ações caso o risco se concretize** | - Registrar uma issue de "dívida técnica" para cada funcionalidade entregue sem teste, para cobrir isso depois.<br>- Priorizar a escrita de testes para os módulos mais críticos primeiro, caso o tempo não permita cobrir tudo. |
| **Acompanhamento da evolução** | Acompanhamento da métrica M-03 (bugs por ambiente) e da cobertura de testes a cada sprint; checagem, na revisão de cada PR, se há teste correspondente às mudanças. |
| **Responsável** | Victor Eduardo Peixer Munarim(Engenheiro de Qualidade/QA) |

## Análise e Priorização dos Riscos

### Como classificamos probabilidade e impacto

Usamos uma escala simples de três níveis para cada risco:

| Nível | Probabilidade | Impacto                                |
|---|---|---|
| **Baixa** | Difícil de acontecer nesse semestre | Não atrapalha muito se acontecer       |
| **Média** | Pode acontecer | Atrasa, mas dá pra resolver            |
| **Alta** | Bem provável de acontecer | Compromete o prazo ou a entrega do MVP |

A prioridade dos riscos é definida pelo cruzamento de impacto e probabilidade. Quanto maior os
dois juntos, maior a prioridade.

### Matriz de riscos

| | Impacto Baixo | Impacto Médio | Impacto Alto |
|---|---|---|---|
| **Probabilidade Baixa** | — | — | R03 |
| **Probabilidade Média** | — | R01, R04, R05 | R02 |
| **Probabilidade Alta** | — | — | — |

### Riscos mais críticos agora

O risco que mais preocupa no momento é o **risco 02**. Como nunca fizemos 
estimativa desse jeito antes, é bem provável haver um erro de cálculo, e isso
pode afetar o cronograma do projeto inteiro.

Logo depois vem o **risco 03**. Tem menos chances de
acontecer, mas se acontecer o impacto é grande, já que a equipe é pequena
e cada um possuir funções específicas.

### Por que essa prioridade

- O risco 02 ficou como alta pois, se a equipe errar as estimativas, isso atrasa tudo que vem
  depois, não só um módulo
- Os riscos 01, 04 e 05 ficaram como média porque incomodam, mas afetam uma parte do projeto
  de cada vez
- O risco 03 ficou como média, ela tem uma baixa probabilidade de acontecer,
porém, causa um grande impacto
