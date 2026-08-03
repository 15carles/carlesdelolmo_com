# Archivo

Documentos obsoletos que se conservan como registro histórico. **Ninguno describe el estado actual del proyecto.** No los uses como referencia sin verificar antes contra el código.

## `redesign-phase-4b-local-qa.md`

QA visual y de build de la fase 4B del rediseño. Archivado el 2026-08-03. Motivos:

- Estaba en la raíz del repositorio con estado `fail`, dando la impresión de ser el estado actual del proyecto.
- Referencia el commit `348d2b3`, que no existe en el historial de este repositorio, y rutas locales de otra máquina.
- Las secciones de lint, build, revisión visual y smoke checks quedaron sin ejecutar.

Lo único que sigue siendo cierto de ese documento es el blocker de dependencias: `@cloudflare/next-on-pages@1.13.16` declara el peer `next >=14.3.0 && <=15.5.2` y el proyecto usa `next@16.1.6`, por lo que `npm ci` sin `--legacy-peer-deps` falla con `ERESOLVE`. Esa conclusión está recogida en `CLAUDE.md` y en el `README.md`, que es donde debe consultarse.
