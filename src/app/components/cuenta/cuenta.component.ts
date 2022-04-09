import { Component, OnInit, ViewChild } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CuentaService } from '../../services/cuenta.service';

import swal from 'sweetalert';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  displayedColumns: string[] = ['num', 'tipo_prod', 'num_cuenta', 'moneda', 'monto', 'fecha_creacion', 'sucursal', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  activo:boolean = true;

  cuenta:any = {
    id:0,
    id_cliente:0,
    tipo_prod:0,
    num_cuenta:'',
    moneda:'',
    monto:0,
    fecha_creacion:'',
    sucursal:0
  };

  fechaActual:any = new Date();

  tipoprods:any;
  sucursal:any;
  monedas:any;
  id:any;

  cliente:any;

  cuentas:any;

  constructor(
    private _list:ListasService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _cuenta:CuentaService,
    private _cliente:ClienteService
    ) { 

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id);

    this.tipoprods = this._list.tipoprods;
    this.sucursal = this._list.sucursal;
    this.monedas = this._list.monedas;

    this.loadCuentas();
    this.loadCliente(this.id);
  }

  ngOnInit(): void {
  }

  loadCliente(id:any){
    this._cliente.getClientById(id).subscribe((res)=>{
      this.cliente = res;
    })
  }
 

  guardar(element){
    element.id_cliente = this.id;
    if(element.id){
      //editar
    }
    else{
      //crear
      element.fecha_creacion = this.fechaActual;
      this._cuenta.createCuenta(element).subscribe((res)=>{
        swal('BANCO UNION', 'Se creó la cuenta de manera exitosa', 'success').then(()=>{
          this.loadCuentas();
          this.limpiar();
        })
      })
    }
  }
  editar(element:any){

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
        this._cuenta.deleteCuenta(element).subscribe((res)=>{
          swal("Se eliminó el registro").then(()=>{
            this.loadCuentas();
          });
        })
      }
    });

    
  }

  limpiar(){
    this.cuenta = {
      id_cliente:0,
      tipo_prod:0,
      num_cuenta:'',
      moneda:'',
      monto:0,
      fecha_creacion:'',
      sucursal:0
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCuentas(){
      this._cuenta.getCuentasByIdCliente(this.id).subscribe(res=>{
        this.cuentas = res;
  
        this.dataSource = new MatTableDataSource(this.cuentas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  clientes(){
    this.router.navigate(['principal/listado']);
  }
}
