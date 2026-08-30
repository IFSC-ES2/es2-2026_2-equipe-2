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
| **Responsável** | Daniel Luiz da Rocha Cordeiro |


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
| **Responsável** | Daniel Luiz da Rocha Cordeiro |


### Risco 03 - Algum integrante ficar sem conseguir participar

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
| **Responsável** | Daniel Luiz da Rocha Cordeiro |


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
| **Responsável** | Isac Lehmkuhl dos Santos|


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
| **Responsável** | Victor Eduardo Peixer Munarim |