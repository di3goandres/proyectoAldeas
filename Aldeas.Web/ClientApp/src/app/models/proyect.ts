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
    this.Telefono = 0
    this.FechaInicio = new Date();
    this.FechaFinalizacion = new Date();
    this.LiderEjecucion = "";
    this.LiderCoordinacion = "";
    this.ComiteTecnico = "";
    this.Requiere = "";
    this.FechasComites =[];
    this.FechasInformes =[];
    this.Municipio=[];

  }
  public Status: string;
  public Nombre: string;
  public Donante: string;
  public TipoFinanciacion: string;
  public NombreDonante: string;
  public Direccion: string;
  public Email: string;
  public Telefono: number;
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



}
