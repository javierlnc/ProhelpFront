import { Routes } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () => import('@modules/login/login.component'),
  },
] as Routes;
