import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['num', 'nombre', 'tipo_doc', 'doc_identidad', 'fecha_nac', 'genero', 'cantidad', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clientes:any = '';

  constructor(
    private _cliente:ClienteService,
    private route:Router
    ) { 
    this.loadCliente();
  }

  ngOnInit(): void {
    
  }

  loadCliente(){
    this._cliente.getClientes().subscribe((res)=>{
      this.clientes = res;
      //console.log(this.clientes);

      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(element:any){
    this.route.navigate(['principal/cliente', element]);
    //console.log(element);
  }

  eliminar(element:any){
    swal({
      title: "BANCO UNION",
      text: "¿Esta seguro de eliminar el registro?",
      icon: "warning",
      buttons: ['SI','NO'],
      dangerMode: true,
    })
    .then((value) => {
      if (!value) {
        this._cliente.deleteCliente(element).subscribe((res)=>{
          swal("Se eliminò el registro").then(()=>{
            this.loadCliente();
          });
        })
      }
    });
  }

  cuenta(id:any){
    this.route.navigate(['/principal/cuenta', id]);
  }
}
