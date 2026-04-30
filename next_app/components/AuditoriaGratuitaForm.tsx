"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuditoriaGratuitaForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    url_web: '',
    donde_conocido: '',
    acepta_privacidad: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    let value = e.target.value;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      if (name === 'url_web') {
        // Aseguramos que siempre empiece por https:// si hay contenido
        if (value === 'https:/' || value === 'https:' || value === 'https' || value === 'http' || value === 'ht' || value === 'h') {
          value = 'https://';
        } else if (value && !value.startsWith('https://')) {
          value = 'https://' + value.replace(/^https?:\/\//, '');
        }
      }
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Este campo es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato no es válido';
    }
    if (formData.telefono && !/^[0-9+ \-]{9,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'El formato no es válido';
    }
    if (!formData.url_web.trim()) {
      newErrors.url_web = 'Necesitamos la URL de tu web para poder auditar';
    } else if (!/^https:\/\/.+/.test(formData.url_web.trim())) {
      newErrors.url_web = 'Introduce una URL válida (debe empezar por https://)';
    }
    if (!formData.acepta_privacidad) {
      newErrors.acepta_privacidad = 'Debes aceptar la política de privacidad';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        servicios_interes: ['Auditoría'],
        servicios_adicionales: ['No'],
        identidad_visual: '',
        fecha_limite: '',
        donde_conocido: formData.donde_conocido,
        mensaje: formData.url_web,
        url_origen: typeof window !== 'undefined' ? window.location.href : '',
      };
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      router.push('/gracias');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="auditoria-form"
      className="form card card--no-hover"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-2 gap-md mb-md">
        <div className="form__group">
          <label htmlFor="nombre" className="form__label text-left">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className={`form__input ${errors.nombre ? 'form__input--error' : ''}`}
            placeholder="Tu nombre completo"
            required
            autoComplete="name"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="form__error">{errors.nombre}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="email" className="form__label text-left">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form__input ${errors.email ? 'form__input--error' : ''}`}
            placeholder="tu@email.com"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="form__error">{errors.email}</div>}
        </div>
      </div>

      <div className="form__group">
        <label htmlFor="telefono" className="form__label text-left">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className={`form__input ${errors.telefono ? 'form__input--error' : ''}`}
          placeholder="+34 600 000 000"
          autoComplete="tel"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errors.telefono && <div className="form__error">{errors.telefono}</div>}
      </div>

      <div className="form__group mt-md">
        <label htmlFor="url_web" className="form__label text-left">URL de tu web *</label>
        <input
          type="url"
          id="url_web"
          name="url_web"
          className={`form__input ${errors.url_web ? 'form__input--error' : ''}`}
          placeholder="https://tunegocio.com"
          value={formData.url_web}
          onChange={handleChange}
          onFocus={() => {
            if (!formData.url_web) {
              setFormData(prev => ({ ...prev, url_web: 'https://' }));
            }
          }}
        />
        {errors.url_web && <div className="form__error">{errors.url_web}</div>}
      </div>

      <div className="form__group mt-md">
        <label htmlFor="donde_conocido" className="form__label text-left">¿Cómo has llegado hasta aquí?</label>
        <select
          id="donde_conocido"
          name="donde_conocido"
          className="form__input cursor-pointer w-full"
          value={formData.donde_conocido}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Google">Buscador Google</option>
          <option value="Redes Sociales">Redes Sociales (LinkedIn/X)</option>
          <option value="Recomendación">Recomendación de un conocido</option>
          <option value="Otros">Otros canales</option>
        </select>
      </div>

      <div className="form__group mt-lg">
        <label className="flex items-start gap-sm cursor-pointer justify-start">
          <input
            type="checkbox"
            id="acepta_privacidad"
            name="acepta_privacidad"
            checked={formData.acepta_privacidad}
            onChange={handleChange}
            required
          />
          <span className="text-muted text-sm">
            He leído y acepto la{' '}
            <Link href="/politica-privacidad" className="text-accent underline">
              política de privacidad
            </Link>{' '}
            *
          </span>
        </label>
        {errors.acepta_privacidad && (
          <div className="form__error">{errors.acepta_privacidad}</div>
        )}
      </div>

      <button
        type="submit"
        id="submit-btn"
        className="btn btn--primary btn--large btn--block mt-md w-full"
        disabled={loading}
      >
        {loading ? 'Enviando solicitud...' : 'Solicitar auditoría gratuita'}
      </button>
    </form>
  );
}
