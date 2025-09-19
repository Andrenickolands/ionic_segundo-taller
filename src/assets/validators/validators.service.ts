import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // Mensajes de error centralizados
  private errorMessages = {
    required: {
      nombres: 'Los nombres son requeridos',
      apellidos: 'Los apellidos son requeridos',
      email: 'El email es requerido',
      telefono: 'El teléfono es requerido',
      password: 'La contraseña es requerida',
      passwordConfirmation: 'La confirmación de contraseña es requerida',
      terminos: 'Debe aceptar los términos y condiciones'
    },
    invalid: {
      nombres: 'Los nombres deben contener solo letras',
      apellidos: 'Los apellidos deben contener solo letras',
      email: 'Ingrese un email válido',
      telefono: 'Ingrese un número de teléfono válido (10 dígitos)',
      password: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número',
      passwordConfirmation: 'Las contraseñas no coinciden',
      terminos: 'Debe aceptar los términos y condiciones'
    }
  };

  constructor() { }

  // Validar que el campo no esté vacío
  isNotEmpty(value: string): boolean {
    return value !== null && value !== undefined && value.trim().length > 0;
  }

  // Validar nombres y apellidos (solo letras y espacios)
  isValidName(name: string): boolean {
    if (!this.isNotEmpty(name)) return false;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    return nameRegex.test(name.trim());
  }

  // Validar email
  isValidEmail(email: string): boolean {
    if (!this.isNotEmpty(email)) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Validar teléfono (formato colombiano como ejemplo)
  isValidPhone(phone: string): boolean {
    if (!this.isNotEmpty(phone)) return false;
    const phoneRegex = /^[0-9]{9}$/; // Celulares colombianos
    return phoneRegex.test(phone.trim().replace(/\s/g, ''));
  }

  // Validar contraseña (mínimo 8 caracteres, al menos una mayúscula, minúscula y número)
  isValidPassword(password: string): boolean {
    if (!this.isNotEmpty(password)) return false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password.trim());
  }

  // Validar que las contraseñas coincidan
  passwordsMatch(password: string, passwordConfirmation: string): boolean {
    return password.trim() === passwordConfirmation.trim();
  }

  // Validar términos y condiciones
  termsAccepted(terms: boolean): boolean {
    return terms === true;
  }

  // Métodos para obtener mensajes de error específicos
  validateField(fieldName: string, value: any, formData?: any): string {
    switch (fieldName) {
      case 'nombres':
        if (!this.isNotEmpty(value)) return this.errorMessages.required.nombres;
        if (!this.isValidName(value)) return this.errorMessages.invalid.nombres;
        break;
      
      case 'apellidos':
        if (!this.isNotEmpty(value)) return this.errorMessages.required.apellidos;
        if (!this.isValidName(value)) return this.errorMessages.invalid.apellidos;
        break;
      
      case 'email':
        if (!this.isNotEmpty(value)) return this.errorMessages.required.email;
        if (!this.isValidEmail(value)) return this.errorMessages.invalid.email;
        break;
      
      case 'telefono':
        if (!this.isNotEmpty(value)) return this.errorMessages.required.telefono;
        if (!this.isValidPhone(value)) return this.errorMessages.invalid.telefono;
        break;
      
      case 'password':
        if (!this.isNotEmpty(value)) return this.errorMessages.required.password;
        if (!this.isValidPassword(value)) return this.errorMessages.invalid.password;
        break;
      
      case 'passwordConfirmation':
        if (!this.isNotEmpty(value)) return this.errorMessages.required.passwordConfirmation;
        if (formData && !this.passwordsMatch(formData.password, value)) return this.errorMessages.invalid.passwordConfirmation;
        break;
      
      case 'terminos':
        if (!this.termsAccepted(value)) return this.errorMessages.required.terminos;
        break;
    }
    return '';
  }
}