# Baseline do Planejamento

## 1. Recorte do backlog considerado

| ID    | Item do backlog | Descrição resumida                                                                                                  |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| BL-01 | #11             | Permitir buscar e consultar histórico de pedidos dos clientes cadastrados com filtros.                              |
| BL-02 | #10             | Permitir inativar um cliente sem excluir seu histórico.                                                             |
| BL-03 | #9              | Permitir buscar e consultar clientes cadastrados com filtros.                                                       |
| BL-04 | #8              | Permitir a atualização dos dados de um cliente existente.                                                           |
| BL-05 | #7              | Permitir que a equipe administrativa registre um novo cliente com nome/razão social, documento, contato e endereço. |

## 2. Priorização dos itens mais importantes do MVP

**Critério de priorização adotado:** _MoSCoW_

| Categoria | Item  | Justificativa                                                         |
| --------- | ----- | --------------------------------------------------------------------- |
| Must      | BL-05 | Pré-requisito para as demais funcionalidades (cadastro do cliente)    |
| Must      | BL-01 | Consulta de histórico é função central do ERP                         |
| Should    | BL-03 | Busca de clientes é uso frequente, mas depende do cadastro já existir |
| Should    | BL-04 | Atualização de dados é recorrente, porém menos crítica que busca      |
| Could     | BL-02 | Inativação é usada esporadicamente, pode ficar para depois do MVP     |

## 3. Estimativas dos itens priorizados

> Tabela com a estimativa de cada item priorizado, na unidade definida em `ESTIMATIVAS.md`.

| Item  | Estimativa | Unidade      | Observações                                                                                     |
| ----- | ---------- | ------------ | ------------------------------------------------------------------------------------------------ |
| BL-05 | M          | T-Shirt Size | Consenso alcançado após 2ª rodada; cadastro é mais simples que a edição (só lida com dados novos). |
| BL-01 | M          | T-Shirt Size | Consenso alcançado após 2ª rodada; esclarecido que exibe pedidos de um cliente específico.        |
| BL-03 | P          | T-Shirt Size | Consenso na 1ª rodada; operação simples de listagem, filtros e paginação.                        |
| BL-04 | G          | T-Shirt Size | Consenso após 2ª rodada; edição é mais complexa que o cadastro por lidar com validação de dados já existentes. |
| BL-02 | P          | T-Shirt Size | Consenso na 1ª rodada; alteração simples de status (ativo/inativo).                               |

## 4. Técnica de estimativa adotada

**Técnica:** T-Shirt Size (P / M / G / GG).

Cada integrante votou individualmente o tamanho percebido para cada item, sem ver o voto dos demais antes de revelar o seu. Itens com consenso imediato (#9 e #10, ambos P) foram fechados na primeira rodada. Os itens com divergência (#7, #8 e #11) passaram por uma segunda rodada, precedida de debate em que os votantes extremos explicaram seu raciocínio — o que levou a esclarecimentos de escopo (ex: #11 é o histórico de um cliente específico, não uma tela geral de pedidos) e a ajustes de estimativa. O detalhamento completo da sessão, incluindo os votos individuais e as justificativas de divergência, está em `ESTIMATIVAS.md`.

## 5. Hipóteses assumidas

- Hipótese 1: A modelagem da entidade Cliente (BL-05) não sofrerá mudanças estruturais relevantes depois de iniciada, já que os demais itens do recorte dependem dela.
- Hipótese 2: A estrutura de dados de pedidos, ainda não totalmente definida no momento da estimativa, estará minimamente disponível a tempo de viabilizar o desenvolvimento de BL-01 dentro do tamanho estimado (M).
- Hipótese 3: As regras específicas de "inativação" de cliente (BL-02) serão esclarecidas com a equipe antes do início da implementação, já que não estavam totalmente claras no momento da estimativa.
- Hipótese 4: Ainda não há protótipos de UX validados para os itens de cadastro e edição de cliente (BL-05 e BL-04); a estimativa assume que a definição de tela ocorrerá em paralelo ao início do desenvolvimento, sem bloquear o trabalho do backend.
- Hipótese 5: A disponibilidade declarada pelos integrantes na Seção 6 se manterá estável até o próximo marco, considerando as restrições já conhecidas.

## 6. Capacidade planejada da equipe até o próximo marco

| Integrante                     | Papel nesta etapa                           | Disponibilidade estimada (h/semana) | Período considerado | Total disponível até o marco |
| ------------------------------- | -------------------------------------------- | ------------------------------------ | -------------------- | ------------------------------ |
| Bernardo Amaral Lisboa          | Database Administrator (DBA)                 | 40 h                                  | 26/08 – 02/09         | 40 h                            |
| Daniel Luiz da Rocha Cordeiro   | Arquiteto de Software                        | 18 h                                  | 26/08 – 02/09         | 18 h                            |
| Isac Lehmkuhl dos Santos        | DevOps/Infra                                 | 20 h                                  | 26/08 – 02/09         | 20 h                            |
| Monica Cancellier               | UI/UX Designer                               | 20 h                                  | 26/08 – 02/09         | 20 h                            |
| Victor Eduardo Peixer Munarim   | Engenheiro de Qualidade (QA) e Scrum Master  | 20 h                                  | 26/08 – 02/09         | 20 h                            |

**Capacidade total da equipe até o próximo marco:** 118 horas

**Restrições conhecidas:** trabalho, disciplinas acadêmicas paralelas, tempo com família/amigos e prática de atividades físicas — já consideradas na disponibilidade declarada acima.

**Fatores que podem afetar a previsibilidade:** curva de aprendizado com a stack escolhida, pouca experiência prévia da equipe em projetos de porte maior e ausência de um ambiente padronizado de produção neste momento do projeto.

## 7. Previsão inicial do que se espera concluir no período

- [ ] BL-05 — Cadastrar novo cliente (M)
- [ ] BL-01 — Visualizar histórico de pedidos do cliente (M)
- [ ] BL-03 — Consultar clientes (P)
- [ ] BL-04 — Editar dados de cliente (G)

**Item adicional, se sobrar capacidade (Could, não comprometido):**
- [ ] BL-02 — Inativar cliente (P)

A previsão prioriza os itens Must e Should do MoSCoW (BL-05, BL-01, BL-03, BL-04), que juntos cobrem o fluxo essencial de cadastro de clientes. BL-02 é tratado como item de sobra de capacidade, dado ser classificado como Could e depender de esclarecimento das regras de inativação (Hipótese 3) antes de ser iniciado com segurança.

## 8. Data de registro da linha de base

**Data do baseline:** 27/08/2026

> Este baseline é uma referência inicial e não um compromisso imutável. Alterações futuras deverão ser comparadas com esta linha de base.