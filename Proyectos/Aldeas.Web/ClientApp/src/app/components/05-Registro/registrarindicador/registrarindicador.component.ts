import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ItemsProyecto } from '../../../models/ProyectoResponse';
import { RegparticipantesService } from '../../../services/registroparticipantes/regparticipantes.service';
import { RegistroParticipantes } from '../../../models/registroparticipantes/registro.participantes.response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrarindicador',
  templateUrl: './registrarindicador.component.html',
  styleUrls: ['./registrarindicador.component.css']
})
export class RegistrarindicadorComponent implements OnInit {
  proyectos: ItemsProyecto[] = [];
  participantes: RegistroParticipantes[] = []
  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService,
    public service: RegparticipantesService,
    private _snackBar: MatSnackBar,

  ) {

    this.firstFormGroup = this._formBuilder.group({
      Proyecto: ['', Validators.required],

      participante: ['', Validators.required],
      // Fechafin: ['', Validators.nullValidator],
      // Nombre: ['', Validators.required],
      // Apellidos: ['', Validators.required],
      // Edad: ['', Validators.required],
      // FechaNacimiento: ['', Validators.required],
      // Departamento: ['', Validators.required],
      // Municipio: ['', Validators.required],
      // Localidad: ['', Validators.required],
      // UltimoCurso: ['', Validators.required],


    });
  }

  ngOnInit(): void {
    this.traerProyectos()
  }
  firstFormGroup: FormGroup;

  traerProyectos() {
    this.userService.getProyectos().subscribe(
      response => {
        this.proyectos.push(...response.itemsProyectos)
      },
      error => {
        console.log(error);
      }
    );
  }


  obtenerPartipantes(id) {
    console.log(id);
    this.service.obtenerParticipantes(id).subscribe(
      OK => {
        this.participantes = [];
        if(OK.registros.length == 0){
          this.openSnackBar("No se han registrados participantes a este proyecto", "")
        }else{
           this.participantes.push(...OK.registros)
        }
       
      },
      ERROR => { console.log(ERROR) },
    )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2200,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
