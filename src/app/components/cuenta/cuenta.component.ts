import { Component, OnInit, ViewChild } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CuentaService } from '../../services/cuenta.service';

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
  
  cuenta:any = {
    id:0,
    id_cliente:0,
    tipo_prod:0,
    num_cuenta:'',
    moneda:'',
    monto:0,
    fecha_creacion:'',
    sucursal:0
  }

  tipoprods:any;
  sucursal:any;
  monedas:any;
  id:any;

  cuentas:any;

  constructor(
    private _list:ListasService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _cuenta:CuentaService
    ) { 

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id);

    this.tipoprods = this._list.tipoprods;
    this.sucursal = this._list.sucursal;
    this.monedas = this._list.monedas;

    this.loadCuentas();
  }

  ngOnInit(): void {
  }

  guardar(element){

  }
  editar(element:any){

  }
  eliminar(element:any){

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
