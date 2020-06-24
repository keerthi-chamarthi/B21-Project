import { LoginFormComponent } from './login-form/login-form.component';
import { ResponsePageComponent } from './response-page/response-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'user', component: ResponsePageComponent },
  { path: 'trade/:name', component: ResponsePageComponent },
  { path: 'address', component: AddressFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
