import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';



// import { HttpClientModule } from '@angular/common/http';

import { TabladepersonaslistadoComponent } from './tabladepersonaslistado/tabladepersonaslistado.component';
import { FormulariopersonainfoComponent } from './formulariopersonainfo/formulariopersonainfo.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  exports: [TabladepersonaslistadoComponent, FormulariopersonainfoComponent ,HttpClientModule],
  declarations: [TabladepersonaslistadoComponent, FormulariopersonainfoComponent ],
  imports: [
    CommonModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [ HttpClientModule  ]
})
export class GestionpersonascatalogoModule { }
