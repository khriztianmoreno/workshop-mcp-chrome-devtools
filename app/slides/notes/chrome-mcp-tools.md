# Slide 7 — Las herramientas que expone el MCP

**Tiempo:** min 16–19 · **Concepto:** Las 4 categorías de tools — Consola, Red, Performance, Visual/DOM

## Conector
> "Bien, ya sabemos qué es y cómo arranca. Ahora la parte más concreta: ¿qué herramientas específicas tiene el agente disponibles? Porque 'acceso al navegador' puede sonar vago — esto no lo es."

## Puente
> "Son cuatro categorías. Y cada una resuelve un tipo de problema distinto que antes era manual."

## Guion
> "**Consola** — `get_console_logs`. El agente lee en tiempo real todos los errores, warnings y logs que aparecen en la consola. Lo que normalmente vos ves en la pestaña Console, el agente lo tiene disponible sin que vos hagas nada.
>
> **Red** — `list_network_requests`. Cada request HTTP que hace la página: status codes, headers, payloads. Si hay un 404, un 500, un CORS bloqueado — el agente lo detecta antes de que vos lo notes.
>
> **Performance** — `performance_start_trace` y `performance_stop_trace`. El agente puede iniciar una traza real de CPU, memoria y Web Vitals, y leer los resultados. No estimaciones — métricas reales de la sesión en curso.
>
> **Visual y DOM** — `take_screenshot` y `get_page_source`. Captura visual del estado actual de la página más el HTML vivo del DOM. Si el layout se rompió, el agente lo ve.
>
> La línea de abajo en el slide lo resume: el agente no ejecuta un script — *decide* qué herramienta usar según lo que encuentra. Cuando el bucle de re-renders apareció, usó `get_console_logs`. Cuando el login dio 404, usó `list_network_requests`. Eso es razonamiento, no búsqueda a ciegas."

**Acción:** pasá el dedo por cada tarjeta del grid mientras nombrás la categoría. El ritmo ayuda a que la audiencia procese las cuatro antes de avanzar.
