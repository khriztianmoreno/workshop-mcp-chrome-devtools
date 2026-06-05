<div align="center">

<img src="public/slides/logo.png" alt="Workshop MCP Chrome Devtools" width="100" />

# Workshop MCP Chrome Devtools

**Un taller de live-coding sobre orquestación de agentes IA, Chrome DevTools MCP y prototipado rápido bajo presión.**

[🇬🇧 Read in English](README.md) · [📊 Ver Slides](https://workshop-mcp-chrome-devtools.vercel.app/slides)

---

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-opcional-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Taller](https://img.shields.io/badge/formato-taller--en--vivo-F97316?style=flat-square)

</div>

---

## ¿Qué es esto?

Este repo es el **canvas del demo en vivo** para el taller _"Workshop MCP Chrome Devtools: construye veloz y desbloquea con IA"_. Es una sesión hands-on donde aprendés a orquestar agentes de IA, depurar con Chrome DevTools a través de MCP y prototipar rápido bajo presión. La app en sí — DemoDay, una grilla de proyectos demo — es solo la superficie. Cada componente, bug y stub es intencional y está pensado para descubrirse (y arreglarse) en vivo durante el taller.

Vas a ver tres reflejos de agentes IA que comprimen horas de trabajo en minutos:

| Pilar | Reflejo | Tiempo |
|-------|---------|--------|
| 1 · Prototipado Visual | Screenshot → JSX en segundos | 10 min |
| 2 · Depuración de Runtime | DevTools + MCP → arreglá 4 bugs reales | 20 min |
| 3 · Orquestación Avanzada | Agentes en paralelo + fix autónomo de integración | 8 min |

---

## Requisitos previos

Instalá esto **antes** de que empiece el taller.

| Herramienta | Versión | Notas |
|-------------|---------|-------|
| [Node.js](https://nodejs.org) | 22+ | Requerido por el MCP de Chrome DevTools |
| [pnpm](https://pnpm.io) | 9+ | `npm i -g pnpm` |
| [Google Chrome](https://www.google.com/chrome/) | Última | Requerido para el demo de DevTools |
| [Antigravity IDE](https://antigravity.dev) | Última | Herramienta de agentes IA usada en el demo |
| [Claude Code](https://claude.ai/code) | Última | Alternativa (cualquiera de los dos sirve) |

> **Supabase** es opcional — solo lo necesitás si querés seguir el Pilar 3 en vivo. La app funciona completamente offline sin él.

---

## Inicio rápido

```bash
# 1. Cloná el repo
git clone https://github.com/khriztianmoreno/workshop-mcp-chrome-devtools
cd workshop-mcp-chrome-devtools

# 2. Instalá las dependencias
pnpm install

# 3. Arrancá el servidor de desarrollo
pnpm dev
```

Abrí **[http://localhost:3000](http://localhost:3000)** — deberías ver la landing de DemoDay.

> No necesitás archivo `.env`. Sin base de datos, sin auth, sin servicios externos para correr la app.

### Opcional: Supabase (Pilar 3)

```bash
cp .env.example .env.local
# Completá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## Verificación del Chrome DevTools MCP

### Lista de verificación

- [ ] **Antigravity IDE instalado y funcionando.** Ver [docs oficiales de Antigravity](https://antigravity.dev).
- [ ] **MCP de Chrome DevTools conectado a Antigravity IDE.** Ver [docs del MCP de Chrome DevTools](https://github.com/ChromeDevTools/chrome-devtools-mcp).
- [ ] **Repo clonado y dependencias instaladas** (`pnpm install`).
- [ ] **App corriendo** en `http://localhost:3000` (`pnpm dev`).
- [ ] **Chrome abierto** apuntando a `http://localhost:3000`.

### Test rápido (1 minuto)

En Antigravity IDE, escribí este prompt:

> "Conectate a `http://localhost:3000`, decime qué estadísticas aparecen en la página y cuántos proyectos hay en la grilla."

**Lo lograste si:** el agente responde con los números concretos de tu app corriendo (8 proyectos en la grilla). Si dice "no puedo acceder a la URL", el MCP no está bien configurado.

---

## Estructura del taller

### Pilar 1 · Prototipado visual ultrarrápido

> "No arrancás de cero. Pegás un screenshot, obtenés el JSX."

**Objetivo:** `components/pitch-section.tsx` — un stub vacío intencional

**Pasos:**
1. Buscá una referencia visual llamativa (Stripe pricing, una feature page de Linear, lo que sea)
2. Tomale un screenshot
3. Pegalo en tu agente IA y promteá:
   > _"Recreá la sección de la imagen dentro de `components/pitch-section.tsx` usando Tailwind y los colores `signal-orange`, `signal-violet` y `signal-cyan` definidos en `tailwind.config.ts`. Conservá el `id` del section como `pitch`."_
4. Refrescá la página — la sección vacía se rellena en vivo

**Bonus · Worktree 3D:** probá esto en un Playground (aislado del repo principal):
```
Crea un worktree. NO hagas checkout, NO cambies de rama,
NO hagas commits a otras ramas. Solo modificá archivos en el cwd actual.
Si necesitás cambiar de contexto, pará y preguntá.
Convierte el componente actual en un grid 3D con react-three-fiber.
```

---

### Pilar 2 · Depuración de Runtime Real

> "El agente lee el runtime — no adivina, no busca typos en texto estático."

Cuatro bugs reales embebidos intencionalmente en el código. Cada uno demuestra una señal diferente de DevTools.

---

#### Bug 2a · CSS: píldora de estado invisible

**Archivo:** `components/hero.tsx` — texto blanco sobre fondo blanco

**Qué está roto:** La píldora de estado vivo en el Hero es invisible — `text-white` sobre `bg-white`.

**Pasos para reproducir:**
1. Abrí `http://localhost:3000` — fijate la cápsula blanca vacía en el hero
2. Inspeccionala en Chrome DevTools → Elements → ves `color: rgb(255,255,255)` sobre `background-color: rgb(255,255,255)`
3. Cambiá `color` a `#080812` en el inspector para confirmar el fix visualmente

**Prompt para tu agente:**
```
En components/hero.tsx la "live status pill" tiene texto blanco sobre fondo blanco.
DevTools muestra color: rgb(255,255,255) sobre background-color: rgb(255,255,255).
Cambiá text-white por text-ink-950. Solo modificá esa línea.
```

---

#### Bug 2b · Red: el login postea a una ruta con typo

**Archivo:** `app/login/page.tsx` — hace fetch a `/api/lgoin` (typo, debería ser `/api/login`)

**Qué está roto:** Completar el form de login devuelve un 404.

**Pasos para reproducir:**
1. Andá a `/login`, completá cualquier credencial, hacé clic en Sign In
2. Abrí DevTools → Network → filtrá por Fetch/XHR → ves `POST /api/lgoin` devolviendo **404**
3. Notá que `app/api/login/route.ts` existe — la ruta está bien, el typo está en quien la llama

**Prompt para tu agente:**
```
El form de /login da 404 al enviar.
Revisé la pestaña Network en Chrome: la request va a POST /api/lgoin.
El árbol de rutas tiene app/api/login/route.ts — hay un typo.
Abrí app/login/page.tsx, encontrá el fetch con la URL errónea
y corregila a /api/login.
```

---

#### Bug 2c · Runtime: re-renders infinitos en la grilla de proyectos

**Archivo:** `components/projects-filter-grid.tsx`

**Qué está roto:** Hacer click en cualquier botón de filtro de categoría (cualquiera que no sea "all") provoca un bucle de re-renders infinitos. La consola se llena de `Warning: Maximum update depth exceeded` y la grilla se congela.

**Causa raíz:** `filteredProjects` se computa inline sin `useMemo`, por lo que produce una nueva referencia de array en cada render. El `useEffect` depende de ella, detecta un "cambio" en cada ciclo, llama a `setDisplayProjects`, dispara un re-render, y el ciclo no para nunca.

**Pasos para reproducir:**
1. Abrí `http://localhost:3000` — la grilla carga bien con todos los proyectos
2. Abrí DevTools → Console — confirmá que está limpia
3. Hacé click en el botón **"ai"**
4. Mirá cómo la consola explota con `Maximum update depth exceeded`

**Prompt para tu agente:**
```
Conéctate a localhost:3000 usando el MCP de Chrome DevTools.
Abrí la consola — vas a ver "Maximum update depth exceeded" repetido.
Analizá el componente ProjectsFilterGrid en components/projects-filter-grid.tsx.
El bug ocurre al hacer click en cualquier filtro de categoría distinto de "all".
Encontrá por qué el useEffect genera un bucle de re-renders
y corregilo sin cambiar la lógica de filtrado ni el UI.
```

**Cómo queda el fix:** envolver `filteredProjects` en `useMemo([initialProjects, activeCategory])` y eliminar el `useEffect` circular.

---

#### Bug 2d · Performance: imágenes sin optimizar que hunden el LCP

**Archivo:** `components/project-card.tsx`

**Qué está roto:** Las 8 imágenes de portada de los proyectos (800×450 px, ~200 KB cada una) se cargan todas de inmediato usando un `<img>` crudo — sin `loading="lazy"`, sin `width`/`height`, sin `sizes`. Esto bloquea el hilo principal y destroza el score de Largest Contentful Paint.

**Pasos para reproducir:**
1. Abrí DevTools → Network → hacé hard-reload de `http://localhost:3000`
2. Filtrá por Img — ves 8 requests de imagen simultáneas, todas a resolución completa (~1.6 MB total)
3. Switcheá a la pestaña Performance → grabá una carga de página → encontrá el marker de LCP profundo en el timeline
4. Opcional: corré Lighthouse en Desktop → score bajo de Performance y LCP en rojo

**Prompt para tu agente:**
```
Revisá la pestaña Network y Performance en localhost:3000 usando el MCP de DevTools.
Las tarjetas de proyectos cargan 8 imágenes crudas (800×450 px, ~200 KB c/u)
sin lazy loading ni optimización.
Optimizá components/project-card.tsx reemplazando el <img> crudo
por el componente next/image con width, height y sizes correctos.
También actualizá next.config.js para permitir el dominio picsum.photos
en images.remotePatterns.
```

**Cómo queda el fix:**
- Reemplazar `<img src={...}>` con `<Image>` de `next/image`
- Agregar `width={800}`, `height={450}`, `sizes="(max-width: 768px) 100vw, 33vw"`
- Agregar `picsum.photos` a `images.remotePatterns` en `next.config.js`

---

### Pilar 3 · Orquestación Avanzada

> "No solo paralelizar tareas — agentes que resuelven integraciones fallidas leyendo el runtime en vivo."

**Pre-condición:** `/api/projects` ya está devolviendo un **500 Internal Server Error**. Podés verificarlo abriendo DevTools → Network y recargando `http://localhost:3000`. La grilla de proyectos igual se muestra (tiene fallback al mock en memoria), pero el endpoint real está roto.

**Por qué está roto:** Luego de la migración a Supabase, el cliente de Supabase devuelve filas con nombres de columna en `snake_case` de PostgreSQL (`tech_stack`, `cover_image`, `is_trending`), pero el route intenta acceder a las claves camelCase que no existen en esas filas → `undefined.slice()` → TypeError → 500.

Podés ver el body del error en `http://localhost:3000/api/projects`:
```json
{
  "error": "Cannot read properties of undefined (reading 'slice')",
  "hint": "Supabase returns snake_case columns (tech_stack, cover_image, is_trending) but the route maps to camelCase keys that do not exist on the row."
}
```

#### Agente A · Migración a Supabase + fix autónomo (MCP de Supabase)

Lanzá esto como sub-agente y **no esperes a que termine**:

```
Leé lib/mocks/projects.ts y lib/types.ts para entender el shape.
Usando el MCP de Supabase, creá una tabla projects con columnas snake_case
(tech_stack, cover_image, is_trending, más un enum category y votes).
Completá supabase/schema.sql con el SQL de la migración.
Seedeá la tabla con los 8 registros del mock.
Actualizá app/api/projects/route.ts para que lea de Supabase.

Una vez hecho, abrí el MCP de Chrome DevTools e inspeccioná
la pestaña Network en localhost:3000.
Si /api/projects devuelve un error, leé la respuesta, identificá
el desajuste entre los nombres de columnas que devuelve Supabase (snake_case)
y los que espera el frontend (camelCase del tipo Project),
y corregí el mapeo en la API.
No termines hasta que /api/projects devuelva 200 con datos válidos.
```

**Lo que el Agente A hace autónomamente:**
1. Crea la tabla Supabase y la seedea
2. Actualiza `route.ts` para leer de Supabase
3. Abre la pestaña Network de DevTools vía MCP → ve el 500
4. Lee el error: `"undefined.slice"` + hint sobre snake_case
5. Rastrea el mismatch: `row.techStack` (undefined) debería ser `row.tech_stack`
6. Corrige el mapeo de columnas → `/api/projects` devuelve 200 con datos reales de Supabase

#### Agente B · Copy de marketing

Lanzá esto en paralelo con el Agente A:

```
En components/about-section.tsx hay tres párrafos marcados como [PLACEHOLDER PARAGRAPH].
Reescribílos como copy de marketing pulido para una landing de showcase de proyectos.
Tono: cercano, levemente irreverente, pero serio sobre el oficio.
60-80 palabras por párrafo. No toques los headings ni la estructura JSX.
```

**El momento de la multiplicación:** Ambos agentes terminan más o menos al mismo tiempo. El Agente A resolvió autónomamente un error de integración que nadie le mencionó explícitamente. El Agente B escribió el copy. Vos no hiciste ninguno de los dos — orquestaste.

---

## Tabla de bugs intencionales

Todos los bugs son intencionales. Acá está el mapa completo para que los puedas reproducir en casa:

| ID | Archivo | Qué está roto | Señal en DevTools |
|----|---------|---------------|-------------------|
| 2a | `components/hero.tsx:10` | `text-white` sobre `bg-white` — píldora invisible | Elements → color computado |
| 2b | `app/login/page.tsx:25` | `fetch('/api/lgoin')` — typo | Network → POST 404 |
| 2c | `components/projects-filter-grid.tsx` | `useEffect` + array inline → bucle infinito | Console → Maximum update depth |
| 2d | `components/project-card.tsx` | `<img>` sin lazy/sizes → 8×200 KB en carga | Network → requests Img / Lighthouse LCP |
| 3  | `app/api/projects/route.ts` | `row.techStack.slice()` sobre fila snake_case → TypeError | Network → GET /api/projects 500 |

---

## Estructura del proyecto

```
app/
  page.tsx                    # Landing (Header + Hero + Grid + Pitch + About + Footer)
  login/page.tsx              # ⚠️  Bug 2b — hace fetch a /api/lgoin (typo intencional)
  api/
    login/route.ts            # Endpoint real de login, devuelve 200
    projects/route.ts         # ⚠️  Bug 3  — mismatch snake_case → 500
  slides/page.tsx             # Presentación interactiva completa (21 slides)
components/
  hero.tsx                    # ⚠️  Bug 2a — píldora de estado invisible
  pitch-section.tsx           # ⚠️  Pilar 1 — stub vacío para el demo de screenshot
  about-section.tsx           # ⚠️  Pilar 3b — copy placeholder para el agente escritor
  project-card.tsx            # ⚠️  Bug 2d — <img> crudo sin lazy loading
  projects-filter-grid.tsx    # ⚠️  Bug 2c — re-renders infinitos al filtrar
  projects-grid.tsx           # Componente servidor — fetch de proyectos con fallback al mock
  site-header.tsx
  footer.tsx
lib/
  types.ts                    # Interfaz Project (shape canónico en camelCase)
  mocks/projects.ts           # 8 proyectos hardcodeados con URLs de coverImage
  utils.ts
supabase/
  schema.sql                  # ⚠️  Pilar 3a — stub vacío para que el agente de DB lo llene
public/
  slides/                     # Assets de la presentación
```

---

## Slides

La presentación completa vive en **`/slides`** — navegable con teclado (flechas o espacio).

**Online:** [https://workshop-mcp-chrome-devtools.vercel.app/slides](https://workshop-mcp-chrome-devtools.vercel.app/slides)
**Local:** [http://localhost:3000/slides](http://localhost:3000/slides)

---

## Sobre el speaker

<table>
<tr>
<td width="80">
<img src="public/slides/image1.jpg" width="72" style="border-radius:50%" />
</td>
<td>

**Cristian Moreno** · [@khriztianmoreno](https://github.com/khriztianmoreno)

Tech Lead en [Honest](https://honest.net) · Google Developer Expert en Tecnologías Web

[khriztianmoreno.dev](https://khriztianmoreno.dev) · [Twitter/X](https://twitter.com/khriztianmoreno)

</td>
</tr>
</table>

---

## Licencia

MIT — forkéalo, dictá el taller, hacélo tuyo.
