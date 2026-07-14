# Política de Segurança

## Versões Suportadas

O VeryKit está atualmente na **Fase 1: Arquitetura e Documentação**.

Ainda não há tempo de execução da aplicação, então não há versões de aplicação lançadas para suportar.

Quando a implementação e os lançamentos começarem, esta seção será atualizada com informações de versões suportadas.

## Reportando uma Vulnerabilidade

Por favor, não reporte vulnerabilidades de segurança através de issues públicas.

Se você acredita que encontrou um problema de segurança, reporte-o privatamente aos mantenedores.

Até que um contato de segurança dedicado seja publicado, use o canal de contato privado preferido do proprietário do repositório.

Seu relatório deve incluir:

- Uma descrição clara do problema.
- Passos para reproduzir.
- Impacto potencial.
- Arquivos, rotas ou features afetadas, se conhecidos.
- Quaisquer detalhes de prova de conceito que ajudem os mantenedores a verificar o problema com segurança.

## O Que Evitar

Por favor, não:

- Abra uma issue pública para uma vulnerabilidade explorável.
- Acesse dados que não pertencem a você.
- Interrompa a disponibilidade do serviço.
- Use varredura automatizada de forma que cause dano.
- Exfiltre segredos ou dados privados.
- Compartilhe detalhes de exploração publicamente antes que os mantenham respondam.

## Filosofia de Segurança

O VeryKit reduz o risco de segurança mantendo o produto simples:

- Sem autenticação por padrão.
- Sem banco de dados de usuários.
- Sem processamento backend para ferramentas normais.
- Sem anúncios.
- Sem rastreamento invasivo.
- Processamento local sempre que possível.

Futuras features que processam input do usuário devem evitar enviar esse input para serviços remotos, a menos que documentado e aprovado explicitamente.

## Resposta Esperada

Os mantenedores devem buscar:

1. Reconhecer o relatório.
2. Reproduzir e avaliar o problema.
3. Priorizar com base na severidade.
4. Preparar uma correção quando necessário.
5. Creditar o reportador se eles quiserem crédito.
6. Divulgar responsavelmente após a mitigação.

O tempo de resposta dependerá da disponibilidade dos mantenedores e da maturidade do projeto.

## Segurança de Dependências

A implementação futura deve manter as dependências mínimas e revisadas.

Mudanças de dependências sensíveis à segurança devem considerar:

- Vulnerabilidades conhecidas.
- Atividade dos mantenedores.
- Dependências transitivas.
- Impacto no bundle.
- Se APIs nativas podem resolver o problema.

## Aviso de Ferramentas Client-Side

As ferramentas do VeryKit são destinadas para conveniência e produtividade local.

Mesmo quando o processamento acontece no navegador, os usuários devem ter cuidado com segredos altamente sensíveis, credenciais de produção, chaves privadas e dados regulamentados.

Ferramentas como decodificadores JWT ou geradores de hash devem explicar claramente o que fazem e o que não garantem.
