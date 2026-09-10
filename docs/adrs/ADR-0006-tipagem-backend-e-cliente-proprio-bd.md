# ADR-0006: Migração do backend para TypeScript e substituição do Sequelize por cliente próprio de acesso

## Status

Aceita

## Contexto

O backend do projeto foi inicialmente decidido em JavaScript com Node.js e Express, utilizando Sequelize como ORM. 
O uso de um ORM genérico como o Sequelize expõe uma camada ampla do banco

Além disso, a falta de tipagem estática no backend, apontada como risco na própria [ADR-0002](./ADR-0002-stack-backend.md), e o frontend já utiliza TypeScript, o que reforça a padronização e a tipagem em todo o sistema, facilitando o reuso de conhecimento e a manutenção do código.

## Decisão

- **Linguagem do backend:** migrar de JavaScript para TypeScript
- **acesso ao banco de dados:** remover o Sequelize e substituí-lo por um cliente próprio de acesso ao PostgreSQL

## Alternativas consideradas

- **Adotar outro ORM com melhor suporte a tipos** - resolveria parcialmente as questões de tipagem, porém, continuaria com uma camada do banco, não eliminando os riscos de vazamento.
- **Query builder** - descartada nesta etapa por ainda adicionar uma camada de abstração adicional desnecessária.

## Consequências

### Positivas

- Tipagem estática no backend, alinhada ao frontend, reduzindo bugs e facilitando a manutenção.
- Maior controle e clareza sobre exatamente quais dados são expostos em cada consulta, reduzindo o risco de vazamento de informações do banco.
- Queries explícitas facilitam auditoria, revisão em pull requests e otimização de performance quando necessário.

### Negativas / Riscos

- Maior esforço manual para escrever e manter as queries SQL
- Necessidade da equipe em manter a camada de repositório organizada e evitar SQL espalhado pelo código
- Curva de aprendizado adicional com TypeScript no backend

## Metadados

| Campo | Valor                    |
| ----- | ------------------------ |
| Autor | Daniel Luiz da Rocha Cordeiro          |
| Data  | 2026-09-09               |