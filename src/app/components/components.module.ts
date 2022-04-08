//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';

//Componentes
import { NavbarComponent } from './navbar/navbar.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PrincipalComponent } from './principal/principal.component';
import { FooterComponent } from './footer/footer.component';
import { ListadoComponent } from './listado/listado.component';
import { TipodocPipe } from '../pipes/tipodoc.pipe';
import { GeneroPipe } from '../pipes/genero.pipe';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ProductoPipe } from '../pipes/producto.pipe';
import { SucursalPipe } from '../pipes/sucursal.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    ClienteComponent,
    PrincipalComponent,
    FooterComponent,
    ListadoComponent,
    TipodocPipe,
    GeneroPipe,
    CuentaComponent,
    ProductoPipe,
    SucursalPipe
  ],
  exports: [
    NavbarComponent,
    PrincipalComponent,
    ClienteComponent,
    FooterComponent,
    ListadoComponent,
    TipodocPipe
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class ComponentsModule { }
