import { CentroCostosList } from './proyect';
export class Colaborador {
    constructor(
  
  
  
    ) {
    this.Nombre = ""
    this.Fecha = new Date();
    this.Cargo= "";
    this.Tiempo = "";
    this.TipoContrato= ""
    this.FechaInicio= new  Date();
    this.FechaFin= new Date();
    this.CostoMensual= 0
    this.CentroCostos= ""
    this.Subcentro= ""
    this.Porcentaje= 0
    this.Contrapartida= 0
    this.Aporte =0
    this.ListCentroCostos = []

    }
    public Nombre : string;
    public Fecha: Date;
    public Cargo: string;
    public Tiempo: string;
    public TipoContrato: string;
    public FechaInicio: Date;
    public FechaFin: Date;
    public CostoMensual: number;
    public CentroCostos: string;
    public Subcentro: string;
    public Porcentaje: number;
    public Contrapartida: number;
    public Aporte: number;
     public ListCentroCostos: CentroCostosList[];




    




}