"use client";

import React from 'react';
import LegalLayout from '@/components/LegalLayout';

// Nota: metadata debe ir en un archivo separado o usar un Client Component que lo maneje si necesitamos interactividad.
// En Next.js 13+, si el componente es "use client", no puede exportar metadata.
// Solución: Crear un layout.tsx en la carpeta o simplemente no usar "use client" en el componente principal y pasar la lógica a un subcomponente.

export default function PoliticaCookies() {
  const openSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <LegalLayout 
      title="Política de Cookies" 
      lastUpdate="8 de marzo de 2026"
      metadataText="En esta página se explica qué cookies utiliza este sitio web, con qué finalidad, quién puede tratarlas y cómo puedes gestionar tu consentimiento."
    >
      <section aria-labelledby="que-son-las-cookies">
        <h2>1. Qué son las cookies</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web.</p>
        <p>Estas cookies permiten que el sitio web recuerde información sobre la visita del usuario, como sus preferencias o configuraciones, lo que puede facilitar su próxima visita y hacer que el sitio resulte más útil.</p>
        <p>Las cookies no dañan el dispositivo del usuario ni permiten acceder directamente a información personal almacenada en él.</p>
      </section>

      <section aria-labelledby="tipos-de-cookies">
        <h2>2. Tipos de cookies que utiliza este sitio web</h2>
        <p>Este sitio web puede utilizar las siguientes categorías de cookies.</p>

        <section aria-labelledby="cookies-tecnicas">
          <h3>2.1 Cookies técnicas o necesarias</h3>
          <p>Son cookies esenciales para el funcionamiento del sitio web y no requieren el consentimiento del usuario.</p>
          <p>Permiten, entre otras funciones:</p>
          <ul>
            <li>la navegación por el sitio web</li>
            <li>el funcionamiento correcto de formularios</li>
            <li>la seguridad del sitio</li>
            <li>la gestión del consentimiento de cookies</li>
            <li>el rendimiento y protección mediante Cloudflare</li>
          </ul>
          <p>Estas cookies se instalan automáticamente al acceder al sitio web.</p>
        </section>

        <section aria-labelledby="cookies-analiticas">
          <h3>2.2 Cookies analíticas</h3>
          <p>Este sitio web utiliza Google Analytics 4, un servicio de analítica web proporcionado por Google LLC.</p>
          <p>Estas cookies permiten analizar el comportamiento de los usuarios en el sitio web con el objetivo de mejorar el contenido, la estructura y la experiencia de navegación.</p>
          <p>La información recogida puede incluir:</p>
          <ul>
            <li>páginas visitadas</li>
            <li>tiempo de permanencia en el sitio</li>
            <li>interacción con diferentes secciones</li>
            <li>dispositivo utilizado</li>
            <li>navegador</li>
            <li>país aproximado desde el que se accede</li>
          </ul>
          <p>La información recopilada se utiliza únicamente con fines estadísticos.</p>
          <p>Estas cookies solo se instalan cuando el usuario acepta las cookies analíticas en el banner de consentimiento.</p>
        </section>
      </section>

      <section aria-labelledby="cookies-utilizadas">
        <h2>3. Cookies utilizadas</h2>
        <p>A continuación se muestran las cookies analíticas que puede utilizar Google Analytics 4:</p>
        <div className="article-box article-box--overflow">
          <table className="article-table">
            <caption>Relación de cookies analíticas utilizadas en el sitio web</caption>
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Finalidad</th>
                <th scope="col">Duración aproximada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Google Analytics</td>
                <td>Analítica</td>
                <td>Distinguir usuarios</td>
                <td>2 años</td>
              </tr>
              <tr>
                <td>ga*</td>
                <td>Google Analytics</td>
                <td>Analítica</td>
                <td>Mantener el estado de sesión</td>
                <td>2 años</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>La duración puede variar según la configuración del navegador o del servicio de analítica.</p>
      </section>

      <section aria-labelledby="quien-utiliza-la-informacion">
        <h2>4. Quién utiliza la información de las cookies</h2>
        <p>La información generada por las cookies puede ser tratada por:</p>
        <p>
          <strong>Carles del Olmo</strong><br />
          Responsable del sitio web
        </p>
        <p>y por proveedores tecnológicos que prestan servicios necesarios para el funcionamiento del sitio web, como:</p>
        <ul>
          <li>Google Analytics (Google LLC) para análisis estadístico</li>
          <li>Cloudflare para seguridad y rendimiento del sitio web</li>
        </ul>
      </section>

      <section aria-labelledby="transferencias-internacionales">
        <h2>5. Transferencias internacionales de datos</h2>
        <p>El uso de Google Analytics puede implicar transferencias internacionales de datos fuera del Espacio Económico Europeo.</p>
        <p>En estos casos, el tratamiento se realiza conforme a mecanismos legales válidos como:</p>
        <ul>
          <li>el EU-US Data Privacy Framework</li>
          <li>cláusulas contractuales tipo aprobadas por la Comisión Europea</li>
        </ul>
      </section>

      <section aria-labelledby="consentimiento">
        <h2>6. Cómo se obtiene el consentimiento</h2>
        <p>Al acceder al sitio web por primera vez, el usuario verá un banner de configuración de cookies que permite:</p>
        <ul>
          <li>aceptar todas las cookies</li>
          <li>rechazarlas</li>
          <li>configurarlas de forma personalizada</li>
        </ul>
        <p>Las cookies analíticas no se instalarán hasta que el usuario haya dado su consentimiento.</p>
        <p>El usuario puede cambiar sus preferencias en cualquier momento.</p>
        <p>Asimismo, el usuario podrá retirar el consentimiento previamente otorgado de forma sencilla a través del mecanismo de configuración de cookies disponible en el sitio web.</p>
      </section>

      <section aria-labelledby="desactivar-eliminar-cookies">
        <h2>7. Cómo desactivar o eliminar cookies</h2>
        <p>El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración del navegador.</p>
        <p>A continuación se incluyen enlaces con instrucciones para los navegadores más comunes:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" rel="noopener noreferrer nofollow" target="_blank">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" rel="noopener noreferrer nofollow" target="_blank">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" rel="noopener noreferrer nofollow" target="_blank">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" rel="noopener noreferrer nofollow" target="_blank">Microsoft Edge</a></li>
        </ul>
        <p>El bloqueo de cookies puede afectar al funcionamiento correcto de algunas funcionalidades del sitio web.</p>
      </section>

      <section aria-labelledby="cambios-politica-cookies">
        <h2>8. Cambios en la política de cookies</h2>
        <p>Esta Política de Cookies puede actualizarse en función de:</p>
        <ul>
          <li>cambios legales</li>
          <li>cambios técnicos en el sitio web</li>
          <li>incorporación de nuevas herramientas o servicios</li>
        </ul>
        <p>Se recomienda revisar esta página periódicamente para estar informado sobre el uso de cookies.</p>
      </section>

      <section aria-labelledby="gestion-preferencias">
        <h2>9. Gestión de preferencias</h2>
        <p>El usuario puede revisar o modificar su elección sobre cookies en cualquier momento desde el sistema de configuración habilitado en el sitio web.</p>
        <p>
          <button
            type="button"
            onClick={openSettings}
            className="cookie-banner__settings-btn cookie-banner__settings-btn--inline"
            aria-label="Abrir panel de configuración de cookies"
            aria-controls="cookie-modal"
          >
            Configurar cookies
          </button>
        </p>
      </section>
    </LegalLayout>
  );
}
