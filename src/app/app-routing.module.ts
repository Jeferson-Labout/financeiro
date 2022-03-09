import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'entries', loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule) },
      { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule) }
      // { path: '', redirectTo: '/reports', pathMatch: 'full' }



    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
