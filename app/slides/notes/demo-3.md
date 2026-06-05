# Slide 18 — Demo · Pilar 03 — Sincronización en Caliente

**Tiempo:** min 52–58 (6 min)

## Conector
> "Vamos a la demo. Dos agentes, dos dominios completamente distintos, **cero supervisión continua** de mi parte. Yo solo defino objetivos."

## Puente
> "Mientras ellos trabajan en paralelo, yo les voy narrando qué está pasando en cada panel — y al final compartimos los dos diffs al mismo tiempo. Mantengan un ojo en el **Inbox**: ahí es donde ven el cambio cultural."

## ✅ Pre-demo (verificá antes de subir)
- `localhost:3000` → grilla visible (mock fallback)
- `localhost:3000/api/projects` → `{"error":"...","hint":"..."}` con **status 500**

---

## 3a — Developer Agent (Supabase + fix autónomo) `[min 52–54]`
**[min 52]** Abrí el **Agent Manager** → nuevo sub-agente.

### 🟢 PROMPT — Pillar 3a
```
Lee lib/mocks/projects.ts y lib/types.ts para entender el shape.
Usando el MCP de Supabase, creá una tabla projects (snake_case:
tech_stack, cover_image, is_trending, más el enum category y votes).
Completá supabase/schema.sql con el SQL de la migración.
Siembra la tabla con los 8 registros del mock.
Actualizá app/api/projects/route.ts para que el GET lea de Supabase.

Una vez hecho, abrí el MCP de Chrome DevTools e inspeccioná
la pestaña Network en localhost:3000.
Si /api/projects devuelve un error, leé la respuesta, identificá
el desajuste entre los nombres de columnas que devuelve Supabase
(snake_case) y los que espera el frontend (camelCase Project type),
y corregí el mapeo en la API.
No termines hasta que /api/projects devuelva 200 con datos válidos.
```

> "Ese agente tiene un objetivo: `/api/projects` debe devolver 200 con datos válidos. **No le dije cómo arreglarlo. No le dije que hay un 500.** Que lo encuentre solo. Lanzo el segundo."

---

## 3b — Marketing Agent (copywriting) `[min 54–55]`

### 🟢 PROMPT — Pillar 3b
```
En components/about-section.tsx hay tres párrafos marcados como
[PLACEHOLDER PARAGRAPH]. Reescribilos como copy de marketing
pulido para una landing de un marketplace de agentes de IA.
Tono: cercano, levemente irreverente, pero serio sobre el oficio.
60–80 palabras por párrafo.
No toques los headings ni la estructura JSX.
```

---

## Narrativa mientras corren `[min 55–57]`
> "El **Agente 3a** está leyendo la pestaña Network en este momento. Ve el 500. Va a abrir el route.ts, va a comparar los nombres de columna con el tipo Project, y va a corregir el mapeo.
>
> El **Agente 3b** está generando el copy.
>
> Yo no estoy haciendo nada. **Estoy orquestando.**"

## Agent 3a termina `[min 57]`
- Leyó `/api/projects` → 500
- Leyó error: `"undefined.slice"` + hint de snake_case
- Corrigió mapeo: `tech_stack → techStack`, `is_trending → trending`, `cover_image → coverImage`
- `/api/projects` → **200**

## Mostrá los dos diffs simultáneos `[min 57–58]`
- **Dev:** `supabase/schema.sql` lleno + `route.ts` con mapeo → 200
- **Marketing:** 3 placeholders → copy real

## 🔥 Línea WOW
> "Eso es la **autonomía real**. El agente no siguió un script — leyó el runtime, diagnosticó el error, trazó el desajuste de tipos entre la base de datos y el frontend, y lo resolvió. **Eso es lo que convierte un agente en un colega.**"
