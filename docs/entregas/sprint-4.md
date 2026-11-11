# Sprint 4: Inspeção e Planejamento

Documento do Item 1 da Entrega 8.

## Metadados

| Campo | Valor |
|---|---|
| **Data** | 01/11/2026 |
| **Equipe** | Bernardo Amaral Lisboa, Daniel Luiz da Rocha Cordeiro, Isac Lehmkuhl dos Santos, Monica Cancellier, Victor Eduardo Peixer Munarim |
| **Milestone** | `entrega-8` |
| **Release anterior** | `v0.3.0` (Sprint 3) |
| **Release desta sprint** | `v0.4.0` (Sprint 4) |

---

## (a) Análise do estado do MVP ao final da Sprint 3

- **O que estava pronto:**
  - CRUDs completos de Clientes, Produtos e Pedidos.
  - Tela de Vendas com formulário de pedido, itens dinâmicos e gráfico.
  - Regra comercial de desconto máximo de 15% por item, validada no frontend e no backend.
  - Swagger com os endpoints de pedidos.
  - Documentação de arquitetura (C4) e ADRs consolidadas.
  - Reengenharia da validação de IDs, com testes de regressão.
  - Pipeline de CI executando build e testes a cada Pull Request.
- **O que estava parcial:**
  - Baixa de estoque: o pedido era registrado, mas o saldo do produto não diminuía.
  - Pipeline de CI com um check apresentando falha. `check-main-pull-request` apresenta falha na hora de dar merge na main.
  - Execução em modo produção existente, mas sem documentação.
- **O que não havia começado:**
  - Dashboard com visão resumida das informações do sistema.
  - Documentação de deploy (`docs/DEPLOY.md`) e ambiente de validação para o professor.
  - Histórico de movimentações de estoque.
- **Diagnóstico central:**
  O sistema já operava o fluxo Cliente → Produto → Pedido, mas com uma inconsistência importante: vender não alterava o estoque, o que tornava os dados de estoque pouco confiáveis. Além disso, as informações estavam espalhadas em várias telas, sem uma visão rápida do negócio, e o sistema ainda não tinha um processo documentado para ser executado e validado por outra pessoa.

---

## (b) Identificação do que precisa ser mantido, corrigido, replanejado ou priorizado

- **Manter:**
  - Monólito modular em camadas (`controllers/`, `services/`, `repositories/`, `models/`).
  - Nginx como reverse proxy e Docker Compose como forma de execução.
  - Transações no banco para operações que alteram mais de uma tabela.
  - Revisão cruzada obrigatória de código com proteção de branch.
- **Corrigir:**
  - **Baixa de estoque:** o pedido passa a descontar o saldo dos produtos na mesma transação que o grava, bloqueando a venda de quantidade maior que o estoque. Edição e exclusão de pedido mantêm o saldo coerente. Tratado como correção de bug.
  - **CI:** corrigir o check que falha, para o pipeline voltar a servir de critério de merge. `check-main-pull-request` nunca finalizava, bloqueando o merge na main.
- **Replanejar:**
  - **Histórico de movimentações de estoque:** a baixa de saldo foi feita de forma simples, sem gravar em `movimentacoes_estoque`. O registro do histórico fica para uma sprint futura.
- **Priorizar na Sprint 4:**
  1. Correção da baixa de estoque nos pedidos.
  2. Dashboard com cards, gráficos e tabelas a partir dos dados existentes.
  3. Correção do pipeline de CI e atualização dos workflows.
  4. Deploy reprodutível, `docs/DEPLOY.md` e configuração segura.
  5. Atualização de métricas, riscos, README, arquitetura, ADRs e `USO-IA.md`.
  6. Publicação da release `v0.4.0`.

### Itens da sprint e issues

| Item | Issue | Responsável |
|---|---|---|
| Planejamento da Sprint 4 | [#156](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/156) | Daniel |
| Definir indicadores e protótipo do dashboard | [#157](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/157) | Monica |
| Consultas SQL agregadas para o dashboard | [#158](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/158) | Bernardo |
| Endpoints de resumo do dashboard | [#159](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/159) | Daniel |
| Bug: pedido não diminui quantidade do estoque | [#147](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/147) | Daniel |
| Bug: `check-branch-name-pr-main` nunca finaliza | [#172](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/172) | Isac |
| Verificar atual pipeline de CI | [#170](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/170) | Isac |
| Deploy reprodutível via `make prod` | [#161](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/161) | Isac |
| Criar `docs/DEPLOY.md` | [#162](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/162) | Isac |
| Ambiente de staging acessível | [#169](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/169) | Bernardo |
| Configuração segura e `.env.example` | [#163](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/163) | Isac |
| Validar ambiente implantado e registrar limitações | [#165](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/165) | Victor |
| Atualizar métricas ao final da Sprint 4 | [#164](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/164) | Daniel, Isac e Victor |
| Verificação dos riscos do projeto | [#171](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/171) | Victor |
| Atualizar README para o estado da Sprint 4 | [#166](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/166) | Daniel |
| Registro das contribuições individuais da Sprint 4 | [#168](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/168) | Bernardo |
| Publicar release `v0.4.0` | [#167](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues/167) | Daniel |

---

## (c) Meta da Sprint 4

> **Meta:** Corrigir a baixa de estoque nos pedidos, entregar o dashboard com as informações de vendas e estoque e disponibilizar o MVP em um ambiente reprodutível, com deploy e CI documentados e funcionando, publicando a release `v0.4.0`.

### Fundamentação da meta:

1. **Estado real do produto:**
   - O fluxo de pedidos funciona, mas vender não alterava o estoque. Corrigir isso é pré-requisito para que qualquer informação mostrada ao usuário seja confiável, inclusive o dashboard.
   - Com Clientes, Produtos e Pedidos prontos, os dados necessários para um resumo do negócio já existem, o que permite o dashboard sem criar novas tabelas.
2. **Backlog:**
   - O dashboard é o próximo passo natural do MVP: reúne vendas, produtos mais vendidos, melhores clientes e estoque baixo em uma única tela, apenas lendo dados existentes.
   - A Entrega 8 exige ambiente acessível ou reprodutível, deploy documentado e CI mantido, o que coloca a execução em produção como item obrigatório da sprint.
3. **Riscos (conforme [riscos.md](../riscos.md)):**
   - **Risco 02 (Estimativas erradas):** mitigado mantendo o dashboard sem CRUD e a baixa de estoque simples, e dividindo o dashboard em issues menores..
   - **Risco 04 (Docker, Nginx e serviços juntos):** ainda ativo, pois a sprint depende de `make prod` funcionar a partir de um clone limpo. Mitigado com o `docs/DEPLOY.md` e a validação do ambiente por alguém que não o configurou.
   - **Risco 05 (Pouco ou nenhum teste automatizado):** tratado com testes do dashboard e da baixa de estoque, executados pelo pipeline em cada Pull Request.
4. **Métricas (conforme [METRICAS.md](../METRICAS.md)):**
   - Acompanhamento do ritmo de fechamento de issues (M-01), tempo de revisão de Pull Requests (M-02), testes automatizados (M-04), distribuição de issues por integrante (M-05) e velocidade da equipe (M-06), esta última usando a escala de esforço P=2, M=5, G=8 e GG=13.

---

## (d) Registro dos ajustes de escopo

| Item | Situação Anterior | Situação Revisada | Motivo do Ajuste |
|---|---|---|---|
| **Baixa de estoque** | Prevista junto ao módulo de movimentações de estoque | Implementada de forma simples, dentro da transação do pedido, com bloqueio de venda acima do saldo | Estava causando inconsistência de dados; a solução simples corrige o problema sem depender do histórico. |
| **Histórico de movimentações** | Previsto junto com a baixa | Adiado para sprint futura | Não é necessário para o fluxo atual e evita ampliar o escopo da sprint. |
| **Exclusão de pedido** | Apenas apagava o pedido | Apaga o pedido e devolve o estoque | Mantém o saldo coerente com os pedidos existentes. |
| **Cancelamento de pedido** | Não previsto | Registrado como melhoria futura | Permitiria manter a venda no histórico sem contar no estoque; fora do prazo da sprint. |
| **Dashboard** | Não previsto no MVP | Incluído como incremento funcional da Sprint 4 | Usa dados já existentes, sem CRUD, e dá visão rápida do negócio. |
| **Ambiente de staging** | Não existia | Alternativa reprodutível via `make prod`, documentada em `docs/DEPLOY.md` | Não temos servidor hospedado, então o ambiente roda por contêineres. |
| **Deploy automatizado** | Não existia | Deploy reprodutível por comando, sem workflow de implantação | Sem servidor para receber o deploy, a automação não é possível; o CI cuida do build e dos testes. |
| **Conferência de mercadorias** | Fora do escopo do semestre | Mantida fora do escopo | Sem alteração desde a Sprint 3. |
| **Fornecedores** | Apenas consulta (`GET`) | Mantido apenas com consulta | Não está no caminho crítico da sprint. |