# Slide 8 — CDP → MCP → Agente

**Tiempo:** min 19–21 · **Concepto:** Las tres capas y cómo se comunican entre sí

## Conector
> "Si alguien en la sala está pensando 'todo muy lindo, pero ¿cómo funciona esto por dentro?' — este slide es para ustedes. Y si no lo pensaban, igual les va a servir porque lo van a ver correr en vivo en unos minutos."

## Puente
> "Son tres capas. Cada una habla un protocolo distinto. Y la magia está en la traducción entre ellas."

## Guion
> "Primera capa, abajo: el **browser**. Chrome corre con el flag `--remote-debugging-port=9222` y expone una API de WebSocket usando el Chrome DevTools Protocol — JSON-RPC puro. Es el mismo canal que usa el inspector de DevTools cuando abrís el panel.
>
> Segunda capa: el **MCP Server** — `@chrome-devtools/mcp-server`. Se conecta al browser por WebSocket, escucha los eventos de CDP, y los traduce a herramientas MCP con nombres legibles para un agente: `get_console_logs`, `take_screenshot`, `list_network_requests`. El servidor habla con el agente vía stdio o SSE.
>
> Tercera capa, arriba: el **agente** — en este caso Claude Code dentro de Antigravity IDE. Recibe las herramientas MCP, decide cuál usar según el contexto, ejecuta, lee el resultado y actúa.
>
> El punto importante: el agente nunca habla directo con Chrome. Siempre pasa por el servidor MCP. Eso significa que si mañana aparece un browser distinto o un protocolo nuevo, solo cambia el servidor — el agente no sabe, no le importa, sigue trabajando igual."

**Acción:** recorré visualmente las capas de abajo hacia arriba mientras hablás — el gesto refuerza el flujo del protocolo.
