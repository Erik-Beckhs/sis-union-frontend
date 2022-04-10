import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(
    private http:HttpClient
  ) { }

  getCuentasByIdCliente(idCliente:any){
    let url = `${base_url}/api/clientes/${idCliente}/cuenta`;
    return this.http.get(url);
  }

  createCuenta(cuenta:any){
    let url = `${base_url}/api/cuentas`;
    return this.http.post(url, cuenta);
  }

  deleteCuenta(idCuenta:any){
    let url = `${base_url}/api/cuentas/${idCuenta}`;
    return this.http.delete(url);
  }
  getCuentaById(id:any){
    let url = `${base_url}/api/cuentas/${id}`;
    return this.http.get(url);
  }

  updateCuenta(id:number, cuenta:any){
    let url = `${base_url}/api/cuentas/${id}`;
    return this.http.patch(url, cuenta);
  }

  getCuentas(){
    let url = `${base_url}/api/cuentas`;
    return this.http.get(url);
  }
}
