import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Términos y Condiciones | Carles del Olmo',
  description: 'Términos y condiciones de uso de carlesdelolmo.com. Información sobre el uso del sitio web, propiedad intelectual, responsabilidad, enlaces externos, formularios y legislación aplicable.'
};

export default function TerminosCondiciones() {
  return (
    <LegalLayout
      title="Términos y Condiciones de Uso"
      lastUpdate="8 de marzo de 2026"
      metadataText="En esta página se regulan las condiciones de acceso y uso de este sitio web, así como los derechos y obligaciones del usuario y del titular."
    >
      <section aria-labelledby="identificacion-del-titular">
        <h2 id="identificacion-del-titular">1. Identificación del titular del sitio web</h2>
        <p><strong>Titular del sitio web:</strong> Carles del Olmo</p>
        <p><strong>Actividad:</strong> Servicios profesionales de diseño y desarrollo web, posicionamiento SEO, Generative Engine Optimization (GEO) y automatización de procesos digitales.</p>
        <p><strong>Ubicación:</strong> Benetússer (Valencia), España</p>
        <p><strong>Email de contacto:</strong> <a href="mailto:hola@carlesdelolmo.com">hola@carlesdelolmo.com</a></p>
        <p><strong>Sitio web:</strong> <a href="https://carlesdelolmo.com" target="_blank">https://carlesdelolmo.com</a></p>
        <p>El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones.</p>
      </section>

      <section aria-labelledby="objeto-del-sitio-web">
        <h2 id="objeto-del-sitio-web">2. Objeto del sitio web</h2>
        <p>Este sitio web tiene como finalidad:</p>
        <ul>
          <li>presentar los servicios profesionales ofrecidos por el titular</li>
          <li>mostrar proyectos, casos de estudio y contenido informativo</li>
          <li>permitir el contacto profesional mediante formularios</li>
          <li>facilitar la solicitud de presupuestos o propuestas</li>
        </ul>
        <p>El uso del sitio web es gratuito para los usuarios.</p>
      </section>

      <section aria-labelledby="condiciones-de-uso">
        <h2 id="condiciones-de-uso">3. Condiciones de uso</h2>
        <p>El usuario se compromete a utilizar este sitio web de forma:</p>
        <ul>
          <li>lícita</li>
          <li>responsable</li>
          <li>conforme a la legislación vigente</li>
          <li>respetando las presentes condiciones</li>
        </ul>
        <p>Queda prohibido utilizar el sitio web para:</p>
        <ul>
          <li>realizar actividades ilícitas</li>
          <li>intentar acceder a sistemas o datos sin autorización</li>
          <li>introducir malware o software malicioso</li>
          <li>realizar ataques informáticos o pruebas de vulnerabilidad sin autorización</li>
          <li>enviar información falsa mediante los formularios</li>
        </ul>
        <p>El titular se reserva el derecho de bloquear o limitar el acceso a usuarios que incumplan estas condiciones.</p>
      </section>

      <section aria-labelledby="propiedad-intelectual-e-industrial">
        <h2 id="propiedad-intelectual-e-industrial">4. Propiedad intelectual e industrial</h2>
        <p>Todos los contenidos del sitio web, incluyendo:</p>
        <ul>
          <li>textos, diseño, estructura, código fuente, imágenes, elementos gráficos, logotipos, documentación técnica y casos de estudio</li>
        </ul>
        <p>son propiedad de Carles del Olmo o se utilizan con las licencias correspondientes.</p>
        <p>Estos contenidos están protegidos por la legislación española e internacional sobre propiedad intelectual.</p>
        <p>Queda prohibido reproducir, distribuir, modificar, comunicar públicamente o reutilizar contenido del sitio sin autorización expresa del titular.</p>
        <p>Se permite citar fragmentos del contenido siempre que se indique la fuente y se incluya un enlace al sitio web original.</p>
      </section>

      <section aria-labelledby="responsabilidad-sobre-el-uso-del-sitio">
        <h2 id="responsabilidad-sobre-el-uso-del-sitio">5. Responsabilidad sobre el uso del sitio</h2>
        <p>El titular realiza esfuerzos razonables para garantizar que la información publicada en el sitio web sea correcta y esté actualizada.</p>
        <p>No obstante, no se garantiza que la información esté siempre completamente actualizada, libre de errores o que el acceso sea ininterrumpido.</p>
        <p>El titular no será responsable de daños derivados del uso del sitio web, interrupciones, fallos técnicos o decisiones tomadas por los usuarios basadas en la información publicada.</p>
        <p>El contenido del sitio tiene carácter informativo y profesional, pero no constituye asesoramiento personalizado hasta que exista una relación contractual.</p>
      </section>

      <section aria-labelledby="enlaces-externos">
        <h2 id="enlaces-externos">6. Enlaces externos</h2>
        <p>Este sitio web puede incluir enlaces a sitios web de terceros. El titular no se responsabiliza de los contenidos, políticas de privacidad o el funcionamiento de dichos sitios.</p>
        <p>La inclusión de enlaces externos no implica necesariamente una relación comercial ni aprobación de sus contenidos.</p>
      </section>

      <section aria-labelledby="formularios-y-comunicaciones">
        <h2 id="formularios-y-comunicaciones">7. Formularios y comunicaciones</h2>
        <p>El usuario puede ponerse en contacto con el titular mediante formularios o correo electrónico.</p>
        <p>El usuario garantiza veracidad y no suplantación de identidad.</p>
        <p>El tratamiento de datos personales se regula en la <Link href="/politica-privacidad">Política de Privacidad</Link> del sitio web.</p>
      </section>

      <section aria-labelledby="seguridad-del-sitio-web">
        <h2>8. Seguridad del sitio web</h2>
        <p>Se aplican medidas técnicas razonables para garantizar la seguridad del sitio web, incluyendo conexiones seguras HTTPS y sistemas de protección frente a ataques.</p>
        <p>No obstante, ningún sistema en Internet es completamente invulnerable.</p>
      </section>

      <section aria-labelledby="modificaciones-del-sitio-o-de-las-condiciones">
        <h2>9. Modificaciones del sitio o de las condiciones</h2>
        <p>El titular se reserva el derecho de modificar el contenido o las condiciones por razones técnicas, legales o de negocio.</p>
        <p>Las condiciones vigentes serán las publicadas en el momento de acceso al sitio.</p>
      </section>

      <section aria-labelledby="legislacion-aplicable">
        <h2>10. Legislación aplicable</h2>
        <p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someterán a los juzgados correspondientes al domicilio del titular.</p>
      </section>
    </LegalLayout>
  );
}