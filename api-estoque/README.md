# API de Estoque — AURA ERP

Microsserviço backend do **AURA ERP** para gestão e persistência de dados de produtos, clientes, categorias, fornecedores e controle de estoque.

Desenvolvido em **Node.js** com **TypeScript** e **Express 5**, integrado ao banco de dados relacional **PostgreSQL 17** e estruturado no padrão Controller-Service-Repository com Design Patterns orientados a objetos (ADR-0007).

---

## Tecnologias e Bibliotecas

| Tecnologia | Versão | Função |
| :--- | :--- | :--- |
| **Node.js** | 24 (Alpine) | Ambiente de execução no backend |
| **TypeScript / TSX** | 7.0 / 4.23 | Tipagem estática e executor em desenvolvimento com watch |
| **Express** | 5.2 | Framework HTTP para rotas e middlewares REST |
| **PostgreSQL / pg** | 17 / 8.23 | Banco de dados relacional e driver com connection pool |
| **Swagger UI** | 5.0 | Documentação interativa OpenAPI 3.0 em `/docs` |
| **Winston** | 3.19 | Logging estruturado (console e arquivos rotativos) |
| **Vitest** | 5.0 | Testes unitários da camada de serviços |
| **ESLint / Prettier** | 10.8 / 3.9 | Análise estática e padronização de formatação |
| **Docker** | Alpine | Imagens de desenvolvimento e produção multi-stage |

---

## Arquitetura e Padrões de Projeto

A aplicação adota separação estrita em camadas e padrões OO documentados na ADR-0007:

- **Singleton (`src/config/database.ts`):** Instância única compartilhada do pool do PostgreSQL, evitando saturação de conexões.
- **Facade (`src/App.ts`):** A classe `SetupApplication` encapsula a configuração de middlewares, banco e rotas através dos métodos `init()` e `start()`.
- **Repository Pattern (`src/repositories/BaseRepository.ts`):** Classe abstrata com operações genéricas de CRUD em SQL parametrizado, herdada pelos repositórios de domínio.
- **Resposta Padronizada (`src/utils/createResponseBody.ts`):** Respostas de sucesso e erro utilizam envelope consistente (`{ success, status, title, data }`).

---

## Recursos e Endpoints

Documentação interativa com schemas e testes em [http://localhost:8080/api/docs](http://localhost:8080/api/docs) ou `http://localhost:5000/docs`.

| Recurso | Método | Endpoint | Descrição |
| :--- | :---: | :--- | :--- |
| **Healthcheck** | `GET` | `/ping` | Status e disponibilidade da API |
| **Produtos** | `GET`, `POST` | `/produtos` | Listagem (com fornecedor/categoria) e criação |
| | `GET`, `PUT`, `DELETE` | `/produtos/:id` | Consulta, atualização e remoção (protegida) |
| **Clientes** | `GET`, `POST` | `/clientes` | Listagem e cadastro com validação de dados |
| | `GET`, `PUT`, `DELETE` | `/clientes/:id` | Consulta, atualização e exclusão (protegida) |
| **Categorias** | `GET`, `POST` | `/categorias` | Listagem e criação de categorias |
| | `GET`, `PUT`, `DELETE` | `/categorias/:id` | Consulta, edição e exclusão de categoria |
| **Fornecedores** | `GET` | `/fornecedores` | Listagem para seleção em formulários |
| **Documentação** | `GET` | `/docs` | Swagger UI interativo |

---

## Estrutura de Diretórios

```
api-estoque/
├── src/
│   ├── config/             # Conexão com banco (pool), logger e status HTTP
│   ├── controllers/        # Handlers HTTP de cada recurso
│   ├── docs/               # Especificações Swagger/OpenAPI
│   ├── errors/             # Classes de exceções da aplicação
│   ├── models/             # Tipagens e interfaces de dados
│   ├── repositories/       # BaseRepository e consultas SQL
│   ├── routes/             # Definição e agrupamento de rotas
│   ├── services/           # Regras de negócio e validações
│   ├── utils/              # Resposta padrão, validação de IDs e erros
│   ├── App.ts              # Fachada da aplicação Express
│   └── server.ts           # Inicialização do servidor
├── test/
│   └── services/           # Testes unitários com Vitest
├── Dockerfile              # Build multi-stage de produção (Node Alpine)
├── Dockerfile.dev          # Imagem de desenvolvimento com watch
├── package.json            # Dependências e scripts
└── tsconfig.json           # Configurações TypeScript
```

---

## Como Executar

### 1. Via Docker Compose (Ambiente Integrado)

Na raiz do repositório:

```bash
cp .env.example .env.development
make dev
```

Acessos:
- **API via Nginx:** [http://localhost:8080/api/ping](http://localhost:8080/api/ping)
- **Swagger UI:** [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

### 2. Execução Local Standalone

Requisitos: Node.js 20+ e PostgreSQL rodando localmente.

```bash
cd api-estoque
npm install
cp .env.example .env
npm run dev
```

A API iniciará na porta configurada em `PORT_API_ESTOQUE` (padrão: 5000 ou 3000).

---

## Scripts Disponíveis

Executar a partir da pasta `api-estoque/`:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia em modo desenvolvimento com `tsx watch` |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Inicia o servidor compilado em produção |
| `npm test` | Executa testes unitários com Vitest |
| `npm run lint` | Valida o código com ESLint |
| `npm run format` | Formata o código com Prettier |

---

## Testes Automatizados

Testes unitários cobrem as regras de negócio e validações da camada de serviços (`test/services/`):

- **Produtos:** Validações de SKU, nome, restrição de preços e quantidades negativas, e joins com fornecedor e categoria.
- **Clientes:** Validação de formato de documento (CPF/CNPJ), telefone e campos obrigatórios.
- **Categorias:** Validações de unicidade e campos obrigatórios.

Execução:
```bash
npm test
```

---

## Docker e Produção

- **Desenvolvimento (`Dockerfile.dev`):** Base `node:24-alpine`, permissões para usuário `node` e sincronização via Docker Compose Watch.
- **Produção (`Dockerfile`):** Multi-stage build (build com `tsc` e imagem final de runtime contendo apenas dependências de produção e usuário não-root).
