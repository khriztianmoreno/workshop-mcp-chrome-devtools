# Slide 12 — Pilar 02 · Depuración de Runtime Real

**Tiempo:** min 30–32

## Conector
> "Primer pilar resuelto: tenemos UI nueva en minutos. Pero ya saben cómo es esto — crear interfaz rápido no sirve de nada si después pasamos ocho horas debuggeando por qué algo se rompió."

## Puente — anticipación de los 4 bugs
> "Por eso el segundo pilar es el que más amo: **depuración con runtime real**. Y para mostrarlo, traje **cuatro bugs reales** sembrados a propósito en esta app. Cada uno representa una categoría distinta que no se pueden atrapar igual."

## Guion
> "Cuatro bugs reales, todos resueltos con el mismo flujo — el agente lee el runtime, no adivina.
>
> Los primeros dos son bugs **estáticos clásicos**: texto invisible y un typo en una URL. Pero los últimos dos son bugs de **comportamiento** que la revisión de código no puede atrapar: un bucle de re-renders y un cuello de botella de performance. Ahí es donde el MCP de DevTools cambia el juego."

## Señalá los cuatro bugs
- **Bug 2a** · `components/hero.tsx` — pill invisible (CSS)
- **Bug 2b** · `app/login/page.tsx` — login 404 (Network)
- **Bug 2c** · `components/projects-filter-grid.tsx` — re-renders infinitos (Runtime)
- **Bug 2d** · `components/project-card.tsx` — imágenes sin optimizar, LCP pésimo (Performance)
