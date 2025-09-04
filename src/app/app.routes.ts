import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'pre-login',
    loadComponent: () => import('./pages/pre-login/pre-login.page').then(m => m.PreLoginPage)
  },
  {
    path: '404',
    loadComponent: () => import('./pages/error-pages/404/404.page').then(m => m.Page404)
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];
