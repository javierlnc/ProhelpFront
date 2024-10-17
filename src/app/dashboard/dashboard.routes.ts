import { Routes } from "@angular/router";

export default [
    {
        path: 'main', loadComponent: () => import('./main-dashboard/main-dashboard.component'),

    },
    {
        path: 'prueba', loadComponent: () => import('./prueba/prueba.component'),
        
    },
    {
        path: 'tools', loadComponent: () => import('./admintools/admintools.component'),
        
    },
    {
        path: 'categories', loadComponent: () => import('./admintools/categories/categories.component')
    }
] as Routes;