# ADR-0005: Arquitetura Geral com Microsserviços, Docker e Nginx

## Status

Aceita

## Contexto

O projeto tem várias aplicações que precisam rodar juntas, tanto no ambiente de desenvolvimento quanto em testes. Precisamos definir como essas aplicações vão ser organizadas, como vão se comunicar e como vão ser subidas, pensando em facilitar a configuração e deixar o ambiente pronto com poucos comandos.

## Decisão

O sistema vai ser feito com microsserviços, que se comunicam entre si. Vamos colocar um Nginx na frente de tudo, funcionando como ponto único de entrada do sistema e direcionando cada requisição para o microsserviço certo. Todas as aplicações vão subir com Docker, usando um único arquivo `docker-compose.yaml`.

## Alternativas consideradas

- **Um `docker-compose.yaml` para cada serviço** - mais complexo para subir o ambiente completo e exige configuração manual de rede entre os containers.
- **Cada microsserviço acessado direto, sem Nginx na frente** - deixaria o sistema fragmentado em vários endereços e portas, dificultando o acesso e configurações futuras como HTTPS e CORS.

## Consequências

### Positivas

- Cada serviço pode ser desenvolvido, testado e escalado de forma mais independente.
- Facilidade para subir o projeto todo com um único comando (`docker-compose up`).
- O Nginx centraliza o ponto de entrada, simplificando o roteamento entre os microsserviços.

### Negativas / Riscos

- Todo novo microsserviço precisa ser adicionado na configuração do Nginx.
- Mais serviços rodando ao mesmo tempo consomem mais recursos da máquina durante o desenvolvimento.
- Mais difícil de configurar e identificar o problema quando algo falha na comunicação entre os serviços.

## Metadados

| Campo | Valor                    |
| ----- | ------------------------ |
| Autor | Daniel Luiz da Rocha Cordeiro          |
| Data  | 2026-08-14               |