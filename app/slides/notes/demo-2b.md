# Slide 14 — Bug 2b · 404 en el form de login

**Tiempo:** min 36–41 (5 min)

## Conector
> "Ese fue un bug de lo que **se ve**. El próximo ya no está en el render — está en lo que **se envía**. Cambiamos de capa: pasamos del CSS al Network."

## Puente
> "Tenemos un formulario de login que aparentemente funciona — uno completa los campos, hace click… y nada. El servidor responde 404. Vamos a desarmarlo."

## El bug
`app/login/page.tsx` línea 25 — `fetch('/api/lgoin')`. Typo. La ruta real: `/api/login`.

## Flujo
- **[min 36]** Navegá a `localhost:3000/login`.
- **[min 36–37]** Completá form → click *Sign in*. UI muestra: `"Server responded 404. Check the Network tab."`
- **[min 37–38]** DevTools → **Network** → filtrá Fetch/XHR. Mostrá: `POST /api/lgoin` → **404**. Zoom para que `lgoin` se lea desde el fondo.
- **[min 38]** Editor → señalá que `app/api/login/route.ts` **sí existe**. La ruta existe — el typo está en quién la llama.
- **[min 38–41]** Prompt con Chrome DevTools MCP activo.

## 🟢 PROMPT — Pillar 2b
```
El form de /login está dando 404 al enviar.
Revisé la pestaña Network en Chrome: la request va a POST /api/lgoin.
El árbol de rutas tiene app/api/login/route.ts — hay un typo.
Abrí app/login/page.tsx, encontrá el fetch con la URL errónea
y corregila a /api/login.
```

## Resultado esperado
Agente edita línea 25. `/api/lgoin` → `/api/login`. Nuevo submit → **200 OK**.

## Línea de impacto
> "Bugs de texto. Fáciles de ver una vez que sabés dónde mirar. Ahora vamos a lo que **ninguna revisión de código puede atrapar**."

⚠️ **Zoom al Network tab a >120%** para que se lea desde el fondo.
