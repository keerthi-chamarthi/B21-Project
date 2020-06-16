import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeComponent } from './trade/trade.component';
import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TradeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
