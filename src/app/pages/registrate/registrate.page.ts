import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, ReactiveFormsModule]
})
export class RegistratePage implements OnInit {
  inputType: string = 'password';
  inputTypeConfirm: string = 'password';
  isSubmitted: boolean = false;
  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registroForm = this.formBuilder.group({
      nombres: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      apellidos: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9+\-\s()]{10,15}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        this.passwordStrengthValidator
      ]],
      passwordConfirmation: ['', [
        Validators.required
      ]],
      terminos: [false, [
        Validators.requiredTrue
      ]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para la fuerza de la contraseña
  passwordStrengthValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower;
    
    if (!valid) {
      return { passwordStrength: true };
    }
    return null;
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    if (!password || !passwordConfirmation) return null;

    return password.value === passwordConfirmation.value 
      ? null 
      : { passwordMismatch: true };
  }

  // Getters para acceder fácilmente a los controles del formulario
  get nombres() { return this.registroForm.get('nombres'); }
  get apellidos() { return this.registroForm.get('apellidos'); }
  get email() { return this.registroForm.get('email'); }
  get telefono() { return this.registroForm.get('telefono'); }
  get password() { return this.registroForm.get('password'); }
  get passwordConfirmation() { return this.registroForm.get('passwordConfirmation'); }
  get terminos() { return this.registroForm.get('terminos'); }

  // Método para obtener mensajes de error específicos
  getErrorMessage(fieldName: string): string {
    const field = this.registroForm.get(fieldName);

    if (field?.hasError('required')) {
      const fieldLabels: { [key: string]: string } = {
        'nombres': 'Nombres',
        'apellidos': 'Apellidos',
        'email': 'Email',
        'telefono': 'Teléfono',
        'password': 'Contraseña',
        'passwordConfirmation': 'Confirmación de contraseña'
      };
      return `${fieldLabels[fieldName]} es requerido`;
    }

    if (field?.hasError('requiredTrue') && fieldName === 'terminos') {
      return 'Debes aceptar los términos y condiciones';
    }

    if (fieldName === 'nombres' || fieldName === 'apellidos') {
      if (field?.hasError('minlength')) {
        return `${fieldName === 'nombres' ? 'Nombres' : 'Apellidos'} debe tener al menos 2 caracteres`;
      }
      if (field?.hasError('maxlength')) {
        return `${fieldName === 'nombres' ? 'Nombres' : 'Apellidos'} no puede exceder 50 caracteres`;
      }
      if (field?.hasError('pattern')) {
        return `${fieldName === 'nombres' ? 'Nombres' : 'Apellidos'} solo puede contener letras`;
      }
    }

    if (fieldName === 'email') {
      if (field?.hasError('email') || field?.hasError('pattern')) {
        return 'Ingresa un email válido';
      }
    }

    if (fieldName === 'telefono') {
      if (field?.hasError('pattern')) {
        return 'Ingresa un número de teléfono válido';
      }
    }

    if (fieldName === 'password') {
      if (field?.hasError('minlength')) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
      if (field?.hasError('maxlength')) {
        return 'La contraseña no puede exceder 50 caracteres';
      }
      if (field?.hasError('passwordStrength')) {
        return 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
      }
    }

    if (fieldName === 'passwordConfirmation') {
      if (this.registroForm.hasError('passwordMismatch')) {
        return 'Las contraseñas no coinciden';
      }
    }

    return '';
  }

  // Método para verificar si un campo tiene errores y ha sido tocado
  hasError(fieldName: string): boolean {
    const field = this.registroForm.get(fieldName);
    const formError = fieldName === 'passwordConfirmation' && this.registroForm.hasError('passwordMismatch');
    
    return !!(field?.invalid && (field?.dirty || field?.touched || this.isSubmitted)) || formError;
  }

  // Método para limpiar espacios en blanco de los campos de texto
  private trimFormData(): void {
    const nombresValue = this.registroForm.get('nombres')?.value?.trim();
    const apellidosValue = this.registroForm.get('apellidos')?.value?.trim();
    const emailValue = this.registroForm.get('email')?.value?.trim()?.toLowerCase();
    const telefonoValue = this.registroForm.get('telefono')?.value?.trim()?.replace(/\s/g, '');

    this.registroForm.patchValue({
      nombres: nombresValue,
      apellidos: apellidosValue,
      email: emailValue,
      telefono: telefonoValue
    });
  }

  async Registrarse() {
    this.isSubmitted = true;

    // Limpiar datos del formulario
    this.trimFormData();

    // Verificar si el formulario es válido
    if (this.registroForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.registroForm.controls).forEach(key => {
        this.registroForm.get(key)?.markAsTouched();
      });

      await this.presentErrorToast('Por favor, corrige los errores en el formulario');
      return;
    }

    try {
      // Obtener valores del formulario
      const formData = this.registroForm.value;
      
      // Remover la confirmación de contraseña del objeto a enviar
      const { passwordConfirmation, ...dataToSend } = formData;

      // Aquí iría la lógica de registro
      console.log('Datos del formulario:', dataToSend);

      // Simular proceso
      await this.presentSuccessToast('Registrando usuario...');

      // Navegar a la página de login
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Error en registro:', error);
      await this.presentErrorToast('Error al registrarse. Intenta de nuevo.');
    }
  }

  GoToPage() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  togglePasswordConfirmVisibility() {
    this.inputTypeConfirm = this.inputTypeConfirm === 'password' ? 'text' : 'password';
  }

  // Método para mostrar toast de error
  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'error-toast'
    });
    toast.present();
  }

  // Método para mostrar toast de éxito
  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
      cssClass: 'success-toast'
    });
    toast.present();
  }
}