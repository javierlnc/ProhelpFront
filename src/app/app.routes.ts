import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login', 
        pathMatch: 'full' 
    },
    {
        path: 'auth', loadChildren:() => import('./auth/auth.routes')
    },
    {
        path: 'dashboard',component: DashboardComponent, loadChildren:() => import('./dashboard/dashboard.routes'),

    }
];
