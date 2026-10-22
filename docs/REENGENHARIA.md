# Reengenharia — Validação de ID nos services

## 1. Problema de design identificado

Nos três services do `api-estoque` (`Categoria`, `Cliente` e `Produto`), cada método que recebe um `id` (`findById`, `update` e `delete`) repetia o mesmo bloco de validação:

```typescript
const parsedId = Number(id);
...
if (!validateId(parsedId)) {
  throw ValidationError.invalidId(ENTITY_NAME);
}
```

Problemas encontrados:

- **Duplicação:** o mesmo bloco aparecia em 9 pontos (3 services × 3 métodos). Qualquer mudança na regra de validação exigiria alterar os 9.
- **Mau uso de `validateId`:** a função lança exceção e retorna o número convertido. Usá-la como booleano no `if` induz a erro de leitura, pois o `if` só dispara para o id `0` (os demais casos inválidos já lançam dentro da própria `validateId`).
- **Regra de validação espalhada:** a decisão de quais ids são inválidos ficava implícita em cada ponto de uso, sem um lugar único que a documentasse.

Arquivos afetados: `src/services/Categoria.service.ts`, `src/services/Cliente.service.ts` e `src/services/Produto.service.ts`.

## 2. Refatoração aplicada

Foi criada a função `assertValidId(id, entityName)` em `src/utils/assertValidId.ts`, que concentra a regra: ids `NaN` e `0` são inválidos e geram `ValidationError.invalidId(entityName)`. Os 9 blocos nos services foram substituídos por uma única linha:

```typescript
assertValidId(parsedId, ENTITY_NAME);
```

O que **não** mudou: rotas, formato das respostas, SQL dos repositórios, models, controllers (que continuam validando o id recebido na requisição com `validateId`) e a ordem das operações dentro de cada método (inclusive o log que antecede a validação).

## 3. Preservação do comportamento (testes)

- Os 93 testes existentes continuam passando sem nenhuma alteração. Eles já cobrem o caso de id inválido nos services (`0`, `NaN`, `"abc"`, `undefined`, `null`).
- Foram adicionados 6 testes para a nova função em `test/utils/assertValidId.test.ts`, cobrindo ids válidos, `0`, `NaN` e a presença do nome da entidade na mensagem.
- Foram adicionados 36 testes de controller em `test/controllers/validacao-id.controller.test.ts`, que confirmam o comportamento observável pela API nos três controllers (`Categoria`, `Cliente` e `Produto`) e nos três métodos que recebem id (`findById`, `update` e `delete`):
    - id inválido (`"abc"`, `""` ou ausente) resulta em resposta **400**, corpo com `success: false` e o service **não** é chamado;
    - id válido (`"7"`) é convertido para número, o service é chamado com `7` e a resposta é **200**.
- Verificação de que os novos testes detectam regressão: ao remover temporariamente a validação de `findById` no `CategoriaController`, 3 testes falharam; o arquivo foi restaurado em seguida.
- `tsc --noEmit` roda sem erros.

Resultado: **135 testes passando** (93 existentes + 6 + 36 novos).

## 4. Métricas antes e depois

| Métrica | Como medir (na pasta `api-estoque`) | Antes | Depois |
|---|---|---|---|
| Usos de `!validateId` nos services | `grep -rn "!validateId" src/services \| wc -l` | 9 | 0 |
| Blocos `throw ValidationError.invalidId` repetidos nos services | `grep -rn "ValidationError.invalidId" src/services \| wc -l` | 9 | 0 |
| Pontos que chamam a validação centralizada | `grep -rn "assertValidId(" src/services \| wc -l` | 0 | 9 |
| Linhas dos 3 services | `cat src/services/{Categoria,Cliente,Produto}.service.ts \| wc -l` | 493 | 475 |
| Testes passando | `npx vitest run` | 93 | 135 |

Observação: o número de linhas "antes" foi medido numa cópia que já tinha a formatação de `Produto.service.ts` aplicada pelo Prettier. Se a medição for refeita em outra base, esse valor pode variar um pouco; as contagens de `grep` não dependem disso.

## 5. Impacto arquitetural e ADR

Não foi criada nem atualizada ADR. A mudança é interna à camada de services e a `utils`: não altera a divisão em camadas (controllers, services e repositories), as tecnologias adotadas, os contratos da API nem o modelo de dados. Portanto, não há decisão arquitetural a registrar.

## 6. Observações e pontos fora do escopo

- **Mensagem para `NaN` em chamadas diretas ao service:** antes, `NaN` chegava a `validateId`, que lançava `ValidationError("ID inválido")`. Agora `assertValidId` lança `ValidationError.invalidId(entidade)`. O tipo do erro é o mesmo (e os testes só verificam o tipo). Pelas rotas HTTP nada muda, pois o controller valida o id antes de chamar o service.
- **Ids negativos continuam aceitos**, como já acontecia antes (seguem até o repositório e resultam em "não encontrado"). Rejeitá-los seria mudança de comportamento e ficou de fora; pode virar uma issue própria.
- **Repetição de `try/catch` e logs** (cerca de 31 blocos entre services e controllers) é outro ponto de design identificado, mas maior e com impacto em muitos arquivos. Fica como candidato a uma próxima reengenharia, provavelmente com ADR.