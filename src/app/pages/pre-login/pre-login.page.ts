import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.page.html',
  styleUrls: ['./pre-login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class PreLoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  next() {
    this.router.navigate(['/login']);
  }

  navigateToSingUp() {
    this.router.navigate(['/signup']);
  }

}
