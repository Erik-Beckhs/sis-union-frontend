import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  getClientes(){
    let url = `${base_url}/api/clientes/ListadoDeClientes`;
    return this.http.get(url);
  }

  saveClient(cliente:any){
    let url = `${base_url}/api/clientes`;
    return this.http.post(url, cliente);
  }

  updateClient(id:number, cliente:any){
    //let id = cliente.id;
    let url = `${base_url}/api/clientes/${id}`;
    return this.http.patch(url, cliente);
  }

  getClientById(id:any){
    let url = `${base_url}/api/clientes/${id}`;
    return this.http.get(url);
  }

  deleteCliente(id:number){
    let url = `${base_url}/api/clientes/${id}`;
    return this.http.delete(url);
  }
}
