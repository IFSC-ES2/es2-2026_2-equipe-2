# Testando os workflows localmente com `act`

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

## Links úteis

- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Example Workflow](https://docs.github.com/en/actions/tutorials/create-an-example-workflow)
- [Optimizing CI](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/optimizing-ci-for-stacked-pull-requests)
