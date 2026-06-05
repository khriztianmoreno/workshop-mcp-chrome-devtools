# Slide 16 — Bug 2d · Imágenes sin optimizar, LCP en el piso

**Tiempo:** min 46–52 (6 min)

## Conector
> "Tres bugs resueltos: CSS, network y comportamiento. Falta el cuarto, que pertenece a otra categoría completamente — uno que la app 'funciona' pero **pierde usuarios** sin que nadie se entere."

## Puente
> "Es un bug de **performance**. No genera errores en la consola, no rompe ningún test, ningún linter lo marca. Pero hace que la página se sienta lenta y que el Core Web Vital esté en rojo. Veámoslo en Network."

## El bug
`components/project-card.tsx` — 8 cover images con `<img>` crudo: sin `loading="lazy"`, sin `width`/`height`, sin `sizes`. Cada imagen ~200–400 KB (800×450 desde picsum.photos). Carga inicial = **~2 MB de imágenes** bloqueando el hilo principal → LCP pésimo.

## Flujo
- **[min 46]** Hard-reload con DevTools → **Network**.
- **[min 46–47]** *"¿Ven esas 8 requests de imagen al inicio? Todas al mismo tiempo, sin lazy loading, al tamaño completo. Eso mata el LCP."*
- **[min 47]** **Performance** → profile rápido → mostrá el LCP marker.
- **[min 47]** **Lighthouse** → run Desktop. Mostrá Performance bajo y LCP en rojo.
  > "El agente va a leer estas métricas **reales del browser** y decidir cómo optimizar. No un blog post de best practices — los números de *esta* app."
- **[min 48–52]** Lanzá el prompt.

## 🟢 PROMPT — Pillar 2d
```
Revisá la pestaña Network y Performance en localhost:3000 usando el MCP.
Las tarjetas de proyectos cargan 8 imágenes en crudo (800×450 px, ~200 KB c/u)
sin lazy loading ni optimización — el LCP está en el piso.
Optimizá components/project-card.tsx reemplazando el <img> crudo
por el componente next/image con width, height y sizes adecuados.
También actualizá next.config.js para permitir el dominio picsum.photos
en images.remotePatterns.
```

## Qué hace el agente
1. Lee Network vía MCP → confirma 8 requests sin lazy.
2. `project-card.tsx` → reemplaza `<img>` por `<Image>`.
3. Agrega `width={800}`, `height={450}`, `sizes="..."`, lazy auto.
4. `next.config.js` → agrega `picsum.photos` a `images.remotePatterns`.

## Línea de impacto
> "**Cuatro bugs. Cuatro herramientas distintas de DevTools. Un solo agente leyendo el runtime en vivo.** Eso es la diferencia entre copiar y pegar un stack trace y tener un sistema nervioso compartido."
