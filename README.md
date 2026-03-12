# Carles del Olmo - Landing Page Profesional

Landing page profesional para desarrollador especialista en **Generative Engine Optimization (GEO)**, con diseño dark-tech moderno y efectos glassmorphism.

## 🎯 Características

- ✅ **HTML Semántico**: Estructura limpia y accesible.
- ✅ **CSS Modular**: Arquitectura organizada en `main.css`, `components.css` y `shared.css`.
- ✅ **Arquitectura Mobile-First**: Todos los estilos CSS siguen el patrón mobile-first con media queries `min-width` para una progresión lógica desde móvil hacia desktop.
- ✅ **JavaScript Vanilla**: Sin dependencias externas, código modular y eficiente.
- ✅ **100% Responsive**: Optimizado para móviles, tablets y escritorio.
- ✅ **Dark Theme Premium**: Estética moderna con gradientes personalizados.
- ✅ **Efecto de Fondo "Living"**: Fondos animados con ondas SVG sutiles y optimización de overscale.
- ✅ **Glassmorphism**: Componentes con desenfoque de fondo y bordes translúcidos.
- ✅ **Accesibilidad**: Etiquetas ARIA y navegación completa por teclado.
- ✅ **Plantilla de Casos de Éxito**: Estructura reutilizable para documentar proyectos de GEO/SEO.
- ✅ **Componentes Modulares**: Arquitectura JS para carga dinámica de elementos repetitivos (Footer, Navbar).
- ✅ **Modo Claro / Oscuro**: Sistema de temas dual con persistencia automática y diseño adaptativo.
- ✅ **Glassmorphism Theme-Aware**: Efectos de cristal que se adaptan al modo de color seleccionado.
- ✅ **Caso de Estudio LEDescaparate**: Ejemplo real de visibilidad del 74% en IA con métricas Lighthouse 100/100.

## 📁 Estructura del Proyecto

```
carlesdelolmo_web/
├── index.html              # Página principal
├── contacto.html           # Página de contacto
├── pricing.html            # Servicios y tarifas (Diseño Web, SEO, GEO)
├── politica-cookies.html   # Política de Cookies (Legal)
├── gracias.html            # Página de agradecimiento (Formulario)
├── diseno-web/              # Landings SEO por ubicación
│   └── diseno-web-valencia.html
├── proyectos/              # Casos de estudio y plantilla
│   ├── ledescaparate.html
│   └── plantilla-proyecto.html
├── blog/                  # Artículos y plantilla de blog
│   ├── index.html
│   ├── el-fin-del-seo-la-era-del-geo.html
│   ├── plantilla-post.html
│   └── rss.xml             # Feed de noticias (RSS)
├── assets/                 # Recursos estáticos
│   ├── css/               # Arquitectura CSS modular
│   │   ├── main.css
│   │   ├── components.css
│   │   └── shared.css
│   ├── js/                # Lógica JavaScript
│   │   ├── main.js
│   │   ├── theme-toggle.js
│   │   ├── components.js
│   │   └── form.js
│   ├── images/            # Imágenes y assets visuales
│   └── icons/             # Iconografía SVG
├── components/             # Fragmentos HTML reutilizables
│   └── footer.html
├── .well-known/            # Estándares de seguridad y autoridad
│   └── security.txt
├── CHANGELOG.md            # Historial de cambios
├── VERSION                 # Versión actual del proyecto
├── humans.txt              # Créditos y autoría humana
├── llms.txt                # Perfil optimizado para modelos de lenguaje
├── robots.txt              # Configuración para rastreadores
├── sitemap.xml             # Mapa del sitio incluyendo subdirectorios
└── README.md               # Documentación principal
```

## 🎨 Arquitectura CSS

### Design Tokens (`main.css`)
- Variables CSS para la paleta de colores (Purple, Blue, Cyan).
- Sistema de espaciado y radios de borde consistentes.
- Animaciones optimizadas (`pulse-dot`, `floating-waves`, `fade-in-up`).

### Componentes (`components.css`)
- **Navbar**: Sticky con efecto de desenfoque y cambio de estado al hacer scroll.
- **Terminal de Código**: Simulación de editor con resaltado de sintaxis y efectos hover.
- **Cards**: Efectos glassmorphism con elevación y sombras suaves.
- **Formularios**: Validación en tiempo real con feedback visual claro.

## 🚀 Uso y Personalización

### Desarrollo Local
No requiere compilación. Simplemente clona el repositorio y abre `index.html`.

### Crear un Nuevo Caso de Estudio
1. Duplica `plantilla-proyecto.html`.
2. Sigue los comentarios en el archivo para rellenar las secciones (Antes, Diagnóstico, Intervención, Resultados, Apariciones IA).
3. Enlaza tu nuevo archivo desde la sección de proyectos en `index.html`.

## 🔧 Próximas Mejoras

- [ ] Integración con backend real para envío de emails.
- [x] Implementación de modo claro (Done v2.0.0).
- [ ] Soporte para multi-idioma (i18n).
- [ ] Optimización de assets (WebP) y PWA.

## 📄 Licencia

Proyecto personal - Todos los derechos reservados.

## 👤 Autor

**Carles del Olmo**  
Especialista en Generative Engine Optimization
[LinkedIn](https://www.linkedin.com/in/delolmocarles/) | [Web](https://www.carlesdelolmo.com)

---

**Versión**: v3.0.0  
**Última actualización**: 12 Marzo 2026 (Feat: Migración completa de páginas críticas de servicios, proyectos y blog a Next.js - Fase 8.5)