# Projeto Engenharia de Software II

## Equipe

| Nome                          | Função                                      | Matrícula    |
| ----------------------------- | ------------------------------------------- | ------------ |
| Bernardo Amaral Lisboa        | Database Administrator (DBA) e Scrum Master | 202510703703 |
| Daniel Luiz da Rocha Cordeiro | Arquiteto de Software                       | 202510703715 |
| Isac Lehmkuhl dos Santos      | DevOps/Infra                                | 202510703633 |
| Monica Cancellier             | UI/UX Designer                              | 202320003698 |
| Victor Eduardo Peixer Munarim | Engenheiro de Qualidade (QA)                | 202510703662 |

## Tema

**ERP para gestão de operações logísticas em distribuidoras**

Sistema de apoio à gestão operacional de armazéns e centros de distribuição, voltado à digitalização e centralização de processos que hoje são conduzidos majoritariamente de forma manual ou em planilhas.

## Documentação e Referências

- **Visão do produto:** seção [1. Visão do Produto](#1-visão-do-produto);
- **Escopo do MVP:** seção [2. Definição do MVP](#2-definição-do-mvp);
- **Board:** [board do projeto](https://github.com/orgs/IFSC-ES2/projects/33);
- **Backlog:** [backlog/issues](https://github.com/IFSC-ES2/es2-2026_2-equipe-2/issues);
- **DoD (Definition of Done):** [dod.md](./docs/dod.md);
- **ADRs:** [ADRs](./docs/adrs/);
- **Uso de Inteligência Artificial:** [USO-IA.md](./USO-IA.md);
- **Estimativas:** [ESTIMATIVAS.md](./docs/ESTIMATIVAS.md)
- **BaseLine:** [BASELINE.md](./docs/BASELINE.md)
- **Métricas:** [METRICAS.md;](./docs/METRICAS.md)

## 1. Visão do Produto

**(a) Problema que o sistema pretende resolver**  
Em muitas distribuidoras, o controle de estoque, a conferência de mercadorias e o cadastro de clientes ainda são feitos manualmente ou em planilhas separadas. Isso causa retrabalho, diferenças entre o estoque real e o registrado, e atrasos na conferência dos pedidos.

**(b) Área de aplicação**  
Gestão logística e operações de armazém, nos processos de recebimento, armazenagem, conferência e expedição de mercadorias em empresas distribuidoras.

**(c) Usuários principais e demais interessados**  
Operadores, responsáveis pelo registro de carga e descarga de mercadorias; Equipe de conferência, que valida pedidos recebidos e expedidos; Equipe administrativa/comercial, responsável pelo cadastro e gestão de clientes; Gestores/supervisores, que acompanham níveis de estoque e o andamento das operações.

**(d) Local, organização ou contexto de aplicação**  
O sistema é pensado para uma distribuidora de médio porte, com múltiplos depósitos, baseada em uma empresa real do setor conhecida pela equipe.

**(e) Proposta de valor**  
O sistema propõe trocar os controles manuais e as planilhas por um único sistema, com informação centralizada e rastreável, juntando cadastro de clientes, estoque e conferência. Isso diminui erros de digitação, evita divergências de estoque e dá mais visibilidade do andamento de cada operação.

**(f) Objetivos do produto neste semestre**

- Tirar do papel/planilha os processos de cadastro de clientes, estoque e conferência;
- Ter um MVP funcionando começando pela base do sistema (clientes, estoque e conferência), evoluindo depois para carga/descarga;
- Manter um histórico básico das movimentações de estoque;
- Testar se esse recorte de funcionalidades já ajuda na operação real de uma distribuidora.

**(g) Premissas, restrições e limitações conhecidas**

- O prazo é de um semestre, então o escopo precisa ser enxuto;
- A equipe tem só 5 pessoas, cada uma com um papel fixo (DBA, Arquitetura, DevOps/Infra, UI/UX, QA);
- Não vai ter integrações externas (GPS, marketplaces) nem módulo financeiro nesta fase;
- O sistema é baseado em uma empresa real conhecida pela equipe, mas sem acesso aos dados ou ao ambiente de produção dela;
- O sistema é de uso interno da distribuidora, não é voltado para clientes finais.

## 2. Definição do MVP

**(a) Objetivo do MVP**
Ter uma primeira versão funcionando que já mostre o começo do fluxo da operação, com cadastro de clientes e controle básico de estoque, para validar se o modelo de dados e a ideia do projeto fazem sentido antes de partir para a carga/descarga em versões seguintes.

**(b) Funcionalidades essenciais (primeira versão do MVP)**

**Cadastro de clientes**

- Cadastro, edição, consulta e inativação de clientes;
- Dados básicos (nome/razão social, documento, contato, endereço);
- Histórico de pedidos vinculados ao cliente.

**Estoque**

- Registro de entrada e saída de itens, com vínculo ao motivo (compra, venda, ajuste);
- Consulta de saldo atual por produto e por depósito;
- Alertas de nível mínimo, sinalizando itens a repor;
- Histórico de movimentações por item, para auditoria básica.

**Conferência**

- Checagem de itens recebidos contra o pedido de compra/nota de entrada;
- Checagem de itens expedidos contra o pedido de venda/saída;
- Registro de divergências (falta, sobra, avaria) com observação;
- Status de conferência por pedido (pendente, em andamento, concluído).

**(c) Funcionalidades fora do escopo neste momento**

- **Rastreamento de veículos** — localização em tempo real e histórico de trajeto de frota;
- **Rotas** — criação, edição e otimização de rotas de entrega;
- **Financeiro** — faturamento, contas a pagar/receber, emissão de nota fiscal;
- **Integrações externas** — conexão com GPS/telemetria e marketplaces;
- **Carga e descarga** - registros de movimentação de entrada e saida de produtos por veículos.

**(d) Por que esse recorte é viável para o semestre**

- Clientes, estoque e conferência são a base para os outros módulos, então é o ponto de partida mais seguro;
- Validar o básico primeiro evita retrabalho nos módulos seguintes;
- O time é pequeno, então um recorte menor é mais fácil de entregar com qualidade;
- Carga/descarga continua no plano, só entra depois da base pronta.

**(e) Critérios usados para decidir o que entra e o que fica de fora**

- O que é base para os outros módulos entrou primeiro;
- O que depende de módulos ainda não prontos ficou para depois;
- O que depende de sistemas externos ficou de fora do semestre;
- O que tem regras de negócio mais complexas, como financeiro, também ficou de fora por falta de tempo.
