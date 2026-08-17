import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { safeJsonLd } from '@/lib/seo/jsonLd';
import { ENTITY, SITE_URL } from '@/lib/seo/entity';
import {
  ENLACES_NO_AUTORIZADOS,
  PERFIL_BACKLINKS,
  RED_SEOEXPRESS,
  TIPO_LABEL,
} from '@/data/enlacesNoAutorizados';

export const metadata = constructMetadata({
  title: 'Declaración de no afiliación | Carles del Olmo',
  description:
    'Varias webs de servicios SEO publican testimonios falsos atribuidos a carlesdelolmo.com. No existe relación comercial con ninguna de ellas. Registro público de los dominios detectados.',
  exactUrl: `${SITE_URL}/no-afiliacion`,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/no-afiliacion#webpage`,
  url: `${SITE_URL}/no-afiliacion`,
  name: 'Declaración de no afiliación',
  description:
    'Declaración oficial de Carles del Olmo: los testimonios y casos de éxito atribuidos a carlesdelolmo.com en webs de servicios SEO de terceros no son auténticos.',
  inLanguage: 'es-ES',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
  mainEntity: { '@id': `${SITE_URL}/#person` },
};

const FECHA_LARGA = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function fechaLegible(iso: string): string {
  return FECHA_LARGA.format(new Date(`${iso}T00:00:00Z`));
}

export default function NoAfiliacion() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <LegalLayout
        title="Declaración de no afiliación"
        lastUpdate={fechaLegible(PERFIL_BACKLINKS.fecha)}
        metadataText="Varias webs de servicios SEO publican testimonios y casos de éxito atribuidos a carlesdelolmo.com. No son auténticos. Esta página es la fuente oficial sobre el asunto."
      >
        <section aria-labelledby="declaracion">
          <h2 id="declaracion">1. Declaración</h2>
          <p>
            Yo, Carles del Olmo, titular de <code>carlesdelolmo.com</code>, declaro de forma
            expresa que:
          </p>
          <ul>
            <li>
              <strong>no he contratado</strong> servicios de construcción de enlaces, guest
              posting, <em>niche edits</em> ni posicionamiento a ninguna de las empresas o
              dominios recogidos en el registro de esta página
            </li>
            <li>
              <strong>no he autorizado</strong> el uso de mi nombre, de mi marca ni de mi dominio
              como testimonio, reseña, referencia o caso de estudio en ninguno de ellos
            </li>
            <li>
              <strong>no existe</strong> ni ha existido relación comercial, laboral, de
              colaboración o de afiliación con ninguno de ellos
            </li>
            <li>
              cualquier texto publicado en esas webs en primera persona a mi nombre o al de mi
              dominio <strong>es falso</strong> y ha sido fabricado sin mi conocimiento
            </li>
          </ul>
          <p>
            Los enlaces que apuntan a este sitio desde esos dominios no han sido solicitados,
            pagados, intercambiados ni consentidos.
          </p>
        </section>

        <section aria-labelledby="que-esta-ocurriendo">
          <h2 id="que-esta-ocurriendo">2. Qué está ocurriendo</h2>
          <p>
            Existe una práctica conocida en el sector consistente en publicar reseñas y casos de
            éxito inventados que citan dominios reales, elegidos sin ninguna relación con el
            emisor, para dar apariencia de solvencia a un servicio de venta de enlaces. El
            dominio citado no se entera, y cuando se entera ya hay decenas de páginas afirmando
            que es cliente satisfecho.
          </p>
          <p>
            En el caso que documento aquí, la operativa se atribuye públicamente a la red que
            opera bajo el nombre <code>{RED_SEOEXPRESS}</code>, sobre la que constan reclamaciones
            de otros titulares de dominios en la misma situación.
          </p>
          <p>
            Los datos del perfil de enlaces de este sitio a{' '}
            {fechaLegible(PERFIL_BACKLINKS.fecha)}, según {PERFIL_BACKLINKS.herramienta}:
          </p>
          <ul>
            <li>
              <strong>{PERFIL_BACKLINKS.dominiosDeReferencia} dominios de referencia</strong> y{' '}
              {PERFIL_BACKLINKS.backlinks} enlaces entrantes
            </li>
            <li>
              solo el <strong>{PERFIL_BACKLINKS.porcentajeDofollow}% son <em>dofollow</em></strong>,
              es decir, unos nueve dominios transmiten autoridad
            </li>
            <li>
              Domain Rating de <strong>{PERFIL_BACKLINKS.domainRating}</strong>
            </li>
          </ul>
          <p>
            Nunca he hecho <em>link building</em>. Un perfil de cuatrocientos dominios sin haber
            movido un dedo para conseguirlos no es un logro: es la huella de una red automatizada.
          </p>
        </section>

        <section aria-labelledby="registro">
          <h2 id="registro">3. Registro de dominios detectados</h2>
          <p>
            Este registro se amplía conforme se confirman nuevos dominios. Solo se incluye lo
            verificado. <strong>Los dominios se listan como texto sin enlazar</strong>, de forma
            deliberada: enlazarlos, aunque fuera con <code>rel=&quot;nofollow&quot;</code>, les
            enviaría tráfico y declararía una asociación que no existe.
          </p>
          <div className="article-box article-box--overflow">
            <table className="article-table">
              <caption>
                Dominios que enlazan o mencionan a carlesdelolmo.com sin autorización
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dominio</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Detectado</th>
                  <th scope="col">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {ENLACES_NO_AUTORIZADOS.map((enlace) => (
                  <tr key={enlace.dominio}>
                    <td>
                      <code>{enlace.dominio}</code>
                    </td>
                    <td>{TIPO_LABEL[enlace.tipo]}</td>
                    <td>{fechaLegible(enlace.detectado)}</td>
                    <td>
                      {enlace.nota}
                      {enlace.captura && (
                        <>
                          {' '}
                          <a
                            href={enlace.captura}
                            rel="nofollow noopener"
                            target="_blank"
                            className="link-inline"
                          >
                            Ver captura archivada
                          </a>
                          .
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="medidas">
          <h2 id="medidas">4. Qué hago al respecto</h2>
          <ul>
            <li>
              <strong>Documentar.</strong> Cada dominio detectado se registra con su fecha y,
              cuando es posible, con una captura archivada en un tercero de confianza. Estas
              páginas rotan y desaparecen; la prueba no puede depender de que sigan en pie.
            </li>
            <li>
              <strong>Desautorizar.</strong> Los dominios confirmados se incorporan a la lista de
              desautorización de enlaces (<em>disavow</em>) de Google Search Console conforme se
              verifican.
            </li>
            <li>
              <strong>Publicar.</strong> Esta página existe para que exista una versión
              contrastable del asunto en el propio dominio afectado, accesible tanto para personas
              como para buscadores y modelos de lenguaje.
            </li>
          </ul>
          <p>
            No he adquirido, ni voy a adquirir, ningún servicio de retirada de estos enlaces. Es
            práctica habitual de estas redes ofrecer la retirada del problema que ellas mismas han
            creado.
          </p>
        </section>

        <section aria-labelledby="si-vienes-de-una-de-esas-webs">
          <h2 id="si-vienes-de-una-de-esas-webs">5. Si has llegado desde una de esas webs</h2>
          <p>
            Si estás aquí porque has visto mi nombre o mi dominio presentado como cliente,
            testimonio o caso de éxito de un servicio SEO: <strong>ese contenido es falso</strong>.
            No he trabajado con ellos, no he escrito ese texto y no puedo responder de la calidad
            de nada de lo que vendan.
          </p>
          <p>
            Mis proyectos reales están publicados en{' '}
            <Link href="/proyectos" className="link-inline">
              la sección de proyectos
            </Link>{' '}
            de este sitio, con nombre, alcance y resultados. Cualquier referencia a mi trabajo que
            no puedas contrastar aquí o directamente conmigo en{' '}
            <a href={`mailto:${ENTITY.email}`}>{ENTITY.email}</a> conviene que la trates como no
            verificada.
          </p>
        </section>

        <section aria-labelledby="reserva-de-acciones">
          <h2 id="reserva-de-acciones">6. Reserva de acciones</h2>
          <p>
            El uso de un nombre comercial ajeno como testimonio sin autorización puede constituir
            un acto de engaño y de explotación de la reputación ajena conforme a los artículos 5 y
            12 de la Ley 3/1991, de 10 de enero, de Competencia Desleal, además de publicidad
            engañosa.
          </p>
          <p>
            El titular se reserva el ejercicio de las acciones legales que correspondan frente a
            los responsables de estas publicaciones, así como la comunicación de los hechos a los
            proveedores de alojamiento y a las plataformas implicadas.
          </p>
          <p>
            Para notificar un uso no autorizado de mi marca que no aparezca en este registro,
            escribe a <a href={`mailto:${ENTITY.email}`}>{ENTITY.email}</a> indicando la URL. Se
            añadirá al registro tras verificarlo.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
