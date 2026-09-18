## Registro de Uso de IA

- Data: 06/08/2026
- Ferramenta: Gemini
- Uso: formatação de md e organização das pastas para o github
- Artefato: templates
- Validação: a formatação foi aprovada e o github deve reconhecer os arquivos

- Data: 14/08/2026
- Ferramenta: Claude
- Uso: criação de templates para criação das ADRs
- Artefato: adrs
- Validação: verificação se o conteúdo gerado condizia com o que deve ser uma ADR

- Data: 25/08/2026
- Ferramenta: Claude
- Uso: criação de template para BASELINE.md
- Artefato: docs
- Validação: verificado se o que foi criado é o especifico e solicitado dentro do documento da entrega

- Data: 27/08/2026
- Ferramenta: Claude
- Uso: criação de template para ESTIMATIVAS.md
- Artefato: docs
- Validação: análise do que foi solicitado dentro do documento de entrega e se está coerente com o que foi criado

- Data: 31/08/2026
- Ferramenta: Claude
- Uso: criação do regex para check do nome da branch
- Artefato: .github/workflows
- Validação: validado utilizando nomes válidos e inválidos de branches

- Data: 31/08/2026
- Ferramenta: Claude
- Uso: criação do regex para check do nome da branch
- Artefato: .github/workflows
- Validação: validado utilizando nomes válidos e inválidos de branches

- Data: 16/09/2026
- Ferramenta: Claude
- Uso: criação dos testes unitarios para componentes menores
- Artefato: `frontend/src/components/*/*.test.tsx`
- Validação: validado rodando os testes e verificando se eles não estão chumbados para o resultado que deveria dar correto e sim para algo mais geral

- Data: 16/09/2026
- Ferramenta: Claude
- Uso: criação dos métodos especificos do repository que realizam join
- Artefato: `api-estoque/src/repositories/Produto.repository.ts`
- Validação: validado rodando o join internamente dentro do container do banco

- Data: 16/09/2026
- Ferramenta: Claude
- Uso: criação dos testes para Categoria.service
- Artefato: `api-estoque/test/services/categoria.service.test.ts`
- Validação: validado rodando os testes e verificando se os valores não estão chumbados e não realizado conforme deveria

- Data: 17/09/2026
- Ferramenta: Gemini
- Uso: Ligação do banco de dados para Categoria.service
- Artefato: `frontend/src/services/produto.service.ts`
- Validação: validado pontos de interação do banco com e validação dos dados retornados
