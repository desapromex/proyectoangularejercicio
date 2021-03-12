
import { Component, OnInit, Input, ViewChild, ElementRef ,  AfterViewInit } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HttpClientJsonpModule } from '@angular/common/http';

 
@Component({
  selector: 'app-tabladepersonaslistado',
  templateUrl: './tabladepersonaslistado.component.html',
  styleUrls: ['./tabladepersonaslistado.component.css']
})
export class TabladepersonaslistadoComponent implements OnInit {

	constructor(private http: HttpClient) { }

	@ViewChild("downloadauxiliar", { static: true }) downloadauxiliar!: ElementRef<HTMLAnchorElement >;

	localStorTokenKeyListadoPersonasVectorObjeos = "ListadoPersonasVectorObjeos";

	personasVectorObjeos = [] as  any;

	intervalorefrescarlistado:any;

	ngOnInit(): void {
	  this.refrescarlistado()
	  this.intervalorefrescarlistado = setInterval(() => {
		  this.refrescarlistado()
	  }, 1000);
		
	}

	refrescarlistado(){
			
		if(null != localStorage.getItem(this.localStorTokenKeyListadoPersonasVectorObjeos) ){
			if('' != localStorage.getItem(this.localStorTokenKeyListadoPersonasVectorObjeos) ){
			 this.personasVectorObjeos = JSON.parse(''+localStorage.getItem(this.localStorTokenKeyListadoPersonasVectorObjeos))
			}
			else{
				this.personasVectorObjeos = [] as  any;
			}
		}
		
		

	}
	
	descargardocumentolocal(identificador:string){
		
		for(let i=0; i < this.personasVectorObjeos.length; i++){
			
			if(identificador == this.personasVectorObjeos[i].id){
				
				alert('se inicio descarga del documento')
					
					
				var contentType = '';

				var solutiontmp  = ""+this.personasVectorObjeos[i].documento
				var solutionb  =solutiontmp.split("base64,");


				var blob = this.b64toBlob(''+solutionb[1], contentType,512);
				var blobUrl = URL.createObjectURL(blob);


		 
				this.downloadauxiliar.nativeElement.download = ''+this.personasVectorObjeos[i].documentoname;

				this.downloadauxiliar.nativeElement.href = blobUrl;

				let elanchordownloadauxiliar: HTMLAnchorElement = this.downloadauxiliar.nativeElement;

				elanchordownloadauxiliar.click();				
				
			}
			
		}
		
	}
	
	b64toBlob(b64Data :any, contentType:any, sliceSize:any) {
		  contentType = contentType || '';
		  sliceSize = sliceSize || 512;
		  var byteCharacters = atob(b64Data);
		  var byteArrays = [];
		  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
			  byteNumbers[i] = slice.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		  }
		  var blob = new Blob(byteArrays, {type: contentType});
		  return blob;
	}

}
