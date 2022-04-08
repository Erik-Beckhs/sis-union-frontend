import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sucursal'
})
export class SucursalPipe implements PipeTransform {

  transform(value: any): string {
    let sucursal='ninguno';
    if(value==1){
      sucursal='La Paz';
    }
    else if(value==2){
      sucursal='Cochabamba';
    }
    else{
      sucursal='Santa Cruz';
    }
    return sucursal;
  }

}
