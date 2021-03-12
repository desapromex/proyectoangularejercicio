
import { Component, OnInit, Input, ViewChild, ElementRef ,  AfterViewInit } from '@angular/core';

 import { HttpClient, HttpClientModule } from '@angular/common/http';
 
 import { HttpClientJsonpModule } from '@angular/common/http';
 
 
@Component({
  selector: 'app-formulariopersonainfo',
  templateUrl: './formulariopersonainfo.component.html',
  styleUrls: ['formulariopersonainfo.component.css']
})
export class FormulariopersonainfoComponent implements OnInit,AfterViewInit {

	localStorTokenKeyListadoPersonasVectorObjeos = "ListadoPersonasVectorObjeos";

	personasVectorObjeos = [] as  any;

	resultapiDatosAleatorioPersona = [] as  any;
	errorapiDatosAleatorioPersona =[] as  any; 

	infowunoq ='wno'

	nuevapersona = {nombre:'',edad:0,sexo:'',documento:'',localfilebeforeuploading:'',localfilebeforeuploadingtype:'',localfilebeforeuploadingname:'',localfilebeforeuploadingsize:''};

	vectorsexos = [{value:'mujer',title:'Mujer',},{value:'hombre',title:'Hombre'}];


	localuploadingdocumento = false;

	@ViewChild("formdepersona", { static: true }) formdepersona!: ElementRef<HTMLFormElement >;


	constructor(private http: HttpClient) { }

	ngOnInit(): void {

	if(null != localStorage.getItem(this.localStorTokenKeyListadoPersonasVectorObjeos) ){
		if('' != localStorage.getItem(this.localStorTokenKeyListadoPersonasVectorObjeos) ){
		 this.personasVectorObjeos = JSON.parse(''+localStorage.getItem(this.localStorTokenKeyListadoPersonasVectorObjeos))
		}
		else{
			this.personasVectorObjeos = [] as  any;
		}
	}

		

	}
	

	ngAfterViewInit() {

	}

	pedirDatosAleatorioPersona(){
			// https://randomapi.com/api/1ae77c6e4d8bda51a8c673719a5e09df?&fmt=raw
			
		this.http.get<any>('https://random-data-api.com/api/users/random_user?size=1').subscribe(data => {
				
			this.resultapiDatosAleatorioPersona = data;

			let tmpdateString = data[0].date_of_birth+'T00:00:00' 
			let tmpnewDate = new Date(tmpdateString);

			var someday = new Date(data[0].date_of_birth);
			var today = new Date();
			var years = today.getFullYear() - someday.getFullYear();

			// Reset someday to the current year.
			someday.setFullYear(today.getFullYear());

			// Depending on when that day falls for this year, subtract 1.
			if (today < someday)
			{
				years--;
			}

			this.nuevapersona.nombre=data[0].first_name +" "+data[0].last_name
			this.nuevapersona.edad=years

			this.nuevapersona.localfilebeforeuploading=''
			this.nuevapersona.localfilebeforeuploadingtype=''
			this.nuevapersona.localfilebeforeuploadingname=''
			this.nuevapersona.localfilebeforeuploadingsize=''

		},error => {this.errorapiDatosAleatorioPersona = error});

	}
	
	guardarPersonaNueva(){
		
		if(this.localuploadingdocumento){
			alert('procesando documento local,  espere unos segundos y vuelva a intentar otra vez, clic en boton Guardar')
			return;
		}
		if(null == this.nuevapersona.nombre){
			alert('falta el dato nombre , intentar otra vez')
			return;
		}
		if(''== this.nuevapersona.nombre.trim()){
			alert('falta el dato nombre , intentar otra vez')
			return;
		}
		if(null == this.nuevapersona.edad){
			alert('falta el dato edad , intentar otra vez')
			return;
		}
		if(0 >= this.nuevapersona.edad){
			alert('falta el dato edad , intentar otra vez')
			return;
		}
		//validar numero entero
		if((parseFloat(''+this.nuevapersona.edad) == parseInt(''+this.nuevapersona.edad)) && !isNaN(this.nuevapersona.edad)){
		}
		else{
			alert('debe ser de tipo numero el dato edad , intentar otra vez')
			return;			
		}
		let validaciontmpedad= ""+this.nuevapersona.edad
		if(validaciontmpedad.indexOf('.') != -1 ){
			alert('debe ser de tipo numero, el dato edad , intentar otra vez')
			return;
		}
		if(validaciontmpedad.indexOf(',') != -1 ){
			alert('debe ser de tipo numero, el dato edad , intentar otra vez')
			return;
		}
		if(null == this.nuevapersona.sexo){
			alert('falta el dato sexo , intentar otra vez')
			return;
		}
		if(''== this.nuevapersona.sexo.trim()){
			alert('falta el dato sexo , intentar otra vez')
			return;
		}

		 this.personasVectorObjeos.push( {
			 id:'u_'+new Date().valueOf(),
			 nombre:this.nuevapersona.nombre,
			 documento:this.nuevapersona.localfilebeforeuploading,
			 documentotype:this.nuevapersona.localfilebeforeuploadingtype,
			 documentoname:this.nuevapersona.localfilebeforeuploadingname,
			 documentosize:this.nuevapersona.localfilebeforeuploadingsize,
			  sexo:this.nuevapersona.sexo,
			  edad:this.nuevapersona.edad
		 })
		
		localStorage.setItem(this.localStorTokenKeyListadoPersonasVectorObjeos, JSON.stringify(this.personasVectorObjeos))
		
		this.nuevapersona.nombre = '';
		this.nuevapersona.documento = '';
		this.nuevapersona.localfilebeforeuploading = '';
		 this.nuevapersona.localfilebeforeuploadingtype = ''
		 this.nuevapersona.localfilebeforeuploadingname = ''
		 this.nuevapersona.localfilebeforeuploadingsize = ''

		
		this.nuevapersona.edad = 0;
		this.nuevapersona.sexo = '';
		
		this.formdepersona.nativeElement.reset()
		
	}
	
	onFileChanged(event: any) {
			 let fileuploadinfo = {
				 name:event.target.files[0].name
				 ,type:event.target.files[0].type
				 ,size:event.target.files[0].size
			 };
	 
		 
		 
			var reader = new FileReader(); 
			this.localuploadingdocumento = true;		 
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (e) =>  {
			 
			 this.nuevapersona.localfilebeforeuploading = ""+reader.result
			 this.nuevapersona.localfilebeforeuploadingtype = fileuploadinfo.type
			 this.nuevapersona.localfilebeforeuploadingname = fileuploadinfo.name
			 this.nuevapersona.localfilebeforeuploadingsize = fileuploadinfo.size
									 
			 this.localuploadingdocumento = false;			 
			
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





/* 
{"error":"API_QUOTA_EXCEEDED"}

Request URL: https://randomapi.com/api/1ae77c6e4d8bda51a8c673719a5e09df?&fmt=raw
Request Method: GET
Status Code: 403 
Remote Address: [2606:4700:3035::6815:45a1]:443
Referrer Policy: strict-origin-when-cross-origin
 */
