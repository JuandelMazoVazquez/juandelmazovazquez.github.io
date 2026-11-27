# 2026-11-27 · Segunda vuelta de la marca personal

**Hecho.** Identidad visual nueva en `brand/` (monograma JdM en trazados, motivo de rejilla con ruta hasta una decisión, Open Graph EN y ES, banners de LinkedIn y X, cabecera del README clara y oscura, favicons). La portada usa el motivo en lugar del gráfico lead-lag y `og.png` se ha borrado. Textos nuevos en `src/content.mjs`: lema "Analyst by profession, engineer by training", Bankinter primero, "Sobre mí" en tres bloques con una sola tipografía de cuerpo, sección "En marcha", grupo IA y cifras con "+" sacadas de los repos. El español está redactado aparte. CV en A4 a 10 pt, de una página en los dos idiomas. README del perfil en un PR aparte del repo `JuandelMazoVazquez`.

**Decisiones tomadas.** Dirección visual "cuaderno de ingeniero" (alternativas: plano técnico, bloques), frase de valor 1 de 3, título "Currently cooking / Ahora mismo en el horno" sin emoji y ax-radar fuera por llevar un mes parado. El detalle está en `DECISIONS.md` del hilo.

**Subagentes.** Un probador-web midió 375 y 1280 px, claro y oscuro, EN y ES: sin fallos y contraste mínimo de 6,31:1. Un revisor independiente leyó el español y la coherencia entre soportes; apliqué sus correcciones de hechos y de estilo y descarté las que contradecían el encargo.

**Bandeja.** No hay entradas nuevas: la fusión queda pedida en el informe final.

**Pendiente.** Fusionar este PR y el #1 del perfil (el control de permisos bloqueó la fusión) y desplegar en Vercel, que no tiene sesión ni conexión con Git.

**Cómo probarlo.** `node build.mjs` y `python -m http.server -d dist 4321`. Para la marca, `node brand/build-brand.mjs` y luego `NODE_PATH=<node_modules con playwright> node brand/export.cjs`.
