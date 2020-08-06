import { ThemePalette } from "@angular/material/core";

export class CheckBox {
 constructor(
     PValue,
     PEsOtro: boolean,
 ){
    this.Value =PValue
    this.Otro= "";
    this.EsOtro = PEsOtro;
 }

 public Value: string;
 public Otro: String;
 public EsOtro: Boolean;
}



export interface Task {
   
    name: string;
    completed: boolean;
    esOtro: boolean;
    color: ThemePalette;
    subtasks?: Task[];
    valorOtro?:string;

  }