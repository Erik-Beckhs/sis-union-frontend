import { Component, OnInit, ViewChild } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CuentaService } from '../../services/cuenta.service';

import swal from 'sweetalert';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente.interface';

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

  cliente!:Cliente;
  cuentas:any;

  cuentasGral:any;

  ultimoID = 0;
  //idCuenta:any;

  edit:boolean=false;

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
    this._cliente.getClientById(id).subscribe((res:any)=>{
      this.cliente = res;
    })
  }
 

  guardar(element){
    // if(element.monto < 0){
    //   swal('BANCO UNIÓN', 'El monto no puede ser negativo', '')
    //   return;
    // }
    if(this.cuenta.id){
      //editar
      //console.log('editar');
      this._cuenta.updateCuenta(this.cuenta.id, element).subscribe((res:any)=>{
        swal('BANCO UNIÓN', `Se actualizó la cuenta ${res.num_cuenta} de manera exitosa`, 'success');
        this.loadCuentas();
        this.limpiar();
      })
    }
    else{
      // console.log('guardar');
      // return;
      element.id_cliente = this.id;
      //crear
      element.fecha_creacion = this.fechaActual;
      this._cuenta.createCuenta(element).subscribe(()=>{
        swal('BANCO UNION', 'Se creó la cuenta de manera exitosa', 'success').then(()=>{
          this.loadCuentas();
          this.limpiar();
        })
      })
    }
  }
  editar(element:any){
    this._cuenta.getCuentaById(element).subscribe((res)=>{
      this.cuenta = res;
      this.activo = false;
      this.edit = true;
      //this.idCuenta = res.id;
    })
    //getbyid
    //colocarlo como cliente
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
     // id:0,
      //id_cliente:0,
      tipo_prod:0,
      num_cuenta:'',
      moneda:'',
      monto:0,
      fecha_creacion:'',
      sucursal:0
    };
    this.edit = false;
    this.activo=true;
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

  // generaCuenta(){
  //   this._cuenta.getCuentas().subscribe(res=>{
  //     this.cuentasGral = res;
  //     console.log(this.cuentasGral);
  //     console.log(this.cuentasGral.reverse());
  //   })
  // }

  nuevaCuenta(){
    this.activo = false;
    //this.generaCuenta();
    //const a = new Date().getTime();
    this.cuenta.num_cuenta = new Date().getTime();
  }
}
