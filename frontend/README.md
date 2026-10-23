# Frontend — AURA ERP

Interface web do **AURA ERP**, sistema de apoio à gestão operacional de armazéns e centros de distribuição voltado à digitalização e centralização de processos logísticos em distribuidoras.

Este projeto é uma Single Page Application (SPA) desenvolvida em **React 19** com **TypeScript**, empacotada com **Vite**, estruturada segundo os princípios do **Atomic Design** e totalmente conteinerizada com **Docker**.

---

## Tecnologias e Bibliotecas

| Tecnologia | Versão | Função no Projeto |
| :--- | :--- | :--- |
| **React** | `19.2.x` | Biblioteca base para construção da interface de usuário declarativa e reativa |
| **TypeScript** | `6.0.x` | Tipagem estática para maior robustez, manutenibilidade e segurança do código |
| **Vite** | `8.2.x` | Ferramenta de build ágil e servidor de desenvolvimento com Hot Module Replacement (HMR) |
| **React Router DOM** | `7.18.x` | Roteamento declarativo no lado do cliente (SPA) |
| **Bootstrap & Bootstrap Icons** | `5.3.x` / `1.13.x` | Sistema de grid, utilitários visuais responsivos e iconografia |
| **Material UI & Emotion** | `9.4.x` / `11.14.x` | Componentes avançados de UI e estilização baseada em temas |
| **Vitest & Testing Library** | `5.0.x` / `16.3.x` | Framework de testes unitários/integração com ambiente `jsdom` |
| **ESLint & Prettier** | `10.9.x` / `3.9.x` | Análise estática de código (Flat Config) e formatação padronizada |
| **Docker** | Alpine (Node 24) | Conteinerização para ambientes de desenvolvimento e produção |

---

## Arquitetura e Padrões de Projeto

O frontend segue o padrão de componentes **Atomic Design**, garantindo alta modularidade, testabilidade e separação de responsabilidades:

```
src/
├── components/
│   ├── atoms/          # Componentes básicos indivisíveis (Button, FormInput, TableCell, etc.)
│   ├── molecules/      # Agrupamentos de átomos (ActionButtons, TableHeader, TableRow, etc.)
│   ├── organisms/      # Blocos complexos e interativos (Header, Sidebar, Table, Forms, Modais)
│   └── templates/      # Esqueletos e layouts compartilhados (BaseLayout)
├── pages/              # Telas da aplicação integradas ao roteador
├── services/           # Camada de comunicação HTTP com APIs REST e tratamento de erros
├── interfaces/         # Contratos e tipos TypeScript das entidades e formulários
└── style/              # Definições de temas e variáveis CSS globais
```

### Principais Destaques Arquiteturais:
- **Separação de Camadas (Services):** As chamadas HTTP (`fetch`) são isoladas na pasta `services/`, desacoplando a interface gráfica da lógica de integração com as APIs de backend.
- **Tratamento Amigável de Erros:** Respostas de erro relacional (ex.: exclusão de clientes ou produtos com pedidos associados) são interceptadas e apresentadas em linguagem clara para o usuário.
- **Layout Base Consistente:** `BaseLayout` unifica o cabeçalho superior (`Header`) e a barra de navegação lateral (`Sidebar`) em todas as rotas da aplicação.
- **Mapeamento Dinâmico de Tabelas:** O componente `Table` renderiza dados e colunas dinamicamente com base nas respostas dos serviços e definições de exibição.

---

## Telas e Módulos Implementados

### 1. Gestão de Estoque (`/estoque`)
- **Listagem de Produtos:** Tabela dinâmica com informações de SKU, nome, categoria, fornecedor, preço, estoque atual e estoque mínimo.
- **Resolução de Relações:** Exibição amigável dos nomes de Categoria e Fornecedor na tabela.
- **Cadastro e Edição:** Modal com formulário validado (`ProductCreateModal`) para inserção e atualização de produtos.
- **Exclusão de Produtos:** Ação de remoção com proteção contra exclusão de itens referenciados.

### 2. Cadastro e Gestão de Clientes (`/clientes`)
- **Listagem de Clientes:** Visualização de clientes com documento, e-mail, telefone e endereço.
- **Cadastro e Edição:** Modal dinâmico (`ClientCreateModal`) para inclusão e alteração cadastral.
- **Exclusão Segura:** Tratamento para impedir exclusão de clientes vinculados a pedidos de vendas.

### 3. Navegação e Identidade Visual (`BaseLayout`)
- **Barra Lateral (`Sidebar`):** Menu lateral com rotas ativas (Dashboard, Vendas, Clientes e Estoque) e identificação da marca **AURA**.
- **Cabeçalho Superior (`Header`):** Exibição do título da página ativa e dados do operador/usuário logado.

### 4. Módulos em Desenvolvimento
- **Dashboard (`/dashboard`):** Visão geral de indicadores operacionais e logísticos.
- **Vendas (`/vendas`):** Módulo para acompanhamento de vendas e conferência de expedição.

---

## Estrutura de Diretórios

```
frontend/
├── public/                 # Ativos estáticos públicos
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   ├── Inputs/     # FormInput, FormSelect, FormTextarea
│   │   │   └── Table/      # TableCell, TableHeaderCell
│   │   ├── molecules/
│   │   │   ├── ActionButtons/
│   │   │   └── Table/      # TableHeader, TableRow
│   │   ├── organisms/
│   │   │   ├── Form/       # FormCreateClient, FormCreateProduct
│   │   │   ├── Header/
│   │   │   ├── Modals/     # Modal, ClientCreateModal, ProductCreateModal
│   │   │   ├── Sidebar/
│   │   │   └── Table/
│   │   └── templates/
│   │       └── BaseLayout/
│   ├── interfaces/         # Tipos: cliente, produto, usuario
│   ├── pages/
│   │   ├── Cliente/
│   │   ├── Dashboard/
│   │   ├── Estoque/
│   │   └── Vendas/
│   ├── services/           # cliente, produto, categoria, fornecedor, usuario
│   ├── style/              # theme.css
│   ├── App.tsx             # Configuração de rotas e providers
│   ├── main.tsx            # Ponto de entrada React
│   └── index.css           # Estilos base
├── Dockerfile              # Build multi-stage para produção (Node Alpine + serve)
├── Dockerfile.dev          # Imagem de desenvolvimento com suporte a hot-reload
├── eslint.config.js        # Configurações do ESLint
├── package.json            # Dependências e scripts npm
├── tsconfig.json           # Configurações do TypeScript
└── vite.config.ts          # Configurações do Vite e Vitest
```

---

## Como Executar

### Opção 1: Via Docker Compose (Recomendado)

O frontend faz parte da infraestrutura integrada do monorepo, gerenciada via Docker e Nginx (proxy reverso).

Na raiz do repositório:

1. Configure as variáveis de ambiente (copiando do exemplo):
   ```bash
   cp .env.example .env.development
   ```

2. Inicie todos os serviços com suporte a sincronização e hot-reload:
   ```bash
   make dev
   # ou: docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build --watch
   ```

3. Acesse a aplicação no navegador:
   - **Frontend via Nginx:** [http://localhost:8080](http://localhost:8080)
   - **Documentação da API (Swagger):** [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

### Opção 2: Execução Local Standalone

Caso queira rodar o frontend de forma isolada na sua máquina local:

1. Certifique-se de ter o **Node.js 20+** (ou Node 24) e o **npm** instalados.
2. Acesse a pasta do frontend e instale as dependências:
   ```bash
   cd frontend
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. A aplicação estará acessível em [http://localhost:3000](http://localhost:3000) (ou na porta configurada via `PORT_WEB`).

---

## Scripts Disponíveis

Todos os comandos devem ser executados a partir da pasta `frontend/`:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local do Vite em modo de desenvolvimento com HMR ativo |
| `npm run build` | Valida as tipagens (`tsc -b`) e compila o código para produção na pasta `dist/` |
| `npm run preview` | Executa um servidor local para inspecionar o pacote de produção gerado |
| `npm test` | Executa os testes automatizados via **Vitest** com o ambiente `jsdom` |
| `npm run lint` | Executa a verificação de qualidade e padrões de código com o **ESLint** |
| `npm run format` | Aplica as regras de formatação automática em todos os arquivos com o **Prettier** |

---

## Testes Automatizados

A suíte de testes unitários e de integração utiliza **Vitest** e **React Testing Library**:

- **Componentes Atômicos e Moléculas:** Validação de renderização, classes de estado e eventos de clique.
- **Formulários e Modais:** Validação de submissão, preenchimento de campos e disparo de callbacks.
- **Páginas:** Testes com mock de serviços (`vi.mock`), cobrindo estados de carregamento, sucesso com tabelas populadas e exibição de mensagens de erro.

Para executar os testes com Vitest em modo execução única (CI/CLI):
```bash
npm test -- --run
```

Para executar em modo watch (interativo durante o desenvolvimento):
```bash
npm test
```

---

## Docker e Produção

- **Desenvolvimento (`Dockerfile.dev`):** Utiliza imagem leve `node:24.14.0-alpine`, executa sob usuário não-root `node` e sincroniza alterações em tempo real via Docker Compose Watch.
- **Produção (`Dockerfile`):** Multi-stage build dividida em duas etapas:
  1. **Builder:** Compila os assets estáticos com `npm run build`.
  2. **Runner:** Utiliza o pacote `serve` em servidor Node.js mínimo sem privilégios de root, expondo a porta `3000`.
