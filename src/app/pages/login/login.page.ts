import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  inputType: string = 'password';
  isSubmitted: boolean = false;
  loginForm!: FormGroup;

  form = {
    email: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]]
    });
  }

  // Getters para acceder fácilmente a los controles del formulario
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Método para obtener mensajes de error específicos
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${fieldName === 'email' ? 'Email' : 'Contraseña'} es requerido`;
    }

    if (fieldName === 'email') {
      if (field?.hasError('email') || field?.hasError('pattern')) {
        return 'Ingresa un email válido';
      }
    }

    if (fieldName === 'password') {
      if (field?.hasError('minlength')) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
      if (field?.hasError('maxlength')) {
        return 'La contraseña no puede exceder 50 caracteres';
      }
    }

    return '';
  }

  // Método para verificar si un campo tiene errores y ha sido tocado
  hasError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched || this.isSubmitted));
  }

  // Método para limpiar espacios en blanco de los campos de texto
  private trimFormData(): void {
    const emailValue = this.loginForm.get('email')?.value?.trim()?.toLowerCase();
    this.loginForm.patchValue({
      email: emailValue
    });
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

  async login() {
    this.isSubmitted = true;

    // Limpiar datos del formulario
    this.trimFormData();

    // Verificar si el formulario es válido
    if (this.loginForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });

      await this.presentErrorToast('Por favor, corrige los errores en el formulario');
      return;
    }

    try {
      // Obtener valores del formulario
      const formData = this.loginForm.value;

      // Aquí iría la lógica de autenticación
      console.log('Datos del formulario:', formData);

      // Simular proceso de login
      await this.presentSuccessToast('Iniciando sesión...');

      // Navegar a la página principal
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('Error en login:', error);
      await this.presentErrorToast('Error al iniciar sesión. Intenta de nuevo.');
    }
  }

  RecoveryPassword() {
    this.router.navigate(['/olvidaste-tu-contrasena']);
  }

  loginWithGoogle() {
    this.router.navigate(['/home']);
  }

  navigateToSingUp() {
    this.router.navigate(['/registrate']);
  }

  togglePasswordVisibility() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

}
