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
        subtitle: fields.text({ label: 'Subtítulo', multiline: true }),
        date: fields.text({ label: 'Fecha (ej: 24 Feb, 2026)', description: 'Formato visual de la fecha' }),
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
  },
});