# Preparação para a Apresentação Final

Documento de apoio à demonstração do MVP do **AURA ERP** (ERP para gestão de operações logísticas em distribuidoras).

## (c) Versão demonstrada

| Campo                   | Valor                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Release / tag**       | `v1.0.0-rc.1` (release candidate da entrega final)                                                                   |
| **Endpoint inicial**     | `/dashboard`                                                                                                      |
| **Base**                | `main` após o merge dos PRs de documentação desta etapa (testes de aceitação, métricas, preparação da apresentação). |
| **Ambiente**            | Staging local conteinerizado (`make prod`): Nginx + frontend + API + PostgreSQL 17                                   |
| **Endpoint do Swagger** | `/api/docs`                                                                                                          |

Preparar a versão:

```bash
git fetch --tags
git checkout v1.0.0-rc.1
cp .env.example .env
make prod
curl -s {preencher-url}/api/ping                                              # {"pong":true}
```

Para voltar o banco ao seed original antes da demo (ou entre ensaios), com a stack no ar, recriar o schema e reaplicar o `conf/init-db.sql`:

```bash
DC="docker compose -f docker-compose.yaml -f docker-compose.prod.yaml"
$DC exec -T db psql -U postgres -d estoque -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
$DC exec -T db psql -U postgres -d estoque -v ON_ERROR_STOP=1 < conf/init-db.sql
```

Resultado esperado: 7 clientes, 11 produtos, 15 pedidos.

## (b) Cenário, dados e usuário de teste

**Usuário:** o MVP não possui login nem perfis.

**Dados (seed de `conf/init-db.sql`, carregado automaticamente):**

| Entidade | Quantidade | Itens usados na demo                                                                                                 |
| -------- | ---------: | -------------------------------------------------------------------------------------------------------------------- |
| Clientes |          7 | Pelo menos um cliente com pedidos (ex.: Maria Silva), para mostrar a proteção de exclusão                            |
| Produtos |         11 | Um produto com saldo alto para vender (ex.: Webcam, saldo 35) e outro para o alerta de estoque baixo (ex.: Notebook) |
| Pedidos  |         15 | 13 concluídos, 1 pendente, 1 cancelado, em datas variadas (alimentam o gráfico do dashboard)                         |

**Dados criados ao vivo:** um cliente novo e um pedido, para mostrar o fluxo completo.

**Preparo do alerta de estoque baixo** (o seed não tem nenhum produto abaixo do mínimo), feito pelo próprio sistema:

1. Abrir `/estoque` e editar um produto (ex.: Notebook).
2. Ajustar a **quantidade** para um valor menor que o **estoque mínimo** (ex.: quantidade 2, mínimo 3) e salvar.
3. Conferir o aviso "Atenção: produto(s) com estoque no mínimo ou abaixo" e a linha destacada em `/estoque`, e o alerta em `/dashboard`.

Isso pode ser feito durante a demo (passo 4 do roteiro) ou antes dela.

## (a) Roteiro da demonstração

| #   | Passo               | O que mostrar                                                                                                                               |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Contexto            | Problema (controle manual/planilhas), proposta de valor e escopo do MVP.                                                                    |
| 2   | Dashboard           | Visão geral: indicadores de vendas, gráfico por período, rankings e alerta de estoque baixo.                                                |
| 3   | Clientes            | Cadastro, edição e exclusão com proteção para cliente que já tem pedidos.                                                                   |
| 4   | Estoque             | Listagem e cadastro de produtos, com categoria, fornecedor e saldo atual; editar um produto para ficar abaixo do mínimo e mostrar o alerta. |
| 5   | Vendas              | Criação de pedido com itens; regras de negócio (limite de desconto e estoque insuficiente).                                                 |
| 6   | Baixa automática    | Voltar ao estoque e mostrar que o saldo foi atualizado pela venda.                                                                          |
| 7   | Documentação da API | Swagger com os endpoints: `/api/docs`.                                                                                                      |
| 8   | Qualidade           | CI, testes automatizados (M-04) e testes de aceitação (`docs/ACEITACAO.md`).                                                                |
| 9   | Limitações          | Resumo da seção (d): o que ficou fora do MVP e os defeitos conhecidos.                                                                      |

**Plano B** (se a UI falhar): executar os mesmos fluxos pela API, com `curl` ou pelo Swagger, conforme `docs/ACEITACAO.md`.

## (d) Limitações, riscos residuais e pendências

### Funcionalidades do MVP não entregues

| Item                                                       | Situação                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Conferência de pedidos (itens, divergências, status)       | Não implementada.                                                                                       |
| Histórico de movimentações de estoque                      | Tabela `movimentacoes_estoque` existe, mas nada grava nela e não há endpoint (replanejado na Sprint 4). |
| Inativação de clientes                                     | Só existe exclusão física; não há campo `ativo`.                                                        |
| Registro de entrada de estoque com motivo (compra, ajuste) | Não há tela/endpoint de entrada; o saldo só muda por venda ou edição do produto.                        |
| Histórico de pedidos por cliente                           | O pedido traz o cliente, mas não há tela/endpoint de histórico por cliente.                             |

Carga/descarga, rotas, financeiro e integrações estão **fora do escopo** do semestre (README §2c).

### Riscos residuais

| Risco                                                                 | Probabilidade | Impacto | Mitigação                                                                       |
| --------------------------------------------------------------------- | ------------- | ------- | ------------------------------------------------------------------------------- |
| Falha de ambiente durante a demo (porta ocupada, Docker, build lento) | Média         | Alto    | Subir e validar o ambiente antes; manter plano B com `curl`/Swagger.            |
| Estado do banco sujo por ensaios                                      | Média         | Médio   | Resetar o banco com os comandos da seção (c) imediatamente antes de apresentar. |
| Perguntas sobre escopo (conferência, movimentações)                   | Alta          | Médio   | Declarar de forma explícita o que ficou fora e por quê (seção acima).           |
| Divergência entre ambiente local e CI (Risco 06)                      | Média         | Baixo   | `make ci` antes de rodar; versões fixadas nos `package-lock.json`.              |
| Risco 02 (estimativas), já registrado em `docs/riscos.md`             | Alta          | Alto    | Explica o corte de escopo (conferência e movimentações).                        |

### Pendências (backlog pós-entrega)

1. Corrigir BUG-AT-01 e BUG-AT-02 (mapear `23505` e `23503` para 409) e cobrir com teste unitário.
2. Corrigir a documentação de `?periodo=` no README e no Swagger.
3. Implementar a gravação em `movimentacoes_estoque` e um endpoint de consulta por produto.
4. Implementar a conferência de pedidos.
5. Implementar a inativação de clientes (campo `ativo`).
