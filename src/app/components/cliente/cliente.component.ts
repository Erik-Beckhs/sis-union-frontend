import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

import swal from 'sweetalert';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListasService } from '../../services/listas.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  id:number = 0;
  cliente:any = {
    numdoc:'',
    tipodoc:''
  };
  documento:any;
  fechanaci:any = new Date();

  clientes:any;

  tipodocs:any;
  generos:any;

  constructor(
    private _client:ClienteService,
    private activatedRoute:ActivatedRoute,
    private _listas:ListasService,
    private route:Router
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.verifyId(this.id);
    this.loadClientes();

    this.tipodocs = this._listas.tipodocs;
    this.generos = this._listas.generos;
  }

  ngOnInit(): void {

  }

  loadClientes(){
    this._client.getClientes().subscribe(res=>{
      this.clientes = res;
    })
  }

  verifyId(id:number){
    if(id != 0){
      //console.log('Existe registro, traer');
      //obtener por id
      this._client.getClientById(id).subscribe((res:any)=>{
        //console.log(res);
        
        this.cliente = res;
        this.documento=res.doc_identidad;
        //console.log(res);

        this.fechanaci = new Date(this.cliente.fecha_nac);
        this.cliente.fecha_nac = this.fechanaci;
      })
    }
  }
  
  guardar(element:any){
    let item = element.value;
   //console.log(element.value);
   if(this.cliente.id){

     if(this.documento == item.doc_identidad){
        //console.log('no cambio');
        this.modificar(this.cliente.id, item);
     }
     else{
       //console.log('cambio');
      if(this.verificaCI(item) > 0){
        swal('BANCO UNION', 'La cedula de identidad ingresada ya existe', 'error');
      }
      else{
        this.modificar(this.cliente.id, item);
      }
     }
   }
   else{
      if(this.verificaCI(item) > 0){
        swal('BANCO UNION', 'La cedula de identidad ingresada ya existe', 'error');
      }
      else{
        this.guardaNuevo(item);
      }

      //console.log(x);
    }}

    verificaCI(element){
      const { doc_identidad } = element;

      const x = this.clientes.filter(
        cliente=>{
          if(cliente.doc_identidad == doc_identidad){
            return cliente;
          }
        }
      );
      return x.length;
    }

  modificar(id:number, cliente:any){
    this._client.updateClient(id, cliente).subscribe((res:any)=>{
      swal('BANCO UNION', `Se modificó al cliente ${res.nombre} ${res.paterno} correctamente`, 'success').then(()=>{
        this.route.navigate(['principal/listado']);
      })
    })
  }

//   buscaCI(clientes){
//     //console.log(auto);
//     //const {doc_identidad} = ;
//     let cliente = {
//       id:'856123',
//       doc_identidad:'856233'
//     }

//     const {id, doc_identidad} = cliente
//     if(id){
//         return clientes.doc_identidad === doc_identidad;
//     }
//     return clientes;
//     //igual funciona lo de aqui abajo
//     // return auto;
// //     if(marca != '' && auto.marca === marca){
// //         return auto;
// //     }
// }

  // verificaCI(cliente:any){
  //   const x = this.clientes.filter(this.buscaCI);
  //   console.log(x.length);
  //   return;
    

  //   let a = this.clientes.find(
  //     element=>{
  //       if(element.doc_identidad == cliente.doc_identidad){

  //       }
  //       return 
  //     }
  //   )

  //   console.log(a);
  //   return;

  //  if(a.length() > 0){
  //   console.log('El carnet existe');
  //  }
  //  else{
  //    console.log('El carnet no existe');
  //  }
   
  //   // if(){

  //   // }
  //   // this.guardaNuevo(cliente);
  // }

  guardaNuevo(cliente){
    this._client.saveClient(cliente).subscribe((res:any)=>
        {
         swal('BANCO UNION', `Se registró al cliente ${res.nombre} ${res.paterno} correctamente`, 'success').then(()=>{
           this.route.navigate(['principal/listado']);
         })
        }
        )
  }
}
