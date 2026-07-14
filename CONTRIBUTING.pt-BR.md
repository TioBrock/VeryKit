# Contribuindo com o VeryKit

Obrigado pelo seu interesse em contribuir com o VeryKit.

VeryKit é um projeto open source focado em ferramentas gratuitas, rápidas e acessíveis para QA Engineers e Developers. Contribuições são bem-vindas, mas devem respeitar a filosofia do produto e os padrões de qualidade do projeto.

## Princípios do Projeto

Toda contribuição deve preservar estes princípios:

- Gratuito para sempre para ferramentas principais.
- Sem anúncios, sem login forçado, sem paywall, sem rastreamento invasivo.
- Processamento local sempre que possível.
- Fluxos de trabalho rápidos e UX acessível.
- Suporte internacional desde o primeiro dia.

## Primeiros Passos

```bash
git clone https://github.com/TioBrock/VeryKit.git
cd VeryKit
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Comandos de Desenvolvimento

```bash
npm run dev        # Iniciar servidor de desenvolvimento
npm test           # Executar testes unitários
npm run build      # Build para produção
npm run lint       # Executar ESLint
```

## Estratégia de Branches

Usamos um modelo de branches para manter o código estável:

- **`master`** — Código pronto para produção. Sempre estável.
- **`develop`** — Branch de integração para novas features. PRs vão aqui.
- **`feature/*`** — Branches temporárias para cada contribuição.

### Criando um Pull Request

1. Crie uma branch de feature a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/seu-nome-da-feature
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "feat: adicione a descrição da sua feature"
   ```

3. Push e crie um Pull Request contra `develop`:
   ```bash
   git push origin feature/seu-nome-da-feature
   ```

4. Após revisão e aprovação, seu PR será mergeado em `develop`.

5. Quando pronto para produção, `develop` é mergeado em `master`.

## Adicionando uma Nova Ferramenta

Cada nova ferramenta deve seguir a arquitetura isolada de features:

1. Crie `src/features/[tool-name]/` com:
   - `components/[ToolName]Form.tsx` — Componente client com `"use client"`
   - `utils/[function].ts` — Funções utilitárias puras (sem dependências React)
   - `tests/[function].test.ts` — Testes unitários para lógica utilitária
   - `index.ts` — Barrel export

2. Crie a rota `src/app/[locale]/tools/[tool-name]/page.tsx` com:
   - `generateMetadata` usando `getTranslations` para SEO
   - Dados estruturados JSON-LD

3. Adicione namespaces i18n em `messages/en.json`, `messages/pt-BR.json`, `messages/es.json`:
   - Nome da ferramenta na seção `toolNames`
   - Namespace completo com: title, description, examples, FAQ, whenToUse

4. Registre em `src/lib/tools-catalog.ts` com categoria e palavras-chave corretas.

5. Adicione testes unitários para todas as funções utilitárias.

## Padrões de Código

- TypeScript em modo strict.
- Sem strings hardcoded visíveis ao usuário — use `next-intl`.
- Funções utilitárias puras para lógica de negócio.
- Componentes client para UI (`"use client"`).
- Componentes server para páginas de rota.
- Tailwind CSS para estilos (sem estilos inline).
- Siga os padrões existentes em `src/features/uuid-generator/` como referência.

## Diretrizes para Pull Requests

Todo PR deve incluir:

- O que mudou e por quê.
- Quais arquivos foram afetados.
- Screenshots para mudanças de UI.
- Resultados de testes se aplicável.

Mantenha PRs focados em uma única mudança.

## Internacionalização

VeryKit suporta Inglês (`en`), Português Brasil (`pt-BR`) e Espanhol (`es`).

Todas as strings visíveis ao usuário devem usar `useTranslations()` ou `getTranslations()`. Nunca hardcode texto em componentes.

## Segurança

Não reporte vulnerabilidades de segurança em issues públicas. Veja [SECURITY.md](SECURITY.md).

## Licença

Ao contribuir com o VeryKit, você concorda que suas contribuições serão licenciadas sob a Licença MIT.
