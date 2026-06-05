# Slide 11 — Demo · Pilar 01

**Tiempo:** min 21–30 (9 min)

## Conector
> "Pero ya saben que esto no se entiende contándolo — se entiende viéndolo. Así que vamos al editor y al browser. Bajamos los slides un momento."

## Puente
> "El flujo son cuatro pasos. Los hago yo en vivo, ustedes me siguen visualmente. Si en algún momento se pierden, me paran sin problema."

## Flujo en vivo
1. **[min 21]** Cambiá a la app — mostrá la sección `#pitch` vacía.
2. **[min 22]** Abrí la referencia visual (Stripe / Linear). Mostrála 5 seg.
3. **[min 22]** Pegá la imagen en Antigravity IDE + lanzá el prompt.
4. **[min ~29]** Hot-reload. UI real.

## 🟢 PROMPT — Pillar 1
```
Toma la imagen que acabo de pegar.
Recréala dentro de components/pitch-section.tsx usando Tailwind.
Usa los colores signal-orange, signal-violet y signal-cyan
definidos en tailwind.config.ts.
Conservá el id="pitch" en el <section>.
No toques ningún otro componente.
```

## Mientras el agente trabaja
- Mantené el editor visible — la audiencia ve el diff en vivo.
- Comentá: *"Le di contexto de qué colores usar. El agente lee el tailwind.config para no inventar valores."*
- *"Esto es lo que mencioné antes — el agente tiene contexto del proyecto real, no solo de la imagen."*

## Línea de impacto
> "Eso fue el **Artifact como Blueprint**: el agente entiende la arquitectura antes de tirar código. **Minutos, no horas.**"

## Bonus (si sobran 2 min) — Worktree 3D
> "Quiero probar algo loco — un grid 3D con react-three-fiber. Abro un Playground: sandbox aislado, no toca el repo. Puedo experimentar libremente sin afectar el proyecto principal — ideal para aprender sin miedo a romper nada."

```
Crea un worktree. NO hagas checkout, NO cambies de rama,
NO hagas commits a otras ramas. Solo modificá archivos en el cwd actual.
Si necesitás cambiar de contexto, pará y preguntá.
Convierte el componente actual en un grid 3D con react-three-fiber.
```
