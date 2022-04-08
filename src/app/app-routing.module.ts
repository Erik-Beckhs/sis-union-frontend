import { NgModule } from '@angular/core';   
import { Routes, RouterModule } from '@angular/router';  
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { Pages404Component } from './components/pages404/pages404.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ListadoComponent } from './components/listado/listado.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
  
const rutas: Routes = [  
    {path:'', redirectTo:'layout', pathMatch:'full'},
    {path:'layout', component:LayoutComponent},
    {path:'principal', component:PrincipalComponent, 
    children:[
        {path:'dashboard', component:DashboardComponent},
        {path:'cliente/:id', component:ClienteComponent},
        {path:'cuenta/:id', component:CuentaComponent},
        {path:'listado', component:ListadoComponent},
        {path:'', redirectTo:'dashboard', pathMatch:'full'},
        {path:'usuario/:id', component:UsuarioComponent}
    ]},
    {path:'**', component:Pages404Component}
];  
  
@NgModule({  
 imports: [
     RouterModule.forRoot(rutas)
    ],  
 exports: [RouterModule]  
})  
export class AppRoutingModule { } 