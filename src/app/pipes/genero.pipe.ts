import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: any): string {
    let genero='ninguno';
    if(value==1){
      genero='masculino';
    }
    else{
      genero='femenino';
    }
    return genero;
  }

}
