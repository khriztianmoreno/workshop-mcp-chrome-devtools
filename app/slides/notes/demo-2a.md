# Slide 13 — Bug 2a · La píldora invisible

**Tiempo:** min 32–36 (4 min)

## Conector
> "Arranquemos por el más engañoso de los cuatro — porque parece trivial, pero es el que más veces lo vi escaparse de los PR reviews."

## Puente
> "Es un bug clásico de CSS, del tipo que descubrís cuando un usuario te escribe 'hey, esa pestaña está vacía'. Lo bautizo: **la píldora invisible**."

## El bug
`hero.tsx` línea 10 — `text-white` sobre `bg-white`. Texto invisible.

## Flujo
- **[min 32]** Cambiá al browser. Señalá la pill: *"¿Ven esa cápsula? Se ve vacía. Vamos a diagnosticarla."*
- **[min 32–33]** DevTools → Elements → inspeccioná. Mostrá: `color: rgb(255,255,255)` + `background-color: rgb(255,255,255)`.
- **[min 33–34]** En el inspector, cambiá `color` a `#080812` → el texto aparece en vivo.
  > "Esto es la **Persistencia Inversa**. Modifiqué el DOM en vivo. Ahora el agente va a extraer ese estado y actualizar el código fuente."
- **[min 34–36]** Lanzá el prompt.

## 🟢 PROMPT — Pillar 2a
```
En components/hero.tsx la "live status pill" tiene fondo blanco
(bg-white) y texto blanco (text-white). Verifiqué en DevTools:
color: rgb(255,255,255) sobre background-color: rgb(255,255,255).
Cambiá el texto a text-ink-950 para que sea legible.
Solo modificá esa línea.
```

## Resultado esperado
`text-white` → `text-ink-950`. Browser muestra pill legible.

## Línea de impacto
> "El agente no adivinó. Tuvo el diagnóstico de DevTools. Por eso no tardó 20 minutos — tardó **20 segundos**."
