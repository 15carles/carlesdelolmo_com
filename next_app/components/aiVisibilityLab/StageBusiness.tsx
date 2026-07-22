import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import styles from './VisibilityLab.module.css';
import type { Business, ResearchSelection } from '@/lib/aiVisibilityLab/types';
import { LIMITS } from '@/lib/aiVisibilityLab/config';
import { normalizeDomain } from '@/lib/aiVisibilityLab/utils';
import {
  RESEARCH_SECTORS,
  RESEARCH_SERVICE_CATEGORIES,
  RESEARCH_PROVINCE_SCOPES,
  RESEARCH_PROVINCES,
  isValidSectorSlug,
  isValidServiceCategorySlug,
  isValidProvinceSlug,
} from '@/lib/aiVisibilityLab/research/catalogs';

interface StageBusinessProps {
  business: Business;
  /** Clasificación para el estudio previamente elegida (null en sesiones nuevas). */
  research: ResearchSelection | null;
  onContinue: (business: Business, research: ResearchSelection) => void;
  onBack: () => void;
  onClear: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

type Errors = Partial<Record<string, string>>;

function lenError(value: string, min: number, max: number): string | null {
  const v = value.trim();
  if (v.length === 0) return 'Este campo es obligatorio.';
  if (v.length < min) return `Debe tener al menos ${min} caracteres.`;
  if (v.length > max) return `Debe tener como máximo ${max} caracteres.`;
  return null;
}

export default function StageBusiness({
  business,
  research,
  onContinue,
  onBack,
  onClear,
  headingRef,
}: StageBusinessProps) {
  const [form, setForm] = useState<Business>({
    ...business,
    competidores: [...business.competidores],
  });
  const [classification, setClassification] = useState<ResearchSelection>({
    sectorSlug: research?.sectorSlug ?? '',
    serviceCategorySlug: research?.serviceCategorySlug ?? '',
    provinceSlug: research?.provinceSlug ?? '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const setClassificationField = (key: keyof ResearchSelection, value: string) => {
    setClassification((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const setField = (key: keyof Business, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const setCompetitor = (index: number, value: string) => {
    setForm((prev) => {
      const competidores = [...prev.competidores];
      competidores[index] = value;
      return { ...prev, competidores };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`competidor-${index}`];
      return next;
    });
  };

  const addCompetitor = () => {
    setForm((prev) =>
      prev.competidores.length >= LIMITS.competidoresMax
        ? prev
        : { ...prev, competidores: [...prev.competidores, ''] },
    );
  };

  const removeCompetitor = (index: number) => {
    setForm((prev) => ({
      ...prev,
      competidores: prev.competidores.filter((_, i) => i !== index),
    }));
  };

  const validate = (): { ok: boolean; normalized: Business } => {
    const next: Errors = {};

    const nombreErr = lenError(form.nombre, LIMITS.nombreMin, LIMITS.nombreMax);
    if (nombreErr) next.nombre = nombreErr;

    if (!form.dominio.trim()) {
      next.dominio = 'Este campo es obligatorio.';
    } else if (!normalizeDomain(form.dominio)) {
      next.dominio = 'Introduce una dirección web válida.';
    }

    const servicioErr = lenError(form.servicio, LIMITS.servicioMin, LIMITS.servicioMax);
    if (servicioErr) next.servicio = servicioErr;

    const ubicacionErr = lenError(form.ubicacion, LIMITS.ubicacionMin, LIMITS.ubicacionMax);
    if (ubicacionErr) next.ubicacion = ubicacionErr;

    const tipoErr = lenError(form.tipoCliente, LIMITS.tipoClienteMin, LIMITS.tipoClienteMax);
    if (tipoErr) next.tipoCliente = tipoErr;

    const necesidadErr = lenError(form.necesidad, LIMITS.necesidadMin, LIMITS.necesidadMax);
    if (necesidadErr) next.necesidad = necesidadErr;

    // Clasificación para el estudio (§9): obligatoria y de lista cerrada.
    if (!isValidSectorSlug(classification.sectorSlug)) {
      next.sectorSlug = 'Selecciona un sector.';
    }
    if (!isValidServiceCategorySlug(classification.serviceCategorySlug)) {
      next.serviceCategorySlug = 'Selecciona una categoría de servicio.';
    }
    if (!isValidProvinceSlug(classification.provinceSlug)) {
      next.provinceSlug = 'Selecciona una provincia o ámbito.';
    }

    // Competidores: opcionales, pero si hay texto deben ser válidos.
    const seen = new Set<string>();
    form.competidores.forEach((raw, index) => {
      const value = raw.trim();
      if (!value) return;
      if (value.length < LIMITS.competidorMin || value.length > LIMITS.competidorMax) {
        next[`competidor-${index}`] =
          `Entre ${LIMITS.competidorMin} y ${LIMITS.competidorMax} caracteres.`;
        return;
      }
      const key = value.toLowerCase();
      if (key === form.nombre.trim().toLowerCase()) {
        next[`competidor-${index}`] =
          'Un competidor no puede tener el mismo nombre que tu empresa.';
        return;
      }
      if (seen.has(key)) {
        next[`competidor-${index}`] = 'Este competidor está duplicado.';
        return;
      }
      seen.add(key);
    });

    setErrors(next);

    const normalized: Business = {
      nombre: form.nombre.trim(),
      dominio: normalizeDomain(form.dominio) || form.dominio.trim(),
      servicio: form.servicio.trim(),
      ubicacion: form.ubicacion.trim(),
      tipoCliente: form.tipoCliente.trim(),
      necesidad: form.necesidad.trim(),
      competidores: form.competidores
        .map((c) => c.trim())
        .filter((c) => c.length > 0),
    };

    return { ok: Object.keys(next).length === 0, normalized };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { ok, normalized } = validate();
    if (ok) onContinue(normalized, { ...classification });
  };

  const renderSelect = (
    key: keyof ResearchSelection,
    label: string,
    children: React.ReactNode,
  ) => {
    const id = `lab-${key}`;
    const errId = `${id}-error`;
    const error = errors[key];
    return (
      <div className="form__group">
        <label htmlFor={id} className="form__label text-left">
          {label} *
        </label>
        <select
          id={id}
          className={`form__input cursor-pointer w-full ${error ? 'form__input--error' : ''}`}
          value={classification[key]}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          onChange={(e) => setClassificationField(key, e.target.value)}
        >
          {children}
        </select>
        {error && (
          <div id={errId} className="form__error">
            {error}
          </div>
        )}
      </div>
    );
  };

  const renderTextField = (
    key: keyof Business,
    label: string,
    opts: {
      help?: string;
      example?: string;
      max: number;
      textarea?: boolean;
      type?: string;
    },
  ) => {
    const id = `lab-${key}`;
    const errId = `${id}-error`;
    const helpId = `${id}-help`;
    const value = form[key] as string;
    const error = errors[key];
    const describedBy =
      [opts.help ? helpId : '', error ? errId : ''].filter(Boolean).join(' ') ||
      undefined;
    return (
      <div className="form__group">
        <label htmlFor={id} className="form__label text-left">
          {label} *
        </label>
        {opts.help && (
          <p id={helpId} className="text-muted text-sm mb-sm">
            {opts.help}
          </p>
        )}
        {opts.textarea ? (
          <textarea
            id={id}
            className={`form__textarea ${error ? 'form__textarea--error' : ''}`}
            value={value}
            maxLength={opts.max}
            placeholder={opts.example}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => setField(key, e.target.value)}
          />
        ) : (
          <input
            id={id}
            type={opts.type ?? 'text'}
            className={`form__input ${error ? 'form__input--error' : ''}`}
            value={value}
            maxLength={opts.max}
            placeholder={opts.example}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => setField(key, e.target.value)}
          />
        )}
        {error && (
          <div id={errId} className="form__error">
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <form className="card card--no-hover" onSubmit={handleSubmit} noValidate>
      <h2 ref={headingRef} tabIndex={-1} className="card__title text-left mb-sm">
        Datos del negocio
      </h2>
      <p className="text-secondary mb-md">
        Recogemos la información mínima para construir consultas realistas. Estos
        datos se guardan solo en este dispositivo; al estudio únicamente viajan
        los resultados estadísticos descritos al comenzar.
      </p>

      {renderTextField('nombre', 'Nombre de la empresa', {
        max: LIMITS.nombreMax,
        example: 'Ej. Muebles López',
      })}

      {renderTextField('dominio', 'Página web', {
        max: 200,
        type: 'url',
        example: 'Ej. muebleslopez.es',
        help: 'Acepta la dirección con o sin https://',
      })}

      {renderTextField('servicio', 'Servicio principal', {
        max: LIMITS.servicioMax,
        example: 'Ej. fabricación de cocinas a medida',
        help: 'Utiliza el servicio por el que te gustaría que una inteligencia artificial recomendara tu empresa.',
      })}

      {renderTextField('ubicacion', 'Ubicación o área de servicio', {
        max: LIMITS.ubicacionMax,
        example: 'Ej. Valencia',
        help: 'Puede ser una ciudad, provincia, comunidad autónoma o España.',
      })}

      {renderTextField('tipoCliente', 'Tipo de cliente', {
        max: LIMITS.tipoClienteMax,
        example: 'Ej. particulares que están reformando su vivienda',
      })}

      {renderTextField('necesidad', 'Necesidad principal del cliente', {
        max: LIMITS.necesidadMax,
        textarea: true,
        example:
          'Ej. diseñar e instalar una cocina a medida aprovechando un espacio pequeño',
        help: 'Describe una necesidad que una persona real podría explicar al pedir una recomendación.',
      })}

      <fieldset className={styles.optionGroup}>
        <legend className={styles.optionLegend}>Clasificación para el estudio</legend>
        <p className="text-muted text-sm mb-sm">
          Estos tres campos sirven para clasificar los resultados del estudio por
          sectores y territorios. Son categorías generales: no identifican a tu
          empresa.
        </p>

        {renderSelect(
          'sectorSlug',
          'Sector',
          <>
            <option value="">Selecciona un sector</option>
            {RESEARCH_SECTORS.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </>,
        )}

        {renderSelect(
          'serviceCategorySlug',
          'Categoría de servicio',
          <>
            <option value="">Selecciona una categoría</option>
            {RESEARCH_SERVICE_CATEGORIES.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </>,
        )}

        {renderSelect(
          'provinceSlug',
          'Provincia o ámbito geográfico',
          <>
            <option value="">Selecciona una provincia o ámbito</option>
            <optgroup label="Ámbito">
              {RESEARCH_PROVINCE_SCOPES.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Provincias">
              {RESEARCH_PROVINCES.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          </>,
        )}
      </fieldset>

      <fieldset className={styles.optionGroup}>
        <legend className={styles.optionLegend}>
          Competidores conocidos (opcional)
        </legend>
        <p className="text-muted text-sm mb-sm">
          Se utilizarán únicamente para registrar si aparecen en las respuestas.
          No se incluirán automáticamente en las preguntas. Puedes añadir hasta{' '}
          {LIMITS.competidoresMax}.
        </p>
        {form.competidores.map((value, index) => {
          const id = `lab-competidor-${index}`;
          const errId = `${id}-error`;
          const error = errors[`competidor-${index}`];
          return (
            <div key={index} className={styles.competitorRow}>
              <div className={`form__group grow ${styles.grow}`} style={{ marginBottom: 0 }}>
                <label htmlFor={id} className="sr-only">
                  Competidor {index + 1}
                </label>
                <input
                  id={id}
                  type="text"
                  className={`form__input ${error ? 'form__input--error' : ''}`}
                  value={value}
                  maxLength={LIMITS.competidorMax}
                  placeholder={`Competidor ${index + 1}`}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errId : undefined}
                  onChange={(e) => setCompetitor(index, e.target.value)}
                />
                {error && (
                  <div id={errId} className="form__error">
                    {error}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => removeCompetitor(index)}
                aria-label={`Eliminar competidor ${index + 1}`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>
          );
        })}
        {form.competidores.length < LIMITS.competidoresMax && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={addCompetitor}
          >
            <Plus size={18} aria-hidden="true" /> Añadir competidor
          </button>
        )}
      </fieldset>

      <div className={styles.navRow}>
        <div className={styles.navGroup}>
          <button type="button" className="btn btn--secondary" onClick={onBack}>
            Volver
          </button>
          <button type="button" className="btn btn--secondary" onClick={onClear}>
            Borrar los datos
          </button>
        </div>
        <button type="submit" className="btn btn--primary">
          Continuar
        </button>
      </div>
    </form>
  );
}
