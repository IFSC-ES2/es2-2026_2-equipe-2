# Definição das Métricas Acompanhadas

Este documento apresenta a visão geral das métricas escolhidas pela equipe, organizadas em três categorias: **produto**, **processo** e **projeto**. A ficha detalhada de cada métrica está em `docs/metricas/M-XX.md`.

## 1. Métricas de produto

> Métricas relacionadas ao valor entregue ao usuário final / qualidade do produto.

| Código | Nome da métrica | Objetivo resumido | Ficha detalhada |
|--------|------------------|---------------------|-------------------|
| M-03 | Bugs encontrados por ambiente (desenvolvimento vs. homologação) | Avaliar se os problemas estão sendo identificados ainda em desenvolvimento, antes de chegar a etapas posteriores. | [M-03](metricas/M-03.md) |
| M-04 | Tempo médio de conferência de um pedido | Avaliar se o sistema está tornando o processo de conferência mais rápido do que o processo manual anterior. | [M-04](metricas/M-04.md) |

## 2. Métricas de processo

> Métricas relacionadas à forma como a equipe trabalha (ex.: fluxo, qualidade do processo de desenvolvimento, revisão de código).

| Código | Nome da métrica | Objetivo resumido | Ficha detalhada |
|--------|------------------|---------------------|-------------------|
| M-01 | Issues abertas vs. fechadas por sprint | Acompanhar se o ritmo de entrega da equipe está estável, identificando acúmulo se existe trabalho pendente. | [M-01](metricas/M-01.md) |
| M-02 | Tempo médio de revisão de Pull Requests | Verificar se a revisão de código está sendo feita em tempo hábil, evitando gargalos na integração do trabalho. | [M-02](metricas/M-02.md) |

## 3. Métricas de projeto

> Métricas relacionadas ao andamento do projeto como um todo (ex.: prazo, escopo, previsibilidade).

| Código | Nome da métrica | Objetivo resumido | Ficha detalhada |
|--------|------------------|---------------------|-------------------|
| M-05 | Distribuição de issues concluídas por integrante | Garantir que a carga de trabalho está equilibrada entre os integrantes da equipe. | [M-05](metricas/M-05.md) |
| M-06 | Velocidade da equipe por sprint | Estimar a capacidade de entrega da equipe, permitindo prever o comprometimento nas sprints seguintes. | [M-06](metricas/M-06.md) |

## 4. Justificativa geral da escolha das métricas

> Explique por que esse conjunto de métricas é relevante para o contexto do projeto, e não apenas de fácil coleta.

Este conjunto foi escolhido para cobrir três dimensões complementares do projeto, evitando que o acompanhamento fique restrito apenas ao andamento das tarefas.

As métricas de **processo** (M-01, M-02) foram escolhidas porque a equipe trabalha de forma distribuída, com módulos que dependem uns dos outros (Cadastro de Clientes, Estoque, Conferência, Carga e Descarga). Acompanhar o ritmo de fechamento de issues e o tempo de revisão de PRs ajuda a identificar cedo se algum gargalo está atrasando a entrega das dependências entre módulos, permitindo ajuste de prioridades antes que o atraso se acumule.

As métricas de **produto** (M-03, M-04) foram escolhidas por estarem diretamente ligadas ao problema que o sistema se propõe a resolver: reduzir erros de controle manual e agilizar a conferência de mercadorias. Medir bugs por ambiente é uma forma de avaliar a maturidade do processo de qualidade antes da entrega, enquanto o tempo médio de conferência de um pedido é a métrica mais próxima do valor real que o sistema promete gerar, sem ela, seria difícil demonstrar se o MVP de fato resolve a dor relatada.

As métricas de **projeto** (M-05, M-06) foram escolhidas para acompanhar a saúde da equipe ao longo do semestre, já que o trabalho é dividido entre cinco pessoas com papéis diferentes. Sem essas métricas, seria fácil que o desequilíbrio de carga entre os integrantes ou a dificuldade de estimar esforço só fossem percebidos tarde demais.

O conjunto foi definido pensando em utilidade para tomada de decisão, e não apenas em facilidade de coleta — em todos os casos, os dados já são gerados naturalmente pelo uso do GitHub (issues, PRs) ou pelo próprio sistema em desenvolvimento (banco de dados), sem exigir ferramentas ou processos extras só para viabilizar a métrica.

## 5. Observações

- As métricas aqui definidas ainda não possuem valores coletados nesta etapa; o acompanhamento será feito nas entregas seguintes.
- Métricas escolhidas apenas por facilidade, sem utilidade para tomada de decisão, poderão ser reavaliadas.