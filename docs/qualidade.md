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

| Risco Relevante | Atributo(s) Impactado(s) | Como a Mitigação Protege o Atributo                                                                                                                                                                                                                                           |
|------------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Risco 01 — Aumento do escopo do MVP | Manutenibilidade | Manter o escopo do MVP documentado e revisá-lo a cada sprint evita que o código cresça de forma desorganizada, com funcionalidades incompletas ou mal planejadas, o que dificultaria a manutenção futura.                                                                     |
| Risco 02 — Estimativas erradas | Confiabilidade, Manutenibilidade | Reavaliar estimativas a cada entrega e cortar escopo quando necessário evita que a equipe entregue funcionalidades apressadas e mal testadas sob pressão de prazo, o que comprometeria tanto a confiabilidade (mais bugs) quanto a manutenibilidade (código feito às pressas). |
| Risco 03 — Algum integrante ficar sem conseguir participar | Manutenibilidade | Documentar decisões técnicas e processos evita que o conhecimento fique concentrado em uma única pessoa, permitindo que outros integrantes consigam dar continuidade ao código sem depender de quem escreveu ele originalmente.                                               |
| Risco 04 — Dificuldade para fazer Docker, Nginx e os microsserviços funcionarem juntos | Confiabilidade | Testar a integração de Docker e Nginx com um serviço simples antes de subir tudo de uma vez reduz o risco de falhas de comunicação entre os serviços em produção, protegendo a disponibilidade do sistema.                                                                    |
| Risco 05 — Pouco ou nenhum teste automatizado | Confiabilidade, Manutenibilidade | Definir um mínimo de testes automatizados e rodá-los nos Pull Requests reduz a chance de bugs chegarem a produção e facilita futuras alterações com mais segurança sobre o que pode quebrar.                                               |         |

## Métricas Futuras

- Manutenibilidade: Cobertura de testes unitários (%) e número de módulos/componentes desacoplados.
- Confiabilidade: Disponibilidade do sistema em média por dia (%).
- Segurança: Número de vulnerabilidades críticas encontradas por análise estática e tempo médio de conserto.
- Capacidade de Interação: Pontuação de usabilidade em testes de usuário (escala 1‑5) e taxa de erro de interação.
