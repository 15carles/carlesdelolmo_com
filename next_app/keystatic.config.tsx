import { config, fields, collection, component } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
      kind: 'github',
      repo: {
        owner: '15carles',
        name: 'carlesdelolmo_com',
      },
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
        subtitle: fields.text({ label: 'Subtítulo / Hook Hero', multiline: true }),
        summary: fields.text({ label: 'Resumen Hero', multiline: true }),
        date: fields.text({ label: 'Fecha Visual', description: 'Ej: Marzo 2024' }),
        isoDate: fields.date({ label: 'Fecha ISO', description: 'Para metadatos SEO' }),
        metaTitle: fields.text({ label: 'Meta Title' }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        sector: fields.text({ label: 'Sector' }),
        foco: fields.text({ label: 'Foco del Proyecto' }),
        sirScore: fields.integer({ label: 'Puntuación SIR (%)', defaultValue: 0 }),
        badges: fields.array(
          fields.text({ label: 'Badge' }),
          { label: 'Etiquetas (Badges)', itemLabel: props => props.value || 'Nueva etiqueta' }
        ),
        client: fields.object({
          name: fields.text({ label: 'Nombre del Cliente' }),
          url: fields.text({ label: 'URL del Sitio Web' }),
          logo: fields.image({
            label: 'Logo del Cliente',
            directory: 'public/assets/projects',
            publicPath: '/assets/projects',
          }),
        }, { label: 'Información del Cliente' }),
        testimonial: fields.object({
          text: fields.text({ label: 'Testimonio', multiline: true }),
          author: fields.text({ label: 'Nombre del Autor' }),
          role: fields.text({ label: 'Cargo/Rol' }),
          location: fields.text({ label: 'Ubicación (ej: España | Consultoría)' }),
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
                title: fields.text({ label: 'Título Principal (H1)' }),
                subtitle: fields.text({ label: 'Subtítulo / Hook', multiline: true }),
                summary: fields.text({ label: 'Resumen descriptivo', multiline: true }),
                sector: fields.text({ label: 'Sector (ej: Digital Signage)' }),
                foco: fields.text({ label: 'Foco (ej: GEO & Estructura)' }),
                badges: fields.array(
                  fields.text({ label: 'Etiqueta' }),
                  { label: 'Badges (Tecnologías)', itemLabel: props => props.value || 'Nueva etiqueta' }
                ),
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
              label: 'Imagen con Estilo (Estética Blog)',
              schema: {
                image: fields.image({
                  label: 'Imagen',
                  directory: 'public/assets/projects',
                  publicPath: '/assets/projects',
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
            contentGrid: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #5a67d8', padding: '15px', borderRadius: '8px', backgroundColor: 'rgba(90, 103, 216, 0.05)' }}>
                  <div style={{ fontSize: '12px', color: '#5a67d8', fontWeight: 'bold', marginBottom: '10px' }}>
                    Grid Flexible ({props.fields.columns.value} Columnas)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.fields.columns.value}, 1fr)`, gap: '10px' }}>
                    {props.fields.columns.value === '1' && <div>Columna 1</div>}
                    {props.fields.columns.value === '2' && <><div style={{ border: '1px solid #ddd', padding: '4px' }}>Col 1</div><div style={{ border: '1px solid #ddd', padding: '4px' }}>Col 2</div></>}
                    {props.fields.columns.value === '3' && <><div style={{ border: '1px solid #ddd', padding: '4px' }}>Col 1</div><div style={{ border: '1px solid #ddd', padding: '4px' }}>Col 2</div><div style={{ border: '1px solid #ddd', padding: '4px' }}>Col 3</div></>}
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '10px', color: '#666' }}>
                    (Los bloques hijos se añadirán desde el editor)
                  </div>
                </div>
              ),
              label: 'Grid: Diseño Flexible (Multi-columna)',
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
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Añade bloques aquí...',
                  formatting: 'inherit',
                  links: 'inherit',
                  componentBlocks: 'inherit',
                }),
              },
            }),
            terminal: component({
              preview: (props) => (
                <div style={{
                  backgroundColor: '#1e1e1e',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  maxWidth: props.fields.width.value === '750px' ? '400px' : '100%',
                  margin: props.fields.width.value === '750px' ? '0 auto' : '0'
                }}>
                  <div style={{ borderBottom: '1px solid #333', marginBottom: '5px', fontSize: '12px', textAlign: 'center' }}>
                    {props.fields.filename.value || 'terminal.sh'}
                  </div>
                  {props.fields.variant.value === 'hook' ? 'Terminal tipo Chat/IA' : 'Terminal Estándar'}
                </div>
              ),
              label: 'Terminal Interactiva',
              schema: {
                filename: fields.text({ label: 'Nombre del archivo/título' }),
                variant: fields.select({
                  label: 'Variante',
                  options: [
                    { label: 'Estándar (Bash/Logs)', value: 'default' },
                    { label: 'Hook (Chat IA)', value: 'hook' },
                  ],
                  defaultValue: 'default',
                }),
                width: fields.select({
                  label: 'Ancho Máximo',
                  options: [
                    { label: 'Completo', value: '100%' },
                    { label: 'Estrecho (Centrado)', value: '750px' },
                  ],
                  defaultValue: '100%',
                }),
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Contenido de la terminal...',
                  formatting: 'inherit',
                }),
              },
            }),
            terminalChat: component({
              preview: (props) => (
                <div style={{ backgroundColor: '#1e1e1e', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ color: '#fff', fontSize: '12px', borderBottom: '1px solid #333', marginBottom: '10px' }}>
                    {props.fields.filename.value}
                  </div>
                  <div style={{ color: '#aaa', fontSize: '10px' }}>[ Conversación de IA ]</div>
                </div>
              ),
              label: 'Terminal: Conversación IA',
              schema: {
                filename: fields.text({ label: 'Título de la Terminal', defaultValue: 'Simulación: Consulta en ChatGPT-4o' }),
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
                    content: fields.text({ label: 'Mensaje', multiline: true }),
                  }),
                  {
                    label: 'Mensajes',
                    itemLabel: (props) => `${props.fields.role.value === 'user' ? '👤' : '🤖'}: ${props.fields.content.value?.substring(0, 30)}...`
                  }
                ),
              },
            }),
            automatedTerminal: component({
              preview: (props) => (
                <div style={{ backgroundColor: '#1e1e1e', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ color: '#fff', fontSize: '11px', borderBottom: '1px solid #333', marginBottom: '8px' }}>
                    {props.fields.filename.value}
                  </div>
                  <div style={{ color: '#98c379', fontSize: '10px', fontFamily: 'monospace' }}>[Logs de Automatización]</div>
                </div>
              ),
              label: 'Terminal: Logs Automáticos',
              schema: {
                filename: fields.text({ label: 'Nombre del archivo', defaultValue: 'leads_pipeline.sh' }),
                logs: fields.array(
                  fields.object({
                    timestamp: fields.text({ label: 'Time (opcional)' }),
                    text: fields.text({ label: 'Mensaje del log' }),
                    variant: fields.select({
                      label: 'Estilo',
                      options: [
                        { label: 'Normal', value: 'default' },
                        { label: 'Propiedad (Cyan)', value: 'property' },
                        { label: 'Éxito (Verde)', value: 'success' },
                        { label: 'Variable (Azul)', value: 'variable' },
                      ],
                      defaultValue: 'default',
                    }),
                  }),
                  {
                    label: 'Líneas de Log',
                    itemLabel: props => `${props.fields.timestamp.value} ${props.fields.text.value}` || 'Nueva línea'
                  }
                ),
              },
            }),
            pagespeedMetrics: component({
              preview: (props) => (
                <div style={{ textAlign: 'center', padding: '10px', border: '1px dashed #ccc' }}>
                  Lighthouse: SEO({props.fields.seo.value}) | Perf({props.fields.performance.value})
                </div>
              ),
              label: 'Lighthouse: Métricas de Velocidad',
              schema: {
                seo: fields.integer({ label: 'SEO', defaultValue: 100 }),
                performance: fields.integer({ label: 'Rendimiento', defaultValue: 100 }),
                bestPractices: fields.integer({ label: 'Mejores Prácticas', defaultValue: 98 }),
                accessibility: fields.integer({ label: 'Accesibilidad', defaultValue: 100 }),
              },
            }),
            precisionGrid: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #5a67d8', padding: '15px' }}>
                  Grid de Precisión ({props.fields.columns.value} cols)
                </div>
              ),
              label: 'Grid: Diseño Especial ( Cards / Proyectos )',
              schema: {
                columns: fields.select({
                  label: 'Columnas',
                  options: [
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                  ],
                  defaultValue: '2',
                }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título' }),
                    content: fields.text({ label: 'Contenido', multiline: true }),
                    badge: fields.text({ label: 'Badge (opcional)' }),
                  }),
                  {
                    label: 'Elementos',
                    itemLabel: props => props.fields.title.value || 'Nuevo elemento'
                  }
                )
              },
            }),
            statsGrid: component({
              preview: (props) => (
                <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <strong>Stats Grid ({props.fields.variant.value}, {props.fields.columns.value} cols)</strong>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${props.fields.columns.value}, 1fr)`, gap: '5px', marginTop: '5px' }}>
                    {props.fields.stats.elements.map((stat, i) => (
                      <div key={i} style={{ fontSize: '10px', textAlign: 'center' }}>
                        <div>{stat.fields.value.value}</div>
                        <div style={{ color: '#666' }}>{stat.fields.label.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Estadísticas (Impacto)',
              schema: {
                variant: fields.select({
                  label: 'Variante de Layout',
                  options: [
                    { label: 'Grid 3 Columnas (con borde)', value: 'grid' },
                    { label: 'Resaltado Centrado', value: 'highlight' },
                  ],
                  defaultValue: 'grid',
                }),
                columns: fields.select({
                  label: 'Columnas (Desktop)',
                  options: [
                    { label: '2 Columnas', value: '2' },
                    { label: '3 Columnas', value: '3' },
                    { label: '4 Columnas', value: '4' },
                  ],
                  defaultValue: '3',
                }),
                stats: fields.array(
                  fields.object({
                    label: fields.text({ label: 'Etiqueta (ej: Ventas)' }),
                    value: fields.text({ label: 'Valor (ej: +25%)' }),
                  }),
                  {
                    label: 'Estadísticas',
                    itemLabel: (props) => `${props.fields.value.value} - ${props.fields.label.value}`,
                  }
                ),
              },
            }),
            challengeCard: component({
              preview: (props) => (
                <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ccc' }}>
                  <strong>{props.fields.title.value}</strong>
                </div>
              ),
              label: 'Tarjeta: Desafío/Visión (Individual)',
              schema: {
                title: fields.text({ label: 'Título' }),
                content: fields.child({
                  kind: 'block',
                  placeholder: 'Descripción...',
                  formatting: { inlineMarks: { code: 'inherit' } },
                  componentBlocks: 'inherit',
                }),
              },
            }),
            section: component({
              preview: (props) => (
                <div style={{
                  border: '2px solid #eee',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: props.fields.textAlign.value,
                  backgroundColor: props.fields.variant.value === 'dark' ? '#0a0e1a' : (props.fields.variant.value === 'secondary' ? '#f8f9fa' : '#fff'),
                  color: props.fields.variant.value === 'dark' ? '#fff' : 'inherit'
                }}>
                  <div style={{ borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Sección: {props.fields.variant.value} | {props.fields.padding.value} padding</div>
                    <strong>{props.fields.title.value || 'Sin título'}</strong>
                    <div style={{ fontSize: '10px' }}>{props.fields.subtitle.value}</div>
                  </div>
                  <div>{props.fields.content.element}</div>
                </div>
              ),
              label: 'Contenedor: Sección con Fondo',
              schema: {
                title: fields.text({ label: 'Título de la Sección (H2)', defaultValue: '' }),
                subtitle: fields.text({ label: 'Subtítulo/Descripción mini', defaultValue: '' }),
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
            automationGrid: component({
              preview: (props) => (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px' }}>
                  <div style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'center' }}>
                    Terminal 1: {props.fields.t1_title.value}
                  </div>
                  <div style={{ border: '1px solid #ccc', padding: '5px', textAlign: 'center' }}>
                    Terminal 2: {props.fields.t2_title.value}
                  </div>
                </div>
              ),
              label: 'Grid: Automatizaciones (2 Cols)',
              schema: {
                t1_title: fields.text({ label: 'Título 1 (ej: Flujo de Leads)' }),
                t1_desc: fields.text({ label: 'Descripción 1' }),
                t1_filename: fields.text({ label: 'Archivo 1', defaultValue: 'leads_pipeline.sh' }),
                t1_content: fields.text({ label: 'Logs Terminal 1', multiline: true }),

                t2_title: fields.text({ label: 'Título 2 (ej: SEO Local)' }),
                t2_desc: fields.text({ label: 'Descripción 2' }),
                t2_filename: fields.text({ label: 'Archivo 2', defaultValue: 'seo_status.log' }),
                t2_content: fields.text({ label: 'Logs Terminal 2', multiline: true }),
              },
            }),
            cardGrid: component({
              preview: (props) => (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {props.fields.items.elements.map((item, i) => (
                    <div key={i} style={{ border: '1px solid #ccc', padding: '10px' }}>
                      <strong>{item.fields.title.value}</strong>
                    </div>
                  ))}
                </div>
              ),
              label: 'Grid: Tarjetas (2 Cols)',
              schema: {
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título de la Tarjeta' }),
                    content: fields.text({ label: 'Contenido', multiline: true }),
                  }),
                  {
                    label: 'Tarjetas',
                    itemLabel: (props) => props.fields.title.value || 'Tarjeta',
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
                <div style={{ textAlign: 'center', padding: '20px', border: '2px solid #000' }}>
                  <strong>CTA: {props.fields.title.value}</strong>
                </div>
              ),
              label: 'Sección: CTA (Call to Action)',
              schema: {
                title: fields.text({ label: 'Título', defaultValue: '¿Listo para que la IA hable de tu empresa?' }),
                text: fields.text({ label: 'Texto', multiline: true, defaultValue: 'No esperes a que tu competencia ocupe el lugar de autoridad.\nImplementa hoy la arquitectura que dominará mañana.' }),
                buttonText: fields.text({ label: 'Texto del Botón', defaultValue: 'Hablemos de tu Estrategia GEO' }),
                buttonLink: fields.text({ label: 'Link del Botón', defaultValue: '/#contacto' }),
              },
            }),
            testimonial: component({
              preview: (props) => (
                <div style={{ border: '1px solid #ffcc00', padding: '15px', borderRadius: '8px', backgroundColor: '#fff9e6' }}>
                  <div style={{ fontSize: '10px', color: '#666', marginBottom: '5px' }}>[ TESTIMONIO CORPORATIVO ]</div>
                  <div style={{ fontStyle: 'italic', marginBottom: '10px' }}>&quot;{props.fields.quote.value}&quot;</div>
                  <div style={{ fontWeight: 'bold' }}>{props.fields.author.value}</div>
                </div>
              ),
              label: 'Testimonio: Mención de Honor',
              schema: {
                quote: fields.text({ label: 'Cita / Testimonio', multiline: true, defaultValue: '' }),
                author: fields.text({ label: 'Nombre del Autor', defaultValue: '' }),
                role: fields.text({ label: 'Cargo / Empresa', defaultValue: '' }),
                logo: fields.text({ label: 'Logo de la Empresa (ruta opcional)', defaultValue: '' }),
                link: fields.text({ label: 'Enlace (opcional)', defaultValue: '' }),
              },
            }),
            simulatorCard: component({
              preview: (props) => (
                <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>Simulador: {props.fields.title.value}</div>
                  <div style={{ fontSize: '10px' }}>{props.fields.description.value}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                    {props.fields.stats.elements.map((s, i) => (
                      <div key={i} style={{ fontSize: '12px' }}>
                        <strong>{s.fields.value.value}</strong><br />{s.fields.label.value}
                      </div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Card: Simulador (con Stats)',
              schema: {
                title: fields.text({ label: 'Título del Simulador', defaultValue: 'El Simulador: El Cierre de Ventas' }),
                description: fields.text({ label: 'Descripción', multiline: true }),
                stats: fields.array(
                  fields.object({
                    value: fields.text({ label: 'Valor (ej: +32%)' }),
                    label: fields.text({ label: 'Etiqueta (ej: Leads)' }),
                  }),
                  {
                    label: 'Estadísticas del simulador',
                    itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}`,
                  }
                ),
              },
            }),
            challengeGrid: component({
              preview: (props) => (
                <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>Grid de Desafíos (3 Columnas)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {props.fields.items.elements.map((item, i) => (
                      <div key={i} style={{ border: '1px solid #eee', padding: '4px', fontSize: '10px' }}>
                        {item.fields.title.value || `Col ${i + 1}`}
                      </div>
                    ))}
                  </div>
                </div>
              ),
              label: 'Grid: Desafíos (3 col)',
              schema: {
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Título' }),
                    content: fields.text({ label: 'Contenido', multiline: true }),
                  }),
                  {
                    label: 'Elementos',
                    itemLabel: (props) => props.fields.title.value || 'Sin título',
                  }
                ),
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
