import { Routes } from '@angular/router';

export default [
  {
    path: 'main',
    loadComponent: () =>
      import('@modules/main-dashboard/main-dashboard.component'),
  },
  {
    path: 'admintools',
    loadComponent: () => import('@modules/admintools/admintools.component'),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('@modules/categories/page/categories.component'),
  },
  {
    path: 'resolutions',
    loadComponent: () =>
      import('@modules/resolutions/page/resolutions.component'),
  },
  {
    path: 'reports',
    loadComponent: () => import('@modules/reports/reports.component'),
  },

  {
    path: 'usermanagment',
    loadComponent: () =>
      import('@modules/usermanagment/page/usermanagment.component'),
  },
  {
    path: 'tickets',
    loadComponent: () => import('@modules/tickets/page/tickets.component'),
  },
] as Routes;
