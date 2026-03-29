import { config, fields, collection, component } from '@keystatic/core';

// Modo de desarrollo escribe local. Producción (Cloudflare) exige GitHub puro.
const isLocalDev = process.env.NODE_ENV === 'development';

export default config({
  storage: isLocalDev
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: '15carles/carlesdelolmo_com',
      },
  ui: {
    brand: {
      name: 'Carles del Olmo',
    },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        author: fields.relationship({
          label: 'Autor',
          collection: 'authors',
          validation: { isRequired: true },
        }),
        subtitle: fields.text({ label: 'Subtítulo', multiline: true }),
        date: fields.text({ label: 'Fecha (ej: 24 febrero 2026)', description: 'Formato visual de la fecha' }),
        isoDate: fields.date({ label: 'Fecha ISO', description: 'Para ordenación y Schema SEO' }),
        categories: fields.array(
          fields.text({ label: 'Categoría' }),
          { label: 'Categorías', itemLabel: props => props.value || 'Nueva categoría' }
        ),
        keywords: fields.array(
          fields.text({ label: 'Keyword' }),
          { label: 'Keywords SEO', itemLabel: props => props.value || 'Nueva keyword' }
        ),
        metaTitle: fields.text({ label: 'Meta Title', description: 'Título para SEO' }),
        metaDescription: fields.text({ label: 'Meta Description', description: 'Descripción para SEO', multiline: true }),
        content: fields.document({
          label: 'Contenido',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/assets/blog',
            publicPath: '/assets/blog',
          },
          tables: true,
          componentBlocks: {
            articleBox: component({
              preview: (props) => (
                <div style={{ border: '1px dotted #ccc', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Article Box</div>
                  {props.fields.content.element}
                </div>
              ),
              label: 'Caja de Artículo (Article Box)',
              schema: {
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Contenido de la caja...',
                  formatting: 'inherit',
                  links: 'inherit',
                }),
                overflow: fields.checkbox({ label: 'Permitir Overflow (útil para tablas)', defaultValue: true }),
              },
            }),
            button: component({
              preview: (props) => (
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <button style={{
                    padding: props.fields.size.value === 'large' ? '12px 24px' : '8px 16px',
                    backgroundColor: props.fields.variant.value === 'primary' ? '#3b82f6' : '#eee',
                    color: props.fields.variant.value === 'primary' ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '4px'
                  }}>
                    {props.fields.label.value || 'Botón'}
                  </button>
                </div>
              ),
              label: 'Botón Estándar',
              schema: {
                label: fields.text({ label: 'Texto del botón' }),
                link: fields.text({ label: 'Enlace (URL)' }),
                variant: fields.select({
                  label: 'Variante',
                  options: [
                    { label: 'Primario', value: 'primary' },
                    { label: 'Secundario', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                }),
                size: fields.select({
                  label: 'Tamaño',
                  options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Grande', value: 'large' },
                  ],
                  defaultValue: 'normal',
                }),
                centered: fields.checkbox({ label: 'Centrar botón', defaultValue: true }),
              },
            }),
            styledImage: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #ccc', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#999' }}>Imagen con estilo: {props.fields.width.value}</div>
                  <div style={{ width: props.fields.width.value, height: '100px', backgroundColor: '#f0f0f0', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    IMG
                  </div>
                </div>
              ),
              label: 'Imagen con Estilo',
              schema: {
                image: fields.image({
                  label: 'Imagen',
                  directory: 'public/assets/blog',
                  publicPath: '/assets/blog',
                }),
                alt: fields.text({ label: 'Texto alternativo (Alt)' }),
                width: fields.select({
                  label: 'Ancho',
                  options: [
                    { label: '100%', value: '100%' },
                    { label: '75%', value: '75%' },
                    { label: '50%', value: '50%' },
                  ],
                  defaultValue: '100%',
                }),
                effect: fields.select({
                  label: 'Efecto Visual',
                  options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Glassmorphism', value: 'glass' },
                  ],
                  defaultValue: 'normal',
                }),
                centered: fields.checkbox({ label: 'Centrar imagen', defaultValue: true }),
              },
            }),
            ctaSection: component({
              preview: (props) => (
                <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>{props.fields.title.value || 'Título del CTA'}</div>
                  <div style={{ fontSize: '14px', margin: '10px 0' }}>{props.fields.text.value}</div>
                  <button style={{ padding: '5px 15px' }}>{props.fields.buttonText.value || 'Botón'}</button>
                </div>
              ),
              label: 'Sección CTA',
              schema: {
                title: fields.text({ label: 'Título del CTA' }),
                text: fields.text({ label: 'Texto descriptivo', multiline: true }),
                buttonText: fields.text({ label: 'Texto del botón' }),
                buttonLink: fields.text({ label: 'Enlace del botón' }),
                buttonVariant: fields.select({
                  label: 'Color del botón',
                  options: [
                    { label: 'Primario', value: 'primary' },
                    { label: 'Secundario', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                }),
              },
            }),
            notice: component({
              preview: (props) => (
                <div style={{
                  padding: '10px',
                  borderLeft: '4px solid ' + (props.fields.type.value === 'warning' ? '#f59e0b' : props.fields.type.value === 'tip' ? '#10b981' : '#3b82f6'),
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  margin: '10px 0'
                }}>
                  <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', marginBottom: '4px' }}>{props.fields.type.value}</div>
                  {props.fields.content.element}
                </div>
              ),
              label: 'Nota / Aviso',
              schema: {
                type: fields.select({
                  label: 'Tipo',
                  options: [
                    { label: 'Información', value: 'info' },
                    { label: 'Advertencia', value: 'warning' },
                    { label: 'Consejo', value: 'tip' },
                  ],
                  defaultValue: 'info',
                }),
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Escribe el aviso aquí...',
                  formatting: 'inherit',
                  links: 'inherit',
                }),
              },
            }),
            imageGallery: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Galería ({props.fields.columns.value} columnas)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.fields.columns.value}, 1fr)`, gap: '5px' }}>
                    {[1, 2, 3].slice(0, Number(props.fields.columns.value)).map((i) => (
                      <div key={i} style={{ aspectRatio: '4/3', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>Imagen</div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Galería de Imágenes',
              schema: {
                columns: fields.select({
                  label: 'Columnas',
                  options: [
                    { label: '1 Columna', value: '1' },
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                  ],
                  defaultValue: '2',
                }),
                images: fields.array(
                  fields.object({
                    image: fields.image({
                      label: 'Imagen',
                      directory: 'public/assets/blog',
                      publicPath: '/assets/blog',
                    }),
                    alt: fields.text({ label: 'Texto alternativo' }),
                  }),
                  {
                    label: 'Imágenes',
                    itemLabel: (props) => props.fields.alt.value || 'Imagen sin descripción',
                  }
                ),
              },
            }),
          },
        }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Pregunta' }),
            answer: fields.text({ label: 'Respuesta', multiline: true }),
          }),
          {
            label: 'Preguntas Frecuentes (FAQ)',
            itemLabel: props => props.fields.question.value || 'Nueva pregunta',
          }
        ),
      },
    }),
    projects: collection({
      label: 'Proyectos (Portfolio)',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título del Proyecto' } }),
        subtitle: fields.text({ label: 'Subtítulo / Hook Hero', multiline: true, validation: { isRequired: true } }),
        summary: fields.text({ label: 'Resumen Hero', multiline: true, validation: { isRequired: true } }),
        date: fields.text({ label: 'Fecha Visual', description: 'Ej: Marzo 2024', validation: { isRequired: true } }),
        isoDate: fields.date({ label: 'Fecha ISO', description: 'Para metadatos SEO', validation: { isRequired: true } }),
        metaTitle: fields.text({ label: 'Meta Title', validation: { isRequired: true } }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true, validation: { isRequired: true } }),
        sector: fields.text({ label: 'Sector', validation: { isRequired: true } }),
        foco: fields.text({ label: 'Foco del Proyecto', validation: { isRequired: true } }),
        sirScore: fields.integer({ label: 'Puntuación SIR (%)', defaultValue: 0, validation: { isRequired: true, min: 0, max: 100 } }),
        badges: fields.array(
          fields.text({ label: 'Badge', validation: { isRequired: true } }),
          {
            label: 'Etiquetas (Badges)',
            itemLabel: props => props.value || 'Nueva etiqueta',
            validation: { length: { min: 1 } },
          }
        ),
        client: fields.object({
          name: fields.text({ label: 'Nombre del Cliente', validation: { isRequired: true } }),
          url: fields.text({ label: 'URL del Sitio Web', validation: { isRequired: true } }),
          logo: fields.image({
            label: 'Logo del Cliente',
            directory: 'public/assets/projects',
            publicPath: '/assets/projects',
            validation: { isRequired: true },
          }),
        }, { label: 'Información del Cliente' }),
        testimonial: fields.object({
          text: fields.text({ label: 'Testimonio', multiline: true, validation: { isRequired: true } }),
          author: fields.text({ label: 'Nombre del Autor', validation: { isRequired: true } }),
          role: fields.text({ label: 'Cargo/Rol', validation: { isRequired: true } }),
          location: fields.text({ label: 'Ubicación (ej: España | Consultoría)', validation: { isRequired: true } }),
        }, { label: 'Información del Testimonio' }),
        content: fields.document({
          label: 'Cuerpo del Caso de Estudio',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/assets/projects',
            publicPath: '/assets/projects',
          },
          tables: true,
          componentBlocks: {
            projectHero: component({
              preview: (props) => (
                <div style={{ padding: '20px', border: '2px solid #5a67d8', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                  <div style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>[ HERO DEL PROYECTO ]</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{props.fields.title.value}</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>{props.fields.subtitle.value}</div>
                  <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '5px', fontSize: '12px' }}>
                    <strong>Sector:</strong> {props.fields.sector.value} | <strong>Foco:</strong> {props.fields.foco.value}
                  </div>
                </div>
              ),
              label: 'Hero: Encabezado del Proyecto',
              schema: {
                title: fields.text({ label: 'Título Principal (H1)', validation: { isRequired: true } }),
                subtitle: fields.text({ label: 'Subtítulo / Hook', multiline: true, validation: { isRequired: true } }),
                summary: fields.text({ label: 'Resumen descriptivo', multiline: true, validation: { isRequired: true } }),
                sector: fields.text({ label: 'Sector (ej: Digital Signage)', validation: { isRequired: true } }),
                foco: fields.text({ label: 'Foco (ej: GEO & Estructura)', validation: { isRequired: true } }),
                badges: fields.array(
                  fields.text({ label: 'Etiqueta', validation: { isRequired: true } }),
                  {
                    label: 'Badges (Tecnologías)',
                    itemLabel: props => props.value || 'Nueva etiqueta',
                    validation: { length: { min: 1 } },
                  }
                ),
              },
            }),
            styledImage: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #cbd5e1', padding: '10px', textAlign: 'center', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                    Imagen con estilo: {props.fields.width.value}
                  </div>
                  <div style={{
                    width: props.fields.width.value,
                    height: '100px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '10px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: props.fields.effect.value === 'glass' ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
                  }}>
                    IMG
                  </div>
                </div>
              ),
              label: 'Imagen con Estilo',
              schema: {
                image: fields.image({
                  label: 'Imagen',
                  directory: 'public/assets/projects',
                  publicPath: '/assets/projects',
                }),
                alt: fields.text({ label: 'Texto alternativo (alt)' }),
                width: fields.select({
                  label: 'Ancho',
                  options: [
                    { label: '100%', value: '100%' },
                    { label: '75%', value: '75%' },
                    { label: '50%', value: '50%' },
                  ],
                  defaultValue: '100%',
                }),
                effect: fields.select({
                  label: 'Efecto visual',
                  options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Glassmorphism', value: 'glass' },
                  ],
                  defaultValue: 'normal',
                }),
                centered: fields.checkbox({ label: 'Centrada', defaultValue: true }),
              },
            }),
            imageGallery: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #cbd5e1', padding: '10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                    Galería ({props.fields.columns.value} columnas)
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${props.fields.columns.value}, minmax(0, 1fr))`,
                    gap: '8px'
                  }}>
                    {[1, 2, 3].slice(0, Number(props.fields.columns.value)).map((i) => (
                      <div
                        key={i}
                        style={{
                          aspectRatio: '4/3',
                          borderRadius: '8px',
                          backgroundColor: '#e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: '#475569',
                        }}
                      >
                        Imagen {i}
                      </div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Galería de Imágenes',
              schema: {
                columns: fields.select({
                  label: 'Columnas',
                  options: [
                    { label: '1 Columna', value: '1' },
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                  ],
                  defaultValue: '2',
                }),
                images: fields.array(
                  fields.object({
                    image: fields.image({
                      label: 'Imagen',
                      directory: 'public/assets/projects',
                      publicPath: '/assets/projects',
                    }),
                    alt: fields.text({ label: 'Texto alternativo' }),
                  }),
                  {
                    label: 'Imágenes',
                    itemLabel: (props) => props.fields.alt.value || 'Imagen sin descripción',
                  }
                ),
              },
            }),
            terminalUnified: component({
              preview: (props) => {
                const isNarrow = props.fields.width.value === '750px';
                const mode = props.fields.mode.value;
                return (
                  <div style={{
                    backgroundColor: '#10151e',
                    color: '#e6edf3',
                    borderRadius: '12px',
                    border: '1px solid #2d333b',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.24)',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    maxWidth: isNarrow ? '750px' : '100%',
                    margin: isNarrow ? '0 auto' : '0',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      borderBottom: '1px solid #2d333b',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: '#9da7b3',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>{props.fields.filename.value || 'terminal.sh'}</span>
                      <span>{mode}</span>
                    </div>
                    {mode === 'chat' && (
                      <div style={{ padding: '10px', display: 'grid', gap: '8px' }}>
                        {props.fields.messages.elements.length === 0 && (
                          <div style={{ fontSize: '12px', color: '#9da7b3' }}>Añade mensajes para previsualizar el chat.</div>
                        )}
                        {props.fields.messages.elements.slice(0, 4).map((message, i) => {
                          const isUser = message.fields.role.value === 'user';
                          return (
                            <div
                              key={i}
                              style={{
                                justifySelf: isUser ? 'end' : 'start',
                                maxWidth: '92%',
                                padding: '8px 10px',
                                borderRadius: '10px',
                                fontSize: '12px',
                                lineHeight: 1.5,
                                background: isUser ? '#1f6feb' : '#30363d',
                                color: '#f0f6fc',
                              }}
                            >
                              <strong style={{ marginRight: '6px' }}>{isUser ? 'USER:' : 'IA:'}</strong>
                              {message.fields.content.value || '(mensaje vacio)'}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {mode === 'logs' && (
                      <div style={{
                        padding: '10px 12px',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: '#c9d1d9'
                      }}>
                        {props.fields.logs.elements.length === 0 && (
                          <div style={{ color: '#9da7b3' }}>[Sin logs todavia]</div>
                        )}
                        {props.fields.logs.elements.slice(0, 8).map((log, i) => {
                          const color = log.fields.variant.value === 'success'
                            ? '#3fb950'
                            : log.fields.variant.value === 'variable'
                              ? '#79c0ff'
                              : log.fields.variant.value === 'property'
                                ? '#39c5cf'
                                : '#c9d1d9';
                          return (
                            <div key={i}>
                              {log.fields.timestamp.value && (
                                <span style={{ color: '#8b949e', marginRight: '6px' }}>
                                  {log.fields.timestamp.value}
                                </span>
                              )}
                              <span style={{ color }}>{log.fields.text.value || '(linea vacia)'}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {mode === 'code' && (
                      <div style={{ padding: '12px', fontSize: '12px', lineHeight: 1.6 }}>
                        {props.fields.content.element}
                      </div>
                    )}
                  </div>
                );
              },
              label: 'Terminal: Unificado',
              schema: {
                mode: fields.select({
                  label: 'Modo',
                  options: [
                    { label: 'Codigo / Bloque libre', value: 'code' },
                    { label: 'Chat IA', value: 'chat' },
                    { label: 'Logs', value: 'logs' },
                  ],
                  defaultValue: 'code',
                }),
                filename: fields.text({ label: 'Nombre del archivo/titulo', validation: { isRequired: true } }),
                width: fields.select({
                  label: 'Ancho maximo',
                  options: [
                    { label: 'Completo', value: '100%' },
                    { label: 'Estrecho (centrado)', value: '750px' },
                  ],
                  defaultValue: '100%',
                }),
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Contenido de la terminal...',
                  formatting: 'inherit',
                }),
                messages: fields.array(
                  fields.object({
                    role: fields.select({
                      label: 'Rol',
                      options: [
                        { label: 'Usuario', value: 'user' },
                        { label: 'IA', value: 'ia' },
                      ],
                      defaultValue: 'user',
                    }),
                    content: fields.text({ label: 'Mensaje', multiline: true, validation: { isRequired: true } }),
                  }),
                  {
                    label: 'Mensajes (modo chat)',
                    itemLabel: (props) => `${props.fields.role.value}: ${props.fields.content.value?.substring(0, 30) || 'vacio'}`,
                  }
                ),
                logs: fields.array(
                  fields.object({
                    timestamp: fields.text({ label: 'Time (opcional)' }),
                    text: fields.text({ label: 'Mensaje del log', validation: { isRequired: true } }),
                    variant: fields.select({
                      label: 'Estilo',
                      options: [
                        { label: 'Normal', value: 'default' },
                        { label: 'Propiedad (cyan)', value: 'property' },
                        { label: 'Exito (verde)', value: 'success' },
                        { label: 'Variable (azul)', value: 'variable' },
                      ],
                      defaultValue: 'default',
                    }),
                  }),
                  {
                    label: 'Lineas de log (modo logs)',
                    itemLabel: props => `${props.fields.timestamp.value} ${props.fields.text.value}` || 'Nueva linea'
                  }
                ),
              },
            }),
            insightGrid: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #5a67d8', padding: '14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                    Grid unificado · {props.fields.variant.value} · {props.fields.columns.value} cols
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.fields.columns.value}, minmax(0, 1fr))`, gap: '8px' }}>
                    {props.fields.items.elements.slice(0, 3).map((item, i) => (
                      <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', fontSize: '11px' }}>
                        <strong>{item.fields.title.value || `Elemento ${i + 1}`}</strong>
                        {item.fields.badge.value && (
                          <div style={{ marginTop: '4px', fontSize: '10px', color: '#475569' }}>
                            {item.fields.badge.value}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Grid: Unificado (Cards/Desafíos)',
              schema: {
                variant: fields.select({
                  label: 'Estilo visual',
                  options: [
                    { label: 'Desafíos (contenedor único)', value: 'challenge' },
                    { label: 'Precisión (cards con badge)', value: 'precision' },
                    { label: 'Tarjetas (simple)', value: 'cards' },
                  ],
                  defaultValue: 'challenge',
                }),
                columns: fields.select({
                  label: 'Columnas',
                  options: [
                    { label: '1 Columna', value: '1' },
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                  ],
                  defaultValue: '2',
                }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título', validation: { isRequired: true } }),
                    content: fields.text({ label: 'Contenido', multiline: true, validation: { isRequired: true } }),
                    badge: fields.text({ label: 'Badge (opcional)' }),
                  }),
                  {
                    label: 'Elementos',
                    itemLabel: props => props.fields.title.value || 'Nuevo elemento',
                    validation: { length: { min: 1 } },
                  }
                ),
              },
            }),
            metricsPanel: component({
              preview: (props) => (
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>
                    Métricas · {props.fields.mode.value}
                  </div>
                  {props.fields.mode.value === 'lighthouse' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '6px', fontSize: '10px' }}>
                      <div style={{ textAlign: 'center' }}><strong>{props.fields.seo.value}</strong><div>SEO</div></div>
                      <div style={{ textAlign: 'center' }}><strong>{props.fields.performance.value}</strong><div>Perf</div></div>
                      <div style={{ textAlign: 'center' }}><strong>{props.fields.bestPractices.value}</strong><div>Best</div></div>
                      <div style={{ textAlign: 'center' }}><strong>{props.fields.accessibility.value}</strong><div>A11y</div></div>
                    </div>
                  )}
                  {props.fields.mode.value === 'simulator' && (
                    <div style={{ fontSize: '12px' }}>
                      <strong>{props.fields.title.value || 'Simulador'}</strong>
                      {props.fields.description.value && (
                        <div style={{ marginTop: '6px', color: '#475569' }}>{props.fields.description.value}</div>
                      )}
                    </div>
                  )}
                  {props.fields.mode.value === 'stats' && (
                    <div style={{ fontSize: '12px' }}>
                      <strong>{props.fields.variant.value} · {props.fields.columns.value} cols</strong>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '6px', marginTop: '8px' }}>
                    {props.fields.stats.elements.slice(0, 3).map((stat, i) => (
                      <div key={i} style={{ fontSize: '10px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px' }}>
                        <div>{stat.fields.value.value || '0'}</div>
                        <div style={{ color: '#64748b' }}>{stat.fields.label.value || 'Etiqueta'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Métricas: Unificado (Lighthouse/Simulador/Stats)',
              schema: {
                mode: fields.select({
                  label: 'Modo',
                  options: [
                    { label: 'Lighthouse', value: 'lighthouse' },
                    { label: 'Simulador (card + stats)', value: 'simulator' },
                    { label: 'Stats (grid/highlight)', value: 'stats' },
                  ],
                  defaultValue: 'lighthouse',
                }),
                seo: fields.integer({ label: 'SEO (modo lighthouse)', defaultValue: 100, validation: { isRequired: true, min: 0, max: 100 } }),
                performance: fields.integer({ label: 'Rendimiento (modo lighthouse)', defaultValue: 100, validation: { isRequired: true, min: 0, max: 100 } }),
                bestPractices: fields.integer({ label: 'Mejores Prácticas (modo lighthouse)', defaultValue: 98, validation: { isRequired: true, min: 0, max: 100 } }),
                accessibility: fields.integer({ label: 'Accesibilidad (modo lighthouse)', defaultValue: 100, validation: { isRequired: true, min: 0, max: 100 } }),
                title: fields.text({ label: 'Título (modo simulador)', defaultValue: 'El Simulador: El Cierre de Ventas' }),
                description: fields.text({ label: 'Descripción (modo simulador)', multiline: true, defaultValue: '' }),
                variant: fields.select({
                  label: 'Variante (modo stats)',
                  options: [
                    { label: 'Grid con borde', value: 'grid' },
                    { label: 'Resaltado centrado', value: 'highlight' },
                  ],
                  defaultValue: 'grid',
                }),
                columns: fields.select({
                  label: 'Columnas (modo stats)',
                  options: [
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                    { label: '4 Columnas', value: '4' },
                  ],
                  defaultValue: '3',
                }),
                stats: fields.array(
                  fields.object({
                    label: fields.text({ label: 'Etiqueta (ej: Ventas)', validation: { isRequired: true } }),
                    value: fields.text({ label: 'Valor (ej: +25%)', validation: { isRequired: true } }),
                  }),
                  {
                    label: 'Estadísticas',
                    itemLabel: (props) => `${props.fields.value.value} - ${props.fields.label.value}`,
                  }
                ),
              },
            }),
            section: component({
              preview: (props) => {
                const variant = props.fields.variant.value;
                const align = props.fields.textAlign.value;
                const padding = props.fields.padding.value;
                const customBackgroundColor = props.fields.backgroundColor.value?.trim();
                const isDark = variant === 'dark' || variant === 'gradient';
                const variantStyles = variant === 'dark'
                  ? { background: '#0f172a', border: '1px solid #1e293b', color: '#f8fafc' }
                  : variant === 'gradient'
                    ? { background: 'linear-gradient(135deg, #0b2545 0%, #1d4ed8 55%, #4338ca 100%)', border: '1px solid #1d4ed8', color: '#f8fafc' }
                    : variant === 'glass'
                      ? { background: 'linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.52) 100%)', border: '1px solid rgba(148,163,184,0.45)', color: '#0f172a', backdropFilter: 'blur(6px)' }
                      : variant === 'secondary'
                        ? { background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a' }
                        : { background: '#ffffff', border: '1px solid #e5e7eb', color: '#0f172a' };
                const sectionPadding = padding === 'large' ? '28px' : padding === 'none' ? '8px' : '18px';
                return (
                  <div style={{
                    borderRadius: '16px',
                    padding: sectionPadding,
                    textAlign: align,
                    ...variantStyles,
                    ...(customBackgroundColor ? { background: customBackgroundColor } : {})
                  }}>
                    <div style={{
                      borderBottom: isDark ? '1px solid rgba(148,163,184,0.35)' : '1px solid #e2e8f0',
                      marginBottom: '12px',
                      paddingBottom: '8px'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: isDark ? '#93c5fd' : '#64748b',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        Sección {variant} · padding {padding}
                      </div>
                      {props.fields.eyebrow.value && (
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            border: isDark ? '1px solid rgba(148,163,184,0.45)' : '1px solid #cbd5e1',
                            borderRadius: '999px',
                            padding: '4px 8px',
                            color: isDark ? '#bfdbfe' : '#334155'
                          }}>
                            {props.fields.eyebrow.value}
                          </span>
                        </div>
                      )}
                      <strong style={{ fontSize: '18px' }}>{props.fields.title.value || 'Sin título'}</strong>
                      {props.fields.subtitle.value && (
                        <div style={{
                          fontSize: '13px',
                          marginTop: '4px',
                          color: isDark ? '#cbd5e1' : '#475569'
                        }}>
                          {props.fields.subtitle.value}
                        </div>
                      )}
                    </div>
                    <div>{props.fields.content.element}</div>
                  </div>
                );
              },
              label: 'Contenedor: Sección con Fondo',
              schema: {
                eyebrow: fields.text({ label: 'Eyebrow / Badge superior', defaultValue: '' }),
                title: fields.text({ label: 'Título de la Sección (H2)', defaultValue: '' }),
                subtitle: fields.text({ label: 'Subtítulo/Descripción mini', defaultValue: '' }),
                backgroundColor: fields.text({ label: 'Color de Fondo Custom (hex opcional)', defaultValue: '' }),
                variant: fields.select({
                  label: 'Fondo / Variante',
                  options: [
                    { label: 'Estándar (Blanco)', value: 'default' },
                    { label: 'Secundario (Gris/Redondeado)', value: 'secondary' },
                    { label: 'Oscuro (Azul Profundo)', value: 'dark' },
                    { label: 'Gradiente GEO', value: 'gradient' },
                    { label: 'Glassmorphism', value: 'glass' },
                  ],
                  defaultValue: 'default',
                }),
                textAlign: fields.select({
                  label: 'Alineación de Texto',
                  options: [
                    { label: 'Izquierda', value: 'left' },
                    { label: 'Centro', value: 'center' },
                  ],
                  defaultValue: 'left',
                }),
                padding: fields.select({
                  label: 'Espaciado Vertical',
                  options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Grande (Hero-like)', value: 'large' },
                    { label: 'Ninguno', value: 'none' },
                  ],
                  defaultValue: 'normal',
                }),
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Contenido de la sección...',
                  formatting: 'inherit',
                  links: 'inherit',
                  componentBlocks: 'inherit',
                }),
              },
            }),
            automationPanels: component({
              preview: (props) => {
                const cols = props.fields.columns.value === '1' ? 1 : 2;
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: '10px', padding: '10px' }}>
                    {props.fields.items.elements.slice(0, 4).map((item, i) => (
                      <div key={i} style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                          {item.fields.filename.value || 'terminal.log'}
                        </div>
                        <strong style={{ fontSize: '12px' }}>{item.fields.title.value || `Panel ${i + 1}`}</strong>
                      </div>
                    ))}
                  </div>
                );
              },
              label: 'Automatización: Paneles de Terminal',
              schema: {
                columns: fields.select({
                  label: 'Columnas',
                  options: [
                    { label: '1 Columna', value: '1' },
                    { label: '2 Columnas', value: '2' },
                  ],
                  defaultValue: '2',
                }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título del Panel', validation: { isRequired: true } }),
                    description: fields.text({ label: 'Descripción', multiline: true, validation: { isRequired: true } }),
                    filename: fields.text({ label: 'Archivo', defaultValue: 'pipeline.log', validation: { isRequired: true } }),
                    variant: fields.select({
                      label: 'Variante de terminal',
                      options: [
                        { label: 'Estándar', value: 'default' },
                        { label: 'Hook', value: 'hook' },
                      ],
                      defaultValue: 'default',
                    }),
                    content: fields.text({ label: 'Contenido terminal (multilínea)', multiline: true, validation: { isRequired: true } }),
                  }),
                  {
                    label: 'Paneles',
                    itemLabel: (props) => props.fields.title.value || 'Nuevo panel',
                    validation: { length: { min: 1 } },
                  }
                ),
              },
            }),
            sirBadge: component({
              preview: () => <div style={{ textAlign: 'center', padding: '10px', background: '#f0f0f0' }}>Badge SIR de Autoridad</div>,
              label: 'Badge: Puntuación SIR',
              schema: {},
            }),
            ctaSection: component({
              preview: (props) => (
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 55%, #1e293b 100%)',
                  border: '1px solid #334155',
                  color: '#f8fafc'
                }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#93c5fd', marginBottom: '8px' }}>
                    Call to action
                  </div>
                  <strong style={{ display: 'block', fontSize: '20px', lineHeight: 1.3 }}>{props.fields.title.value}</strong>
                  <p style={{ margin: '12px auto 16px', maxWidth: '620px', fontSize: '14px', lineHeight: 1.55, color: '#cbd5e1', whiteSpace: 'pre-line' }}>
                    {props.fields.text.value}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#1d4ed8',
                    borderRadius: '999px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 700
                  }}>
                    {props.fields.buttonText.value}
                  </span>
                </div>
              ),
              label: 'Sección: CTA (Call to Action)',
              schema: {
                title: fields.text({ label: 'Título', defaultValue: '¿Listo para que la IA hable de tu empresa?', validation: { isRequired: true } }),
                text: fields.text({ label: 'Texto', multiline: true, defaultValue: 'No esperes a que tu competencia ocupe el lugar de autoridad.\nImplementa hoy la arquitectura que dominará mañana.', validation: { isRequired: true } }),
                buttonText: fields.text({ label: 'Texto del Botón', defaultValue: 'Hablemos de tu Estrategia GEO', validation: { isRequired: true } }),
                buttonLink: fields.text({ label: 'Link del Botón', defaultValue: '/#contacto', validation: { isRequired: true } }),
              },
            }),
            testimonial: component({
              preview: (props) => (
                <div style={{
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.08)'
                }}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Mención de Honor
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    {props.fields.logo.value && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={props.fields.logo.value}
                        alt="Logo testimonio"
                        style={{
                          width: '64px',
                          height: '64px',
                          objectFit: 'contain',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#f8fafc',
                          padding: '8px',
                          flexShrink: 0
                        }}
                      />
                    )}
                    <div>
                      <div style={{ fontStyle: 'italic', marginBottom: '10px', fontSize: '14px', lineHeight: 1.55, color: '#0f172a' }}>
                        &quot;{props.fields.quote.value || 'Añade una cita de cliente'}&quot;
                      </div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>
                        {props.fields.author.value || 'Autor del testimonio'}
                      </div>
                      <div style={{ fontSize: '13px', color: '#475569', marginTop: '3px' }}>
                        {props.fields.role.value || 'Cargo / Empresa'}
                        {props.fields.link.value && (
                          <span style={{ marginLeft: '8px', color: '#1d4ed8' }}>
                            · {props.fields.linkText.value || props.fields.link.value}
                          </span>
                        )}
                      </div>
                      {props.fields.location.value && (
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {props.fields.location.value}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ),
              label: 'Testimonio: Mención de Honor',
              schema: {
                quote: fields.text({ label: 'Cita / Testimonio', multiline: true, defaultValue: '', validation: { isRequired: true } }),
                author: fields.text({ label: 'Nombre del Autor', defaultValue: '', validation: { isRequired: true } }),
                role: fields.text({ label: 'Cargo / Empresa', defaultValue: '', validation: { isRequired: true } }),
                logo: fields.text({ label: 'Logo de la Empresa (ruta opcional)', defaultValue: '' }),
                link: fields.text({ label: 'Enlace (opcional)', defaultValue: '' }),
                linkText: fields.text({ label: 'Texto del Enlace (opcional)', defaultValue: '' }),
                location: fields.text({ label: 'Ubicación (opcional)', defaultValue: '' }),
              },
            }),
          },
        }),
      },
    }),
    authors: collection({
      label: 'Autores',
      slugField: 'name',
      path: 'content/authors/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre Completo' } }),
        occupation: fields.text({ label: 'Ocupación / Título' }),
        avatar: fields.image({
          label: 'Avatar / Foto',
          directory: 'public/assets/authors',
          publicPath: '/assets/authors',
        }),
        bio: fields.text({ label: 'Biografía corta', multiline: true }),
        email: fields.text({ label: 'Email (para JSON-LD)' }),
        schemaId: fields.text({ label: 'Schema ID (@id)', description: 'Ej: https://carlesdelolmo.com/#person' }),
        specialties: fields.array(
          fields.text({ label: 'Especialidad' }),
          { label: 'Especialidades', itemLabel: (props) => props.value || 'Nueva especialidad' }
        ),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Plataforma',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'GitHub', value: 'github' },
                { label: 'Web Personal', value: 'website' },
              ],
              defaultValue: 'linkedin',
            }),
            url: fields.text({ label: 'URL del perfil' }),
          }),
          {
            label: 'Redes Sociales',
            itemLabel: (props) => `${props.fields.platform.value}: ${props.fields.url.value || 'sin URL'}`,
          }
        ),
      },
    }),
  },
});
