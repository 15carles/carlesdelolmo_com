"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabaseUrl = 'https://gzrgxkjvxaflteilmjuq.supabase.co';
const supabaseKey = 'sb_publishable_-rNRG-bfifNaR--8DkvKvA_xXLh4eil';
const supabase = createClient(supabaseUrl, supabaseKey);

type ContactFormProps = {
  className?: string;
  defaultServiciosInteres?: string[];
  defaultServiciosAdicionales?: string[];
};

export default function ContactForm({
  className,
  defaultServiciosInteres = [],
  defaultServiciosAdicionales = [],
}: ContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicios_interes: [...defaultServiciosInteres] as string[],
    identidad_visual: '',
    servicios_adicionales: [...defaultServiciosAdicionales] as string[],
    fecha_limite: '',
    donde_conocido: '',
    acepta_privacidad: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'acepta_privacidad') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else if (name === 'servicios_interes') {
        setFormData(prev => {
          const current = [...prev.servicios_interes];
          if (checked) current.push(value);
          else {
            const index = current.indexOf(value);
            if (index > -1) current.splice(index, 1);
          }
          return { ...prev, servicios_interes: current };
        });
      } else if (name === 'servicios_adicionales') {
        setFormData(prev => {
          let current = [...prev.servicios_adicionales];
          if (value === 'No' && checked) {
            current = ['No'];
          } else if (checked) {
            current = current.filter(v => v !== 'No');
            current.push(value);
          } else {
            const index = current.indexOf(value);
            if (index > -1) current.splice(index, 1);
          }
          return { ...prev, servicios_adicionales: current };
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
    if (formData.servicios_interes.length === 0) {
      newErrors.servicios_interes = 'Debes seleccionar al menos un servicio';
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
      // Excluir acepta_privacidad porque no es una columna en la tabla
      const { acepta_privacidad, ...dataToSend } = formData;
      
      const { error } = await supabase
        .from('leads_contacto')
        .insert([{
          ...dataToSend,
          url_origen: typeof window !== 'undefined' ? window.location.href : '',
          estado: 'nuevo'
        }]);

      if (error) throw error;
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
      id="budget-form"
      className={`form card card--no-hover${className ? ` ${className}` : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-2 gap-md mb-md">
        {/* Identificación */}
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

      <hr className="border-t mb-md" aria-hidden="true" />

      {/* Selección de Servicios */}
      <div className="form__group">
        <label className="form__label text-left">¿En qué servicios estás interesado? *</label>
        <div className="flex flex-col gap-sm">
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_interes"
              value="Auditoría"
              checked={formData.servicios_interes.includes('Auditoría')}
              onChange={handleChange}
            />
            <span className="text-secondary">Auditoría SEO/GEO</span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_interes"
              value="Diseño Web"
              checked={formData.servicios_interes.includes('Diseño Web')}
              onChange={handleChange}
            />
            <span className="text-secondary">Diseño Web Estratégico</span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_interes"
              value="Mantenimiento"
              checked={formData.servicios_interes.includes('Mantenimiento')}
              onChange={handleChange}
            />
            <span className="text-secondary">Mantenimiento Web Proactivo</span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_interes"
              value="SEO/GEO"
              checked={formData.servicios_interes.includes('SEO/GEO')}
              onChange={handleChange}
            />
            <span className="text-secondary">Posicionamiento SEO + GEO</span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_interes"
              value="Automatización"
              checked={formData.servicios_interes.includes('Automatización')}
              onChange={handleChange}
            />
            <span className="text-secondary">Automatizaciones con IA (o sin IA)</span>
          </label>
        </div>
        {errors.servicios_interes && <div className="form__error">{errors.servicios_interes}</div>}
      </div>

      {/* Identidad Visual */}
      <div className="form__group mt-md">
        <label htmlFor="identidad_visual" className="form__label text-left">¿Tienes ya una identidad visual?</label>
        <select
          id="identidad_visual"
          name="identidad_visual"
          className="form__input cursor-pointer w-full"
          value={formData.identidad_visual}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Si, completa">Sí, tengo logotipo y manual de marca</option>
          <option value="Tengo algo base">Tengo algo básico (logo solo)</option>
          <option value="No, necesito una">No, necesito crearla desde cero</option>
          <option value="Quiero rediseñar">Tengo pero quiero un rediseño</option>
        </select>
      </div>

      <hr className="border-t mb-md" aria-hidden="true" />

      {/* Servicios Adicionales */}
      <div className="form__group">
        <label className="form__label text-left">¿Necesitas añadir algo más?</label>
        <div className="grid grid-cols-2 gap-sm mt-sm">
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_adicionales"
              value="Mantenimiento"
              checked={formData.servicios_adicionales.includes('Mantenimiento')}
              onChange={handleChange}
            />
            <span className="text-secondary">Mantenimiento Proactivo</span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_adicionales"
              value="Formación"
              checked={formData.servicios_adicionales.includes('Formación')}
              onChange={handleChange}
            />
            <span className="text-secondary">Formación en Herramientas</span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer justify-start">
            <input
              type="checkbox"
              name="servicios_adicionales"
              value="No"
              id="no-gracias"
              checked={formData.servicios_adicionales.includes('No')}
              onChange={handleChange}
            />
            <span className="text-secondary">No, de momento solo lo anterior</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md mt-md">
        {/* Planificación */}
        <div className="form__group">
          <label htmlFor="fecha_limite" className="form__label text-left">Fecha límite deseada</label>
          <input
            type="date"
            id="fecha_limite"
            name="fecha_limite"
            className="form__input"
            value={formData.fecha_limite}
            onChange={handleChange}
          />
        </div>

        <div className="form__group">
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
      </div>

      {/* Consentimiento */}
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
            He leído y acepto la <Link href="/politica-privacidad" className="text-accent underline">política de privacidad</Link> *
          </span>
        </label>
        {errors.acepta_privacidad && <div className="form__error">{errors.acepta_privacidad}</div>}
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        id="submit-btn"
        className="btn btn--primary btn--large btn--block mt-md w-full"
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Enviar Presupuesto'}
      </button>
    </form>
  );
}
