import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(
    arreglo: any[],
    texto: any,
    columna: string
  ): any[] {


    if (arreglo == null) {
      return arreglo
    }
    if (texto === '') {
      return arreglo;
    }

   


    return arreglo.filter(item => {
      return item[columna] == texto
       
    });

  }

}
