# Projeto Engenharia de Software II

## Equipe

Bernardo Amaral Lisboa - Database Administrator (DBA)
Daniel Luiz da Rocha Cordeiro - Arquiteto de Software
Isac Lehmkuhl dos Santos - DevOps/Infra
Monica Cancellier - UI/UX Designer
Victor Eduardo Peixer Munarim - Engenheiro de Qualidade (QA)

## Tema

**ERP para gestão de operações logísticas em distribuidoras**

Sistema de apoio à gestão operacional de armazéns e centros de distribuição, voltado à
digitalização e centralização de processos que hoje são conduzidos majoritariamente de forma
manual ou em planilhas.

**(a) Qual problema o sistema pretende resolver?**
Em muitas distribuidoras, o controle de estoque, conferência de mercadorias e cadastro de
clientes ainda é feito manualmente ou por meio de planilhas desconectadas entre si. Isso gera
retrabalho, diferenças entre o que está registrado e o que realmente existe em estoque e atrasos
na conferência de pedidos.

**(b) Em qual área de aplicação o problema está situado?**
O problema está situado na área de **gestão logística e operações de armazém**, especificamente
nos processos de recebimento, armazenagem, conferência e expedição de mercadorias em empresas
distribuidoras.

**(c) Quem são os usuários?**
Operadores, responsáveis pelo registro de carga e descarga de mercadorias;
Equipe de conferência, que valida pedidos recebidos e expedidos;
Equipe administrativa/comercial, responsável pelo cadastro e gestão de clientes;
Gestores/supervisores, que acompanham níveis de estoque e o andamento das operações.

**(d) Em qual local, organização, comunidade ou contexto o sistema poderia ser aplicado?**
O sistema é pensado para o contexto de uma **distribuidora de médio porte, com múltiplos
depósitos**, inspirado em uma empresa real do setor conhecida pela equipe.

**(e) Por que o tema é relevante?**
Erros de controle manual em operações logísticas geram custos diretos (perda de mercadoria,
retrabalho, atrasos).Automatizar esse fluxo é um problema comum em empresas de médio porte
que ainda não têm orçamento ou estrutura para soluções de ERP completas do mercado.

**(f) Qual é a proposta do sistema para resolver ou apoiar a solução do problema?**
O sistema propõe substituir os controles manuais/planilhas por um fluxo único e rastreável,
integrando os processos essenciais da operação em uma única aplicação: cadastro de clientes,
estoque, conferência e carga/descarga.

### Escopo Inicial do MVP

**Cadastros de clientes**
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

**Carga e descarga**
- Registro do processo de descarga (recebimento) vinculando itens ao estoque de entrada;
- Registro do processo de carga (expedição) vinculando itens ao estoque de saída;
- Associação do processo a um cliente/pedido e a uma doca/depósito;
- Consulta do status do processo (aguardando, em andamento, finalizado).

#### Fora do Escopo

**Rastreamento de veículos** — localização em tempo real e histórico de trajeto de frota;
**Rotas** — criação, edição e otimização de rotas de entrega;
**Financeiro** — faturamento, contas a pagar/receber, emissão de nota fiscal;
**Integrações externas** — conexão com GPS/telemetria e marketplaces;