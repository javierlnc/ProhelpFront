import { Routes } from '@angular/router';

export default [
  {
    path: 'main',
    loadComponent: () =>
      import('@modules/main-dashboard/page/main-dashboard.component'),
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
    loadComponent: () => import('@modules/reports/page/reports.component'),
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
  {
    path: 'assign-ticket/:id',
    loadComponent: () =>
      import('@modules/assign-ticket/page/assign-ticket.component'),
  },
  {
    path: 'approval/:id',
    loadComponent: () =>
      import('@modules/approvalTicket/page/approval-ticket.component'),
  },
  {
    path: 'panel',
    loadComponent: () => import('@modules/panel/page/panel.component'),
  },
] as Routes;
