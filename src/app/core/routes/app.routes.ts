import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth.routes'),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard.routes'),
  },
];
