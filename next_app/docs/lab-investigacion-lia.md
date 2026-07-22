# Evaluación de interés legítimo (LIA) — Laboratorio de visibilidad en IA

- **Tratamiento evaluado:** incorporación automática de resultados estadísticos
  seudonimizados a la base de investigación del Laboratorio de visibilidad en IA
  de carlesdelolmo.com, como parte del funcionamiento de la herramienta gratuita.
- **Responsable:** Carles del Olmo (ver política de privacidad, sección 1).
- **Estado:** **BORRADOR INTERNO PENDIENTE DE REVISIÓN PROFESIONAL.** Este
  documento estructura el análisis con criterio prudente, pero no constituye
  asesoramiento jurídico ni acredita por sí mismo el cumplimiento del RGPD.
  Debe ser revisado por un profesional de protección de datos **antes del
  despliegue definitivo** de la funcionalidad (condición fijada por el
  responsable el 2026-07-22).
- **Documentos relacionados:** `lab-investigacion-phase0-plan.md` (diseño),
  política de privacidad (sección «Laboratorio de visibilidad en IA»).

---

## 0. Descripción del tratamiento

Al utilizar el laboratorio, y únicamente a partir del primer resultado que el
usuario registra, se envían a una base de datos (Supabase, región UE):

- Sector, categoría de servicio y provincia/ámbito, elegidos de listas cerradas.
- Tipo de consulta y motor de IA analizado.
- Valoraciones normalizadas de cada prueba (aparece / recomendada / citada /
  exactitud / presencia y número de competidores; nunca cuáles).
- Fechas, estado del análisis, contadores y versión metodológica.
- Un identificador técnico de sesión (UUID aleatorio) y un **hash SHA-256
  irreversible del dominio** normalizado, calculado en el navegador.

No se envían: nombre de empresa, dominio en claro, nombres de competidores,
consultas completas, respuestas de las IA, notas, diagnóstico del informe,
datos de contacto ni dirección IP como dato de investigación. No existe texto
libre en el envío: todos los valores pertenecen a listas cerradas.

**Naturaleza personal de los datos.** Aunque los datos describen empresas, el
hash del dominio puede referirse al sitio de un empresario individual o
profesional autónomo (persona física identificable con esfuerzo razonable por
quien disponga del dominio). Por prudencia, todo el conjunto se trata como
**datos personales seudonimizados**, no como datos anónimos, y así se comunica.

Capas separadas del mismo producto (no deben confundirse):
1. **Datos privados** del análisis → solo en el navegador (localStorage).
2. **Datos de investigación** → este tratamiento (Supabase, sin cookies).
3. **Formulario de contacto** → tratamiento independiente ya descrito en la
   política (base: consentimiento/medidas precontractuales). Sin cruce con (2).
4. **Analítica GA4** → condicionada al consentimiento de cookies; no recibe
   ningún dato de investigación (ni hash, ni sector, ni provincia, ni
   categoría, ni resultados detallados, ni identificador de sesión remota).

## 1. Interés legítimo perseguido (prueba de la finalidad)

Interés del responsable, real y concreto:

- **Investigación y estadística aplicada:** construir una base empírica sobre
  cómo los motores generativos (ChatGPT, Gemini, Perplexity) mencionan,
  recomiendan y citan a las empresas españolas, por sector, territorio, tipo de
  consulta y motor — un fenómeno reciente del que apenas existen datos abiertos.
- **Mejora de la metodología** del propio laboratorio (calibrar consultas,
  detectar tasas de pruebas no evaluables, versionar el protocolo).
- **Divulgación futura en forma exclusivamente agregada** (informes de
  tendencias), que beneficia también a terceros (empresas, comunidad SEO/GEO).

Es un interés lícito (nada lo prohíbe), determinado (definido en el plan de
fase 0) y no especulativo (la herramienta ya existe y el estudio está diseñado).

## 2. Necesidad del tratamiento (prueba de necesidad)

- **Respecto de la finalidad investigadora:** el estudio es imposible sin
  recopilar resultados. No existe alternativa menos intrusiva que ofrezca el
  mismo resultado: sin datos no hay estadística. La versión recopilada es la
  mínima imprescindible (listas cerradas, sin texto libre, seudonimización en
  origen); cualquier reducción adicional (p. ej. sin hash) impediría el análisis
  longitudinal y la deduplicación, objetivos nucleares del estudio.
- **Honestidad sobre el informe individual:** el informe que recibe el usuario
  se genera íntegramente en su navegador; **técnicamente podría funcionar sin
  el envío**. Por eso ni el copy ni esta LIA afirman que el tratamiento sea
  necesario para prestar el servicio individual. La contribución estadística es
  la **contraprestación del uso gratuito**, una decisión de diseño del servicio
  comunicada de forma clara y previa: quien no desee contribuir puede
  simplemente no utilizar el laboratorio (el resto del sitio no queda
  condicionado). Esta configuración se somete expresamente a la revisión
  profesional prevista.
- **Proporcionalidad de los elementos:** cada campo recogido alimenta un eje
  del análisis (sector/territorio/consulta/motor/resultado); el hash sustituye
  al dominio con el mínimo identificador viable para recurrencia; la IP no se
  incorpora al estudio.

## 3. Ponderación frente a derechos y expectativas del usuario

**A favor del tratamiento:**
- Datos de negocio, no de la vida privada; sin categorías especiales (art. 9).
- Seudonimización en origen (el identificador directo nunca llega al servidor).
- Impacto práctico sobre el interesado: nulo o muy bajo. No hay decisiones con
  efectos sobre él, ni contacto comercial derivado, ni publicación individual,
  ni evaluación pública de su empresa, ni combinación con otros ficheros.
- **Expectativas alineadas por diseño:** la contribución se explica antes del
  botón de inicio (bloque específico + desglose «qué se comparte / qué no»),
  durante el uso y en el informe. Ningún usuario razonable puede verse
  sorprendido: la recogida empieza solo tras leer esa pantalla y registrar
  manualmente su primer resultado.

**En contra / riesgos identificados:**
- El hash es reversible por diccionario para quien ya conozca un dominio
  concreto y accediera a la base (por eso NO se declara anonimato).
  Mitigación: acceso denegado por defecto (RLS sin políticas, sin lectura
  pública), publicación solo agregada, lenguaje de «seudonimización».
- Posible condición de persona física (autónomos): se trata todo el conjunto
  como datos personales, con derechos ejercitables (sección 5).
- Riesgo de percepción («me dijeron que nada salía del dispositivo»): el copy
  antiguo se ha sustituido en todas sus apariciones; la política de privacidad
  se ha actualizado; el aviso convive con el usuario durante todo el flujo.

**Resultado provisional de la ponderación:** favorable al tratamiento, dado el
bajo impacto, la seudonimización en origen, la transparencia previa reforzada y
las garantías de la sección 4 — **condicionado a la validación profesional**.

## 4. Garantías aplicadas para reducir el impacto

1. Minimización estructural: solo listas cerradas, slugs y contadores; el
   servidor **rechaza** cualquier texto libre (validación en endpoint y RPC).
2. Seudonimización en origen: SHA-256 del hostname calculado en el navegador;
   el dominio en claro nunca se transmite; prohibido almacenar hash y dominio
   a la vez (no existe columna para el dominio).
3. Sin IP en investigación: la IP solo se usa en memoria para limitar abusos.
4. Acceso: RLS activado sin políticas (denegación total con las claves del
   navegador); escritura únicamente vía función validada; vistas estadísticas
   sin acceso público.
5. Sin cruces: prohibición de uso del hash para contacto o para asociarlo al
   formulario comercial; analítica GA4 sin datos de investigación.
6. Publicación solo agregada y con muestra mínima razonable (sin contadores
   públicos en esta versión).
7. Conservación definida (D9): datos de investigación mientras el estudio siga
   activo, con **revisión documentada cada 24 meses** (próxima: julio 2028);
   registros técnicos de errores ≤ 90 días; mecanismo `is_excluded` para
   depurar spam y datos inválidos sin destruir el histórico legítimo.
8. Transparencia por capas: bloque previo + desplegable de datos + aviso
   durante el uso + mensaje en el informe + política de privacidad.
9. Independencia del consentimiento de cookies: el envío funcional no usa
   cookies ni depende de GA4.

## 5. Derecho de oposición y forma de ejercerlo

- **Antes de empezar:** la contribución se describe antes del botón de inicio;
  no iniciar el laboratorio impide cualquier envío (no se registra nada por
  visitar la página).
- **Después de contribuir:** el interesado puede oponerse al tratamiento o
  solicitar la supresión escribiendo a hola@carlesdelolmo.com e **indicando el
  dominio analizado**: al recalcular su hash es posible localizar y eliminar o
  excluir sus registros. Se responderá en el plazo de un mes (art. 12.3 RGPD).
- **Límite honesto (art. 11 RGPD):** si el interesado no facilita el dominio,
  el responsable no puede identificar sus registros (no conserva ningún otro
  vínculo); se le informará de esta circunstancia.
- La política de privacidad recoge este canal y el resto de derechos (acceso,
  rectificación, limitación, reclamación ante la AEPD).

## 6. Por qué interés legítimo y no consentimiento ni ejecución contractual

- **Frente al consentimiento (art. 6.1.a):** una casilla marcada como condición
  de uso no sería un consentimiento «libremente prestado» (condicionalidad,
  art. 7.4 y Directrices 05/2020): sería un consentimiento de peor calidad
  jurídica que la alternativa elegida. El interés legítimo con transparencia
  previa reforzada + derecho de oposición efectivo describe la realidad del
  servicio con más honestidad: la contribución es parte del funcionamiento, el
  usuario lo sabe antes de empezar y conserva una vía de salida real (no usar
  la herramienta; oponerse después). Además, un consentimiento retirable
  registro a registro comprometería la integridad estadística del estudio sin
  aportar mayor protección material, dado el bajo impacto y la seudonimización.
- **Frente a la ejecución de contrato (art. 6.1.b):** no existe contrato con el
  usuario y el tratamiento **no es objetivamente necesario** para prestarle el
  servicio individual (el informe se genera en local); apoyarse en esta base
  sería artificial según el criterio restrictivo de las Directrices 2/2019.
- Se descartan igualmente obligación legal, interés vital y misión pública por
  no concurrir sus presupuestos.

## 7. Conclusión provisional y condiciones

El tratamiento puede ampararse **provisionalmente** en el interés legítimo del
responsable (art. 6.1.f RGPD), al superar las tres pruebas (finalidad,
necesidad respecto del estudio, ponderación favorable con garantías), siempre
que se mantengan las garantías de la sección 4 y el canal de oposición de la
sección 5.

**Condiciones expresas:**
1. Revisión por un profesional de protección de datos antes del despliegue
   definitivo (o, si se despliega, revisión a la mayor brevedad y ajuste de lo
   que indique). Los puntos que más atención requieren: la configuración
   «contribución como contraprestación del uso gratuito», el análisis art. 11 y
   la redacción de la política.
2. No declarar nunca «datos anónimos»; mantener «seudonimizados /
   identificador irreversible».
3. Revisar esta LIA si cambia la finalidad, los campos recogidos, el proveedor
   o si se publican estadísticas (comprobar umbral de agregación).

## 8. Registro de revisiones

| Fecha | Autor | Cambio |
|---|---|---|
| 2026-07-22 | Redacción inicial (asistida, pendiente de revisión profesional) | Versión 1 — borrador |
