# Retrospectiva do Projeto: Processo, Colaboração, Riscos, Qualidade e Previsibilidade

Este documento consolida a retrospectiva analítica do desenvolvimento do MVP do sistema de gestão logística ao longo das Sprints 1 a 4, fundamentando-se nas métricas coletadas ([METRICAS.md](./METRICAS.md)) e na evolução dos riscos acompanhados ([riscos.md](./riscos.md)).

---

## Metadados

| Campo | Valor |
|---|---|
| **Data** | 16/11/2026 |
| **Equipe** | Bernardo Amaral Lisboa (DBA)<br>Daniel Luiz da Rocha Cordeiro (Arquiteto de Software e Scrum Master)<br>Isac Lehmkuhl dos Santos (DevOps/Infra)<br>Monica Cancellier (UI/UX Designer)<br>Victor Eduardo Peixer Munarim (Engenheiro de Qualidade/QA) |
| **Período Avaliado** | Sprints 1 a 4 (Milestones `entrega-5` a `entrega-8`) |
| **Releases Abrangidas** | `v0.1.0` (S1) · `v0.2.0` (S2) · `v0.3.0` (S3) · `v0.4.0` (S4) |

---

## 1. Painel Consolidado de Métricas

O acompanhamento empírico baseou-se em seis métricas chave divididas entre processo, produto e projeto:

| Métrica | Dimensão | Sprint 1 (`v0.1.0`) | Sprint 2 (`v0.2.0`) | Sprint 3 (`v0.3.0`) | Sprint 4 (`v0.4.0`) | Tendência Geral |
|---|---|---|---|---|---|---|
| **[M-01](./metricas/M-01.md)** Issues fechadas / abertas | Processo | 15 / 17 (0,88) | 13 / 13 (1,00) | 14 / 14 (1,00) | 16 / 16 (1,00) | Estável / Eficaz (meta atingida) |
| **[M-02](./metricas/M-02.md)** Tempo médio de revisão de PR | Processo | 6 horas | 4 horas | 3 horas | 7 horas | Ágil com pico na entrega final |
| **[M-03](./metricas/M-03.md)** Bugs pegos em desenvolvimento | Produto | 2 (100% em dev) | 8 (100% em dev) | 2 (100% em dev) | 2 (100% em dev) | 100% de contenção antes de homologação |
| **[M-04](./metricas/M-04.md)** Testes automatizados (aprovação) | Produto | 16 suítes / ~80 testes (100%) | 23 suítes / ~160 testes (100%) | 28 suítes / 250 testes (100%) | >250 testes + dashboard/transações (100%) | Crescimento contínuo e sem quebras |
| **[M-05](./metricas/M-05.md)** Distribuição de issues por membro | Projeto | Dan: 35,3% \| Isa: 35,3%<br>Ber: 23,5% \| Vic: 17,6%<br>Mon: 6,0% | Dan: 31,3% \| Ber: 25,0%<br>Isa: 25,0% \| Vic: 12,5%<br>Mon: 6,3% | Dan: 31,3% \| Isa: 25,0%<br>Vic: 25,0% \| Ber: 12,5%<br>Mon: 6,3% | Dan: 34,8% \| Isa: 34,8%<br>Ber: 13,0% \| Vic: 13,0%<br>Mon: 4,4% | Assimetria explicada pela natureza técnica dos papéis |
| **[M-06](./metricas/M-06.md)** Velocidade (throughput de PRs/itens) | Projeto | 15 issues | 13 PRs (69 commits) | 14 PRs (53 commits) | 14 PRs integrados | Alta consistência (~13 a 14 PRs/sprint) |

---

## 2. Análise Retrospectiva por Pilares

### 2.1. Processo
O processo de desenvolvimento adotou o GitHub Flow com proteção de branches, branches específicas para features, fixes, chores e docs, e aprovação obrigatória via Pull Requests com checagem automatizada no CI.

- **Evolução do ritmo:** Na Sprint 1, a razão de conclusão foi de 0,88 (2 issues replanejadas), fruto do início da adaptação ao fluxo e ambiente Docker. A partir da Sprint 2, a taxa de fechamento estabilizou em 1,00 em todas as sprints subsequentes, demonstrando disciplina no encerramento de escopo.
- **Ciclo de revisão de código:** O tempo médio de revisão de PRs ([M-02](./metricas/M-02.md)) manteve-se baixo (entre 3h e 6h nas três primeiras sprints), viabilizando integrações contínuas sem retenção de demandas. Na Sprint 4, a média subiu para 7h devido à densidade de PRs estruturais (dashboard analítico, deploy conteinerizado e transações com baixa de estoque), mas sem comprometer a data de fechamento.
- **Adaptações contínuas:** O uso de reuniões de inspeção e planejamento formalizadas ([sprint-3.md](./entregas/sprint-3.md) e [sprint-4.md](./entregas/sprint-4.md)) permitiu identificar gargalos cedo e calibrar a atuação da equipe a cada marco.

### 2.2. Colaboração
A divisão do time em cinco papéis formais garantiu especialização, mas exigiu alinhamento frequente para evitar dependências bloqueantes.

- **Integração interdisciplinar:** A colaboração entre UI/UX (Mônica) e Front-end/Infra (Isac e Daniel) possibilitou a evolução ágil de protótipos para telas funcionais (como visto no protótipo do dashboard e telas de vendas). Da mesma forma, o trabalho conjunto de Banco de Dados (Bernardo) e Arquitetura (Daniel) garantiu integridade nas consultas agregadas e transações atômicas.
- **Distribuição de carga de trabalho ([M-05](./metricas/M-05.md)):** Observou-se uma assimetria no número de issues concluídas. Daniel (Arquitetura) e Isac (DevOps/Infra) concentraram maior volume de tarefas técnicas (cerca de 30% a 35% cada), refletindo as altas demandas de configuração de infraestrutura, padronização de APIs, Nginx, CI e deploy. Mônica atuou de forma focada no início do ciclo em identidade visual e prototipação de UX, enquanto Victor atuou fortemente na governança da qualidade, revisão de riscos e homologação.
- **Mitigação do Risco de Pessoas ([R03](./riscos.md)):** Para evitar silos isolados de conhecimento e mitigar o risco de indisponibilidade de integrantes, a equipe investiu em documentação exaustiva (ADRs, Swagger interativo, [DEPLOY.md](./DEPLOY.md) e relatórios de reengenharia) e na revisão cruzada em pares de todos os PRs.

### 2.3. Riscos
O gerenciamento de riscos foi dinâmico, ajustado ativamente a cada sprint:

- **[R01] Aumento de escopo do MVP:** Inicialmente classificado com preocupação moderada, foi o risco melhor mitigado. A equipe teve a disciplina de cortar itens inviáveis no prazo (como conferência física de mercadorias no armazém e cancelamento formal de pedidos) e simplificar requisitos (CRUD de fornecedores restrito a consulta `GET`, baixa de estoque embutida na transação sem histórico avulso). O escopo do MVP permaneceu enxuto e estritamente aderente ao objetivo de conectar Clientes, Produtos, Pedidos, Estoque e Dashboard.
- **[R02] Estimativas erradas:** Na Sprint 2, a equipe experimentou sobrecarga no encerramento da sprint por subestimar o esforço de integração, elevando a probabilidade deste risco para Alta. A resposta foi quebrar entregas grandes em sub-issues menores e mais independentes nas Sprints 3 e 4, eliminando atrasos.
- **[R04] Dificuldade com Docker, Nginx e comunicação entre serviços:** Originalmente pensado para microsserviços ([ADR-0005](./adrs/ADR-0005-arquitetura-microsservicos.md)), o risco foi mitigado na raiz através de uma mudança arquitetural decisiva: a formalização do Monólito Modular ([ADR-0008](./adrs/ADR-0008-backend-monolitico-modular.md)). Essa decisão eliminou a complexidade de rede distribuída e simplificou o ambiente conteinerizado via `make dev` e `make prod`.
- **[R05] e [R06] Testes e divergência local/CI:** O risco de déficit de testes ([R05](./riscos.md)) permaneceu estritamente controlado pelo bloqueio automático no CI. Quando surgiu divergência entre ambientes locais e a esteira ([R06](./riscos.md)), a equipe agiu rápido criando o comando `make ci` (`npm ci`) e travando dependências no `package-lock.json`.

### 2.4. Qualidade
A qualidade do sistema foi tratada como critério inegociável de aceite (Definition of Done):

- **Contenção total de defeitos ([M-03](./metricas/M-03.md)):** 100% dos bugs detectados em todas as sprints foram identificados e corrigidos durante as fases de desenvolvimento e revisão de PRs. Nenhum defeito crítico escapou para os ambientes de homologação ou release final. Destaque para a resolução do bug [#147](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/147) na Sprint 4, que garantiu a consistência transacional da baixa de estoque em vendas.
- **Crescimento da cobertura de testes ([M-04](./metricas/M-04.md)):** A base de testes automatizados com Vitest escalou de ~80 testes na Sprint 1 para 250 na Sprint 3 e superou esse patamar na Sprint 4 com a inclusão das rotas analíticas do dashboard e validação de regras de estoque. A taxa de aprovação manteve-se em 100% em todas as entregas.
- **Manutenibilidade e Refatoração:** Na Sprint 3, a equipe realizou a reengenharia de validação de IDs em camadas compartilhadas ([REENGENHARIA.md](./REENGENHARIA.md)), eliminando duplicações de código e reduzindo complexidade ciclomática.
- **Reprodutibilidade e Deploy:** A Sprint 4 culminou na entrega do ambiente conteinerizado otimizado via `make prod`, eliminando disparidades de infraestrutura e permitindo validação cega por terceiros com base no [DEPLOY.md](./DEPLOY.md).

### 2.5. Previsibilidade
A capacidade da equipe de estimar, planejar e cumprir o que foi acordado evoluiu visivelmente:

- **Estabilidade da velocidade ([M-06](./metricas/M-06.md)):** A taxa de entrega convergiu para uma cadência estável de 13 a 14 PRs integrados por sprint (69 commits na S2, 53 na S3 e volume equivalente na S4). Essa regularidade reduziu o estresse de entregas de última hora.
- **Alinhamento entre planejado e realizado:** Após o desvio inicial na Sprint 1, a previsibilidade atingiu seu ápice com a conclusão de 100% das tarefas planejadas para as Sprints 2, 3 e 4 ([M-01](./metricas/M-01.md) = 1,00). 
- **Decisões orientadas a capacidade:** A decisão de adiar a baixa de estoque na Sprint 3 para priorizar a interface e transação de pedidos no frontend evitou atrasos em cascata, demonstrando maturidade em preferir uma entrega previsível e bem testada a uma tentativa arriscada de abraçar escopo excessivo.

---

## 3. Escopo do MVP: Planejado vs. Entregue

Esta seção compara o escopo definido na Definição do MVP (Clientes, Estoque e Conferência) com o que foi entregue em `v0.4.0`.

### 3.1. Planejado vs. entregue

| Funcionalidade planejada | O que foi entregue | Status |
|---|---|---|
| Cadastro, edição, consulta e exclusão de clientes | CRUD de clientes e página de clientes. A exclusão é bloqueada se o cliente tiver pedidos | Concluída |
| Dados básicos do cliente (nome/razão social, documento, contato, endereço) | Todos os campos de acordo com o planejamento | Concluída |
| Histórico de pedidos por cliente | O vínculo pedido–cliente existe e alimenta o ranking de melhores clientes, mas não há tela de histórico por cliente | Pendente |
| Entrada e saída de itens | Baixa automática na venda, com bloqueio acima do saldo. | Concluída |
| Saldo por produto e por depósito | Saldo por produto. Depósito não implementado | Parcial |
| Alertas de nível mínimo | Indicador de estoque baixo/crítico no dashboard | Concluída |
| Histórico de movimentações por item | Adiado: a baixa não grava em `movimentacoes_estoque` | Pendente |
| Conferência (recebimento, expedição, divergências e status por pedido) | Retirada do escopo do semestre na Sprint 3 | Removida |

**Resumo:** 4 concluídas, 1 parcial, 2 pendentes e 1 removida (módulo de Conferência, que tinha 4 itens).

### 3.2. Entregue fora do plano original

- **Pedidos (vendas):** CRUD transacional com itens dinâmicos, desconto máximo de 15% por item e baixa/estorno automático de estoque.
- **Dashboard analítico:** KPIs de vendas, produtos mais vendidos, melhores clientes, estoque baixo e distribuição por categoria.
- **Categorias:** CRUD de categorias.
- **Fornecedores:** apenas consulta (`GET`), usada no cadastro de produtos.
- **Deploy reprodutível:** `make prod`, documentado em [DEPLOY.md](./DEPLOY.md).

### 3.3. Mudanças de escopo

| Sprint | Mudança | Motivo |
|---|---|---|
| S1 | Sequelize substituído por `pg` com `BaseRepository` ([ADR-0006](./adrs/ADR-0006-tipagem-backend-e-cliente-proprio-bd.md)) | Reduzir duplicação de código |
| S1 → S2 | Edição de produto adiada para a Sprint 2 | Fora do prazo da sprint |
| S3 | Pedidos e Vendas passam a ser o módulo central | Conectar Clientes e Produtos no primeiro fluxo operacional |
| S3 | Conferência de mercadorias retirada do semestre | Inviável no prazo; sem pedidos e estoque consolidados não há o que conferir |
| S3 | Fornecedores mantidos só com consulta (`GET`) | Fora do caminho crítico do MVP |
| S3 | Microsserviços substituídos por monólito modular ([ADR-0008](./adrs/ADR-0008-backend-monolitico-modular.md)) | Simplificar operação e deploy e permitir transações atômicas no banco |
| S3 → S4 | Baixa de estoque adiada para a Sprint 4 | Evitar acoplamento prematuro com o histórico de movimentações |
| S4 | Baixa de estoque feita de forma simples, dentro da transação do pedido ([#147](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/147)) | A inconsistência de dados precisava de correção sem depender do histórico |
| S4 | Histórico de movimentações adiado | Não é necessário para o fluxo atual |
| S4 | Cancelamento de pedido registrado como melhoria futura | Fora do prazo da sprint |
| S4 | Dashboard incluído no MVP | Usa dados existentes, sem CRUD |
| S4 | Deploy via `make prod` no lugar de staging e deploy automatizado | Não há servidor hospedado para receber o deploy |

### 3.4. Análise

- **Mudança de foco:** o MVP começou como Clientes + Estoque + Conferência e terminou como Clientes + Produtos + Pedidos + Estoque + Dashboard.
- **Valor entregue:** o fluxo principal (Clientes → Produtos → Pedidos → Estoque → Dashboard) ficou completo e testado. As perdas se concentraram em rastreabilidade (histórico de movimentações, depósitos) e na Conferência.
- **Backlog para o futuro:** histórico de movimentações, histórico de pedidos por cliente, inativação de clientes, saldo por depósito, cancelamento de pedido e Conferência.

---

## 4. Síntese Final

### O que funcionou muito bem
1. **Pipeline de CI e cultura de testes automatizados:** O bloqueio estrito de merges para testes falhando ou quebras de lint protegeu o projeto contra regressões ao longo de todo o semestre.
2. **Pragmatismo arquitetural (ADR-0008):** Reconhecer o custo desnecessário de microsserviços e adotar o monólito modular destravou o desenvolvimento e simplificou o Docker e as transações de banco.
3. **Gestão proativa de escopo:** A coragem de cortar itens secundários (conferência, múltiplos CRUDs) garantiu que o fluxo principal (Clientes → Produtos → Pedidos → Estoque → Dashboard) chegasse ao fim do semestre completo, integrado e funcional.
4. **Documentação viva:** A documentação mantida rigorosamente atualizada (Swagger, ADRs, DEPLOY, guias de métricas) reduziu o tempo de integração e onboarding de novos módulos.

### O que precisou ser adaptado durante a jornada
1. **Calibração de esforço e sobrecarga na Sprint 2:** As primeiras estimativas foram otimistas quanto ao tempo de testes de integração, exigindo ajuste para tarefas menores e foco na capacidade real nas sprints seguintes.
2. **Ambiente e dependências (Risco 06):** Inconsistências esporádicas entre builds locais e GitHub Actions exigiram a institucionalização de `make ci` e locks rigorosos.
3. **Equilíbrio de carga no board:** A concentração de volume de issues técnicas nos papéis de Arquitetura e DevOps permaneceu alta, exigindo constante diálogo para não sobrecarregar integrantes-chave.

### Lições Aprendidas para Projetos Futuros
- **Começar simples na arquitetura:** Arquiteturas distribuídas (como microsserviços) trazem sobrecarga de infraestrutura desproporcional para equipes pequenas; monólitos modulares bem desenhados entregam a mesma separação com fração do custo operacional.
- **Métricas simples e automatizáveis geram valor real:** Acompanhar apenas métricas geradas naturalmente pelo fluxo (PRs, issues, testes no CI) evitou burocracia e forneceu sinais precoces claros para tomada de decisão.
- **Feito é melhor que inflado:** Um MVP consistente, com dados íntegros e baixa automática de estoque validada, gera muito mais valor prático do que um sistema com dezenas de telas rasas e dados inconsistentes.