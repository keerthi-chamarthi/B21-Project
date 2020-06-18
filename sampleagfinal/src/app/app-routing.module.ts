import { LoginFormComponent } from './login-form/login-form.component';
import { ResponsePageComponent } from './response-page/response-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'trade', component: ResponsePageComponent },
  { path: 'trade/:name', component: ResponsePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
