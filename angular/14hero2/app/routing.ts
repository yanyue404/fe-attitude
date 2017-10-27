import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
// import { DetailComponent } from './dashboard/DetailComponent.component';
// import { ListComponent } from './dashboard/ListComponent.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
//   {
//     path: 'list',
//     component: ListComponent
//   }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });