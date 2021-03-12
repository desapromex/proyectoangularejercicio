import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { GestionpersonascatalogoModule } from './gestionpersonascatalogo/gestionpersonascatalogo.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	GestionpersonascatalogoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
