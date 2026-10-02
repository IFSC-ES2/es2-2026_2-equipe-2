# ADR 0007: Aplicação de Padrões de Projeto Orientados a Objetos (Design Patterns)

## Contexto e Problema
À medida que a aplicação (especialmente o backend da `api-estoque`) evoluiu, surgiram alguns problemas reais de design estrutural e de instanciação de recursos:

1. **Gestão de Conexões com o Banco de Dados:** A criação de novas conexões/pools com o banco de dados em diferentes contextos ou repositórios da aplicação causaria vazamento de conexões e esgotamento rápido dos limites do PostgreSQL ( overhead de performance e queda do banco).
2. **Complexidade de Inicialização e Configuração da Aplicação Web:** A inicialização do framework web (Express) demandava diversas etapas obrigatórias e sequenciais: acoplar middlewares (CORS, parser de JSON), vincular o router e conectar o banco de dados. Deixar essa lógica exposta solta no ponto de entrada tornava o código procedural, frágil e muito difícil de instanciar de forma limpa durante os testes de integração.

Para resolver esses desafios, a equipe deliberou e aplicou padrões de projeto orientados a objetos clássicos (Design Patterns).

## Decisão e Padrões Adotados

### 1. Padrão Singleton (Gerenciamento do Pool do Banco de Dados)

* **Problema Identificado:** Necessidade imperativa de evitar instâncias simultâneas do pool de conexões do PostgreSQL no mesmo processo. O limite do DB seria estourado se cada repositório tentasse construir seu próprio Pool localmente.
* **Padrão Adotado:** **Singleton**
* **Por que foi adequado:** O padrão Singleton garante que um determinado objeto possua apenas e exatamente uma única instância acessível globalmente pela aplicação. Valendo-se do sistema de module caching do ecossistema Node.js (que atua como garantidor de escopo), instanciamos o `Pool` do `pg` no arquivo de configuração do DB. Toda a aplicação consome a exata mesma instância em memória de forma segura.
* **Módulos Afetados:** 
  - `api-estoque/src/config/database.ts` (Implementação do Singleton)
  - `api-estoque/src/App.ts` e toda a hierarquia de `api-estoque/src/repositories/` (Clientes do Singleton).
* **Benefícios:** Garantia de uso eficiente de I/O de rede e pool unificado, previsibilidade no consumo de memória.
* **Trade-offs:** Introduz, por design, um estado global implícito. Pode dificultar determinados fluxos de testes concorrentes que precisassem isolar comportamentos de queda de rede, demandando _mocks_ ou injeções indiretas.

### 2. Padrão Facade (Inicialização Controlada do Servidor)

* **Problema Identificado:** A inicialização solta das regras da infraestrutura Web tornava o arquivo `server.ts` bagunçado, com vazamento de responsabilidades procedurais (configurar rota, lidar com request size, loggar portas). Testar a aplicação end-to-end seria custoso porque o setup estava acoplado ao ato de "ouvir a porta" na rede.
* **Padrão Adotado:** **Facade (Fachada)**
* **Por que foi adequado:** A Fachada fornece uma interface limpa, unificada e de alto nível que oculta a complexidade estrutural de um subsistema (no caso, as entranhas do Express e integrações). O uso da classe `SetupApplication` encapsula toda a complexidade, provendo para o cliente externo as assinaturas fáceis `init()` e `start()`. 
* **Módulos Afetados:** 
  - `api-estoque/src/App.ts` (a Classe Fachada)
  - `api-estoque/src/server.ts` (o Cliente consumidor).
* **Benefícios:** 
  - Alto nível de desacoplamento e isolamento de responsabilidade.
  - Extensibilidade imediata (adicionar um servidor gRPC amanhã será mais simples isolando contextos).
  - Facilita os testes de integração, pois a Fachada pode invocar o Express (`init()`) e devolver a instância para o `Supertest` sem necessariamente engatilhar o socket HTTP real (`start()`).
* **Trade-offs:** Introduz uma nova camada de indireção. Para sub-sistemas muito rasos poderia ser complexidade desnecessária, mas a escalabilidade arquitetural alcançada provou o valor da solução.

## Consequências
Com a formalização e justificação desses dois padrões OO (e tangencialmente o uso de arquitetura baseada no Repository Pattern - _Template Method_ para os acessos genéricos ao BD na `BaseRepository.ts`), o backend atingiu as garantias necessárias para os próximos ciclos de desenvolvimento, sustentando uma boa governança técnica de manutenção e testabilidade.
