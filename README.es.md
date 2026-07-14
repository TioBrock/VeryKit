# VeryKit

**Un lugar. Todas las herramientas.**

Herramientas gratuitas para QA Engineers y Developers.

## Visión General

VeryKit es un toolkit open source que reúne pequeñas utilidades del día a día utilizadas por QA Engineers, Test Automation Engineers, Software Developers y estudiantes.

El objetivo es simple:

1. Abre VeryKit.
2. Busca o elige una herramienta.
3. Resuelve la tarea en segundos.
4. Copia el resultado.
5. Cierra el sitio.

Sin anuncios, sin rastreo, sin paywalls. Solo herramientas que funcionan, se ejecutan localmente y desaparecen cuando terminas.

## Características

- **37 herramientas** en 6 categorías (Data, API, Testing, Utilities, Regional, Others)
- **i18n completo**: Inglés, Portugués (Brasil), Español
- **Búsqueda bilingüe**: Encuentra herramientas por nombre en cualquier idioma soportado
- **Procesamiento client-side**: Todos los cálculos ocurren en tu navegador
- **Modo Dark/Light**: Cambio automático de tema
- **Diseño responsivo**: Funciona en móvil, tablet y escritorio
- **Tests unitarios** con Vitest

## Herramientas

### Data

| Herramienta | Descripción |
|-------------|-------------|
| UUID Generator | Genera UUIDs aleatorios (v4) |
| Password Generator | Contraseñas seguras aleatorias con opciones personalizables |
| Lorem Ipsum Generator | Texto placeholder en párrafos, palabras o listas |
| Credit Card Test Generator | Números de prueba válidos (Visa, Mastercard, Amex, Discover) |
| CSV ⇄ JSON Converter | Convierte entre formatos CSV y JSON |
| Number Base Converter | Convierte entre decimal, hex, binario y octal |
| Byte Converter | Convierte entre bytes, KB, MB, GB y TB |

### API

| Herramienta | Descripción |
|-------------|-------------|
| JSON Formatter & Minifier | Formatea, valida y minifica JSON |
| JSON Compare | Compara dos objetos JSON lado a lado |
| Base64 Encode / Decode | Codifica y decodifica strings Base64 |
| URL Encode / Decode | Codifica y decodifica parámetros de URL |
| JWT Decoder | Decodifica tokens JWT e inspecciona claims |
| JWT Generator & Signer | Genera y firma tokens JWT con HMAC-SHA256 |
| cURL to Code Converter | Convierte comandos cURL a fetch, axios, Python y más |
| User-Agent Parser | Analiza strings User-Agent para identificar navegador, SO y dispositivo |
| MIME Type Checker | Consulta tipos MIME por extensión o viceversa |

### Testing

| Herramienta | Descripción |
|-------------|-------------|
| Boundary Value Calculator | Calcula valores límite para casos de prueba |
| Test Data Table Generator | Genera tablas de datos mock en CSV, JSON o SQL |
| BDD / Gherkin Snippet Builder | Construye escenarios BDD con sintaxis Given/When/Then |
| HTTP Status Code Reference | Referencia rápida de códigos de estado HTTP |
| XPath & CSS Selector Builder | Construye selectores XPath y CSS para automatización de pruebas |

### Utilities

| Herramienta | Descripción |
|-------------|-------------|
| Case Converter | Convierte entre camelCase, snake_case, kebab-case, etc. |
| Timestamp / Unix Time Converter | Convierte entre timestamps Unix y fechas |
| Regex Tester | Prueba expresiones regulares con matches destacados |
| Hash Generator | Genera hashes MD5, SHA-1, SHA-256, SHA-512 |
| Color Picker & Converter | Elige colores y convierte entre HEX, RGB, HSL, CMYK |
| Markdown ⇄ HTML Converter | Convierte entre Markdown y HTML |
| Markdown → PDF | Exporta documentos Markdown como PDF |
| Text ⇄ Binary Converter | Convierte entre texto y representación binaria |

### Regional (Brasil)

| Herramienta | Descripción |
|-------------|-------------|
| CPF Generator & Validator | Genera y valida números de CPF brasileños |
| CNPJ Generator & Validator | Genera y valida números de CNPJ brasileños |
| CEP Generator & Validator | Genera y valida códigos postales brasileños |
| Renavam Generator & Validator | Genera y valida números de registro de vehículos |
| PIX Key Generator | Genera claves PIX aleatorias para pagos |

### Others

| Herramienta | Descripción |
|-------------|-------------|
| Chmod Calculator | Calcula permisos de archivos Linux |
| QR Code Generator | Genera QR codes a partir de texto o URLs |
| Aspect Ratio Calculator | Calcula proporciones de imágenes |

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Iconos**: Lucide React
- **i18n**: next-intl
- **Tests**: Vitest
- **Deploy**: Vercel

## Primeros Pasos

### Prerrequisitos

- Node.js 18+
- npm, yarn o pnpm

### Instalación

```bash
git clone https://github.com/TioBrock/VeryKit.git
cd VeryKit
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Tests

```bash
npm test
```

### Build

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── app/                    # Páginas Next.js App Router
│   └── [locale]/          # Rutas de locale i18n
│       ├── tools/          # Páginas de herramientas
│       └── about/          # Páginas informativas
├── components/             # Componentes UI compartidos
├── features/               # Módulos aislados de herramientas
│   └── [tool-name]/
│       ├── components/     # Componentes React
│       ├── utils/          # Funciones utilitarias puras
│       ├── tests/          # Tests unitarios
│       └── index.ts        # Barrel export
├── lib/                    # Utilidades compartidas
└── i18n.ts                 # Configuración i18n
messages/                   # Archivos de traducción (en, pt-BR, es)
```

## Principios de Arquitectura

- **Aislamiento de features**: Cada herramienta vive en su propio directorio `src/features/`
- **Procesamiento client-side**: Toda la lógica se ejecuta en el navegador
- **i18n primero**: Toda string visible al usuario está traducida
- **Accesibilidad**: Prácticas orientadas a WCAG
- **Rendimiento**: Puntuaciones Lighthouse > 95

## Estrategia de Branches

Usamos un modelo de branches para mantener el código estable:

- **`master`** — Código listo para producción. Siempre estable.
- **`develop`** — Branch de integración para nuevas features. Los PRs van aquí.
- **`feature/*`** — Branches temporales para cada contribución.

### Flujo de Trabajo

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

## Contribuir

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para directrices.

## Seguridad

Consulta [SECURITY.md](SECURITY.md) para el proceso de reporte.

## Licencia

VeryKit se distribuye bajo la [Licencia MIT](LICENSE).
