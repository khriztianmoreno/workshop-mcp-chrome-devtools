# Slide 17 — Pilar 03 · Orquestación Avanzada

**Tiempo:** min 50–52

## Conector
> "Cuatro bugs, cuatro categorías distintas, todos resueltos con el mismo principio: el agente lee el runtime en vivo. Pero hasta acá venimos trabajando con **un** agente. ¿Qué pasa si multiplicamos?"

## Puente
> "El tercer pilar es el que más me gusta mostrar — y a la vez el más difícil de creer hasta que lo ven. Va más allá de paralelizar tareas: hablamos de agentes que **diagnostican errores de integración leyendo el runtime**, sin que yo les diga qué buscar."

## Setup del momento WOW
> "Acá viene mi parte favorita. Pero antes de lanzar los agentes, fijense en algo."

**[min 50]** DevTools → **Network**. Reload `localhost:3000`. Señalá la request a `/api/projects` → **500**.

> "¿Ven eso? La migración a Supabase está hecha — las tablas existen — pero el endpoint está roto. La grilla se muestra porque tenemos un fallback al mock, pero el endpoint real está dando 500.
>
> Ahora les voy a mostrar algo que va más allá de paralelizar tareas. El **Agente 3a** va a migrar la base de datos, levantar el endpoint, detectar que está roto usando Network tab de Chrome, identificar el desajuste de tipos entre Supabase y el frontend, y corregirlo — **sin que yo le diga nada de esto**. Solo le digo el objetivo."

## Señalá el Inbox asíncrono
> "El Inbox es lo que hace posible esto. Si el agente se bloquea con un permiso de Supabase, levanta un ticket y yo lo apruebo cuando quiero. **No hay chat lineal bloqueante.**"
