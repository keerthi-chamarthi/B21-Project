import { CheckGuard } from './guard/check.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ResponsePageComponent } from './pages/response-page/response-page.component';
import { AddressFormComponent } from './pages/address-form/address-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent, canActivate: [CheckGuard]},
  { path: 'user', component: ResponsePageComponent},
  {path: 'test', component: ResponsePageComponent},
  { path: 'address', component: AddressFormComponent,  canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
