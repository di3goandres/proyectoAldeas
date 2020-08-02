export class FechaElement {
  constructor(
    public Fecha: Date,
    public position: number,
  ) {
  }

}



export class MunicipioSeleccionado {
  constructor(
    public CodigoDepartamento: number,
    public CodigoMunicipio: number,
    public Municipio: string,
    public Departamento: string,
    public position: number,
  ) {
  }

}



export class Financiera {
  constructor(
 
    

  ) {
    this.CostoTotal= "0",
    this.FuentePresupuesto= ""
    this.TipoFuente= ""
    this.MonedaDonacion= "";
    this.TasaCambio= "";
    this.Cuenta= "";
    this.CentroCostos= ""
    this.SubCentro= "";
    this.NavisionFacilitiy= "";
    this.Desembolsos=[];
  }

  public CostoTotal: string;
  public FuentePresupuesto: string;
  public TipoFuente: string;
  public MonedaDonacion: string;
  public TasaCambio: string;
  public Cuenta: string;
  public CentroCostos: string;
  public SubCentro: string;
  public NavisionFacilitiy: string;
  public Desembolsos: FechaElement [];



}
export class Proyecto {
  constructor(

  ) {
    this.Status = "";
    this.Nombre = "";
    this.Donante = "";
    this.TipoFinanciacion = "";
    this.NombreDonante = "";
    this.Direccion = "";
    this.Email = "";
    this.TipoImplementacion = "";
    this.Telefono = "0"
    this.FechaInicio = new Date();
    this.FechaFinalizacion = new Date();
    this.LiderEjecucion = "";
    this.LiderCoordinacion = "";
    this.ComiteTecnico = "";
    this.Requiere = "";
    this.FechasComites =[];
    this.FechasInformes =[];
    this.Municipio=[];
    this.infoFinanciera = new Financiera();

  }
  public Status: string;
  public Nombre: string;
  public Donante: string;
  public TipoFinanciacion: string;
  public NombreDonante: string;
  public Direccion: string;
  public Email: string;
  public Telefono: string;
  public TipoImplementacion: string;
  public FechaInicio: Date;
  public FechaFinalizacion: Date;
  public LiderEjecucion: string;
  public LiderCoordinacion: string;
  public ComiteTecnico: string;
  public Requiere: string;
  public FechasInformes: FechaElement [];
  public FechasComites: FechaElement [];
  public Municipio: MunicipioSeleccionado[];
  public infoFinanciera: Financiera;



}
