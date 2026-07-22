import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | Carles del Olmo',
  description: 'Información sobre el tratamiento de datos personales en carlesdelolmo.com: responsable, finalidades, base jurídica, conservación, derechos del usuario y proveedores utilizados.'
};

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      lastUpdate="22 de julio de 2026"
      metadataText="En esta página se explica qué datos personales se recogen en este sitio web, con qué finalidad se tratan, cuál es la base jurídica aplicable y qué derechos puedes ejercer como usuario."
    >
      <section aria-labelledby="responsable-del-tratamiento">
        <h2 id="responsable-del-tratamiento">1. Responsable del tratamiento</h2>
        <p><strong>Responsable:</strong> Carles del Olmo</p>
        <p><strong>Actividad:</strong> Servicios profesionales de diseño y desarrollo web, SEO y Generative Engine Optimization (GEO), automatizaciones.</p>
        <p><strong>Ubicación:</strong> Benetússer (Valencia), España.</p>
        <p><strong>Email de contacto:</strong> <a href="mailto:hola@carlesdelolmo.com">hola@carlesdelolmo.com</a></p>
        <p>No existe Delegado de Protección de Datos (DPO), al no ser obligatorio por la naturaleza de la actividad.</p>
      </section>

      <section aria-labelledby="datos-personales-que-se-recogen">
        <h2 id="datos-personales-que-se-recogen">2. Datos personales que se recogen</h2>
        
        <section aria-labelledby="formulario-contacto">
          <h3 id="formulario-contacto">2.1 Formulario de contacto / solicitud de presupuesto</h3>
          <p>A través del formulario del sitio web se pueden recabar los siguientes datos:</p>
          <ul>
            <li>Nombre</li>
            <li>Email</li>
            <li>Teléfono</li>
            <li>Servicios de interés (selección mediante checkboxes)</li>
            <li>Información sobre identidad visual</li>
            <li>Información adicional solicitada mediante opciones del formulario</li>
            <li>Fecha límite deseada</li>
            <li>Información sobre cómo el usuario ha llegado al sitio web</li>
          </ul>
          <p>El formulario no solicita datos sensibles. Si el usuario los incluyera voluntariamente en algún mensaje, se tratarán únicamente para gestionar su solicitud.</p>
        </section>

        <section aria-labelledby="newsletter">
          <h3 id="newsletter">2.2 Newsletter (cuando esté activa)</h3>
          <p>Cuando se habilite el sistema de suscripción, se podrán recabar:</p>
          <ul>
            <li>Dirección de correo electrónico</li>
            <li>Nombre (si el formulario lo solicita)</li>
          </ul>
          <p>La suscripción será independiente del formulario de contacto.</p>
        </section>

        <section aria-labelledby="datos-recogidos-automaticamente">
          <h3 id="datos-recogidos-automaticamente">2.3 Datos recogidos automáticamente</h3>
          <p>Cuando el usuario acepte el uso de cookies analíticas mediante el banner correspondiente, se podrán tratar datos de navegación a través de Google Analytics 4, tales como:</p>
          <ul>
            <li>Identificadores online</li>
            <li>Eventos de navegación</li>
            <li>Páginas visitadas</li>
            <li>Tiempo de permanencia</li>
            <li>Información técnica del dispositivo y navegador</li>
          </ul>
        </section>
      </section>

      <section aria-labelledby="laboratorio-visibilidad-ia">
        <h2 id="laboratorio-visibilidad-ia">3. Laboratorio de visibilidad en IA (base de investigación)</h2>
        <p>El <strong>Laboratorio de visibilidad en IA</strong> es una herramienta gratuita de este sitio web que forma parte de un estudio independiente sobre cómo aparecen las empresas en motores de IA (ChatGPT, Gemini y Perplexity). Al utilizarla, los resultados estadísticos del análisis se incorporan automáticamente a la base de investigación del estudio. Este funcionamiento se explica de forma visible antes de comenzar y constituye la contraprestación por el uso gratuito de la herramienta: quien no desee contribuir puede optar por no utilizarla. El informe individual que muestra la herramienta se genera en el propio navegador del usuario.</p>
        <p>El responsable del tratamiento es el indicado en la sección 1.</p>

        <section aria-labelledby="lab-datos-recogidos">
          <h3 id="lab-datos-recogidos">3.1 Datos que se incorporan al estudio</h3>
          <p>La recogida comienza únicamente cuando el usuario guarda su primer resultado (visitar la página o pulsar «Empezar» no genera ningún registro). Se incorporan:</p>
          <ul>
            <li>Sector, categoría de servicio y provincia o ámbito geográfico, elegidos de listas cerradas</li>
            <li>Tipo de consulta realizada y motor de IA analizado</li>
            <li>Valoraciones normalizadas de cada prueba: si la empresa aparece, si es recomendada, si su web aparece como fuente, si la información es correcta y si aparecen competidores (únicamente cuántos, nunca cuáles)</li>
            <li>Fechas de inicio y finalización, estado del análisis, contadores de pruebas y versión metodológica</li>
            <li>Un identificador técnico de sesión generado aleatoriamente</li>
            <li>Un identificador irreversible del dominio (hash; ver apartado 3.3)</li>
          </ul>
          <p>El sistema no admite texto libre en este envío: todos los valores pertenecen a listas cerradas y los envíos que no las cumplen se rechazan.</p>
        </section>

        <section aria-labelledby="lab-datos-no-recogidos">
          <h3 id="lab-datos-no-recogidos">3.2 Datos que no se incorporan</h3>
          <ul>
            <li>Nombre de la empresa</li>
            <li>Dominio en texto plano</li>
            <li>Nombres de los competidores</li>
            <li>Consultas completas</li>
            <li>Respuestas de los motores de IA</li>
            <li>Notas privadas y menciones a otras empresas escritas por el usuario</li>
            <li>Diagnóstico y prioridades del informe</li>
            <li>Datos del formulario de contacto</li>
            <li>Dirección IP como dato de investigación (solo se usa de forma efímera para limitar abusos)</li>
          </ul>
          <p>Los datos privados del análisis permanecen únicamente en el navegador del usuario (almacenamiento local) y pueden borrarse desde la propia herramienta.</p>
        </section>

        <section aria-labelledby="lab-hash-dominio">
          <h3 id="lab-hash-dominio">3.3 Identificador irreversible del dominio</h3>
          <p>Antes de cualquier envío, el dominio introducido se normaliza (minúsculas, sin protocolo, sin «www.», sin rutas ni parámetros) y se transforma en el propio navegador mediante la función criptográfica SHA-256. A la base de investigación solo llega el resultado (hash): el dominio original nunca se transmite ni se almacena, y no es posible reconstruirlo a partir de la base.</p>
          <p>El hash se utiliza exclusivamente para detectar análisis repetidos de una misma web, calcular recurrencia, comparar la evolución temporal y evitar duplicados. No se utiliza para contactar con el usuario ni se cruza con los datos del formulario de contacto.</p>
          <p>Estos registros deben considerarse <strong>datos estadísticos seudonimizados</strong>, no anónimos: quien conociera un dominio concreto y tuviera acceso a la base podría comprobar si su hash está presente. Por ese motivo se aplican las medidas de la sección de seguridad y no existe acceso público a registros individuales.</p>
        </section>

        <section aria-labelledby="lab-base-juridica">
          <h3 id="lab-base-juridica">3.4 Base jurídica prevista</h3>
          <p>La base jurídica prevista para este tratamiento es el <strong>interés legítimo</strong> del responsable (artículo 6.1.f del RGPD) en la investigación estadística sobre visibilidad empresarial en motores de IA y en la mejora de la metodología del laboratorio, sobre datos minimizados y seudonimizados, con información previa visible y derecho de oposición (apartado 3.7).</p>
          <p>Existe una evaluación interna de interés legítimo documentada que pondera la finalidad, la necesidad y el impacto sobre los derechos de los usuarios. Esta configuración jurídica está señalada para revisión por un profesional de protección de datos; se ha redactado con criterio prudente y no se presenta como un cumplimiento cerrado por el mero hecho de estar implementadas las medidas descritas.</p>
        </section>

        <section aria-labelledby="lab-conservacion">
          <h3 id="lab-conservacion">3.5 Conservación</h3>
          <ul>
            <li>Datos de investigación: se conservan mientras el estudio siga activo, por su valor longitudinal, con una revisión documentada de su necesidad al menos cada 24 meses (próxima revisión: julio de 2028). Las sesiones inválidas o de spam se excluyen o eliminan.</li>
            <li>Registros técnicos de errores del envío: máximo 90 días.</li>
            <li>Datos locales del navegador: hasta que el usuario los borre desde la herramienta o desde su navegador.</li>
          </ul>
        </section>

        <section aria-labelledby="lab-infraestructura">
          <h3 id="lab-infraestructura">3.6 Infraestructura y destinatarios</h3>
          <p>La base de investigación se aloja en Supabase (infraestructura en la Unión Europea), que actúa como encargado del tratamiento. Los registros individuales no se ceden a terceros. Los resultados que se publiquen en el futuro serán únicamente agregados (por sectores, territorios, tipos de consulta o motores) y solo cuando exista una muestra mínima razonable; nunca se publicarán ni evaluarán empresas de forma individual.</p>
        </section>

        <section aria-labelledby="lab-derechos">
          <h3 id="lab-derechos">3.7 Derechos sobre los datos del estudio</h3>
          <p>Quien haya utilizado el laboratorio puede oponerse al tratamiento o solicitar la supresión de sus registros escribiendo a <a href="mailto:hola@carlesdelolmo.com">hola@carlesdelolmo.com</a> e indicando el dominio analizado: recalculando su hash es posible localizar y eliminar o excluir los registros correspondientes. Si no se facilita el dominio, el responsable no dispone de ningún otro dato que permita identificar los registros, circunstancia de la que se informará conforme al artículo 11 del RGPD. El resto de derechos se ejercen según la sección de derechos del usuario.</p>
          <p>Borrar el análisis guardado en el dispositivo no elimina los resultados estadísticos ya incorporados al estudio, que se conservan de acuerdo con este apartado; la propia herramienta lo advierte antes de confirmar el borrado.</p>
        </section>

        <section aria-labelledby="lab-separacion">
          <h3 id="lab-separacion">3.8 Separación de otros tratamientos</h3>
          <p>Este tratamiento es independiente del formulario de contacto (no se cruzan datos ni se utiliza para seguimiento comercial), no se emplea para elaborar perfiles comerciales individuales y no utiliza cookies: el envío funcional no depende del consentimiento de cookies analíticas ni comparte datos con Google Analytics.</p>
        </section>
      </section>

      <section aria-labelledby="finalidad-del-tratamiento">
        <h2 id="finalidad-del-tratamiento">4. Finalidad del tratamiento</h2>
        <p>Los datos personales se tratarán para:</p>
        <ul>
          <li>Responder consultas recibidas desde el formulario</li>
          <li>Preparar y enviar presupuestos o propuestas</li>
          <li>Gestionar relaciones precontractuales y contractuales con clientes</li>
          <li>Cumplir obligaciones fiscales y contables cuando exista relación comercial</li>
          <li>Realizar seguimiento comercial razonable tras una solicitud</li>
          <li>Enviar comunicaciones comerciales cuando el usuario lo consienta</li>
          <li>Mejorar el sitio web mediante análisis estadístico</li>
          <li>Automatizar la gestión operativa de solicitudes</li>
          <li>Elaborar estudios estadísticos agregados sobre visibilidad empresarial en motores de IA (ver sección 3)</li>
        </ul>
      </section>

      <section aria-labelledby="base-juridica-del-tratamiento">
        <h2 id="base-juridica-del-tratamiento">5. Base jurídica del tratamiento</h2>
        <p>El tratamiento de datos se basa en:</p>
        <ul>
          <li>Consentimiento del usuario (formularios, newsletter y cookies analíticas)</li>
          <li>Ejecución de contrato o aplicación de medidas precontractuales</li>
          <li>Cumplimiento de obligaciones legales</li>
          <li>Interés legítimo del responsable para el seguimiento comercial razonable y la mejora del servicio, siempre que no prevalezcan los derechos del usuario</li>
          <li>Interés legítimo del responsable para la base de investigación del Laboratorio de visibilidad en IA, en los términos y con las garantías de la sección 3</li>
        </ul>
      </section>

      <section aria-labelledby="conservacion-de-los-datos">
        <h2 id="conservacion-de-los-datos">6. Conservación de los datos</h2>
        <p>Los datos personales se conservarán durante los siguientes plazos:</p>
        <ul>
          <li>Consultas sin contratación: hasta 12 meses desde el último contacto</li>
          <li>Clientes: hasta 6 años por obligaciones fiscales o contables</li>
          <li>Suscriptores de newsletter: hasta que el usuario solicite la baja o retire el consentimiento</li>
          <li>Datos analíticos: según la configuración de retención de Google Analytics</li>
          <li>Datos de investigación del laboratorio: según lo indicado en la sección 3.5</li>
        </ul>
      </section>

      <section aria-labelledby="destinatarios-y-proveedores">
        <h2 id="destinatarios-y-proveedores">7. Destinatarios y proveedores de servicio</h2>
        <p>Para el funcionamiento del sitio web pueden intervenir proveedores tecnológicos que actúan como encargados del tratamiento o como responsables independientes de sus servicios:</p>
        <ul>
          <li>Cloudflare: infraestructura, rendimiento y seguridad del sitio web</li>
          <li>Google Analytics 4 (Google): medición y analítica del sitio web</li>
          <li>Supabase (región UE): almacenamiento de datos del formulario y de la base de investigación del Laboratorio de visibilidad en IA</li>
          <li>n8n autohospedado: automatización de flujos de gestión</li>
          <li>Proveedor de correo electrónico utilizado para comunicaciones</li>
          <li>DonDominio: registro y gestión del dominio</li>
        </ul>
        <p>Cuando se utilice una herramienta de facturación se incorporará como proveedor en esta política.</p>
      </section>

      <section aria-labelledby="automatizacion-de-procesos">
        <h2 id="automatizacion-de-procesos">8. Automatización de procesos</h2>
        <p>El sistema de gestión de solicitudes podrá funcionar del siguiente modo:</p>
        <ol>
          <li>El usuario envía el formulario.</li>
          <li>Los datos se almacenan en una base de datos Supabase ubicada en la Unión Europea.</li>
          <li>Un flujo automatizado mediante n8n detecta el nuevo registro.</li>
          <li>Se genera un correo interno con la información necesaria para gestionar la solicitud.</li>
          <li>Se envía un correo automático al usuario confirmando la recepción.</li>
          <li>Se registra la fecha y hora de gestión en la base de datos.</li>
        </ol>
        <p>Por defecto no se registra la dirección IP ni el user-agent del envío del formulario, salvo que sea necesario por motivos de seguridad o prevención de abusos.</p>
      </section>

      <section aria-labelledby="decisiones-automatizadas-y-perfilado">
        <h2 id="decisiones-automatizadas-y-perfilado">9. Decisiones automatizadas y perfilado</h2>
        <p>Actualmente no se aplican decisiones automatizadas con efectos jurídicos. Los datos de la base de investigación del laboratorio no se utilizan para elaborar perfiles comerciales individuales.</p>
        <p>En el futuro podrán implementarse sistemas de:</p>
        <ul>
          <li>Scoring automático de leads</li>
          <li>Automatización de priorización comercial</li>
          <li>Decisiones automatizadas en procesos internos</li>
        </ul>
        <p>Si estas decisiones produjeran efectos jurídicos o afectaran significativamente al usuario, se garantizarán los derechos previstos en el artículo 22 del RGPD, incluyendo la posibilidad de solicitar intervención humana, expresar el punto de vista del interesado e impugnar la decisión.</p>
      </section>

      <section aria-labelledby="transferencias-internacionales">
        <h2 id="transferencias-internacionales">10. Transferencias internacionales</h2>
        <p>Algunos proveedores tecnológicos pueden implicar tratamiento de datos fuera del Espacio Económico Europeo.</p>
        <p>En estos casos, las transferencias se realizarán conforme a mecanismos legalmente válidos como:</p>
        <ul>
          <li>Decisiones de adecuación de la Comisión Europea</li>
          <li>Marco EU-US Data Privacy Framework cuando resulte aplicable</li>
          <li>Cláusulas Contractuales Tipo aprobadas por la Comisión Europea</li>
        </ul>
      </section>

      <section aria-labelledby="derechos-del-usuario">
        <h2 id="derechos-del-usuario">11. Derechos del usuario</h2>
        <p>El usuario puede ejercer los siguientes derechos:</p>
        <ul>
          <li>Acceso</li>
          <li>Rectificación</li>
          <li>Supresión</li>
          <li>Limitación del tratamiento</li>
          <li>Oposición</li>
          <li>Portabilidad</li>
          <li>Retirada del consentimiento en cualquier momento</li>
        </ul>
        <p>Para ejercer estos derechos puede enviar una solicitud a:</p>
        <p><a href="mailto:hola@carlesdelolmo.com">hola@carlesdelolmo.com</a></p>
        <p>Asimismo, el usuario tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos.</p>
      </section>

      <section aria-labelledby="cookies">
        <h2 id="cookies">12. Cookies</h2>
        <p>Este sitio web utiliza cookies técnicas necesarias para su funcionamiento y, cuando el usuario lo acepta, cookies analíticas de Google Analytics.</p>
        <p>El envío de datos de investigación del Laboratorio de visibilidad en IA (sección 3) no utiliza cookies ni depende del consentimiento de cookies analíticas.</p>
        <p>Las cookies analíticas solo se activarán tras el consentimiento del usuario mediante el banner de configuración de cookies.</p>
        <p>La información detallada se incluye en la <Link href="/politica-cookies">Política de Cookies</Link> del sitio web.</p>
      </section>

      <section aria-labelledby="menores-de-edad">
        <h2 id="menores-de-edad">13. Menores de edad</h2>
        <p>Este sitio web no está dirigido a menores de 14 años y no recoge deliberadamente datos personales de menores.</p>
      </section>

      <section aria-labelledby="seguridad">
        <h2 id="seguridad">14. Seguridad</h2>
        <p>Se aplican medidas técnicas y organizativas apropiadas para proteger los datos personales, incluyendo:</p>
        <ul>
          <li>Uso de conexiones seguras HTTPS</li>
          <li>Protección de infraestructura mediante Cloudflare</li>
          <li>Control de accesos a bases de datos</li>
          <li>Denegación por defecto del acceso a los registros individuales de la base de investigación (sin lectura pública)</li>
          <li>Seudonimización del dominio en el propio navegador antes de cualquier envío al estudio</li>
          <li>Gestión segura de herramientas de automatización</li>
        </ul>
      </section>

      <section aria-labelledby="cambios-politica-privacidad">
        <h2 id="cambios-politica-privacidad">15. Cambios en la política de privacidad</h2>
        <p>Esta Política de Privacidad puede actualizarse cuando sea necesario para reflejar cambios técnicos, legales o en el funcionamiento del servicio.</p>
        <p>La fecha de última actualización indicará la versión vigente.</p>
      </section>
    </LegalLayout>
  );
}
