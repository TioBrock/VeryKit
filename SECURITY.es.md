# Política de Seguridad

## Versiones Soportadas

VeryKit está actualmente en la **Fase 1: Arquitectura y Documentación**.

Aún no hay tiempo de ejecución de la aplicación, por lo que no hay versiones de aplicación lanzadas para soportar.

Cuando comiencen la implementación y los lanzamientos, esta sección será actualizada con información de versiones soportadas.

## Reportando una Vulnerabilidad

Por favor, no reportes vulnerabilidades de seguridad a través de issues públicas.

Si crees que has encontrado un problema de seguridad, reportalo privadamente a los mantenedores.

Hasta que se publique un contacto de seguridad dedicado, usa el canal de contacto privado preferido del propietario del repositorio.

Tu reporte debe incluir:

- Una descripción clara del problema.
- Pasos para reproducir.
- Impacto potencial.
- Archivos, rutas o features afectadas, si se conocen.
- Cualquier detalle de prueba de concepto que ayude a los mantenedores a verificar el problema de manera segura.

## Qué Evitar

Por favor, no:

- abras un issue público para una vulnerabilidad explotable.
- accedas a datos que no te pertenezcan.
- interrumpas la disponibilidad del servicio.
- uses escaneo automatizado de forma que cause daño.
- exfiltes secretos o datos privados.
- compartas detalles de explotación públicamente antes de que los mantenedores respondan.

## Filosofía de Seguridad

VeryKit reduce el riesgo de seguridad manteniendo el producto simple:

- Sin autenticación por defecto.
- Sin base de datos de usuarios.
- Sin procesamiento backend para herramientas normales.
- Sin anuncios.
- Sin rastreo invasivo.
- Procesamiento local siempre que sea posible.

Futuras features que procesen input del usuario deben evitar enviar ese input a servicios remotos, a menos que esté documentado y aprobado explícitamente.

## Respuesta Esperada

Los mantenedores deben buscar:

1. Reconocer el reporte.
2. Reproducir y evaluar el problema.
3. Priorizar basándose en la severidad.
4. Preparar una corrección cuando sea necesario.
5. Creditar al reportador si desean crédito.
6. Divulgar responsablemente después de la mitigación.

El tiempo de respuesta dependerá de la disponibilidad de los mantenedores y la madurez del proyecto.

## Seguridad de Dependencias

La implementación futura debe mantener las dependencias mínimas y revisadas.

Los cambios de dependencias sensibles a la seguridad deben considerar:

- Vulnerabilidades conocidas.
- Actividad de los mantenedores.
- Dependencias transitivas.
- Impacto en el bundle.
- Si las APIs nativas pueden resolver el problema.

## Advertencia de Herramientas Client-Side

Las herramientas de VeryKit están destinadas a conveniencia y productividad local.

Incluso cuando el procesamiento ocurre en el navegador, los usuarios deben tener cuidado con secretos altamente sensibles, credenciales de producción, claves privadas y datos regulados.

Herramientas como decodificadores JWT o generadores de hash deben explicar claramente qué hacen y qué no garantizan.
