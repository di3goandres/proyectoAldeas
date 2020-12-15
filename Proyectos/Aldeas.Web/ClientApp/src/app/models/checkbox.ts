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
   
    constructor(pregunta, name, completed, esOtro, color){
        this.pregunta = pregunta;
        this.name= name;
        this.completed = completed;
        this.esOtro= esOtro;
        this.color= color;
    }
    id: number;
    pregunta:string;
    name: string;
    completed?: boolean;


  

    esOtro: boolean;
    color: ThemePalette;
    formValid?:boolean;
    subtasks?: Task[];
    valorOtro?:string;

  }