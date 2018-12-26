import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_guard/auth.guard';

const routes:Routes = [
  {path:'login', loadChildren : './login/login.module#LoginModule'},
  {path:'dashboard', loadChildren : './dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard]},
  {path:'', redirectTo: 'login',pathMatch:'full'},
  {path: '**', redirectTo: 'not-found'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
