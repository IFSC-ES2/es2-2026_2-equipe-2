# Qualidade do Projeto

## 4 Atributos de Qualidade

1. Manutenibilidade
    - Justificativa: O MVP será desenvolvido em um curto prazo e precisará de evoluções rápidas. Manutenibilidade alta garante que novos recursos e correções possam ser adicionados com baixo custo, facilitando a modularização e a testabilidade.
    - Orientação nas próximas etapas: Escolher arquiteturas modulares, aplicar padrões de código limpo e garantir cobertura de testes unitários para facilitar a manutenção.

2. Confiabilidade
    - Justificativa: O sistema deve estar disponível para os usuários finais sem interrupções críticas. Confiabilidade assegura que falhas sejam raras e rapidamente recuperáveis.
    - Orientação nas próximas etapas: Implementar testes e estratégias de fallback para serviços críticos.

3. Segurança
    - Justificativa: Dados sensíveis dos usuários podem ser manipulados pelo sistema. Garantir confidencialidade, integridade e autenticidade é essencial para evitar vazamentos e ataques.
    - Orientação nas próximas etapas: Definir políticas de autorização, aplicar práticas como .env para segurança de senhas.

4. Capacidade de Interação (Usabilidade)
    - Justificativa: A adoção do MVP depende da facilidade de uso. Uma interface intuitiva reduz erros de usuário e aumenta a satisfação.
    - Orientação nas próximas etapas: Realizar testes de usabilidade e validar fluxos de UI/UX.

## Relacionamento com Riscos

| Risco Relevante | Atributo(s) Impactado(s) | Como a Mitigação Protege o Atributo                                                               |
|------------------|--------------------------|---------------------------------------------------------------------------------------------------|
| Escopo não definido | Manutenibilidade, Confiabilidade | Revisões de requisitos frequentes e definição clara de issues evitam retrabalho complexo.         |
| Atraso no cronograma | Confiabilidade, Segurança | Integração contínua automatizada detecta falhas cedo, reduzindo tempo de correção.                |
| Falta de expertise da equipe | Manutenibilidade, Segurança | Treinamento e uso de templates de PR com checklist de segurança garantem boas práticas.           |
| Dependência de tecnologia externa | Segurança, Capacidade de Interação | Avaliar provedores e implementar fallback mitigam riscos de indisponibilidade e violação de dados. |
| Problemas de qualidade do código | Manutenibilidade, Confiabilidade | Lint, formatação automática e revisões de código melhoram legibilidade e robustez.                |

## Métricas Futuras

- Manutenibilidade: Cobertura de testes unitários (%) e número de módulos/componentes desacoplados.
- Confiabilidade: Disponibilidade do sistema em média por dia (%).
- Segurança: Número de vulnerabilidades críticas encontradas por análise estática e tempo médio de conserto.
- Capacidade de Interação: Pontuação de usabilidade em testes de usuário (escala 1‑5) e taxa de erro de interação.
