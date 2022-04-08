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


}