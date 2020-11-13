export class CentroCostosList{
  constructor(
    public Name: string,
    public Codigo: number,
    public position: number,
  ){
 
  }


}

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

export class Ejecucion {
  
  constructor(
    nombre
  ) {
    this.Nombre = nombre
    this.Enero = 0;
    this.Febrero= 0;
    this.Marzo= 0;
    this.Abril= 0;
    this.Mayo= 0;
    this.Junio= 0;
    this.Julio= 0;
    this.Agosto= 0;
    this.Sept= 0;
    this.Octubre= 0;
    this.Noviembre= 0;
    this.Diciembre= 0;




  }
  public Nombre: string;
  public Enero: number;
  public Febrero: number;
  public Marzo: number;
  public Abril: number;
  public Mayo: number;
  public Junio: number;
  public Julio: number;
  public Agosto: number;
  public Sept: number;
  public Octubre: number;
  public Noviembre: number;
  public Diciembre: number;

}

export class Otros{
  constructor(
     public Nombre: string,
     public Total: number,
     public Porcentaje: number

  ){
   

  }
 

}
export class Proyectados{
  constructor(){
    this.ListaParticipantes = [];
    this.TotalFamilias = 0;
    this.OtrosParticipantes = [];
    this.Observaciones = ""

  }
  public ListaParticipantes: Participantes[];
  public TotalFamilias: number;
  public Observaciones: string;

  public OtrosParticipantes: Otros[];

}
export class Participantes {
  
  constructor(
    nombre
  ) {
    this.Nombre = nombre
    this.Rango_0_5 = 0;
    this.Rango_6_12= 0;
    this.Rango_13_17= 0;
    this.Rango_18_24= 0;
    this.Rango_25_56= 0;
    this.Mayores_60= 0;
    this.Total= 0;
    this.TotalDesagregado= 0;
    this.Porcentaje= 0;


  }
  public Nombre: string;
  public Rango_0_5: number;
  public Rango_6_12: number;
  public Rango_13_17: number;
  public Rango_18_24: number;
  public Rango_25_56: number;
  public Mayores_60: number;
  public Total: number;
  public TotalDesagregado: number;
  public Porcentaje: number


}

export class Financiera {
  constructor(



  ) {
    this.CostoTotal = 0,
    this.PlatContrapartida = 0,
    this.PlataDonante = 0,

    this.FuentePresupuesto = ""
    this.TipoFuente = ""
    this.MonedaDonacion = "";
    this.TasaCambio = "";
    this.Cuenta = "";
    this.CentroCostos = ""
    this.SubCentro = "";
    this.NavisionFacilitiy = "";
    this.Desembolsos = [];
    this.Visitas = []
    this.ListCentroCostos = []

  }

  public CostoTotal: number;
  public FuentePresupuesto: string;
  public PlatContrapartida: number;
  public TipoFuente: string;
  public PlataDonante: number;

  public MonedaDonacion: string;
  public TasaCambio: string;
  public Cuenta: string;
  public CentroCostos: string;
  public SubCentro: string;
  public NavisionFacilitiy: string;
  public Responsable: string;
  public Lugar: string;

  public Desembolsos: FechaElement[];
  public Visitas: FechaElement[];
  public ListCentroCostos: CentroCostosList[];





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
    this.FechasComites = [];
    this.FechasInformes = [];
    this.Municipio = [];
    this.infoFinanciera = new Financiera();
    this.ParticiProyectados = new Proyectados();
    this.ListaEjecucion = []

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
  public FechasInformes: FechaElement[];
  public FechasComites: FechaElement[];
  public Municipio: MunicipioSeleccionado[];
  public infoFinanciera: Financiera;
  
  public ListaEjecucion: Ejecucion[]; 
  public ParticiProyectados: Proyectados;


}
