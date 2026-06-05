# Slide 15 — Bug 2c · Re-renders infinitos en la grilla

**Tiempo:** min 41–46 (5 min)

## Conector
> "Esos dos bugs anteriores — el de CSS y el del typo — los podríamos haber encontrado leyendo el código con paciencia. **El próximo, no.** Y acá es donde el MCP cambia el juego de verdad."

## Puente
> "Este es un bug de **comportamiento** — solo existe en runtime, solo se activa con interacción del usuario, y la review más cuidadosa del PR jamás lo va a atrapar. Vean:"

## El bug
`components/projects-filter-grid.tsx` — `useEffect` depende de `filteredProjects`, que se computa inline sin `useMemo`. Click en cualquier filtro ≠ "all" → `filteredProjects` es un nuevo array cada render → `setDisplayProjects` se llama en bucle → React lanza **`"Maximum update depth exceeded"`**.

⚠️ **El bug NO se activa en carga inicial** — solo cuando el usuario toca los filtros.

## Flujo
- **[min 41]** Navegá a `localhost:3000`. *"Agregamos filtros — 'all', 'ai', 'web', etc. Parece que funciona."*
- **[min 42]** DevTools → **Console** limpia.
- **[min 42]** Click en **"ai"** → la consola **explota** con `Warning: Maximum update depth exceeded` repetido. Grilla se congela.
- **[min 43]** Señalá React DevTools → Components tab. *"El agente va a leer la consola con el MCP, analizar el árbol de componentes y encontrar por qué el useEffect está corriendo en un bucle."*
- **[min 43–46]** Lanzá el prompt.

## 🟢 PROMPT — Pillar 2c
```
Conéctate a localhost:3000 usando el MCP de Chrome DevTools.
Abrí la consola — vas a ver "Maximum update depth exceeded" repetido.
Analizá el componente ProjectsFilterGrid en components/projects-filter-grid.tsx.
El bug ocurre al hacer click en cualquier filtro de categoría.
Encontrá por qué el useEffect genera un bucle de re-renders,
corregilo sin cambiar la lógica de filtrado ni el UI.
```

## Qué hace el agente
1. Lee la consola vía MCP → identifica el error de React.
2. Abre `projects-filter-grid.tsx` → detecta que `filteredProjects` se computa inline.
3. Envuelve en `useMemo` con deps `[initialProjects, activeCategory]`.
4. Elimina el `useEffect` circular — `displayProjects` pasa a ser `filteredProjects` directo.

## Línea de impacto
> "El agente **leyó el runtime, no el código**. Eso es lo que ninguna revisión de PR puede hacer por vos."
