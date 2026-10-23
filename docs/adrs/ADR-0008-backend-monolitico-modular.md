# ADR-0008: Adoção de Backend Monolítico Modular em vez de Microsserviços

## Status

Aceita - substitui parcialmente a [ADR-0005](./ADR-0005-arquitetura-microsservicos.md) 
no que diz respeito ao uso de microsserviços.

## Contexto

A [ADR-0005](./ADR-0005-arquitetura-microsservicos.md) definiu que o sistema seria construído
como um conjunto de microsserviços independentes, atrás de um Nginx atuando como ponto único de
entrada. Ao longo das Sprints 1 e 2, a equipe implementou as entidades do domínio todas dentro de um único contêiner de backend (`api-estoque`), organizado internamente em camadas, em vez de dividir cada entidade em um serviço separado.

## Decisão

O backend permanece como um **monólito modular**: um único processo/contêiner (`api-estoque`)
que concentra todas as entidades do domínio, mas mantém separação de responsabilidades por meio
de pastas e camadas (`controllers/`, `services/`, `repositories/`, `models/`). O Nginx como ponto único de entrada e o uso de Docker Compose, decididos na ADR-0005, permanecem válidos e em uso.

## Alternativas consideradas

- **Seguir dividindo em microsserviços**, com um contêiner por entidade, descartada nesta fase por aumentar significativamente a complexidade de
  comunicação entre serviços, sem benefício claro para o tamanho
  atual da equipe e do projeto.
- **Dividir só os módulos mais prováveis de crescer**, avaliada, mas descartada por ora: os módulos ainda
  compartilham fortemente o mesmo modelo de dados relacional, o que tornaria a divisão prematura e custosa de manter consistente.

## Consequências

### Positivas

- Reduz drasticamente a complexidade operacional: um único `Dockerfile`, um único processo para
  depurar, sem necessidade de comunicação de rede entre partes do próprio backend.
- Operações que envolvem mais de uma entidade podem usar transações de banco simples (`BEGIN`/`COMMIT`/
  `ROLLBACK`), o que seria consideravelmente mais complexo de garantir entre microsserviços
  separados.
- Mantém a organização interna em camadas por entidade, preservando a possibilidade de extrair
  um módulo para um serviço independente no futuro, caso a necessidade apareça.

### Negativas / Riscos

- Perde-se a possibilidade de escalar ou implantar cada entidade de forma independente, um dos
  benefícios originalmente esperados dos microsserviços na ADR-0005.
- Um bug ou travamento em um módulo, pode afetar a disponibilidade de todo o backend, já que tudo roda no mesmo processo.
- O Nginx continua válido como ponto único de entrada, mas seu papel de "rotear para o
  microsserviço certo" não se concretizou, hoje ele roteia apenas entre
  dois contêineres (frontend e o backend único), um cenário mais simples do que o planejado.

## Metadados

| Campo | Valor |
| ----- | ----- |
| Autor | Daniel Luiz da Rocha Cordeiro|
| Data  | 2026-10-22 |