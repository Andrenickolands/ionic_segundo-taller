import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/assets/validators/validators.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class RegistratePage implements OnInit {
  inputType: string = 'password';

  formData = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    passwordConfirmation: '',
    terminos: false
  };

  // Objeto para controlar qué campos han sido tocados
  touched = {
    nombres: false,
    apellidos: false,
    email: false,
    telefono: false,
    password: false,
    passwordConfirmation: false,
    terminos: false
  };

  // Objeto para almacenar errores de cada campo
  errors = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    passwordConfirmation: '',
    terminos: ''
  };

  constructor(
    private router: Router, 
    private toastController: ToastController, 
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit() {
  }

  async Registrarse() {
    // Limpiar espacios en blanco de todos los campos de texto
    this.trimFormData();

    // Validar el formulario
    if (!this.Validateform()) {
      return;
    }

    try {
      // Aquí iría la lógica para enviar los datos al backend
      console.log('Datos del formulario:', this.formData);

      // Mostrar mensaje de éxito
      await this.showToast('Registro exitoso', 'success');

      // Navegar al login
      this.GoToPage();

    } catch (error) {
      console.error('Error en el registro:', error);
      await this.showToast('Error al procesar el registro', 'danger');
    }
  }

  Validateform(): boolean {
    let hasErrors = false;

    // Validar todos los campos y marcarlos como tocados
    this.touched.nombres = true;
    this.errors.nombres = this.validatorsService.validateField('nombres', this.formData.nombres);
    if (this.errors.nombres) hasErrors = true;

    this.touched.apellidos = true;
    this.errors.apellidos = this.validatorsService.validateField('apellidos', this.formData.apellidos);
    if (this.errors.apellidos) hasErrors = true;

    this.touched.email = true;
    this.errors.email = this.validatorsService.validateField('email', this.formData.email);
    if (this.errors.email) hasErrors = true;

    this.touched.telefono = true;
    this.errors.telefono = this.validatorsService.validateField('telefono', this.formData.telefono);
    if (this.errors.telefono) hasErrors = true;

    this.touched.password = true;
    this.errors.password = this.validatorsService.validateField('password', this.formData.password);
    if (this.errors.password) hasErrors = true;

    this.touched.passwordConfirmation = true;
    this.errors.passwordConfirmation = this.validatorsService.validateField('passwordConfirmation', this.formData.passwordConfirmation, this.formData);
    if (this.errors.passwordConfirmation) hasErrors = true;

    this.touched.terminos = true;
    this.errors.terminos = this.validatorsService.validateField('terminos', this.formData.terminos);
    if (this.errors.terminos) hasErrors = true;

    // Mostrar el primer error encontrado
    if (hasErrors) {
      const firstError = Object.values(this.errors).find(error => error !== '');
      if (firstError) {
        this.showToast(firstError, 'danger');
      }
      return false;
    }

    return true;
  }

  // Método para limpiar espacios en blanco de los campos de texto
  private trimFormData(): void {
    this.formData.nombres = this.formData.nombres.trim();
    this.formData.apellidos = this.formData.apellidos.trim();
    this.formData.email = this.formData.email.trim().toLowerCase();
    this.formData.telefono = this.formData.telefono.trim().replace(/\s/g, '');
  }

  // Métodos de validación en tiempo real
  onNombresChange() {
    this.touched.nombres = true;
    this.errors.nombres = this.validatorsService.validateField('nombres', this.formData.nombres);
  }

  onApellidosChange() {
    this.touched.apellidos = true;
    this.errors.apellidos = this.validatorsService.validateField('apellidos', this.formData.apellidos);
  }

  onEmailChange() {
    this.touched.email = true;
    this.errors.email = this.validatorsService.validateField('email', this.formData.email);
  }

  onTelefonoChange() {
    this.touched.telefono = true;
    this.errors.telefono = this.validatorsService.validateField('telefono', this.formData.telefono);
  }

  onPasswordChange() {
    this.touched.password = true;
    this.errors.password = this.validatorsService.validateField('password', this.formData.password);

    // Revalidar confirmación si ya fue tocada
    if (this.touched.passwordConfirmation) {
      this.onPasswordConfirmChange();
    }
  }

  onPasswordConfirmChange() {
    this.touched.passwordConfirmation = true;
    this.errors.passwordConfirmation = this.validatorsService.validateField('passwordConfirmation', this.formData.passwordConfirmation, this.formData);
  }

  onTerminosChange() {
    this.touched.terminos = true;
    this.errors.terminos = this.validatorsService.validateField('terminos', this.formData.terminos);
  }

  // Verificar si el formulario es válido
  isFormValid(): boolean {
    return Object.values(this.errors).every(error => error === '') &&
      Object.values(this.touched).every(touched => touched === true);
  }

  GoToPage() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  // Método para mostrar toasts
  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    toast.present();
  }
}