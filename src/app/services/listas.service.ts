import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  tipodocs:any[]=[
    {value:1, name:'Cedula de Identidad'},
    {value:2, name:'Cedula de Identidad de Extranjero'},
    {value:3, name:'Documento Especial de Identificación'}
  ];

  generos:any[]=[
    {value:0, name:'femenino'},
    {value:1, name:'masculino'}
  ];

  tipoprods:any[]=[
    {value:1, name:'Caja de Ahorro'},
    {value:2, name:'Cuenta Corriente'}
  ];

  sucursal:any[]=[
    {value:1, name:'La Paz'},
    {value:2, name:'Santa Cruz'},
    {value:3, name:'Cochabamba'}
  ];

  monedas:any[]=[
    {value:'BS', name:'Bolivianos'},
    {value:'US', name:'Dolares'}
  ];


  constructor() { 
    //this.listadoTipoDocs();
  }

  // listadoTipoDocs(){
  //   this.tipodocs
  // }
}
