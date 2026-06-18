# Slide 6 — Chrome DevTools MCP: El agente que ve el navegador

**Tiempo:** min 14–16 · **Concepto:** Chrome DevTools MCP como puente entre CDP y el agente

## Conector
> "Muy bien. Tenemos un agente que necesita ojos. Tenemos MCP como el estándar que conecta ese agente con el mundo. Ahora la pregunta concreta: ¿cómo se materializa eso para el navegador? ¿Cómo le damos acceso real a Chrome?"

## Puente
> "La respuesta se llama **Chrome DevTools MCP**. Y la razón por la que funciona tan bien es que no inventó nada nuevo — se apoyó en algo que ya existe hace años."

## Guion
> "Chrome tiene desde hace mucho tiempo un protocolo de depuración propio llamado **Chrome DevTools Protocol, o CDP**. Es el mismo protocolo que usa el panel de DevTools cuando inspeccionás el DOM, cuando ves los logs en la consola, cuando filtrás requests en la pestaña Network.
>
> Lo que hace Chrome DevTools MCP es envolver ese protocolo en un servidor MCP. Resultado: el agente habla MCP, el servidor traduce a CDP, y Chrome responde.
>
> Arrancar es trivial: lanzás Chrome con `--remote-debugging-port=9222` y levantás el servidor con `npx @chrome-devtools/mcp-server`. A partir de ahí, el agente tiene acceso a todo lo que vos podés ver en DevTools — pero de forma programática y autónoma.
>
> La diferencia clave: vos tenés que abrir DevTools, buscar el error, copiarlo y pegarlo al chat. El agente lo lee solo."

**Acción:** señalá la columna derecha del slide — los cuatro ítems que gana el agente. Leelos en voz alta para que queden grabados antes de pasar a las herramientas concretas.
