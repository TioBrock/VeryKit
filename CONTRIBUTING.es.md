# Contribuir a VeryKit

Gracias por tu interés en contribuir a VeryKit.

VeryKit es un proyecto open source enfocado en herramientas gratuitas, rápidas y accesibles para QA Engineers y Developers. Las contribuciones son bienvenidas, pero deben respetar la filosofía del producto y los estándares de calidad del proyecto.

## Principios del Proyecto

Toda contribución debe preservar estos principios:

- Gratuito para siempre para herramientas principales.
- Sin anuncios, sin login forzado, sin paywall, sin rastreo invasivo.
- Procesamiento local siempre que sea posible.
- Flujos de trabajo rápidos y UX accesible.
- Soporte internacional desde el primer día.

## Primeros Pasos

```bash
git clone https://github.com/TioBrock/VeryKit.git
cd VeryKit
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comandos de Desarrollo

```bash
npm run dev        # Iniciar servidor de desarrollo
npm test           # Ejecutar tests unitarios
npm run build      # Build para producción
npm run lint       # Ejecutar ESLint
```

## Estrategia de Branches

Usamos un modelo de branches para mantener el código estable:

- **`master`** — Código listo para producción. Siempre estable.
- **`develop`** — Branch de integración para nuevas features. Los PRs van aquí.
- **`feature/*`** — Branches temporales para cada contribución.

### Creando un Pull Request

1. Crea una branch de feature desde `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/tu-nombre-feature
   ```

2. Haz tus cambios y commit:
   ```bash
   git add .
   git commit -m "feat: añade la descripción de tu feature"
   ```

3. Push y crea un Pull Request contra `develop`:
   ```bash
   git push origin feature/tu-nombre-feature
   ```

4. Después de revisión y aprobación, tu PR será mergeado en `develop`.

5. Cuando esté listo para producción, `develop` es mergeado en `master`.

## Añadiendo una Nueva Herramienta

Cada nueva herramienta debe seguir la arquitectura aislada de features:

1. Crea `src/features/[tool-name]/` con:
   - `components/[ToolName]Form.tsx` — Componente client con `"use client"`
   - `utils/[function].ts` — Funciones utilitarias puras (sin dependencias React)
   - `tests/[function].test.ts` — Tests unitarios para lógica utilitaria
   - `index.ts` — Barrel export

2. Crea la ruta `src/app/[locale]/tools/[tool-name]/page.tsx` con:
   - `generateMetadata` usando `getTranslations` para SEO
   - Datos estructurados JSON-LD

3. Añade namespaces i18n en `messages/en.json`, `messages/pt-BR.json`, `messages/es.json`:
   - Nombre de la herramienta en la sección `toolNames`
   - Namespace completo con: title, description, examples, FAQ, whenToUse

4. Registra en `src/lib/tools-catalog.ts` con categoría y palabras clave correctas.

5. Añade tests unitarios para todas las funciones utilitarias.

## Estándares de Código

- TypeScript en modo strict.
- Sin strings hardcoded visibles al usuario — usa `next-intl`.
- Funciones utilitarias puras para lógica de negocio.
- Componentes client para UI (`"use client"`).
- Componentes server para páginas de ruta.
- Tailwind CSS para estilos (sin estilos inline).
- Sigue los patrones existentes en `src/features/uuid-generator/` como referencia.

## Directrices para Pull Requests

Todo PR debe incluir:

- Qué cambió y por qué.
- Qué archivos fueron afectados.
- Screenshots para cambios de UI.
- Resultados de tests si aplica.

Mantén PRs enfocados en un solo cambio.

## Internacionalización

VeryKit soporta Inglés (`en`), Portugués Brasil (`pt-BR`) y Español (`es`).

Todas las strings visibles al usuario deben usar `useTranslations()` o `getTranslations()`. Nunca hardcodes texto en componentes.

## Seguridad

No reportes vulnerabilidades de seguridad en issues públicas. Consulta [SECURITY.md](SECURITY.md).

## Licencia

Al contribuir a VeryKit, aceptas que tus contribuciones serán licenciadas bajo la Licencia MIT.
