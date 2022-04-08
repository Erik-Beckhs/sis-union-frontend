import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipodoc'
})
export class TipodocPipe implements PipeTransform {

  transform(value: any): string {
    let valor = 'desconocido';
    switch(value){
      case 1:
        valor = 'Cedula de Identidad';
        break;
      case 2:
        valor = 'Cedula de Identidad de Extranjero';
        break;
      case 3:
        valor= 'Documento Especial de Identificación';
        break;
      default:
        valor='ninguno';
        break;
    }
    return valor;
  }

}
