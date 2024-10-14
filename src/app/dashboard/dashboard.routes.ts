import { Routes } from "@angular/router";

export default [
    {
        path: 'main', loadComponent: () => import('./main-dashboard/main-dashboard.component'),

    },
    {
        path: 'prueba', loadComponent: () => import('./prueba/prueba.component'),
        
    }
] as Routes;