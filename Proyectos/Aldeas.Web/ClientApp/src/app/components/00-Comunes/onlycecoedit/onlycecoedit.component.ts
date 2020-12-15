import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CentrosCosto, SubCentro } from '../../../models/comunes';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsCentroCosto } from '../../../models/proyectos/proyecto.unico.response';
import { ColaboradorService } from '../../../services/colaborador/colaborador.service';
import { RegistroNoexitosoComponent } from '../registro-noexitoso/registro-noexitoso.component';
import { RegistroExitosoComponent } from '../registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-onlycecoedit',
  templateUrl: './onlycecoedit.component.html',
  styleUrls: ['./onlycecoedit.component.css']
})
export class OnlycecoeditComponent implements OnInit {
  centrosCostos: CentrosCosto[] = [];
  subCentro: SubCentro[] = [];
  subCentroSeleccionado: SubCentro[] = [];
  @Input() Cecos: ItemsCentroCosto;
  idCentroCosto = 0;

  constructor(
    public userService: UserService,
    private activeModal: NgbActiveModal,
    private service: ColaboradorService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.traerCentrosCostos();
  }

  traerCentrosCostos() {
    this.userService.getCentrosResponse().subscribe(
      response => {

        this.centrosCostos.push(...response.centrosCostos)
        this.subCentro.push(...response.subCentro)

      },
      error => {
        console.log(error);
      }
    );
  }


  Cerrar() {
    this.activeModal.close("close")
  }

  cambio(id) {

    this.idCentroCosto = id;
    // this.idSubcentroCosto = id;
    // this.nombre = this.subCentroSeleccionado.find(item=> item.codigoSubCentro === id).nombre


  }
  cambioCentroCosto(id) {

    this.subCentroSeleccionado = this.subCentro.filter(item => {
      return item.codigoCentro === id;
    });


  }

  Actualizar() {
    this.service.actualizarCeco(this.Cecos.id, this.idCentroCosto).subscribe(
      OK => {

        if(OK.code==200){
          this.activeModal.close("OK")
          this.registroExitoso();
        }else{
          this.registroNoExitoso("Valide los datos", "Por favor seleccione todos los datos")
        }
      
       
      },
      ERROR => { 
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
        this.activeModal.close("NOK")
        },
    )
  }




  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
     
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  registroNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
}
