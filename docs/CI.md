# CI

## Workflows atuais

| Arquivo                       | Evento(s)             | O que faz                                          |
| ----------------------------- | --------------------- | -------------------------------------------------- |
| `check-branch-name.yml`       | `pull_request`        | Valida se o nome da branch segue o padrão esperado |
| `check-main-pull-request.yml` | `pull_request_target` | _(descreva aqui o que esse workflow valida)_       |

> Mantenha essa tabela atualizada ao adicionar ou remover workflows.

## Pipeline

O pipeline de CI é disparado a cada `pull_request` aberto/atualizado contra `main`, seguindo (em geral) esta ordem:

```
pull_request aberto/atualizado
│
▼
check-branch-name ──▶ valida nome da branch
│
▼
check-main-pull-request ──▶ valida o nome da branch se o merge for na main
│
▼
build-* ──▶ gera artefatos/imagens (se aplicável)
│
▼
test-* ──▶ roda testes
```

| Estágio         | Workflow(s)                                            | Bloqueia o merge? | Observações                                             |
| --------------- | ------------------------------------------------------ | ----------------- | ------------------------------------------------------- |
| Validação de PR | `check-branch-name.yml`, `check-main-pull-request.yml` | Sim               | Roda em todo `pull_request`                             |
| Testes          | `test-frontend.yml`, `test-backend.yml`                | Sim               | _(preencher: unit, integration, e2e?)_                  |
| Build           | `build-frontend.yml`, `build-backend.yml`              | _(sim/não?)_      | _(preencher: gera imagem Docker? artefato pra deploy?)_ |

> Atualize este diagrama e a tabela sempre que a ordem ou os estágios do pipeline mudarem.

## Convenção de nomes dos workflows

Os arquivos em `.github/workflows/` são organizados por prefixo, agrupando por família de propósito:

| Prefixo  | Uso                                                 | Exemplos                                      |
| -------- | --------------------------------------------------- | --------------------------------------------- |
| `check-` | Validações/gates que não alteram nada, só verificam | `check-branch-name.yml`, `check-pr-title.yml` |
| `test-`  | Execução de testes                                  | `test-frontend.yml`, `test-backend.yml`       |
| `build-` | Build de artefatos/imagens                          | `build-frontend.yml`, `build-backend.yml`     |

## Testando os workflows localmente com `act`

Este repositório usa [act](https://github.com/nektos/act) para testar os GitHub Actions
localmente antes de dar push, sem precisar esperar o CI real do GitHub.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado e rodando
- [act](https://github.com/nektos/act#installation) instalado

### Rodando oquaisquer workflow

Deve ser passado no `act` o evento correspondente ao qual o workflow monitora

```bash
sudo act pull_request -e event.json
```

`event.json`:

```json
{
  "pull_request": {
    "head": {
      // Branch de origem
      "ref": "feat/teste"
    },
    "base": {
      // Branch destion
      "ref": "main"
    }
  }
}
```

Se houver mais de um workflow escutando o mesmo evento, aponte o arquivo específico:

```bash
sudo act pull_request_target -W .github/workflows/check-main-pull-request.yml -e event.json
```

## Por que precisamos do `event.json`?

Os contextos `github.head_ref` e `github.base_ref` só existem quando o **payload do evento** contém os dados do Pull Request (`head.ref` e `base.ref`). Rodando `act` sem um evento customizado, esses campos vêm vazios, então a validação de nome de branch falha mesmo em cenários válidos.

- `head.ref` → branch de **origem** (de onde vêm as mudanças)
- `base.ref` → branch de **destino** (para onde o PR vai ser mergeado)

## Adicionando um novo workflow

1. Escolha o prefixo adequado (veja [Convenção de nomes](#convenção-de-nomes-dos-workflows)). Se nenhum prefixo existente se encaixar, discuta com o time antes de criar um novo.
2. Adicione o arquivo em `.github/workflows/`.
3. Teste localmente com `act` antes de abrir o PR (veja seção acima).
4. Atualize a tabela em [Workflows atuais](#workflows-atuais) com o novo arquivo.

## Troubleshooting

- **`act` não encontra o Docker** → verifique se o Docker está rodando (`docker info`) antes de chamar `act`.
- **Erro de permissão ao rodar `act`** → normalmente resolvido usando `sudo`, como nos exemplos acima.
- **`head_ref`/`base_ref` vazios mesmo passando `event.json`** → confira se o JSON está no formato esperado pelo evento (`pull_request` vs `pull_request_target` podem exigir campos diferentes).

## Links úteis

- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Example Workflow](https://docs.github.com/en/actions/tutorials/create-an-example-workflow)
- [Optimizing CI](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/optimizing-ci-for-stacked-pull-requests)
