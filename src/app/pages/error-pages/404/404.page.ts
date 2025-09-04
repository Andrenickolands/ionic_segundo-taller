import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page404',
  templateUrl: './404.page.html',
  styleUrls: ['./404.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class Page404 implements OnInit {

  constructor(private router: Router,
    private navCtrl: NavController) { }

  ngOnInit() {
    // Animación de entrada
    setTimeout(() => {
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('animate-in');
      }
    }, 100);

    // Efecto parallax
    this.addParallaxEffect();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.navCtrl.back();
  }

  private addParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
      const shapes = document.querySelectorAll('.shape');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const translateX = (x - 0.5) * speed * 20;
        const translateY = (y - 0.5) * speed * 20;
        (shape as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    });
  }
}
