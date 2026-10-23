# AURA — Documentação de Design UX/UI

Documento de especificação de interface (IHC / UX / UI) do **AURA ERP** (gestão de armazéns e distribuidoras), validado diretamente com o código-fonte do frontend.

---

## 1. Visão Geral e Objetivos de UX

O AURA é uma ferramenta de uso operacional contínuo. Suas decisões visuais visam reduzir a fadiga cognitiva, prevenir erros operacionais e permitir leitura ágil de grandes volumes de dados.

| Atributo | Solução de Design Adotada |
| :--- | :--- |
| **Clareza** | Fundos limpos, cartões brancos destacados e respiro entre blocos |
| **Consistência** | Mesma estrutura de layout (`BaseLayout`), tabelas e modais em todas as telas |
| **Eficiência** | Cadastro e edição via modal sem perda de contexto da listagem |
| **Prevenção de Erros** | Validações em formulários e modal de confirmação para ações destrutivas |

---

## 2. Paleta de Cores (Tokens do Projeto)

Valores exatos extraídos de `frontend/src/style/theme.css` e dos arquivos CSS dos componentes:

### 2.1 Estrutura e Marca
| Token / Elemento | Cor Hex | Uso na Interface |
| :--- | :--- | :--- |
| `--app-navy-900` | `#0B2545` | Títulos principais, texto forte e hover de botões/ícones |
| Fundo Sidebar | `#122B4D` | Barra de navegação lateral fixa |
| Item Ativo Sidebar | `#1D4E89` | Destaque visual da página selecionada |
| `--bs-primary` | `#2F9BD6` | Cor de destaque da marca, botões primários ("Novo Item"), foco de inputs |
| `--bs-body-bg` | `#EAF3FA` | Fundo geral da aplicação (azul suave para reduzir cansaço visual) |
| Superfície | `#FFFFFF` | Cartões de conteúdo e modais |
| Zebra da Tabela | `#D9E9F1` | Fundo das linhas alternadas (ímpares) da tabela |

### 2.2 Cores Semânticas
| Token | Cor Hex | Significado e Aplicação |
| :--- | :--- | :--- |
| `--bs-success` | `#34A853` | Ações de confirmação (botão "Salvar Produto" / "Salvar Cliente") |
| `--bs-danger` | `#E05252` | Ações destrutivas (excluir, botão "Cancelar", mensagens de erro) |
| `--bs-secondary` | `#12315C` | Ações neutras (botão secundário de cancelamento em modais) |
| `--app-text-muted` | `#5C7A94` | Rótulos de cabeçalho de tabela e textos auxiliares |
| `--bs-body-color` | `#1A2B3C` | Texto principal de dados e corpo |
| Borda de Input | `#DCE7F0` | Contorno padrão de inputs e selects |

---

## 3. Tipografia

- **Família tipográfica:** `'Inter', system-ui, sans-serif` (definida em `--bs-body-font-family`).
- **Hierarquia visual:**
  - **Título da Página (`Header`):** `1.6rem` (25.6px), Peso 700 (Bold), Cor `#102A4E`.
  - **Título do Cartão:** `1.5rem` (24px), Peso 700 (Bold).
  - **Cabeçalho de Tabela:** `0.75rem` (12px), Peso 600 (Semibold), Caixa alta (Uppercase), Cor `#5C7A94`.
  - **Células e Textos:** `0.875rem` a `1rem` (14-16px), Peso 400 (Regular).
  - **Botões:** Peso 600 (`fw-semibold`), formato arredondado (`rounded-pill`).

---

## 4. Estrutura de Layout e Navegação

A interface utiliza o template compartilhado [`BaseLayout`](../frontend/src/components/templates/BaseLayout/index.tsx):

```
┌──────────┬────────────────────────────────────────────────────────┐
│          │  Header: [Título da Tela]            [Operador / Perfil]│
│  AURA    ├────────────────────────────────────────────────────────┤
│          │  Card (Branco, Sombra Suave, Cantos Arredondados)       │
│  Sidebar │  ┌──────────────────────────────────────────────────┐  │
│  (Fixa)  │  │ [Título do Módulo]                   [+ Novo Item]│  │
│          │  │ ──────────────────────────────────────────────── │  │
│          │  │ Tabela Zebrada com Ações (Editar / Excluir)       │  │
│          │  └──────────────────────────────────────────────────┘  │
└──────────┴────────────────────────────────────────────────────────┘
```

- **Sidebar (240px fixa):** Exibe a marca **AURA** no topo e menu de rotas (`/dashboard`, `/vendas`, `/clientes`, `/estoque`).
- **Header Superior:** Exibe o título da tela ativa e informações do operador logado (`/api/usuarios/me`).
- **Área Central:** Cartão com fundo branco, cantos arredondados (`rounded-4`) e sombra leve (`shadow-sm`).
- **Responsividade:** Em telas menores (`<= 768px`), o layout colapsa a sidebar verticalmente.

---

## 5. Componentes e Padrões de Interação

### 5.1 Botões (`Button`)
- Estilo **pill** (`rounded-pill`) com tipografia semibold.
- Cores semânticas intuitivas:
  - **Novo Item:** Primário azul (`#2F9BD6`).
  - **Salvar / Salvar Alterações:** Verde (`#34A853`).
  - **Cancelar / Excluir:** Vermelho (`#E05252`) ou Secundário (`#12315C`).

### 5.2 Tabelas (`Table`)
- **Linhas zebradas:** Alternância com fundo `#D9E9F1` para guiar a leitura em tabelas extensas.
- **Cabeçalho sem bordas:** Rótulos em cinza-azulado (`#5C7A94`) em caixa alta com espaçamento entre letras.
- **Ações por linha:** Ícone de edição (`bi-pencil-square`) em azul e exclusão (`bi-trash` com transição para `bi-trash-fill` no hover) em vermelho.
- **Estado vazio:** Mensagem contextual `"Nenhum registro encontrado."` quando a lista não possui dados.

### 5.3 Modais (`Modal`)
- Centralizados, com overlay escuro (`rgba(0, 0, 0, 0.4)`), bloqueio de rolagem do fundo e fechamento via `Escape`, botão `✕` ou clique no backdrop.
- **Criação e Edição:** Formulários em grid com campos obrigatórios assinalados (`*`) e placeholders com exemplos práticos.
- **Confirmação de Exclusão:** O componente `ActionButtons` intercepta a exclusão e abre modal para confirmação prévia do usuário, prevenindo cliques acidentais.

### 5.4 Formulários e Validação
- Campos com contorno suave (`#DCE7F0`) e anel de foco azul (`rgba(47, 155, 214, 0.15)`).
- Validação no envio com exibição de erros no topo via banner `alert-danger` (campos obrigatórios, preço inválido, formato de documento e telefone).

---

## 6. Acessibilidade (a11y)

- **Associação de Rótulos:** Inputs associados aos labels por `htmlFor` e `id` para suporte a leitores de tela.
- **Navegação por Teclado:** Modais utilizam atributos ARIA adequados (`role="dialog"`, `aria-modal="true"`) e escuta da tecla `Escape`.
- **Diferenciação Não Apenas por Cor:** Botões contêm textos descritivos e botões de ícone possuem atributo `title` indicativo ("Editar", "Excluir").

---

## 7. Oportunidades de Evolução de UX/UI

| Item | Situação Atual | Recomendação de Melhoria |
| :--- | :--- | :--- |
| **1. Formatação de Dados** | Preço e datas são exibidos em formato técnico da API | Formatar moedas (`R$ 0,00`) e datas em formato brasileiro (`DD/MM/AAAA`) |
| **2. Alerta de Estoque Mínimo** | Quantidades são apenas números simples | Exibir tag/badge visual quando a quantidade for igual ou menor ao estoque mínimo |
| **3. Notificações Flutuantes** | Modal fecha diretamente após a ação | Implementar notificações toast de confirmação ("Produto salvo com sucesso") |
| **4. Filtros e Busca** | Listagem exibe todos os registros | Adicionar barra de pesquisa rápida e filtros por categoria e fornecedor |
| **5. Avatar do Usuário** | Header utiliza ícone `bi-envelope-paper` | Substituir por ícone de perfil (`bi-person-circle`) ou foto do operador |
| **6. Mensagem de Confirmação** | Modal de exclusão cita fixamente "produto" | Dinamizar o texto da confirmação de acordo com o item ("este produto" ou "este cliente") |
