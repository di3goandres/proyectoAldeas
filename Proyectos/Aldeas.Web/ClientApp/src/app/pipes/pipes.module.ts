import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro/filtro.pipe';



@NgModule({
  declarations: [FiltroPipe],
  exports: [FiltroPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
