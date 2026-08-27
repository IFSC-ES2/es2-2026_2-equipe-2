# Registro da Abordagem de Estimativa

## 1. Técnica utilizada

**Técnica:** T-Shirt Size

**Justificativa da escolha:** A técnica de T-Shirt Size foi escolhida por ser rápida, de fácil compreensão para todo o time e evita a falsa precisão de estimativas numéricas em um momento inicial do backlog. Também facilita comparações relativas entre itens de tamanhos distintos antes de um refinamento mais detalhado.

## 2. Participantes da estimativa

| Nome | Papel/Função na estimativa |
| ---- | -------------------------- |
| Bernardo Amaral Lisboa | Database Administrator (DBA) |
| Daniel Luiz da Rocha Cordeiro | Arquiteto de Software |
| Isac Lehmkuhl dos Santos | DevOps/Infra |
| Monica Cancellier | UI/UX Designer |
| Victor Eduardo Peixer Munarim | Engenheiro de Qualidade (QA) |

## 3. Unidade adotada

**Unidade:** Tamanho de camiseta (P / M / G / GG)

**Justificativa da unidade escolhida:** O uso de tamanhos de camiseta permite fazer uma rápida classificação do esforço relativo para cada item, sem exigir uma conversão imediata para horas, servindo para um refinamento posterior.

## 4. Critérios usados para comparar/dimensionar os itens

- **Critério 1**: Complexidade técnica (regras de validação, integrações necessárias)

- **Critério 2**: Conhecimento do domínio (quanto a equipe já entende)

- **Critério 3**: Volume de trabalho

- **Critério 4**: Dependências

- **Critério 5**: Similaridade com itens já implementados

## 5. Itens estimados

| Item | Estimativa | Unidade | Critério predominante | Consenso da equipe? |
| ---- | ---------- | ------- | --------------------- | -------------------- |
| [#7 – Cadastrar novo cliente](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/7) | M | T-Shirt Size | Volume de trabalho e divergência sobre complexidade das regras de cadastro | Não (divergência entre M e G) |
| [#8 – Editar dados de cliente](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/8) | G | T-Shirt Size | Similaridade com #7 e divergência sobre reaproveitamento real do formulário | Não (divergência entre M e G) |
| [#9 – Consultar clientes](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/9) | P | T-Shirt Size | Volume de trabalho (listagem, filtros e paginação) | Sim |
| [#10 – Inativar um cliente](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/10) | P | T-Shirt Size | Complexidade técnica baixa (alteração simples de status) | Sim |
| [#11 – Consultar histórico de pedidos](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/11) | M | T-Shirt Size | Dependências (integração com módulo de pedidos) e incerteza | Não (divergência entre P e M) |


## 6. Limitações e incertezas percebidas

- **Limitação 1**: Ainda não há clareza total sobre como os dados de pedidos estão modelados, o que impacta a estimativa do item #11.

- **Limitação 2**: Não há protótipos validados com o time de UX para os itens de cadastro e edição de cliente, o que pode alterar o esforço de frontend.

- **Incerteza 1**: Regras específicas de "inativação" não estavam totalmente claras no momento da estimativa.

## 7. Observações adicionais

Na primeira votação os itens #9 e o #10 tiveram consenso, todos os votantes convergiram para P, ambos sendo considerados operações simples e diretas.
 
Os demais itens tiveram divergencia:
 
- **#7 (Cadastrar novo cliente):** Isac e Victor votaram M, enquanto Bernardo, Daniel e Monica votaram G. Houve divergencia em relação à complexidade das regras de validação do cadastro.

- **#8 (Editar dados de cliente):** Isac e Victor votaram G, enquanto Bernardo, Daniel e Monica, votaram M. Em debate, foi constatado diferentes visões sobre quanto o formulário de edição poderia reaproveitar a estrutura do cadastro.

- **#11 (Consultar histórico de pedidos):** Daniel e Isac votaram M, enquanto Bernardo, Monica e Victor votaram P. A divergência se deu por diferentes visões sobre a complexidade da integração com o módulo de pedidos.

Recomenda-se que os participantes expliquem brevemente o pensamento por trás do seu voto, para fazer uma segunda votação e fechar a estimativa para esses 3 itens.
 

Na segunda rodada de debate, a equipe revisou os três itens em aberto e chegou às seguintes conclusões:
 
- **#7 e #8:** após o debate, ficou confirmado que editar é mais complexo do que cadastrar, já que a edição precisa lidar com regras adicionais de validação de dados já existentes, enquanto o cadastro lida apenas com dados novos. Com isso, a estimativa de #7 foi de M e a de #8 foi G.

- **#11 (Consultar histórico de pedidos):** houve uma falha de entendimento na primeira rodada, a funcionalidade deve exibir todos os pedidos de um cliente específico, e não uma tela de todos os pedidos, interpretação que havia sido adotado por alguns membros na hora do voto. Após o debate, a equipe concordou com o #11 sendo M.

