import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home']);
  }

  RecoveryPassword() {
    this.router.navigate(['/olvidaste-tu-contrasena']);
  }

  loginWithGoogle() {
    this.router.navigate(['/home']);
  }

  navigateToSingUp() {
    this.router.navigate(['/signup']);
  }


}
