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



export class Task {
    constructor(){}
   
    pregunta:string;
    name: string;
    completed: boolean;
    esOtro: boolean;
    color: ThemePalette;
    formValid?:boolean;
    disabled?:boolean
    subtasks?: Task[];
    valorOtro?:string;

  }