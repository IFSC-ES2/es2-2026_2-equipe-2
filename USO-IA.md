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

- Data: 15/09/2026
- Ferramenta: Gemini
- Uso: criação de todos os testes do frontend
- Artefato: frontend/src/components/
- Validação: todo o valor de input e output foi validado para estar de acordo com o que era esperado quando o código foi feito

- Data: 16/09/2026
- Ferramenta: Gemini
- Uso: consulta para criação dos componentes do frontend
- Artefato: frontend/src/components/
- Validação: a tipagem foi bastante pesquisada para ser adequada com o código e evitar erros

- Data: 20/09/2026
- Ferramenta: Antigravity
- Uso: utilização para consultar o que é utilizado dentro do frontend e o seu motivo
- Artefato: frontend/src/components/\*
- Validação: checkando componentes que chamam aqueles componentes validados

- Data: 22/09/2026
- Ferramenta: Claude
- Uso: criação dos schemas para documentação da API
- Artefato: api-estoque/src/docs/schemas
- Validação: verificar se os schemas estão condizentes com os retornos da API e respeito suas responsabilidades

- Data: 30/09/2026
- Ferramenta: Antigravity
- Uso: auxílio na criação da barra lateral (Sidebar) e nos testes unitários de cada um dos componentes criados
- Artefato: `frontend/src/components/organisms/Sidebar/`, `frontend/src/components/organisms/Header/`, `frontend/src/components/templates/BaseLayout/`
- Validação: execução de todos os testes unitários com sucesso garantindo o funcionamento da navegação e componentes

- Data: 01/10/2026
- Ferramenta: Antigravity
- Uso: implementação do Swagger clientes (criação dos schemas Cliente, ClienteCreate e ClienteUpdate; documentação dos endpoints GET, POST, PUT e DELETE em /clientes e /clientes/{id}) e correção dos retornos de erro na rota DELETE de produtos
- Artefato: `api-estoque/src/docs/*`
- Validação: validação do build TypeScript (`npm run build`), execução dos testes unitários (`vitest`) com 100% de sucesso e verificando o Swagger disposto em `/api/docs/#/`

- Data: 01/10/2026
- Ferramenta: Gemini
- Uso: identificação de padrões de projeto OO aplicados (Singleton e Facade) no backend e redação do documento ADR registrando essas escolhas arquiteturais
- Artefato: `docs/adrs/ADR-0007-padroes-de-projeto-oo.md`
- Validação: conferência das classes apontadas no backend (`App.ts`, `database.ts`) garantindo a real aplicação dos padrões identificados e verificação da estrutura da ADR gerada

- Data: 01/10/2026
- Ferramenta: Antigravity
- Uso: auxílio na atualização do código para implementar o deletar e editar na página de clientes e criação de seus respectivos testes
- Artefato: `frontend/src/components/organisms/Modals/ClientCreateModal/`, `frontend/src/components/organisms/Form/FormCreateClient/`
- Validação: verificação dos códigos para ver se está no padrão e funcional

- Data: 18/10/2026
- Ferramenta: Antigravity
- Uso: auxílio na criação do CRUD de pedidos
- Artefato: `api-estoque\src\repositories\Pedido.repository.ts`, `api-estoque\src\services\Pedido.service.ts`, `api-estoque\src\controllers\PedidoController.ts`
- Validação: verificação dos códigos para ver se está no padrão do projeto e verificação se está tudo funcionando corretamente

- Data: 19/10/2026
- Ferramenta: Claude
- Uso: criação dos testes para Pedido.service
- Artefato: `api-estoque/test/services/pedido.service.test.ts`
- Validação: validação feita atraves dos testes rodando e verificação se está sendo realizado de forma correta

- Data: 19/10/2026
- Ferramenta: Antigravity
- Uso: implementação do Swagger de pedidos
- Artefato: `api-estoque/src/docs/schemas/pedido.schema.ts`, `api-estoque/src/docs/pedido/pedido.docs.ts`
- Validação: validação verificando os endpoints implementados dentro de `localhost:8080/api/docs/#/` executando eles
- Validação: validação feita atraves dos testes rodando e verificação se está sendo realizado de forma correta

- Data: 21/10/2026
- Ferramenta: Antigravity
- Uso: expansão e estruturação dos dados de seed para o banco de dados (inserção de novos clientes, produtos, pedidos em intervalos temporais, itens e movimentações de estoque, com ajuste da sequence)
- Artefato: `conf/init-db.sql`
- Validação: conferência da sintaxe SQL, integridade referencial com chaves estrangeiras e verificação dos dados inseridos no banco

- Data: 21/10/2026
- Ferramenta: Antigravity
- Uso: implementação dos componentes visuais da página de vendas (gráfico de faturamento por períodos, ranking de produtos mais vendidos e barra de filtros avançados)
- Artefato: `frontend/src/pages/Vendas/GraficoVendas/`, `frontend/src/pages/Vendas/FiltroVendas/`
- Validação: validação da renderização responsiva, aplicação dos estilos CSS e testes dos filtros reativos

- Data: 21/10/2026
- Ferramenta: Antigravity
- Uso: refatoração baseada em Atomic Design do formulário de pedidos, reutilizando os átomos `FormSelect`, `FormInput` e `Button`
- Artefato: `frontend/src/components/molecules/OrderItemAdder/`, `frontend/src/components/organisms/Form/FormCreateOrder/`
- Validação: criação e execução de testes unitários com Vitest para a nova molécula e validação de 100% dos testes da aplicação passando com sucesso

- Data: 21/10/2026
- Ferramenta: Antigravity
- Uso: integração do serviço de pedidos com a API HTTP e orquestração do CRUD na página de vendas
- Artefato: `frontend/src/services/pedido.service.ts`, `frontend/src/pages/Vendas/index.tsx`
- Validação: testes de integração com chamadas de listagem, criação, edição e exclusão de pedidos

- Data: 22/10/2026
- Ferramenta: Claude
- Uso: ajuste e estruturação do documento de reengenharia (descrição do problema de design, refatoração aplicada, métricas antes/depois e justificativa sobre ADR)
- Artefato: `docs/REENGENHARIA.md`
- Validação: contagens e resultados de testes conferidos executando os comandos listados no próprio documento

- Data: 22/10/2026
- Ferramenta: Claude
- Uso: estruturação do documento de arquitetura, auxilio nas modificações e definição das ADRs
- Artefato: `docs/ARQUITETURA.md` `docs/adrs/ADR-0008-backend-monolitico-modular.md`
- Validação: leitura integral dos arquivos e comparação com o estado atual do projeto para validação do atual estado documentado