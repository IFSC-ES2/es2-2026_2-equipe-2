# ADR-0001 – Escolha da stack para front-end

## Contexto

O projeto será um aplicativo web que precisa ser rapidamente iniciado, ter código tipado para maior robustez e usufruir de um processo de build ágil. A equipe já possui familiaridade com TypeScript. Também deseja utilizar Vite como iniciador do projeto devido ao seu tempo de start extremamente curto e suporte nativo a TypeScript.

## Decisão

- **Linguagem:** TypeScript.
- **Iniciador:** Vite para inicialização do projeto.
- **Biblioteca Front‑end:** React
- **Inicialização:** Usar `npm create vite@latest` com a opção `--template react-ts` para gerar a base do projeto já configurada com TypeScript.

## Alternativas consideradas

1. **JavaScript puro** – Mais maduro, porém configuração mais verbosa e tempo de build maior.
2. **Create‑React‑App** – Simples, mas baseada em Webpack e não oferece a velocidade de start do Vite.

## Consequências

- **Prós:**
  - Tipagem estática melhora a qualidade do código e reduz bugs.
  - Configuração mínima; o comando `npm create vite@latest --template react-ts` gera tudo pronto.
- **Contras:**
  - Tipagem pode trazer um atraso no desenvolvimento devido a verbosidade.
- **Ações necessárias:**
  - Adicionar dependências de desenvolvimento.
  - Configurar `tsconfig.json` adequado ao monorepo.
  - Atualizar scripts npm: `dev` e `build`` conforme padrão Vite.

## Metadados

| Campo | Valor                         |
| ----- |-------------------------------|
| Autor | Victor Eduardo Peixer Munarim |
| Data  | 14/08/2026                    |