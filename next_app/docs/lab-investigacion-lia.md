# Evaluación de interés legítimo (LIA) — Laboratorio de visibilidad en IA

- **Tratamiento evaluado:** incorporación automática de resultados estadísticos
  seudonimizados a la base de investigación del Laboratorio de visibilidad en IA
  de carlesdelolmo.com, como parte del diseño y de las condiciones transparentes
  de acceso al laboratorio.
- **Responsable:** Carles del Olmo (ver política de privacidad, sección 1).
- **Estado:** **BORRADOR INTERNO PENDIENTE DE REVISIÓN PROFESIONAL.** Este
  documento estructura el análisis con criterio prudente, pero no constituye
  asesoramiento jurídico ni acredita por sí mismo el cumplimiento del RGPD.
  No debe considerarse una decisión cerrada: su función es ordenar el análisis
  y, sobre todo, señalar las cuestiones que requieren validación profesional
  **antes del despliegue definitivo** (condición fijada por el responsable el
  2026-07-22).
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

**Dirección IP.** La IP no se incorpora a la base de investigación. El endpoint
`/api/lab-research` la utiliza de forma transitoria y en memoria para limitar
abusos (rate limit). Además, la infraestructura de red (Cloudflare) y el
proveedor de base de datos (Supabase) pueden tratar la IP de forma transitoria
para seguridad, entrega del servicio y prevención de abuso; este punto depende
de la configuración de dichos proveedores y **no puede verificarse íntegramente
desde el código de la aplicación**. No se conserva la IP asociada a los
registros de investigación.

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

- **Respecto de la finalidad investigadora:** el estudio requiere recopilar
  resultados; sin datos no hay estadística. La versión recogida es la mínima
  imprescindible para la finalidad (listas cerradas, sin texto libre,
  seudonimización en origen); reducciones adicionales (p. ej. prescindir del
  hash) limitarían el análisis longitudinal y la deduplicación, que son
  objetivos del estudio.

- **Existencia de una alternativa menos intrusiva (reconocida expresamente).**
  Sí existe una alternativa menos intrusiva que la recogida integrada: permitir
  el uso del laboratorio **sin recogida de datos** o hacer la participación
  **voluntaria** (opt-in/opt-out). Esa alternativa reduciría el tratamiento.
  Tiene, no obstante, limitaciones metodológicas relevantes: produciría una
  **muestra autoseleccionada** (sesgo de participación), un **menor volumen** de
  datos y una **menor capacidad de análisis longitudinal** y de deduplicación.
  La opción de diseño actual —recogida integrada con transparencia previa— se
  adopta por esas razones metodológicas, **no porque no exista alternativa**. Si
  esta configuración resulta proporcionada frente a la alternativa voluntaria es
  una de las cuestiones sometidas a revisión profesional (ver §8).

- **Sobre el informe individual:** el informe que recibe el usuario se genera
  íntegramente en su navegador; **técnicamente podría funcionar sin el envío**.
  Por eso ni el copy ni esta LIA afirman que el tratamiento sea necesario para
  prestar el servicio individual. La contribución estadística **forma parte del
  diseño y de las condiciones transparentes de acceso al laboratorio**. Iniciar
  el análisis no genera tratamiento por sí solo: hasta que no se registra el
  primer resultado no se envía nada, y la ausencia de uso equivale simplemente a
  ausencia de tratamiento previo (no es una vía de oposición jurídica; ver §5).

- **Proporcionalidad de los elementos:** cada campo recogido alimenta un eje del
  análisis (sector/territorio/consulta/motor/resultado); el hash sustituye al
  dominio con el mínimo identificador viable para recurrencia; la IP no se
  incorpora al estudio.

## 3. Ponderación frente a derechos y expectativas del usuario

**A favor del tratamiento:**
- Datos de negocio, no de la vida privada; sin categorías especiales (art. 9).
- Seudonimización en origen (el identificador directo nunca llega al servidor).
- **Impacto previsiblemente bajo, pero no inexistente:** no hay decisiones con
  efectos jurídicos sobre el interesado, ni contacto comercial derivado, ni
  publicación individual, ni evaluación pública de su empresa, ni cruce con
  otros ficheros. El impacto no es, sin embargo, inexistente (ver riesgos).
- **Transparencia previa:** la contribución se explica antes del botón de inicio
  (bloque específico + desglose «qué se comparte / qué no»), durante el uso y en
  el informe. La transparencia **reduce el riesgo de sorpresa**, pero por sí sola
  **no determina las expectativas razonables** del interesado: si el tratamiento
  entra dentro de lo razonablemente esperable es una valoración que corresponde
  a la revisión profesional y no queda resuelta solo por informar.

**En contra / riesgos identificados:**
- **Reversibilidad del hash:** el hash es reversible por diccionario para quien
  ya conozca un dominio concreto y accediera a la base (por eso NO se declara
  anonimato). Mitigación: acceso denegado por defecto (RLS sin políticas, sin
  lectura pública), publicación solo agregada, lenguaje de «seudonimización».
- **Identificación indirecta:** aunque no se almacenen identificadores directos,
  **combinaciones singulares de sector, provincia, categoría de servicio, fecha
  y resultados** podrían, en segmentos poco poblados, permitir reidentificar a
  una empresa concreta. Mitigación: umbrales de agregación, agrupación de
  segmentos pequeños y revisión antes de publicar (ver §4).
- **Condición de persona física** (autónomos): se trata todo el conjunto como
  datos personales, con derechos ejercitables (§5).
- **Riesgo de percepción** («me dijeron que nada salía del dispositivo»): el
  copy antiguo se ha sustituido en todas sus apariciones; la política de
  privacidad se ha actualizado; el aviso convive con el usuario durante el flujo.

**Resultado provisional de la ponderación:** orientativamente favorable al
tratamiento por el impacto previsiblemente bajo, la seudonimización en origen,
la transparencia previa y las garantías de la §4 — **sin cerrar la valoración**
y condicionado a la validación profesional de las cuestiones de la §8.

## 4. Garantías aplicadas para reducir el impacto

1. **Minimización estructural:** solo listas cerradas, slugs y contadores; el
   servidor **rechaza** cualquier texto libre (validación en endpoint y RPC).
2. **Seudonimización en origen:** SHA-256 del hostname calculado en el navegador;
   el dominio en claro nunca se transmite; no existe columna para el dominio
   original (no se almacenan a la vez hash y dominio).
3. **Dirección IP:** no se incorpora a la base de investigación ni se conserva
   asociada a los registros. El endpoint la usa de forma transitoria y en
   memoria para el rate limit; la infraestructura (Cloudflare, Supabase) puede
   tratarla transitoriamente para seguridad, entrega y prevención de abuso, lo
   que depende de su configuración y no se afirma más allá de lo verificable en
   el código de la aplicación (ver §0 y §4.10).
4. **Acceso:** RLS activado sin políticas (denegación total con las claves del
   navegador); escritura únicamente vía función validada; vistas estadísticas
   sin acceso público.
5. **Sin cruces:** prohibición de uso del hash para contacto o para asociarlo al
   formulario comercial; analítica GA4 sin datos de investigación.
6. **Publicación agregada con salvaguardas (concretadas provisionalmente):** en
   esta versión no se publica ninguna estadística. Cuando se publiquen, se
   aplicarán, con carácter **provisional y sujeto a revisión antes de la primera
   publicación**:
   - un **umbral mínimo por celda** — propuesta inicial: al menos **10 sesiones
     y 10 dominios distintos** por combinación publicada;
   - **agrupación o supresión** de los segmentos que no alcancen el umbral;
   - **revisión manual** de las combinaciones (p. ej. sector × provincia ×
     categoría × periodo) con riesgo de identificación antes de difundirlas.

   Estos parámetros son una primera propuesta y deben confirmarse en la revisión
   profesional; el umbral podría elevarse para segmentos especialmente sensibles.
7. **Conservación (reforzada):**
   - Datos de investigación: mientras el estudio esté activo, con **revisión
     documentada cada 24 meses** (próxima: julio 2028).
   - Registros técnicos de errores: ≤ 90 días.
   - Mecanismo `is_excluded` para depurar spam y datos inválidos sin destruir el
     histórico legítimo.
   - **Inactividad o abandono del estudio:** si el estudio queda inactivo o se
     abandona, se adoptará y documentará una de estas medidas sobre el histórico:
     (a) **supresión** de los datos; (b) **conservación justificada** por tiempo
     limitado si persiste una finalidad legítima concreta; o (c) **transformación
     en agregados irreversibles** (anonimización efectiva) que dejen de ser datos
     personales. Por defecto se tenderá a la supresión o a la anonimización
     irreversible.
8. **Transparencia por capas:** bloque previo + desplegable de datos + aviso
   durante el uso + mensaje en el informe + política de privacidad.
9. **Independencia del consentimiento de cookies:** el envío funcional no usa
   cookies ni depende de GA4.
10. **Encargados y proveedores (garantía a completar antes del despliegue):**
    para Supabase, Cloudflare y cualquier otro proveedor implicado se revisará y
    documentará: el **contrato de encargado del tratamiento (DPA)** y su encaje
    en el art. 28 RGPD, la relación de **subencargados**, la **localización** de
    los datos y del tratamiento, los **controles de acceso**, y la existencia y
    cobertura de eventuales **transferencias internacionales** (decisiones de
    adecuación o garantías del art. 46). Supabase se ha configurado en región UE;
    esta comprobación debe confirmarse formalmente.

## 5. Derecho de oposición (art. 21 RGPD) y forma de ejercerlo

- **Ausencia de tratamiento previo (no es oposición):** no iniciar el
  laboratorio, o no llegar a registrar ningún resultado, simplemente no genera
  tratamiento. Esto **no constituye un derecho de oposición ni una vía de salida
  jurídica**: es la mera ausencia de recogida y así debe entenderse.
- **Oposición conforme al art. 21 RGPD:** como el tratamiento se apoyaría en el
  interés legítimo (art. 6.1.f), el interesado tiene derecho a oponerse en
  cualquier momento por motivos relacionados con su situación particular.
  Recibida una oposición, el responsable **dejará de tratar** los datos salvo que
  acredite **motivos legítimos imperiosos** que prevalezcan sobre los intereses,
  derechos y libertades del interesado, o que el tratamiento sea necesario para
  la **formulación, el ejercicio o la defensa de reclamaciones**. Dada la
  naturaleza estadística del proyecto y el escaso interés en conservar registros
  individuales frente a una oposición, la **respuesta ordinaria prevista será la
  exclusión o la supresión** de los registros correspondientes.
- **Forma de ejercerlo:** escribiendo a hola@carlesdelolmo.com e **indicando el
  dominio analizado**; al recalcular su hash es posible localizar los registros
  para excluirlos o suprimirlos. Se responderá en el plazo de un mes
  (art. 12.3 RGPD).
- **Límite (art. 11 RGPD):** si el interesado no facilita el dominio, el
  responsable no puede identificar sus registros (no conserva ningún otro
  vínculo) y así se le informará; el interesado podrá aportar información
  adicional que permita la identificación.
- La política de privacidad recoge este canal y el resto de derechos (acceso,
  rectificación, limitación y reclamación ante la AEPD).

## 6. Análisis de bases jurídicas: interés legítimo, consentimiento y contrato

- **Consentimiento (art. 6.1.a):** es una base jurídica posible y debe
  reconocerse que **una participación voluntaria otorgaría al usuario mayor
  control** sobre sus datos (decisión previa e informada, y retirada en cualquier
  momento). Su principal inconveniente no es de protección de datos sino
  **metodológico**: produciría una muestra autoseleccionada y podría reducir la
  representatividad y el volumen del estudio. Debe subrayarse que **la integridad
  estadística no es un argumento para minimizar los derechos del interesado**;
  es únicamente un factor de diseño del estudio y no puede invocarse para
  restringir el control del usuario. Por otro lado, un consentimiento presentado
  como condición para usar la herramienta plantearía dudas sobre su carácter
  «libremente prestado» (art. 7.4 y Directrices 05/2020). La elección entre
  (i) interés legítimo con transparencia y derecho de oposición y (ii)
  participación voluntaria es, por tanto, una cuestión **abierta** que se somete
  a revisión profesional (ver §8).
- **Ejecución de contrato (art. 6.1.b):** no existe contrato con el usuario y el
  tratamiento **no es objetivamente necesario** para prestarle el servicio
  individual (el informe se genera en local); apoyarse en esta base sería
  artificial según el criterio restrictivo de las Directrices 2/2019.
- Se descartan igualmente obligación legal, interés vital y misión pública por
  no concurrir sus presupuestos.

## 7. Comprobación preliminar sobre la evaluación de impacto (EIPD)

Análisis preliminar frente al art. 35 RGPD y los criterios de las Directrices
WP248 y de la AEPD. Con el **alcance actual**:

- No hay tratamiento a gran escala de categorías especiales ni de datos de
  condenas o infracciones.
- No hay observación sistemática a gran escala de una zona de acceso público.
- No hay decisiones automatizadas con efectos jurídicos o similares, ni
  elaboración de perfiles.
- Los datos son de negocio, seudonimizados, sin cruce con otros ficheros y sin
  publicación individual.

**Conclusión preliminar:** con el alcance actual, la EIPD **no parece
obligatoria**, si bien concurren algunos factores de atención (uso de un
identificador persistente seudonimizado y finalidad de estudio). La conclusión
es **provisional** y debe **reevaluarse** si: crece la escala, se cruzan estos
datos con otras fuentes, se elaboran perfiles, se publican resultados
individualizados, se reduce el umbral de agregación previsto, o cambian las
finalidades. La decisión final corresponde a la revisión profesional.

## 8. Conclusión provisional y cuestiones pendientes

Con carácter **provisional e interno**, el tratamiento podría ampararse en el
interés legítimo del responsable (art. 6.1.f RGPD), atendiendo a la finalidad
(§1), a la necesidad respecto del estudio (§2) y a una ponderación
orientativamente favorable (§3) **siempre que** se mantengan las garantías de la
§4 y el derecho de oposición de la §5. Esta conclusión **no está cerrada** y no
puede considerarse validada por el mero hecho de haberse implementado las
medidas descritas.

**Principal cuestión pendiente de validación profesional:** la
**obligatoriedad de la aportación** (recogida integrada, no voluntaria) **cuando
el informe individual puede generarse sin ella**. Es el punto de mayor tensión
de la ponderación: dado que el tratamiento no es necesario para el servicio
individual, debe confirmarse profesionalmente si la vía adecuada es el interés
legítimo con oposición o una participación voluntaria (consentimiento/opt-in), y
si condicionar el uso de la herramienta a la contribución resulta proporcionado.

**Otras cuestiones a validar antes del despliegue definitivo:**
1. Proporcionalidad frente a la alternativa voluntaria (§2).
2. Umbrales concretos de publicación agregada y su revisión (§4.6).
3. Política de conservación y escenario de abandono (§4.7).
4. Revisión de DPA, subencargados, localización y transferencias de los
   proveedores (§4.10).
5. Necesidad o no de EIPD si crece el alcance (§7).
6. Mantener siempre «datos seudonimizados / identificador irreversible»; no
   declarar nunca «datos anónimos».
7. Revisar esta LIA ante cualquier cambio de finalidad, campos recogidos,
   proveedor o publicación de estadísticas.

## 9. Registro de revisiones

| Fecha | Autor | Cambio |
|---|---|---|
| 2026-07-22 | Redacción inicial (asistida, pendiente de revisión profesional) | Versión 1 — borrador |
| 2026-07-22 | Revisión de prudencia (asistida, pendiente de revisión profesional) | Versión 2 — borrador: retira el argumento de «contraprestación»; reconoce la alternativa voluntaria y sus límites metodológicos; separa «no usar la herramienta» del derecho de oposición; desarrolla el art. 21; matiza expectativas e impacto (bajo, no inexistente) e identificación indirecta; concreta umbrales de agregación; refuerza conservación y abandono; matiza IP e infraestructura; añade garantía de encargados/DPA; añade comprobación preliminar de EIPD; suaviza el análisis del consentimiento; fija como cuestión principal la obligatoriedad de la aportación |
