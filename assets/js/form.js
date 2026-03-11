'use strict';

// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
const supabaseUrl = 'https://gzrgxkjvxaflteilmjuq.supabase.co';
const supabaseKey = 'sb_publishable_-rNRG-bfifNaR--8DkvKvA_xXLh4eil';

// Usamos supabaseClient para evitar conflictos con el objeto global
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================
const FormValidator = {
    rules: {
        nombre: { required: true, minLength: 2, maxLength: 50 },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        telefono: { required: false, pattern: /^[0-9+ \-]{9,15}$/ },
        acepta_privacidad: { required: true, isCheckbox: true }
    },

    errors: {
        required: 'Este campo es obligatorio',
        minLength: 'Debe tener al menos {min} caracteres',
        maxLength: 'No puede exceder {max} caracteres',
        pattern: 'El formato no es válido',
        checkbox: 'Debes aceptar la política de privacidad'
    },

    validate(field, value, isChecked = false) {
        const rule = this.rules[field];
        if (!rule) return { valid: true };

        if (rule.required) {
            if (rule.isCheckbox && !isChecked) return { valid: false, message: this.errors.checkbox };
            if (!rule.isCheckbox && (!value || !value.trim())) return { valid: false, message: this.errors.required };
        }

        if (value && value.trim()) {
            if (rule.minLength && value.length < rule.minLength) {
                return { valid: false, message: this.errors.minLength.replace('{min}', rule.minLength) };
            }
            if (rule.maxLength && value.length > rule.maxLength) {
                return { valid: false, message: this.errors.maxLength.replace('{max}', rule.maxLength) };
            }
            if (rule.pattern && !rule.pattern.test(value)) {
                return { valid: false, message: this.errors.pattern };
            }
        }

        return { valid: true };
    },

    validateAll(formData, formElement) {
        const errors = {};
        let isValid = true;

        // Validamos campos de texto y select
        for (const [field, value] of Object.entries(formData)) {
            // Saltamos los arrays de checkboxes en la validación simple por ahora
            if (Array.isArray(value)) continue;

            const result = this.validate(field, value);
            if (!result.valid) {
                errors[field] = result.message;
                isValid = false;
            }
        }

        // Validar checkbox de privacidad específicamente
        const privacidad = formElement.querySelector('#acepta_privacidad');
        const privResult = this.validate('acepta_privacidad', '', privacidad.checked);
        if (!privResult.valid) {
            errors['acepta_privacidad'] = privResult.message;
            isValid = false;
        }

        return { isValid, errors };
    }
};

// ============================================
// GESTOR DEL FORMULARIO DE PRESUPUESTO
// ============================================
const BudgetForm = {
    init() {
        // Buscamos el formulario por el nuevo ID
        this.form = document.getElementById('budget-form');
        if (this.form) {
            this.bindEvents();
            this.initSpecialLogic();
        }
    },

    initSpecialLogic() {
        // Lógica para desmarcar otros si se marca "No, gracias"
        const noGracias = this.form.querySelector('#no-gracias');
        const otrosAdicionales = this.form.querySelectorAll('input[name="servicios_adicionales"]:not(#no-gracias)');

        if (noGracias) {
            noGracias.addEventListener('change', () => {
                if (noGracias.checked) {
                    otrosAdicionales.forEach(cb => cb.checked = false);
                }
            });

            otrosAdicionales.forEach(cb => {
                cb.addEventListener('change', () => {
                    if (cb.checked) noGracias.checked = false;
                });
            });
        }
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    async handleSubmit(e) {
        e.preventDefault();

        const formData = this.getFormData();
        const { isValid, errors } = FormValidator.validateAll(formData, this.form);

        if (!isValid) {
            this.showErrors(errors);
            return;
        }

        this.clearAllErrors();
        this.setLoadingState(true);

        try {
            // Enviamos los datos a la tabla 'leads_contacto' (ya actualizada con el SQL)
            const { error } = await supabaseClient
                .from('leads_contacto')
                .insert([formData]);

            if (error) throw error;

            // Redirección al éxito
            window.location.href = 'gracias.html';

        } catch (error) {
            console.error('Error de envío:', error);
            this.showNotification('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    },

    getFormData() {
        // Función auxiliar para obtener valores de checkboxes como array
        const getCheckedValues = (name) => {
            return Array.from(this.form.querySelectorAll(`input[name="${name}"]:checked`))
                .map(cb => cb.value);
        };

        return {
            nombre: this.form.querySelector('#nombre')?.value || '',
            email: this.form.querySelector('#email')?.value || '',
            telefono: this.form.querySelector('#telefono')?.value || '',
            servicios_interes: getCheckedValues('servicios_interes'),
            identidad_visual: this.form.querySelector('#identidad_visual')?.value || '',
            servicios_adicionales: getCheckedValues('servicios_adicionales'),
            fecha_limite: this.form.querySelector('#fecha_limite')?.value || '',
            donde_conocido: this.form.querySelector('#donde_conocido')?.value || '',
            url_origen: window.location.href,
            estado: 'nuevo'
        };
    },

    validateField(input) {
        const result = FormValidator.validate(input.id || input.name, input.value, input.checked);
        if (!result.valid) this.showFieldError(input, result.message);
        else this.clearError(input);
    },

    showFieldError(input, message) {
        this.clearError(input);
        input.classList.add('form__input--error');
        const container = input.closest('.form__group') || input.parentNode;
        const errorEl = document.createElement('div');
        errorEl.className = 'form__error';
        errorEl.textContent = message;
        container.appendChild(errorEl);
    },

    clearError(input) {
        input.classList.remove('form__input--error');
        const container = input.closest('.form__group') || input.parentNode;
        const errorEl = container.querySelector('.form__error');
        if (errorEl) errorEl.remove();
    },

    showErrors(errors) {
        for (const [field, message] of Object.entries(errors)) {
            const input = this.form.querySelector(`#${field}`) || this.form.querySelector(`[name="${field}"]`);
            if (input) this.showFieldError(input, message);
        }
        this.form.querySelector('.form__input--error')?.focus();
    },

    clearAllErrors() {
        this.form.querySelectorAll('.form__input--error').forEach(input => this.clearError(input));
    },

    setLoadingState(isLoading) {
        const btn = this.form.querySelector('#submit-btn');
        if (btn) {
            btn.disabled = isLoading;
            btn.textContent = isLoading ? 'Procesando...' : 'Enviar Presupuesto';
        }
    },

    showNotification(message, type = 'info') {
        const n = document.createElement('div');
        n.className = `notification notification--${type}`;
        n.textContent = message;
        document.body.appendChild(n);
        setTimeout(() => n.classList.add('notification--show'), 10);
        setTimeout(() => {
            n.classList.remove('notification--show');
            setTimeout(() => n.remove(), 300);
        }, 5000);
    }
};

// Inicialización
// Si usas carga dinámica de componentes, asegúrate de llamar a BudgetForm.init() 
// después de inyectar el HTML en el DOM.
document.addEventListener('DOMContentLoaded', () => BudgetForm.init());