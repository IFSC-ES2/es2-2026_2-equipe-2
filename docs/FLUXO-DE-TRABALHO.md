# Fluxo de Trabalho do Repositório

Este documento consolida as regras de colaboração, revisão e integração de código adotadas neste repositório. Todo o time deve seguir este fluxo.

## 1. Branch de Desenvolvimento

- Para o desenvolvimento de uma entrega, deve ser criada obrigatoriamente uma branch a partir da `main`, seguindo o padrão `entrega-numero` (ex: `entrega-1`).
- É proibido criar código diretamente na branch principal (`main`) ou nas branches de entrega. Todo desenvolvimento acontece em branches de trabalho específicas (ver abaixo).
- Para cada nova funcionalidade, ajuste ou correção, deve ser criada uma branch de trabalho a partir da branch de entrega correspondente, seguindo o padrão:

  ```
  acao/funcionalidade-ou-correcao
  ```

  Onde `acao` **deve usar os mesmos tipos definidos no [padrão de Conventional Commits](#7-padrão-de-commits)**, por exemplo: `feat/login-usuario`, `fix/validacao-formulario`, `docs/atualizar-readme`.

- As branches de entrega recebem os merges das branches de trabalho (funcionalidades, ajustes, correções, etc).
- A `main` recebe merges **exclusivamente** de branches de entrega — nunca diretamente de branches de trabalho.

## 2. Integração via Pull Request

- Toda integração de código **deve** ser feita por meio de Pull Request (PR), seja de branch de trabalho para branch de entrega, seja de branch de entrega para `main`.
- **Push direto para a branch principal (`main`) é proibido.** A branch é protegida e não aceita commits diretos.
- **Push direto para as branches de entrega é proibido.** As branches são protegidas e não aceitam commits diretos.
- Todo PR deve usar o [template de PR](../.github/pull_request_template.md), com o checklist de revisão devidamente preenchido.

## 3. Revisão e Aprovação

- **Quem revisa e aprova:** o autor do PR seleciona um dos mantenedores do projeto como revisor, preferencialmente alguém com relação direta ao conteúdo alterado.
- É exigida **no mínimo 1 (uma) aprovação** de revisor antes que o PR possa ser integrado. Esta regra é aplicada automaticamente pela branch protection rule configurada no repositório, que bloqueia o merge sem a aprovação mínima.
- PRs sem aprovação não podem ser mesclados, **nem mesmo pelo autor do PR**.
- Comentários e solicitações de mudança feitas na revisão devem ser resolvidos antes da aprovação final.

## 4. Checks Obrigatórios

- Todo PR executa automaticamente os checks de CI configurados no repositório (ex: verificação do nome da branch, testes automatizados).
- Um PR **não pode ser mesclado** enquanto qualquer check obrigatório não estiver com status de sucesso.
- Checks obrigatórios atualmente configurados:
  - [x] Verificação do nome da branch

## 5. Estratégia de Merge

- A integração de branches ao repositório deve ser feita **exclusivamente por merge commit**.
- Não são permitidos `squash merge` nem `rebase merge` — essas opções devem estar desabilitadas nas configurações do repositório.
- Essa estratégia preserva o histórico completo de commits de cada branch de trabalho.

## 6. Resumo do Fluxo

1. Criar a branch de entrega a partir da `main`, seguindo o padrão `entrega-numero` (ex.: `entrega-4`), caso ainda não exista.
2. A partir da branch de entrega, criar uma branch de trabalho seguindo o padrão `acao/funcionalidade-ou-correcao` (ex.: `feat/login-usuario`, `fix/validacao-formulario`).
3. Realizar os commits das mudanças seguindo o [padrão de commits](#7-padrão-de-commits) estabelecido.
4. Abrir um Pull Request da branch de trabalho para a branch de entrega correspondente, preenchendo o template.
5. Aguardar a execução dos checks obrigatórios (CI).
6. Solicitar revisão e obter no mínimo 1 aprovação.
7. Realizar o merge na branch de entrega por meio de **merge commit**, somente após checks e aprovação concluídos com sucesso.
8. Repetir os passos 2 a 7 para cada nova funcionalidade, ajuste ou correção da entrega.
9. Quando a entrega estiver concluída, abrir um Pull Request da branch de entrega para a `main`, seguindo o mesmo processo de checks, revisão, aprovação e merge por **merge commit**.

## 7. Padrão de Commits

- Todos os commits devem seguir o padrão do **Conventional Commits**:

  ```
  tipo(escopo): descrição
  ```

- **tipo**: indica a natureza da mudança. É o mesmo tipo usado como prefixo `acao` no nome das branches de trabalho (seção 1):
  - `feat` — nova funcionalidade
  - `fix` — correção de bug
  - `docs` — alterações de documentação
  - `refactor` — refatoração sem mudança de comportamento
  - `test` — adição ou modificação de testes
  - `chore` — build, CI, infra e tarefas de manutenção
  - `perf` — melhoria de performance
- **escopo**: parte do sistema ou módulo afetado pela mudança (ex.: `login`, `api`, `ci`, `docs`).
- **descrição**: breve, no imperativo e em minúsculas, explicando o que foi feito.

**Exemplos:**

```
feat(login): adicionar autenticação via e-mail
fix(api): corrigir validação de token expirado
docs(fluxo): atualizar regras de merge
chore(ci): adicionar verificação de nome de branch
```
