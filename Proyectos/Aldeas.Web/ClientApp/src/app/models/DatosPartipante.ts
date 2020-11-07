import { Task } from "./checkbox";
import { Participantes } from "./proyect";

export class RegistroParticipante {
    constructor(
   
    ){
        this.idProyecto = 0;
        this.FechaIngreso = new Date();
        // this.FechaSalida = new Date();
        this.FechaNacimiento = new Date();
        this.Nombres="";
        this.Apellidos="";
        this.GrupoEtnico="";
        this.GrupoPoblacional =""
        this.Discapacidad="";
        this.TipoParticipante="";
        this.Linea= [];
        this.Edad = 1
        this.Sexo="";
        this.Genero="";
        this.Nacionalidad="";
        this.EstatusResidencia="";
        this.CodDepartamento="";
        this.CodMunicipio="";
        this.Localidad="";
        this.AsisteAlColegio="";
        this.NivelEscolaridad="";
        this.UltimoCursoAprobado="";
        this.participantes =[]
    }
   
    public idProyecto: number;
    public FechaIngreso: Date;
    public FechaSalida: Date;
    public FechaNacimiento: Date;
    public Nombres: string;
    public Apellidos: string;

    public GrupoEtnico: string;
    public Discapacidad: string;
    public TipoParticipante: string;
    public Linea: Task[];
    public Edad: number;
    public Sexo: string;
    public Genero: string;
    public Nacionalidad: string;
    public GrupoPoblacional: string;

    public EstatusResidencia: string;
    public CodDepartamento: string;
    public CodMunicipio: string;
    public Localidad: string;
    public AsisteAlColegio: string;
    public NivelEscolaridad: string;
    public UltimoCursoAprobado: string;
    public participantes: Participantes[];
   }

 