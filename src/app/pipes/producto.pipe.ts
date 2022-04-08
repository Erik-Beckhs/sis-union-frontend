import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'producto'
})
export class ProductoPipe implements PipeTransform {

  transform(value: any): string {
    let producto='ninguno';
    if(value==1){
      producto='Caja de ahorro';
    }
    else{
      producto='Cuenta corriente';
    }
    return producto;
  }

}
