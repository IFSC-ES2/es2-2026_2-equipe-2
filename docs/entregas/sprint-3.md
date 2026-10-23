# Sprint 3: Inspeção e Replanejamento

Documento do Item 1 da Entrega 7.

## Metadados

| Campo | Valor |
|---|---|
| **Data** | 22/10/2026 |
| **Equipe** | Bernardo Amaral Lisboa, Daniel Luiz da Rocha Cordeiro, Isac Lehmkuhl dos Santos, Monica Cancellier, Victor Eduardo Peixer Munarim |
| **Milestone** | `entrega-7` |
| **Release anterior** | `v0.2.0` (Sprint 2) |
| **Release desta sprint** | `v0.3.0` (Sprint 3) |

---

## (a) Análise do estado do MVP ao final da Sprint 2

- **O que estava pronto:**
  - CRUDs completos de Clientes e Produtos.
  - Categorias.
  - Swagger da API documentado.
  - Layout base unificado com Header e Sidebar de navegação.
  - Pipeline de CI executando build e testes automatizados.
- **O que estava parcial:**
  - Fornecedores apenas com endpoint de leitura (`GET /api/fornecedores`).
  - Tela de Vendas apenas visual (placeholder sem funcionalidade).
- **O que não havia começado:**
  - Módulo de Pedidos e Vendas.
  - Movimentação de estoque (entradas, saídas, histórico e saldo por depósito).
  - Conferência de mercadorias.
- **Diagnóstico central:**
  O sistema entregou a fundação cadastral com boa qualidade, mas ainda não operava o negócio. O usuário conseguia cadastrar produtos e clientes, mas não realizava vendas nem movimentações. O valor operacional do ERP estava pendente.

---

## (b) Identificação do que precisa ser mantido, corrigido, replanejado ou priorizado

- **Manter:**
  - Monólito modular em camadas (`controllers/`, `services/`, `repositories/`, `models/`).
  - Nginx como reverse proxy e ponto de entrada único.
  - Docker Compose unificado com hot-reload (`make dev`).
  - Swagger atualizado a cada Pull Request.
  - Revisão cruzada obrigatória de código com proteção de branch.
- **Corrigir:**
  - **Arquitetura formal:** substituir formalmente a previsão de microsserviços da [ADR-0005](../adrs/ADR-0005-arquitetura-microsservicos.md) pela [ADR-0008](../adrs/ADR-0008-backend-monolitico-modular.md) (Monólito Modular) e atualizar o status da [ADR-0002](../adrs/ADR-0002-stack-backend.md) para superada pela [ADR-0006](../adrs/ADR-0006-tipagem-backend-e-cliente-proprio-bd.md).
  - **Qualidade e Design:** eliminar duplicações e fragilidades na validação de IDs nos services (`Categoria`, `Cliente` e `Produto`), documentado em [REENGENHARIA.md](../REENGENHARIA.md).
  - **CI:** padronizar instalação de dependências para `npm ci` nos workflows.
- **Replanejar:**
  - **Pedidos e Vendas:** priorizado como foco central da Sprint 3 para conectar Clientes e Produtos.
  - **Baixa física de estoque:** desacoplada do pedido na S3 e transferida para a Sprint 4, para ser implementada junto ao módulo completo de movimentações de estoque.
- **Priorizar na Sprint 3:**
  1. CRUD transacional de Pedidos no backend (persistência atômica de pedido e itens com validações comerciais).
  2. Interface completa de Vendas no frontend (criação dinâmica de pedido com itens, cards e gráficos).
  3. Reengenharia de validação de IDs com testes automatizados.
  4. Documentação de arquitetura C4 ([ARQUITETURA.md](../ARQUITETURA.md)) e consolidação das ADRs.
  5. Publicação da release `v0.3.0`.

---

## (c) Meta da Sprint 3

> **Meta:** Implementar o fluxo de registro e gestão de pedidos de venda de ponta a ponta (API transacional e tela de vendas no frontend), garantindo a aplicação das regras comerciais, e publicar a release `v0.3.0`.

### Fundamentação da meta:

1. **Estado real do produto:**
   - Com os cadastros de Clientes e Produtos prontos da Sprint 2, Pedidos é a primeira operação que conecta as duas entidades em um fluxo operacional real.
2. **Backlog:**
   - Pedidos de Venda é o próximo item essencial do MVP. Implementá-lo com itens dinâmicos viabiliza o histórico de compras por cliente e prepara os dados necessários para as movimentações de estoque.
3. **Riscos (conforme [riscos.md](../riscos.md)):**
   - **Risco 01 (Aumento de escopo):** mitigado retirando a conferência do semestre e adiando a baixa física de saldo para a Sprint 4.
   - **Risco 02 (Estimativas erradas):** mitigado dividindo o módulo em entregas menores e independentes (CRUD backend no PR #136/#137 e tela frontend no PR #143).
   - **Risco 05 (Pouco ou nenhum teste automatizado):** mitigado com testes unitários no backend (`pedido.service.test.ts`), testes de regressão na refatoração (`validacao-id.controller.test.ts`) e testes de componentes no frontend.
4. **Métricas (conforme [METRICAS.md](../METRICAS.md)):**
   - Acompanhamento da velocidade da equipe (M-06), ritmo de fechamento de issues (M-01) e tempo de revisão de Pull Requests (M-02) para manter o escopo alinhado à capacidade real da sprint.

---

## (d) Registro dos ajustes de escopo

| Item | Situação Anterior | Situação Revisada | Motivo do Ajuste |
|---|---|---|---|
| **Pedidos e Vendas** | Previsto apenas como apoio no MVP | Módulo central do MVP na Sprint 3 | Conecta Clientes e Produtos no primeiro fluxo operacional real do ERP. |
| **Baixa física de saldo de estoque** | Prevista junto ao registro do pedido | Movida para a Sprint 4 | Evitar acoplamento prematuro; será implementada junto com a tabela e histórico de movimentações. |
| **Conferência de mercadorias** | No escopo do MVP | Retirada do escopo do semestre | Inviável no prazo restante; sem pedidos e estoque consolidados não há o que conferir. |
| **Fornecedores** | CRUD completo previsto inicialmente | Apenas consulta (`GET`) mantida | Não está no caminho crítico das operações prioritárias do MVP. |
| **Arquitetura Backend** | Microsserviços previstos ([ADR-0005](../adrs/ADR-0005-arquitetura-microsservicos.md)) | Monólito Modular formalizado ([ADR-0008](../adrs/ADR-0008-backend-monolitico-modular.md)) | Simplifica operação, deploy e viabiliza transações atômicas nativas no banco de dados. |
