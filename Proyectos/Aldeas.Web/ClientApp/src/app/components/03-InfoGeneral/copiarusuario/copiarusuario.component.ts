import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { ItemsProyectoList } from '../../../models/proyectos/proyecto.list.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndicadoresService } from '../../../services/indicadores/indicadores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroParticipantes } from 'src/app/models/registroparticipantes/registro.participantes.response';
import { ParticipantesCopiaRequest } from 'src/app/models/registroparticipantes/participantes.disponibles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';


@Component({
  selector: 'app-copiarusuario',
  templateUrl: './copiarusuario.component.html',
  styleUrls: ['./copiarusuario.component.css']
})
export class CopiarusuarioComponent implements OnInit {
  itemsProyectosOrigen: ItemsProyectoList[];
  itemsProyectosDestino: ItemsProyectoList[]= [];
  firstFormGroup: FormGroup;
  participantesOrigen: RegistroParticipantes[] = []
  desHabilitarParticipante = true;
  usuariosDisponibles= new  ParticipantesCopiaRequest();
  constructor(
    public service: ProyectoService,
    private _formBuilder: FormBuilder,
    public indicadorService: IndicadoresService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,


  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2200,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  ngOnInit(): void {
    this.traerProyecto();

    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],
      ProyectoDestino: ['', Validators.required],
      Participante: ['', Validators.required],
    });
  }
  CambioParticipante(id){
    this.usuariosDisponibles.participante = id;
    console.log(id);
  }
  CambioDestino(idDestino){
    this.desHabilitarParticipante= false;
    this.usuariosDisponibles.proyectoDestino = idDestino;
    this.obtenerPartipantes()

  }
  CambioProyecto(idProyecto){
    this.itemsProyectosDestino =[]
    this.usuariosDisponibles.proyectoOrigen = idProyecto;
    this.desHabilitarParticipante= true;
    this.itemsProyectosDestino = this.itemsProyectosOrigen.filter(item=> {
      return item.id!= idProyecto
    })

    
  }
  traerProyecto() {
    this.service.getProyectos().subscribe(
      OK => {
        this.itemsProyectosOrigen = [];   
        this.itemsProyectosOrigen.push(...OK.itemsProyectos);
      },
      ERROR => { console.log(ERROR) },
    )
  }

  obtenerPartipantes() {
 
   
    this.service.obtenerParticipantesDisponibles(this.usuariosDisponibles).subscribe(
      OK => {
        this.participantesOrigen = [];
        if (OK.registros.length == 0) {
          this.openSnackBar("Del proyecto Origen, ya se copiaron todos los participantes al proyecto destino", "")
        } else {
          this.participantesOrigen.push(...OK.registros)
        }

      },
      ERROR => { console.log(ERROR) },
    )
  }
  onGuardar(){

    this.service.CopiarParticipantes(this.usuariosDisponibles).subscribe(
      OK => {
       
        console.log(OK);
        if(OK.code==200){
          this.desHabilitarParticipante= false;
          this.openExitoso()
          this.firstFormGroup.reset();
        }else{
          this.openNoExitoso("Validaciones", OK.status)
        }
      

      },
      ERROR => { console.log(ERROR)
      
        this.openNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
      },
    )

  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  openNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {


    });
  }
}
